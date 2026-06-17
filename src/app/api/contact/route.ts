import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { clampString, escapeHtml, isValidEmail, rateLimit } from "@/lib/security";
import { SITE_URL } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);
const OPERATOR_EMAIL = process.env.OPERATOR_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL || "Expat507 <noreply@expat507.com>";

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(req, "contact", 5, 60_000)) {
      return NextResponse.json({ error: "Too many requests, please try again shortly" }, { status: 429 });
    }

    const body = await req.json();
    const name = clampString(body.name, 200);
    const email = clampString(body.email, 254);
    const subject = clampString(body.subject, 200);
    const message = clampString(body.message, 4000);

    if (!name || !subject || !message || !isValidEmail(email)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      subject: escapeHtml(subject),
      message: escapeHtml(message),
    };

    const results = await Promise.allSettled([
      ...(OPERATOR_EMAIL
        ? [
            resend.emails.send({
              from: FROM_EMAIL,
              to: OPERATOR_EMAIL,
              replyTo: email,
              subject: `Contacto: ${subject}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                  <h2 style="color: #0A1628;">Nuevo mensaje de contacto</h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold; width: 120px;">Nombre</td><td style="padding: 8px;">${safe.name}</td></tr>
                    <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
                    <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Asunto</td><td style="padding: 8px;">${safe.subject}</td></tr>
                  </table>
                  <div style="background: #F4F6F9; border-radius: 8px; padding: 16px; margin-top: 16px;">
                    <p style="color: #374151; white-space: pre-wrap; margin: 0;">${safe.message}</p>
                  </div>
                </div>
              `,
            }),
          ]
        : []),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Recibimos tu mensaje — Expat507",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0A1628; padding: 32px 24px; text-align: center;">
              <h1 style="color: #C9A84C; margin: 0; font-size: 24px;">Expat507</h1>
            </div>
            <div style="padding: 32px 24px;">
              <h2 style="color: #0A1628; margin: 0 0 16px;">Hola ${safe.name},</h2>
              <p style="color: #374151; line-height: 1.6;">Recibimos tu mensaje sobre "<strong>${safe.subject}</strong>". Te responderemos a este email en menos de 24 horas hábiles.</p>
              <p style="color: #374151; line-height: 1.6;">Si tienes una consulta sobre migración, bienes raíces u otro tema especializado, también puedes explorar nuestras <a href="${SITE_URL}/guias" style="color: #C9A84C;">guías</a> o <a href="${SITE_URL}/consulta" style="color: #C9A84C;">agendar una consulta gratuita</a>.</p>
            </div>
            <div style="background: #F4F6F9; padding: 16px 24px; text-align: center;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Expat507 · Panamá</p>
            </div>
          </div>
        `,
      }),
    ]);

    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length === results.length) {
      console.error("[/api/contact] All emails failed:", failed);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
