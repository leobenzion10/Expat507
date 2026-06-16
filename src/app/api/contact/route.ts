import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OPERATOR_EMAIL = process.env.OPERATOR_EMAIL || "hola@expat507.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Expat507 <noreply@expat507.com>";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OPERATOR_EMAIL,
        replyTo: email,
        subject: `Contacto: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #0A1628;">Nuevo mensaje de contacto</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold; width: 120px;">Nombre</td><td style="padding: 8px;">${name}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Asunto</td><td style="padding: 8px;">${subject}</td></tr>
            </table>
            <div style="background: #F4F6F9; border-radius: 8px; padding: 16px; margin-top: 16px;">
              <p style="color: #374151; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
          </div>
        `,
      }),
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
              <h2 style="color: #0A1628; margin: 0 0 16px;">Hola ${name},</h2>
              <p style="color: #374151; line-height: 1.6;">Recibimos tu mensaje sobre "<strong>${subject}</strong>". Te responderemos a este email en menos de 24 horas hábiles.</p>
              <p style="color: #374151; line-height: 1.6;">Si tienes una consulta sobre migración, bienes raíces u otro tema especializado, también puedes usar nuestro <a href="https://expat507.com/asistente" style="color: #C9A84C;">asistente IA</a> para obtener respuestas inmediatas.</p>
            </div>
            <div style="background: #F4F6F9; padding: 16px 24px; text-align: center;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Expat507 · hola@expat507.com</p>
            </div>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
