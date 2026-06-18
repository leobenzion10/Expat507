import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";
import { clampString, escapeHtml, isBotSubmission, isValidEmail, rateLimit } from "@/lib/security";
import { SITE_URL } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "Expat507 <noreply@expat507.com>";

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(req, "subscribe", 5, 60_000)) {
      return NextResponse.json({ error: "Too many requests, please try again shortly" }, { status: 429 });
    }

    const body = await req.json();
    if (isBotSubmission(body)) {
      return NextResponse.json({ ok: true });
    }

    const name = clampString(body.name, 200);
    const email = clampString(body.email, 254);
    const locale = (body.language === "en" || body.locale === "en") ? "en" : "es";
    const source = clampString(body.source, 50) || "newsletter";

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const db = createServiceClient();

    const { data: existing } = await db.from("subscribers").select("email").eq("email", email).maybeSingle();
    const alreadySubscribed = !!existing;

    const { error: dbError } = await db.from("subscribers").upsert(
      {
        name: name || null,
        email,
        source,
        language: locale,
        active: true,
        created_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    if (dbError) {
      console.error("[/api/subscribe] Supabase error:", dbError);
    }

    // Returning subscribers just had their language preference updated above —
    // skip re-sending the welcome email so we don't spam someone who's already in.
    if (alreadySubscribed) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    const safeName = escapeHtml(name);
    const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&locale=${locale}`;
    const guideUrl = `${SITE_URL}/guias/guia-expat507-${locale}.pdf`;
    const mistakesUrl = `${SITE_URL}/guias/errores-comunes-expatriados-panama`;

    const subject = locale === "en" ? "Welcome to the Expat507 newsletter" : "Bienvenido/a al newsletter de Expat507";
    const html =
      locale === "en"
        ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #0B1A17; padding: 32px 24px; text-align: center;">
            <h1 style="color: #B8935A; margin: 0; font-size: 24px;">Expat507</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Your insider guide to living, investing, and settling in Panama</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #0B1A17; margin: 0 0 16px;">Welcome${safeName ? `, ${safeName}` : ""}!</h2>
            <p style="color: #374151; line-height: 1.6;">You're now part of the Expat507 community. Every week you'll get market analysis, regulatory alerts, and exclusive guides about Panama.</p>
            <p style="color: #374151; line-height: 1.6;">As promised, here's your free guide:</p>
            <p style="text-align: center; margin: 24px 0;">
              <a href="${guideUrl}" style="background: #B8935A; color: #0B1A17; font-weight: bold; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block;">Download the 2026 Definitive Guide (PDF)</a>
            </p>
            <p style="color: #374151; line-height: 1.6;">While you wait for the next issue, read our article on <a href="${mistakesUrl}" style="color: #B8935A;">the 7 mistakes expatriates make when arriving in Panama</a>, browse our <a href="${SITE_URL}/guias" style="color: #B8935A;">guides</a>, or <a href="${SITE_URL}/consulta" style="color: #B8935A;">book a free consultation</a> if you'd like personalized guidance.</p>
          </div>
          <div style="background: #F4F6F9; padding: 16px 24px; text-align: center;">
            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Expat507 · <a href="${unsubscribeUrl}" style="color: #9CA3AF;">Unsubscribe</a></p>
          </div>
        </div>
      `
        : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #0B1A17; padding: 32px 24px; text-align: center;">
            <h1 style="color: #B8935A; margin: 0; font-size: 24px;">Expat507</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Tu guía insider para vivir, invertir y establecerte en Panamá</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #0B1A17; margin: 0 0 16px;">¡Bienvenido/a${safeName ? `, ${safeName}` : ""}!</h2>
            <p style="color: #374151; line-height: 1.6;">Ya eres parte de la comunidad Expat507. Cada semana recibirás análisis del mercado, alertas regulatorias y guías exclusivas sobre Panamá.</p>
            <p style="color: #374151; line-height: 1.6;">Como prometimos, aquí está tu guía gratuita:</p>
            <p style="text-align: center; margin: 24px 0;">
              <a href="${guideUrl}" style="background: #B8935A; color: #0B1A17; font-weight: bold; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block;">Descargar la Guía Definitiva 2026 (PDF)</a>
            </p>
            <p style="color: #374151; line-height: 1.6;">Mientras esperas el próximo envío, lee nuestro artículo sobre <a href="${mistakesUrl}" style="color: #B8935A;">los 7 errores que cometen los expatriados al llegar a Panamá</a>, explora nuestras <a href="${SITE_URL}/guias" style="color: #B8935A;">guías</a>, o <a href="${SITE_URL}/consulta" style="color: #B8935A;">agenda una consulta gratuita</a> si quieres orientación personalizada.</p>
          </div>
          <div style="background: #F4F6F9; padding: 16px 24px; text-align: center;">
            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Expat507 · <a href="${unsubscribeUrl}" style="color: #9CA3AF;">Cancelar suscripción</a></p>
          </div>
        </div>
      `;

    const { error: emailError } = await resend.emails.send({ from: EMAIL_FROM, to: email, subject, html });
    if (emailError) {
      console.error("[/api/subscribe] Resend error:", emailError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/subscribe]", err);
    const detail = process.env.NODE_ENV === "development" && err instanceof Error ? err.message : undefined;
    return NextResponse.json({ error: "Internal Server Error", detail }, { status: 500 });
  }
}
