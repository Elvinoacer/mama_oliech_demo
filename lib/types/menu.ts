/**
 * Menu domain types.
 *
 * Pricing attributes drive the table bill / M-Pesa payment flow.
 * Marketing pages may still hide volatile prices; table QR + bill APIs use them.
 */

export type MenuCategoryId =
  | "fish"
  | "heritage"
  | "greens-sides"
  | "group-catering"
  | "drinks";

export type KitchenStation = "fry" | "starch-greens" | "bar" | "pass";

/**
 * How an item is priced when added to a bill.
 * - fixed: unit price × quantity
 * - catch-weight: pricePerKgKes × weightKg (whole tilapia)
 * - enquiry: not STK-payable from QR (catering packages)
 */
export type PricingMode = "fixed" | "catch-weight" | "enquiry";

/** Rough tax buckets for eTIMS line mapping later */
export type TaxCategory =
  | "standard-food"
  | "alcohol"
  | "non-alcoholic"
  | "catering";

/** Kitchen portion preset for catch-weight fish (label → nominal kg) */
export interface PortionTier {
  id: string;
  label: string;
  /** Nominal weight used for pricing when staff pick this tier */
  weightKg: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  /** Optional marketing badge, e.g. "Signature", "Zuckerberg Special" */
  badge?: string;
  /**
   * Food photo — Unsplash demo URLs or /public paths.
   * Prefer real kitchen photography in production.
   */
  imageSrc?: string;
  imageAlt?: string;

  /**
   * Pricing mode. Defaults:
   * - catch-weight when isCatchWeight / pricePerKgKes
   * - enquiry when no payable price
   * - fixed when priceKes is set
   */
  pricingMode?: PricingMode;
  /** Fixed unit price in KES (sides, heritage dishes, drinks) */
  priceKes?: number;
  /** Catch-weight rate in KES per kg (whole fish) */
  pricePerKgKes?: number;
  /** Default weight suggestion for catch-weight UI */
  defaultWeightKg?: number;
  minWeightKg?: number;
  maxWeightKg?: number;
  /** Quick portion buttons for fish */
  portionTiers?: PortionTier[];
  taxCategory?: TaxCategory;
  /**
   * Whether guests can add this item to a QR table bill and pay via M-Pesa.
   * false for enquiry-only catering packages.
   */
  payable?: boolean;

  /** Catch-weight items (whole tilapia) need scale/barcode flow in POS later */
  isCatchWeight?: boolean;
  available?: boolean;
  station?: KitchenStation;
}

export interface MenuCategory {
  id: MenuCategoryId;
  title: string;
  intro?: string;
  items: MenuItem[];
}

export interface BranchMenu {
  branchSlug: string;
  pdfPath?: string;
  categories: MenuCategory[];
  lastUpdated?: string;
}
