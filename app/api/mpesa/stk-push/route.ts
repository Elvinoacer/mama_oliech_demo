/**
 * POST /api/mpesa/stk-push
 * Triggers Lipa Na M-Pesa Online (STK Push) via lib/integrations/mpesa.
 *
 * Security TODO:
 * - Authenticate caller (POS device token / staff session) — never public.
 * - Validate amount + phone format (254…).
 * - Idempotency key per bill to avoid double prompts.
 */

import { NextResponse } from "next/server";
import { initiateStkPush } from "@/lib/integrations/mpesa";
import type { StkPushRequest } from "@/lib/types/orders";

export async function POST(request: Request) {
  let body: Partial<StkPushRequest>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Minimal shape check — expand with zod later
  if (!body.phone || !body.amountKes || !body.accountReference) {
    return NextResponse.json(
      { error: "phone, amountKes, accountReference required" },
      { status: 400 },
    );
  }

  const result = await initiateStkPush({
    phone: body.phone,
    amountKes: body.amountKes,
    accountReference: body.accountReference,
    transactionDesc: body.transactionDesc ?? "Mama Oliech bill",
    branchSlug: body.branchSlug ?? "hurlingham",
  });

  return NextResponse.json(result);
}
