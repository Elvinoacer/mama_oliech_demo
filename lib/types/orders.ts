/**
 * Order / payment / tax types for FUTURE ops integrations.
 * Not used by the marketing site today — skeletons for when POS layer lands.
 *
 * Ops doc references:
 * - Safaricom Daraja STK Push
 * - KRA eTIMS VSCU fiscal invoices
 * - Catch-weight fish scan at checkout
 *
 * TODO:
 * - Align fields with chosen POS vendor export schema.
 * - Never expose merchant secrets or raw callback payloads to the client.
 */

export type PaymentMethod = "mpesa-stk" | "mpesa-till-manual" | "cash" | "card";

export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancelled"
  | "queued-offline";

export interface StkPushRequest {
  phone: string; // 2547XXXXXXXX
  amountKes: number;
  accountReference: string; // table #, order id, etc.
  transactionDesc: string;
  branchSlug: string;
}

export interface StkPushResult {
  checkoutRequestId: string;
  merchantRequestId: string;
  status: PaymentStatus;
  /** Raw provider message for logging only */
  providerMessage?: string;
}

export interface EtimsInvoicePayload {
  orderId: string;
  branchSlug: string;
  lineItems: Array<{
    name: string;
    quantity: number;
    unitPriceKes: number;
    taxCode?: string;
  }>;
  paymentMethod: PaymentMethod;
  customerPin?: string; // optional buyer PIN for B2B
}

export interface EtimsInvoiceResult {
  fiscalInvoiceNumber: string;
  qrPayload: string;
  signedAt: string;
  /** If offline, queue until connectivity restores */
  queued?: boolean;
}
