import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/security";
import { ADMIN_COOKIE_NAME, adminToken } from "@/lib/admin/auth";

export async function POST(req: NextRequest) {
  if (!rateLimit(req, "admin-login", 8, 60_000)) {
    return NextResponse.json({ error: "Too many attempts, please try again shortly" }, { status: 429 });
  }

  const expected = adminToken();
  if (!expected) {
    return NextResponse.json({ error: "Admin login is not configured" }, { status: 500 });
  }

  const body = await req.json();
  const password = typeof body.password === "string" ? body.password : "";

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
