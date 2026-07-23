/**
 * POST /api/catering — group / event enquiry (skeleton).
 *
 * TODO:
 * - Fields: date, guestCount, branch, budget?, menuPreferences, contact.
 * - Notify flagship manager (Lilian team) + log CRM row later.
 * - Auto-reply WhatsApp/email template.
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.info("[catering] stub received", body);

  return NextResponse.json(
    {
      ok: false,
      message: "Catering API not implemented.",
    },
    { status: 501 },
  );
}
