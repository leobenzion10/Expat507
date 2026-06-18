import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";
import { clampString, escapeHtml, isBotSubmission, isValidEmail, rateLimit } from "@/lib/security";
import { SITE_URL } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "Expat507 <noreply@expat507.com>";

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(req, "guide-download", 5, 60_000)) {
      return NextResponse.json({ error: "Too many requests, please try again shortly" }, { status: 429 });
    }

    const body = await req.json();
    if (isBotSubmission(body)) {
      return NextResponse.json({ ok: true });
    }

    const name = clampString(body.name, 200);
    const email = clampString(body.email, 254);
    const country = clampString(body.country, 100);
    const language = body.language === "en" ? "en" : "es";
    const source = "guia-completa";

    if (!name || !country || !isValidEmail(email)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const db = createServiceClient();

    const { error: downloadError } = await db.from("downloads").insert({
      name,
      email,
      country,
      resource: "guia-expat507",
      source,
      language,
      created_at: new Date().toISOString(),
    });
    if (downloadError) {
      console.error("[/api/guide-download] downloads insert error:", downloadError);
    }

    const { error: subError } = await db
      .from("subscribers")
      .upsert(
        { email, name, source, language, active: true, created_at: new Date().toISOString() },
        { onConflict: "email" }
      );
    if (subError) {
      console.error("[/api/guide-download] subscribers upsert error:", subError);
    }

    const safeName = escapeHtml(name);
    const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&locale=${language}`;
    const guideUrl = `${SITE_URL}/guias/guia-expat507-${language}.pdf`;

    const subject =
      language === "en" ? "Your Expat507 Definitive Guide is ready" : "Tu Guía Definitiva de Expat507 está lista";

    const html =
      language === "en"
        ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #0B1A17; padding: 32px 24px; text-align: center;">
            <h1 style="color: #B8935A; margin: 0; font-size: 24px;">Expat507</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">2026 Definitive Guide to Panama</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #0B1A17; margin: 0 0 16px;">Hi ${safeName},</h2>
            <p style="color: #374151; line-height: 1.6;">Here's your free guide, exactly as promised — 9 chapters covering residency, real estate, banking, legal structures, taxation, and expat life in Panama.</p>
            <p style="text-align: center; margin: 24px 0;">
              <a href="${guideUrl}" style="background: #B8935A; color: #0B1A17; font-weight: bold; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block;">Download the Guide (PDF)</a>
            </p>
            <p style="color: #374151; line-height: 1.6;">If you'd like personalized guidance on your specific case, <a href="${SITE_URL}/consulta" style="color: #B8935A;">book a free consultation</a> with our team.</p>
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
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Guía Definitiva 2026 de Panamá</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #0B1A17; margin: 0 0 16px;">Hola ${safeName},</h2>
            <p style="color: #374151; line-height: 1.6;">Aquí está tu guía gratuita, tal como prometimos — 9 capítulos sobre residencia, bienes raíces, banca, estructuras legales, fiscalidad y vida expat en Panamá.</p>
            <p style="text-align: center; margin: 24px 0;">
              <a href="${guideUrl}" style="background: #B8935A; color: #0B1A17; font-weight: bold; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block;">Descargar la Guía (PDF)</a>
            </p>
            <p style="color: #374151; line-height: 1.6;">Si quieres orientación personalizada para tu caso específico, <a href="${SITE_URL}/consulta" style="color: #B8935A;">agenda una consulta gratuita</a> con nuestro equipo.</p>
          </div>
          <div style="background: #F4F6F9; padding: 16px 24px; text-align: center;">
            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Expat507 · <a href="${unsubscribeUrl}" style="color: #9CA3AF;">Cancelar suscripción</a></p>
          </div>
        </div>
      `;

    // The email is sent (and awaited) before the download link is ever revealed to the client.
    // If it fails, we log it but still let the user through — a delivery hiccup shouldn't block
    // someone who already gave us their email.
    const { error: emailError } = await resend.emails.send({ from: EMAIL_FROM, to: email, subject, html });
    if (emailError) {
      console.error("[/api/guide-download] Resend error:", emailError);
    }

    return NextResponse.json({ ok: true, downloadUrl: guideUrl, emailSent: !emailError });
  } catch (err) {
    console.error("[/api/guide-download]", err);
    const detail = process.env.NODE_ENV === "development" && err instanceof Error ? err.message : undefined;
    return NextResponse.json({ error: "Internal Server Error", detail }, { status: 500 });
  }
}
