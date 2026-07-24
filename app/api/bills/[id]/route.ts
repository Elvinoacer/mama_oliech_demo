/**
 * GET /api/bills/[id] — fetch bill status (for UI polling after STK).
 */

import { NextResponse } from "next/server";
import { getBill, toPublicBill } from "@/lib/payments";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const bill = getBill(id);
  if (!bill) {
    return NextResponse.json({ error: "Bill not found" }, { status: 404 });
  }
  return NextResponse.json(toPublicBill(bill));
}
