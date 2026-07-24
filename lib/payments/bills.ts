/**
 * In-memory bill store for the demo / QR table payment flow.
 *
 * Production would replace this with a POS database. Module-level Map is
 * enough for single-process Next.js demo (sandbox STK + local testing).
 *
 * Bills are the source of truth for amount charged via M-Pesa — STK never
 * accepts a free-form amount from the client for guest payment.
 */

import type {
  Bill,
  BillLineInput,
  CreateBillRequest,
  EtimsInvoiceResult,
  PaymentStatus,
} from "@/lib/types/orders";
import { priceBillLines, PricingError } from "@/lib/payments/pricing";

const bills = new Map<string, Bill>();
/** checkoutRequestId → billId for STK callback correlation */
const checkoutIndex = new Map<string, string>();

function newBillId(): string {
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 8);
  return `bill_${ts}_${rnd}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

export function createBill(request: CreateBillRequest): Bill {
  const tableLabel = request.tableLabel?.trim();
  if (!tableLabel || tableLabel.length > 40) {
    throw new PricingError(
      "tableLabel is required (max 40 chars)",
      "EMPTY_BILL",
    );
  }

  const branchSlug = (request.branchSlug || "hurlingham").trim().toLowerCase();
  const priced = priceBillLines(request.lines as BillLineInput[]);
  const ts = nowIso();

  const bill: Bill = {
    id: newBillId(),
    tableLabel,
    branchSlug,
    lines: priced.lines,
    subtotalKes: priced.subtotalKes,
    totalKes: priced.totalKes,
    status: "open",
    createdAt: ts,
    updatedAt: ts,
  };

  bills.set(bill.id, bill);
  return bill;
}

export function getBill(id: string): Bill | undefined {
  return bills.get(id);
}

export function listBills(): Bill[] {
  return Array.from(bills.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function updateBill(
  id: string,
  patch: Partial<
    Pick<
      Bill,
      | "status"
      | "paymentMethod"
      | "phone"
      | "checkoutRequestId"
      | "merchantRequestId"
      | "mpesaReceiptNumber"
      | "providerMessage"
      | "paidAt"
      | "etims"
    >
  >,
): Bill | undefined {
  const existing = bills.get(id);
  if (!existing) return undefined;

  const next: Bill = {
    ...existing,
    ...patch,
    updatedAt: nowIso(),
  };
  bills.set(id, next);

  if (patch.checkoutRequestId) {
    checkoutIndex.set(patch.checkoutRequestId, id);
  }

  return next;
}

export function getBillByCheckoutRequestId(
  checkoutRequestId: string,
): Bill | undefined {
  const id = checkoutIndex.get(checkoutRequestId);
  if (!id) return undefined;
  return bills.get(id);
}

export function markBillPaymentPending(
  billId: string,
  data: {
    phone: string;
    checkoutRequestId: string;
    merchantRequestId: string;
    providerMessage?: string;
  },
): Bill | undefined {
  return updateBill(billId, {
    status: "pending",
    paymentMethod: "mpesa-stk",
    phone: data.phone,
    checkoutRequestId: data.checkoutRequestId,
    merchantRequestId: data.merchantRequestId,
    providerMessage: data.providerMessage,
  });
}

export function markBillPaymentFailed(
  billId: string,
  providerMessage?: string,
): Bill | undefined {
  return updateBill(billId, {
    status: "failed",
    providerMessage,
  });
}

export function markBillPaid(
  billId: string,
  data: {
    mpesaReceiptNumber?: string;
    providerMessage?: string;
    etims?: EtimsInvoiceResult;
  },
): Bill | undefined {
  return updateBill(billId, {
    status: "completed",
    mpesaReceiptNumber: data.mpesaReceiptNumber,
    providerMessage: data.providerMessage,
    paidAt: nowIso(),
    etims: data.etims,
  });
}

export function canPayBill(bill: Bill): {
  ok: boolean;
  reason?: string;
} {
  if (bill.status === "completed") {
    return { ok: false, reason: "Bill is already paid" };
  }
  if (bill.status === "pending") {
    return {
      ok: false,
      reason: "Payment already in progress — check phone or wait for callback",
    };
  }
  if (bill.status === "cancelled") {
    return { ok: false, reason: "Bill was cancelled" };
  }
  if (!bill.lines.length || bill.totalKes < 1) {
    return { ok: false, reason: "Bill has no payable total" };
  }
  return { ok: true };
}

/** Public-safe bill view (no internal-only fields beyond what UI needs) */
export function toPublicBill(bill: Bill) {
  return {
    id: bill.id,
    tableLabel: bill.tableLabel,
    branchSlug: bill.branchSlug,
    lines: bill.lines,
    subtotalKes: bill.subtotalKes,
    totalKes: bill.totalKes,
    status: bill.status as PaymentStatus,
    paymentMethod: bill.paymentMethod,
    phone: bill.phone
      ? `${bill.phone.slice(0, 6)}****${bill.phone.slice(-2)}`
      : undefined,
    checkoutRequestId: bill.checkoutRequestId,
    mpesaReceiptNumber: bill.mpesaReceiptNumber,
    providerMessage: bill.providerMessage,
    createdAt: bill.createdAt,
    updatedAt: bill.updatedAt,
    paidAt: bill.paidAt,
    etims: bill.etims
      ? {
          fiscalInvoiceNumber: bill.etims.fiscalInvoiceNumber,
          qrPayload: bill.etims.qrPayload,
          signedAt: bill.etims.signedAt,
          queued: bill.etims.queued,
        }
      : undefined,
  };
}
