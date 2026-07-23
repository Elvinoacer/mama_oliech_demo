/**
 * POST /api/mpesa/callback
 * Safaricom Daraja result notification URL.
 *
 * TODO:
 * - Whitelist Safaricom IPs or validate payload integrity as per Daraja docs.
 * - Map CheckoutRequestID → open bill; mark paid.
 * - On success, call submitFiscalInvoice (eTIMS) and kitchen/receipt print job.
 * - Respond quickly with expected Daraja ACK shape.
 */

import { NextResponse } from "next/server";
import { handleStkCallback } from "@/lib/integrations/mpesa";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid body" });
  }

  await handleStkCallback(payload);

  // TODO: return provider-specific success envelope
  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted (stub)" });
}
