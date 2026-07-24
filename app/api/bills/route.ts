/**
 * POST /api/bills — create a table bill from menu line items.
 *
 * Amounts are computed server-side from the menu catalog.
 * Client never supplies totalKes.
 */

import { NextResponse } from "next/server";
import {
  createBillFromRequest,
  PricingError,
  toPublicBill,
} from "@/lib/payments";
import type { BillLineInput, CreateBillRequest } from "@/lib/types/orders";

export async function POST(request: Request) {
  let body: Partial<CreateBillRequest>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.tableLabel || !Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json(
      { error: "tableLabel and non-empty lines[] required" },
      { status: 400 },
    );
  }

  const lines = body.lines as BillLineInput[];
  for (const line of lines) {
    if (!line?.menuItemId) {
      return NextResponse.json(
        { error: "Each line requires menuItemId" },
        { status: 400 },
      );
    }
  }

  try {
    const bill = createBillFromRequest({
      tableLabel: String(body.tableLabel),
      branchSlug: body.branchSlug ? String(body.branchSlug) : "hurlingham",
      lines,
    });
    return NextResponse.json(toPublicBill(bill), { status: 201 });
  } catch (err) {
    if (err instanceof PricingError) {
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status: 400 },
      );
    }
    console.error("[api/bills]", err);
    return NextResponse.json({ error: "Failed to create bill" }, { status: 500 });
  }
}
