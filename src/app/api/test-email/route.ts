import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/security";
import { isAdminAuthenticated } from "@/lib/admin/auth";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "Expat507 <noreply@expat507.com>";
const OPERATOR_EMAIL = process.env.OPERATOR_EMAIL;

// Diagnostic-only route to confirm Resend is wired up correctly. It must never be usable to
// relay mail to an arbitrary third party: only the authenticated admin can call it, and it
// only ever sends to the site's own operator address, never to a caller-supplied recipient.
export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!rateLimit(req, "test-email", 3, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many requests, please try again shortly" }, { status: 429 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY is not configured" }, { status: 500 });
  }

  if (!OPERATOR_EMAIL) {
    return NextResponse.json({ error: "OPERATOR_EMAIL is not configured" }, { status: 500 });
  }

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: OPERATOR_EMAIL,
    subject: "Expat507 — correo de prueba",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #0B1A17;">Resend está funcionando ✅</h2>
        <p style="color: #374151;">Este es un correo de prueba enviado desde <strong>/api/test-email</strong> en ${new Date().toISOString()}.</p>
        <p style="color: #9CA3AF; font-size: 12px;">Remitente configurado: ${EMAIL_FROM}</p>
      </div>
    `,
  });

  if (error) {
    console.error("[/api/test-email] Resend error:", error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data?.id, from: EMAIL_FROM, to: OPERATOR_EMAIL });
}
