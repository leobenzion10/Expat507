import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail, rateLimit } from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "Expat507 <noreply@expat507.com>";

export async function GET(req: NextRequest) {
  if (!rateLimit(req, "test-email", 3, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many requests, please try again shortly" }, { status: 429 });
  }

  const url = new URL(req.url);
  const to = url.searchParams.get("to") || "";

  if (!isValidEmail(to)) {
    return NextResponse.json({ error: "Pass a valid email: /api/test-email?to=you@example.com" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY is not configured" }, { status: 500 });
  }

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject: "Expat507 — correo de prueba",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #0A1628;">Resend está funcionando ✅</h2>
        <p style="color: #374151;">Este es un correo de prueba enviado desde <strong>/api/test-email</strong> en ${new Date().toISOString()}.</p>
        <p style="color: #9CA3AF; font-size: 12px;">Remitente configurado: ${EMAIL_FROM}</p>
      </div>
    `,
  });

  if (error) {
    console.error("[/api/test-email] Resend error:", error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data?.id, from: EMAIL_FROM, to });
}
