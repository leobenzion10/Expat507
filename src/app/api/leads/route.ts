import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";
import { clampString, escapeHtml, isValidEmail, rateLimit } from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);
const OPERATOR_EMAIL = process.env.OPERATOR_EMAIL || "hola@expat507.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Expat507 <noreply@expat507.com>";

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(req, "leads", 5, 60_000)) {
      return NextResponse.json({ error: "Too many requests, please try again shortly" }, { status: 429 });
    }

    const body = await req.json();
    const name = clampString(body.name, 200);
    const email = clampString(body.email, 254);
    const country = clampString(body.country, 100);
    const objective = clampString(body.objective, 200);
    const budget = clampString(body.budget, 100);
    const urgency = clampString(body.urgency, 100);
    const message = clampString(body.message, 2000);

    if (!name || !country || !objective || !budget || !urgency || !isValidEmail(email)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const db = createServiceClient();
    const { error: dbError } = await db.from("leads").insert({
      name,
      email,
      country,
      objective,
      budget,
      urgency,
      message: message || null,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("[/api/leads] Supabase error:", dbError);
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      country: escapeHtml(country),
      objective: escapeHtml(objective),
      budget: escapeHtml(budget),
      urgency: escapeHtml(urgency),
      message: escapeHtml(message),
    };

    await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Recibimos tu consulta — Expat507",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: #0A1628; padding: 32px 24px; text-align: center;">
              <h1 style="color: #C9A84C; margin: 0; font-size: 24px;">Expat507</h1>
              <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Tu guía insider para Panamá</p>
            </div>
            <div style="padding: 32px 24px;">
              <h2 style="color: #0A1628; margin: 0 0 16px;">Hola ${safe.name},</h2>
              <p style="color: #374151; line-height: 1.6;">Recibimos tu consulta correctamente. Nuestro equipo la revisará y te contactará directamente por WhatsApp en menos de 24 horas hábiles.</p>
              <div style="background: #F4F6F9; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <p style="color: #6B7280; font-size: 13px; margin: 0 0 8px;"><strong style="color: #0A1628;">Tu objetivo:</strong> ${safe.objective}</p>
                <p style="color: #6B7280; font-size: 13px; margin: 0 0 8px;"><strong style="color: #0A1628;">Rango de inversión:</strong> ${safe.budget}</p>
                <p style="color: #6B7280; font-size: 13px; margin: 0;"><strong style="color: #0A1628;">Urgencia:</strong> ${safe.urgency}</p>
              </div>
              <p style="color: #374151; line-height: 1.6;">Mientras tanto, puedes explorar nuestras guías o usar el asistente IA en <a href="https://expat507.com" style="color: #C9A84C;">expat507.com</a>.</p>
            </div>
            <div style="background: #F4F6F9; padding: 16px 24px; text-align: center;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Expat507 · hola@expat507.com · Panamá</p>
            </div>
          </div>
        `,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: OPERATOR_EMAIL,
        subject: `Nuevo lead: ${name} (${objective})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #0A1628;">Nuevo lead calificado</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Nombre</td><td style="padding: 8px;">${safe.name}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">País</td><td style="padding: 8px;">${safe.country}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Objetivo</td><td style="padding: 8px;">${safe.objective}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Budget</td><td style="padding: 8px;">${safe.budget}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Urgencia</td><td style="padding: 8px;">${safe.urgency}</td></tr>
              ${safe.message ? `<tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Mensaje</td><td style="padding: 8px;">${safe.message}</td></tr>` : ""}
            </table>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/leads]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
