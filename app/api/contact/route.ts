/**
 * POST /api/contact — marketing contact form endpoint (skeleton).
 *
 * TODO:
 * - Validate body (zod): name, phone, email, message, branch.
 * - Send via Resend / SES / SMTP — never log PII in plain text long-term.
 * - Rate limit + honeypot.
 * - Return 202 on queue success.
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Skeleton: accept JSON but do not process
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // TODO: implement delivery
  console.info("[contact] stub received", body);

  return NextResponse.json(
    {
      ok: false,
      message: "Contact API not implemented — wire email/CRM next.",
    },
    { status: 501 },
  );
}
