/**
 * Order / bill / payment / tax types for table ops + M-Pesa + eTIMS.
 *
 * Payments are bill-based: line items are resolved against the menu catalog,
 * totals are computed server-side, and STK uses that total only.
 *
 * Ops doc references:
 * - Safaricom Daraja STK Push
 * - KRA eTIMS VSCU fiscal invoices
 * - Catch-weight fish at checkout
 */

import type {
  KitchenStation,
  PricingMode,
  TaxCategory,
} from "@/lib/types/menu";

export type PaymentMethod = "mpesa-stk" | "mpesa-till-manual" | "cash" | "card";

export type PaymentStatus =
  | "draft"
  | "open"
  | "pending"
  | "completed"
  | "failed"
  | "cancelled"
  | "queued-offline";

/** Client → API: one line to add when creating a bill */
export interface BillLineInput {
  menuItemId: string;
  /** Fixed items: how many units (default 1) */
  quantity?: number;
  /** Catch-weight: exact kg from scale / staff entry */
  weightKg?: number;
  /** Catch-weight: optional portion tier id from menu item */
  portionTierId?: string;
  note?: string;
}

/** Server-resolved bill line (amounts never trusted from client) */
export interface BillLine {
  id: string;
  menuItemId: string;
  name: string;
  pricingMode: PricingMode;
  quantity: number;
  weightKg?: number;
  portionTierId?: string;
  portionLabel?: string;
  /** Unit price (KES) or per-kg rate for catch-weight */
  unitPriceKes: number;
  lineTotalKes: number;
  taxCategory: TaxCategory;
  station?: KitchenStation;
  note?: string;
}

export interface Bill {
  id: string;
  tableLabel: string;
  branchSlug: string;
  lines: BillLine[];
  /** Sum of line totals (KES, integer) */
  subtotalKes: number;
  /** Amount charged to M-Pesa (same as subtotal for now; room for service charge later) */
  totalKes: number;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod;
  phone?: string;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  mpesaReceiptNumber?: string;
  providerMessage?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  etims?: EtimsInvoiceResult;
}

export interface CreateBillRequest {
  tableLabel: string;
  branchSlug: string;
  lines: BillLineInput[];
}

export interface PayBillRequest {
  phone: string;
}

export interface StkPushRequest {
  phone: string; // 2547XXXXXXXX
  amountKes: number;
  accountReference: string; // table #, bill id, etc.
  transactionDesc: string;
  branchSlug: string;
  /** Optional correlation to in-app bill */
  billId?: string;
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
