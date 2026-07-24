/**
 * POST /api/mpesa/callback
 * Safaricom Daraja STK result notification URL.
 *
 * Must be publicly reachable (ngrok / production domain).
 * Keep this handler thin — parsing lives in lib/integrations/mpesa.ts.
 *
 * TODO (later):
 * - Optional Safaricom IP allowlist
 * - Map CheckoutRequestID → open bill once persistence exists
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

  try {
    const result = await handleStkCallback(payload);
    // Daraja expects a quick 200 ACK; ResultCode 0 = we accepted the notification
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: result.ok
        ? "Accepted"
        : "Accepted (payment not successful or incomplete payload)",
    });
  } catch (err) {
    console.error("[api/mpesa/callback]", err);
    // Still ACK so Safaricom does not hammer retries for app bugs
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Accepted with processing error (logged)",
    });
  }
}
