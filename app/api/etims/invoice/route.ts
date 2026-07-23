/**
 * POST /api/etims/invoice
 * Fiscalize a completed sale via KRA eTIMS VSCU (skeleton).
 *
 * TODO:
 * - Only callable from trusted POS backend after payment success.
 * - Queue when offline; retry with backoff.
 * - Persist fiscalInvoiceNumber on order record.
 */

import { NextResponse } from "next/server";
import { submitFiscalInvoice } from "@/lib/integrations/etims";
import type { EtimsInvoicePayload } from "@/lib/types/orders";

export async function POST(request: Request) {
  let body: EtimsInvoicePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // TODO: validate lineItems, auth
  const result = await submitFiscalInvoice(body);
  return NextResponse.json(result);
}
