/**
 * POST /api/mpesa/stk-push
 * Staff-only low-level STK Push (manual amount). Prefer bill-based payment:
 *   POST /api/bills → POST /api/bills/[id]/pay
 *
 * Auth: same staff cookie as /staff/* when STAFF_PORTAL_PASSWORD is set.
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { initiateStkPush } from "@/lib/integrations/mpesa";
import type { StkPushRequest } from "@/lib/types/orders";
import { STAFF_COOKIE } from "@/lib/constants";

export async function POST(request: Request) {
  const staffPassword = process.env.STAFF_PORTAL_PASSWORD;
  if (staffPassword) {
    const jar = await cookies();
    const unlocked = jar.get(STAFF_COOKIE)?.value === "1";
    if (!unlocked) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: Partial<StkPushRequest>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.phone || body.amountKes == null || !body.accountReference) {
    return NextResponse.json(
      {
        error:
          "phone, amountKes, accountReference required — or use POST /api/bills + /pay for menu-priced bills",
      },
      { status: 400 },
    );
  }

  const amountKes = Number(body.amountKes);
  if (!Number.isFinite(amountKes) || amountKes < 1) {
    return NextResponse.json(
      { error: "amountKes must be a positive number" },
      { status: 400 },
    );
  }

  try {
    const result = await initiateStkPush({
      phone: String(body.phone),
      amountKes,
      accountReference: String(body.accountReference),
      transactionDesc: body.transactionDesc
        ? String(body.transactionDesc)
        : "Mama Oliech bill",
      branchSlug: body.branchSlug ? String(body.branchSlug) : "hurlingham",
      billId: body.billId ? String(body.billId) : undefined,
    });

    const httpStatus = result.status === "failed" ? 502 : 200;
    return NextResponse.json(result, { status: httpStatus });
  } catch (err) {
    const message = err instanceof Error ? err.message : "STK push failed";
    console.error("[api/mpesa/stk-push]", message);
    return NextResponse.json(
      {
        checkoutRequestId: "",
        merchantRequestId: "",
        status: "failed",
        providerMessage: message,
      },
      { status: 500 },
    );
  }
}
