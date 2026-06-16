import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OPERATOR_EMAIL = process.env.OPERATOR_EMAIL || "hola@expat507.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Expat507 <noreply@expat507.com>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, country, objective, budget, urgency, message } = body;

    if (!name || !email || !country || !objective || !budget || !urgency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
              <h2 style="color: #0A1628; margin: 0 0 16px;">Hola ${name},</h2>
              <p style="color: #374151; line-height: 1.6;">Recibimos tu consulta correctamente. En menos de 24 horas hábiles nos pondremos en contacto contigo para orientarte.</p>
              <div style="background: #F4F6F9; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <p style="color: #6B7280; font-size: 13px; margin: 0 0 8px;"><strong style="color: #0A1628;">Tu objetivo:</strong> ${objective}</p>
                <p style="color: #6B7280; font-size: 13px; margin: 0 0 8px;"><strong style="color: #0A1628;">Rango de inversión:</strong> ${budget}</p>
                <p style="color: #6B7280; font-size: 13px; margin: 0;"><strong style="color: #0A1628;">Urgencia:</strong> ${urgency}</p>
              </div>
              <p style="color: #374151; line-height: 1.6;">Mientras tanto, puedes explorar nuestras guías o usar el asistente IA en <a href="https://expat507.com" style="color: #C9A84C;">expat507.com</a>.</p>
              <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/expat507"}" style="display: inline-block; background: #C9A84C; color: #0A1628; font-weight: bold; padding: 14px 28px; border-radius: 10px; text-decoration: none; margin-top: 8px;">Agenda tu llamada ahora</a>
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
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Nombre</td><td style="padding: 8px;">${name}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">País</td><td style="padding: 8px;">${country}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Objetivo</td><td style="padding: 8px;">${objective}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Budget</td><td style="padding: 8px;">${budget}</td></tr>
              <tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Urgencia</td><td style="padding: 8px;">${urgency}</td></tr>
              ${message ? `<tr><td style="padding: 8px; background: #F4F6F9; font-weight: bold;">Mensaje</td><td style="padding: 8px;">${message}</td></tr>` : ""}
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
