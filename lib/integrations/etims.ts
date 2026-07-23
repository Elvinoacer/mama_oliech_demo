/**
 * KRA eTIMS / VSCU tax invoice client stub.
 * Ops doc: every completed sale must receive a fiscal invoice # + QR on receipt.
 *
 * TODO:
 * - Register device / VSCU credentials with KRA sandbox then production.
 * - On payment success, package line items + tax codes and transmit.
 * - Persist signed invoice; print QR on thermal receipt (POS layer).
 * - Offline: queue invoices and flush when connectivity returns.
 * - Align item tax mapping with KRA item codes for fish/greens/alcohol.
 *
 * Env vars (later):
 *   ETIMS_BASE_URL
 *   ETIMS_DEVICE_ID
 *   ETIMS_API_KEY
 */

import type { EtimsInvoicePayload, EtimsInvoiceResult } from "@/lib/types/orders";
import { FEATURES } from "@/lib/constants";

export async function submitFiscalInvoice(
  _payload: EtimsInvoicePayload,
): Promise<EtimsInvoiceResult> {
  if (!FEATURES.enableEtims) {
    return {
      fiscalInvoiceNumber: "DEMO-ETIMS-0000",
      qrPayload: "https://example.com/etims-demo",
      signedAt: new Date().toISOString(),
      queued: true,
    };
  }

  // TODO: real VSCU call
  throw new Error("submitFiscalInvoice: not implemented");
}
