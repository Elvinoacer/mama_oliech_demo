/**
 * Menu-aware pricing engine for table bills.
 *
 * Rules:
 * - Never trust client-supplied amounts.
 * - Resolve every line against the menu catalog.
 * - Catch-weight: round(pricePerKgKes × weightKg).
 * - Fixed: priceKes × quantity.
 * - Enquiry / non-payable items are rejected for STK bills.
 */

import { getMenuItemById } from "@/lib/data/menu";
import type { MenuItem, PricingMode, TaxCategory } from "@/lib/types/menu";
import type { BillLine, BillLineInput } from "@/lib/types/orders";

export class PricingError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "UNKNOWN_ITEM"
      | "UNAVAILABLE"
      | "NOT_PAYABLE"
      | "INVALID_QTY"
      | "INVALID_WEIGHT"
      | "MISSING_WEIGHT"
      | "EMPTY_BILL",
  ) {
    super(message);
    this.name = "PricingError";
  }
}

function resolvePricingMode(item: MenuItem): PricingMode {
  if (item.pricingMode) return item.pricingMode;
  if (item.isCatchWeight || item.pricePerKgKes != null) return "catch-weight";
  if (item.priceKes != null) return "fixed";
  return "enquiry";
}

function resolveTaxCategory(item: MenuItem): TaxCategory {
  return item.taxCategory ?? "standard-food";
}

function isPayable(item: MenuItem): boolean {
  if (item.payable === false) return false;
  if (item.available === false) return false;
  const mode = resolvePricingMode(item);
  if (mode === "enquiry") return false;
  if (mode === "catch-weight") return item.pricePerKgKes != null && item.pricePerKgKes > 0;
  return item.priceKes != null && item.priceKes > 0;
}

function newLineId(): string {
  return `ln_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Resolve one client line input into a priced bill line.
 * Throws PricingError on invalid input.
 */
export function priceBillLine(input: BillLineInput): BillLine {
  const item = getMenuItemById(input.menuItemId);
  if (!item) {
    throw new PricingError(
      `Unknown menu item: ${input.menuItemId}`,
      "UNKNOWN_ITEM",
    );
  }
  if (item.available === false) {
    throw new PricingError(`${item.name} is not available`, "UNAVAILABLE");
  }
  if (!isPayable(item)) {
    throw new PricingError(
      `${item.name} is not payable via table bill (enquiry / catering only)`,
      "NOT_PAYABLE",
    );
  }

  const mode = resolvePricingMode(item);
  const taxCategory = resolveTaxCategory(item);
  const note = input.note?.trim() || undefined;

  if (mode === "catch-weight") {
    const rate = item.pricePerKgKes!;
    let weightKg = input.weightKg;
    let portionTierId = input.portionTierId;
    let portionLabel: string | undefined;

    if (portionTierId && item.portionTiers?.length) {
      const tier = item.portionTiers.find((t) => t.id === portionTierId);
      if (!tier) {
        throw new PricingError(
          `Unknown portion tier "${portionTierId}" for ${item.name}`,
          "INVALID_WEIGHT",
        );
      }
      weightKg = tier.weightKg;
      portionLabel = tier.label;
    }

    if (weightKg == null || !Number.isFinite(weightKg)) {
      throw new PricingError(
        `${item.name} requires weightKg or portionTierId (catch-weight)`,
        "MISSING_WEIGHT",
      );
    }

    const min = item.minWeightKg ?? 0.2;
    const max = item.maxWeightKg ?? 5;
    if (weightKg < min || weightKg > max) {
      throw new PricingError(
        `${item.name} weight must be between ${min} and ${max} kg`,
        "INVALID_WEIGHT",
      );
    }

    // Round to 2 decimal kg for display math, charge whole KES
    const kg = Math.round(weightKg * 100) / 100;
    const lineTotalKes = Math.max(1, Math.round(rate * kg));

    return {
      id: newLineId(),
      menuItemId: item.id,
      name: item.name,
      pricingMode: "catch-weight",
      quantity: 1,
      weightKg: kg,
      portionTierId,
      portionLabel,
      unitPriceKes: rate,
      lineTotalKes,
      taxCategory,
      station: item.station,
      note,
    };
  }

  // fixed
  const qty = input.quantity ?? 1;
  if (!Number.isFinite(qty) || qty < 1 || qty > 99 || !Number.isInteger(qty)) {
    throw new PricingError(
      `Invalid quantity for ${item.name} (use integer 1–99)`,
      "INVALID_QTY",
    );
  }
  const unit = item.priceKes!;
  return {
    id: newLineId(),
    menuItemId: item.id,
    name: item.name,
    pricingMode: "fixed",
    quantity: qty,
    unitPriceKes: unit,
    lineTotalKes: unit * qty,
    taxCategory,
    station: item.station,
    note,
  };
}

export function priceBillLines(inputs: BillLineInput[]): {
  lines: BillLine[];
  subtotalKes: number;
  totalKes: number;
} {
  if (!inputs?.length) {
    throw new PricingError("Bill must include at least one line item", "EMPTY_BILL");
  }

  const lines = inputs.map(priceBillLine);
  const subtotalKes = lines.reduce((sum, l) => sum + l.lineTotalKes, 0);
  if (subtotalKes < 1) {
    throw new PricingError("Bill total must be at least KES 1", "EMPTY_BILL");
  }

  return {
    lines,
    subtotalKes,
    // Service charge / tip hooks can adjust total later
    totalKes: subtotalKes,
  };
}

/** Human-readable line summary for STK TransactionDesc / receipts */
export function summarizeBillLines(lines: BillLine[], maxLen = 48): string {
  if (lines.length === 0) return "Bill";
  if (lines.length === 1) {
    const l = lines[0];
    if (l.pricingMode === "catch-weight" && l.weightKg != null) {
      return `${l.name} ${l.weightKg}kg`.slice(0, maxLen);
    }
    return `${l.quantity}× ${l.name}`.slice(0, maxLen);
  }
  return `${lines.length} items`.slice(0, maxLen);
}

export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString("en-KE")}`;
}
