/**
 * POST /api/contact
 * Validates payload, honeypot-friendly client, logs enquiry.
 * Wire RESEND_API_KEY + CONTACT_TO_EMAIL for real delivery.
 */

import { NextResponse } from "next/server";

type ContactBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  branch?: unknown;
  message?: unknown;
};

function asString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const name = asString(body.name);
  const phone = asString(body.phone);
  const email = asString(body.email);
  const branch = asString(body.branch);
  const message = asString(body.message);

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!phone || phone.length < 7) {
    return NextResponse.json({ ok: false, message: "Phone is required." }, { status: 400 });
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ ok: false, message: "Message is required." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Email looks invalid." }, { status: 400 });
  }

  const payload = {
    type: "contact",
    name,
    phone,
    email: email || null,
    branch: branch || null,
    message,
    receivedAt: new Date().toISOString(),
  };

  // TODO: send via Resend/SES when CONTACT_TO_EMAIL + API key are set
  console.info("[contact]", JSON.stringify(payload));

  return NextResponse.json({
    ok: true,
    message:
      "Thanks — your message was received. We’ll follow up soon. (Demo: stored in server logs until email is wired.)",
  });
}
