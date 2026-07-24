/**
 * POST /api/bills/[id]/pay — initiate M-Pesa STK for an existing bill.
 *
 * Body: { phone }
 * Amount is always bill.totalKes from the server-side priced bill.
 */

import { NextResponse } from "next/server";
import {
  getBill,
  payBillWithMpesa,
  PaymentServiceError,
  toPublicBill,
} from "@/lib/payments";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const existing = getBill(id);
  if (!existing) {
    return NextResponse.json({ error: "Bill not found" }, { status: 404 });
  }

  let body: { phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.phone || String(body.phone).trim().length < 9) {
    return NextResponse.json(
      { error: "phone required (e.g. 07XXXXXXXX or 2547XXXXXXXX)" },
      { status: 400 },
    );
  }

  try {
    const { bill, stk } = await payBillWithMpesa(id, String(body.phone));
    const httpStatus =
      stk.status === "failed" ? 502 : stk.status === "completed" ? 200 : 202;

    return NextResponse.json(
      {
        bill: toPublicBill(bill),
        payment: {
          checkoutRequestId: stk.checkoutRequestId,
          merchantRequestId: stk.merchantRequestId,
          status: stk.status,
          providerMessage: stk.providerMessage,
        },
      },
      { status: httpStatus },
    );
  } catch (err) {
    if (err instanceof PaymentServiceError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    const message = err instanceof Error ? err.message : "Payment failed";
    console.error("[api/bills/pay]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
