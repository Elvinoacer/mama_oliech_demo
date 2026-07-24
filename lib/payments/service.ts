/**
 * Payment service — orchestrates bill creation, M-Pesa STK, and eTIMS.
 *
 * Correct flow (ops doc reverse payment):
 * 1. Build bill from menu line items → server prices every line
 * 2. Guest/staff enters phone → STK amount = bill.totalKes only
 * 3. Safaricom callback → mark bill paid → submit fiscal invoice stub
 */

import { initiateStkPush } from "@/lib/integrations/mpesa";
import { submitFiscalInvoice } from "@/lib/integrations/etims";
import {
  canPayBill,
  createBill,
  getBill,
  getBillByCheckoutRequestId,
  markBillPaid,
  markBillPaymentFailed,
  markBillPaymentPending,
  toPublicBill,
} from "@/lib/payments/bills";
import { summarizeBillLines } from "@/lib/payments/pricing";
import type {
  CreateBillRequest,
  Bill,
  StkPushResult,
} from "@/lib/types/orders";

export { createBill, getBill, toPublicBill };

export async function payBillWithMpesa(
  billId: string,
  phone: string,
): Promise<{ bill: Bill; stk: StkPushResult }> {
  const bill = getBill(billId);
  if (!bill) {
    throw new PaymentServiceError("Bill not found", 404);
  }

  const gate = canPayBill(bill);
  if (!gate.ok) {
    throw new PaymentServiceError(gate.reason ?? "Cannot pay bill", 409);
  }

  // Account reference: short table label (Daraja ~12 char limit handled in mpesa.ts)
  const accountReference = bill.tableLabel.replace(/\s+/g, "").slice(0, 12) || bill.id.slice(0, 12);
  const transactionDesc = summarizeBillLines(bill.lines, 13);

  const stk = await initiateStkPush({
    phone,
    amountKes: bill.totalKes,
    accountReference,
    transactionDesc,
    branchSlug: bill.branchSlug,
    billId: bill.id,
  });

  if (stk.status === "failed") {
    const failed = markBillPaymentFailed(bill.id, stk.providerMessage);
    return { bill: failed ?? bill, stk };
  }

  // Demo mode returns DEMO-CHECKOUT — still mark pending so UI can poll
  const pending = markBillPaymentPending(bill.id, {
    phone,
    checkoutRequestId: stk.checkoutRequestId || `pending_${bill.id}`,
    merchantRequestId: stk.merchantRequestId || "",
    providerMessage: stk.providerMessage,
  });

  // When M-Pesa is disabled, auto-complete with demo receipt + eTIMS so the
  // full happy path is demonstrable without Daraja credentials.
  if (stk.checkoutRequestId === "DEMO-CHECKOUT") {
    const etims = await submitFiscalInvoice({
      orderId: bill.id,
      branchSlug: bill.branchSlug,
      lineItems: bill.lines.map((l) => ({
        name: l.name,
        quantity:
          l.pricingMode === "catch-weight" ? l.weightKg ?? 1 : l.quantity,
        unitPriceKes: l.unitPriceKes,
        taxCode: l.taxCategory,
      })),
      paymentMethod: "mpesa-stk",
    });

    const paid = markBillPaid(bill.id, {
      mpesaReceiptNumber: "DEMO-RECEIPT",
      providerMessage: stk.providerMessage,
      etims,
    });

    return {
      bill: paid ?? pending ?? bill,
      stk: { ...stk, status: "completed" },
    };
  }

  return { bill: pending ?? bill, stk };
}

/**
 * Called from M-Pesa callback when Safaricom confirms (or fails) a payment.
 */
export async function settleBillFromStkCallback(summary: {
  checkoutRequestId?: string;
  resultCode?: number;
  resultDesc?: string;
  amount?: string | number;
  mpesaReceiptNumber?: string | number;
  phoneNumber?: string | number;
}): Promise<{ ok: boolean; billId?: string }> {
  const checkoutId = summary.checkoutRequestId;
  if (!checkoutId) return { ok: false };

  const bill = getBillByCheckoutRequestId(checkoutId);
  if (!bill) {
    console.warn("[payments] no bill for CheckoutRequestID", checkoutId);
    return { ok: false };
  }

  if (summary.resultCode !== 0) {
    markBillPaymentFailed(bill.id, summary.resultDesc);
    return { ok: false, billId: bill.id };
  }

  // Optional amount sanity check (log only — Safaricom is source of truth)
  const paidAmount = Number(summary.amount);
  if (Number.isFinite(paidAmount) && paidAmount !== bill.totalKes) {
    console.warn("[payments] amount mismatch", {
      billId: bill.id,
      expected: bill.totalKes,
      paid: paidAmount,
    });
  }

  const etims = await submitFiscalInvoice({
    orderId: bill.id,
    branchSlug: bill.branchSlug,
    lineItems: bill.lines.map((l) => ({
      name: l.name,
      quantity: l.pricingMode === "catch-weight" ? l.weightKg ?? 1 : l.quantity,
      unitPriceKes: l.unitPriceKes,
      taxCode: l.taxCategory,
    })),
    paymentMethod: "mpesa-stk",
  });

  markBillPaid(bill.id, {
    mpesaReceiptNumber: summary.mpesaReceiptNumber
      ? String(summary.mpesaReceiptNumber)
      : undefined,
    providerMessage: summary.resultDesc,
    etims,
  });

  return { ok: true, billId: bill.id };
}

export class PaymentServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "PaymentServiceError";
  }
}

export function createBillFromRequest(body: CreateBillRequest): Bill {
  return createBill(body);
}
