/**
 * POST /api/catering — group / event enquiry.
 */

import { NextResponse } from "next/server";

type CateringBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  date?: unknown;
  guestCount?: unknown;
  branch?: unknown;
  message?: unknown;
};

function asString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let body: CateringBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const name = asString(body.name);
  const phone = asString(body.phone);
  const email = asString(body.email);
  const date = asString(body.date);
  const guestCount = asString(body.guestCount);
  const branch = asString(body.branch);
  const message = asString(body.message);

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!phone || phone.length < 7) {
    return NextResponse.json({ ok: false, message: "Phone is required." }, { status: 400 });
  }
  if (!date) {
    return NextResponse.json({ ok: false, message: "Event date is required." }, { status: 400 });
  }
  if (!guestCount || Number(guestCount) < 1) {
    return NextResponse.json({ ok: false, message: "Guest count is required." }, { status: 400 });
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ ok: false, message: "Please add event details." }, { status: 400 });
  }

  const payload = {
    type: "catering",
    name,
    phone,
    email: email || null,
    date,
    guestCount: Number(guestCount),
    branch: branch || null,
    message,
    receivedAt: new Date().toISOString(),
  };

  console.info("[catering]", JSON.stringify(payload));

  return NextResponse.json({
    ok: true,
    message:
      "Thanks — your catering enquiry was received. We’ll follow up soon. (Demo: logged on server until email is wired.)",
  });
}
