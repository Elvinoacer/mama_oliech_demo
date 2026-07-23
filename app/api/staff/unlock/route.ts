import { NextResponse } from "next/server";
import { STAFF_COOKIE } from "@/lib/constants";

export async function POST(request: Request) {
  const expected = process.env.STAFF_PORTAL_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, message: "Staff password not configured." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid body" }, { status: 400 });
  }

  if (body.password !== expected) {
    return NextResponse.json({ ok: false, message: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return res;
}
