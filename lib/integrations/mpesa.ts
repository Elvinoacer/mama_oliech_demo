/**
 * Safaricom Daraja — Lipa Na M-Pesa Online (STK Push) client stub.
 * Ops doc: reverse payment flow so waitstaff trigger PIN prompt on guest phone.
 *
 * TODO (do not implement half-secure demos):
 * - Store Consumer Key/Secret, Passkey, Shortcode in server env only.
 * - Implement OAuth token fetch + cache (Daraja auth endpoint).
 * - POST /mpesa/stkpush/v1/processrequest with amount, phone, callback URL.
 * - Verify callback signatures / result codes; update order payment status.
 * - Support offline queue if network drops mid-service.
 * - Never call this from Client Components — server actions / route handlers only.
 *
 * Env vars to add later:
 *   MPESA_CONSUMER_KEY
 *   MPESA_CONSUMER_SECRET
 *   MPESA_SHORTCODE
 *   MPESA_PASSKEY
 *   MPESA_CALLBACK_URL
 */

import type { StkPushRequest, StkPushResult } from "@/lib/types/orders";
import { FEATURES } from "@/lib/constants";

export async function initiateStkPush(
  _request: StkPushRequest,
): Promise<StkPushResult> {
  if (!FEATURES.enableMpesaStk) {
    // Skeleton response so UI/API can be wired without live credentials
    return {
      checkoutRequestId: "DEMO-CHECKOUT",
      merchantRequestId: "DEMO-MERCHANT",
      status: "pending",
      providerMessage:
        "M-Pesa STK disabled (FEATURES.enableMpesaStk). Implement Daraja client.",
    };
  }

  // TODO: real Daraja integration
  throw new Error("initiateStkPush: not implemented");
}

export async function handleStkCallback(
  _payload: unknown,
): Promise<{ ok: boolean }> {
  // TODO: parse Safaricom callback body, mark bill paid, trigger eTIMS invoice
  return { ok: false };
}
