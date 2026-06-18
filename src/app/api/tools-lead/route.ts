import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";
import { clampString, escapeHtml, isValidEmail, rateLimit } from "@/lib/security";
import { SITE_URL } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "Expat507 <noreply@expat507.com>";

const VALID_TOOLS = new Set(["visa-quiz", "cost-calculator", "investment-simulator", "visa-comparator"]);

const TOOL_SUBJECT: Record<string, { es: string; en: string }> = {
  "visa-quiz": { es: "Tu resultado: ¿qué visa de Panamá es para ti?", en: "Your result: which Panama visa is right for you?" },
  "cost-calculator": { es: "Tu estimado de costo de vida en Panamá", en: "Your Panama cost-of-living estimate" },
  "investment-simulator": { es: "Tu simulación de residencia por inversión", en: "Your investment residency simulation" },
  "visa-comparator": { es: "Tu comparativo de visas de Panamá", en: "Your Panama visa comparison" },
};

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(req, "tools-lead", 8, 60_000)) {
      return NextResponse.json({ error: "Too many requests, please try again shortly" }, { status: 429 });
    }

    const body = await req.json();
    const tool = clampString(body.tool, 50);
    const name = clampString(body.name, 200);
    const email = clampString(body.email, 254);
    const language = body.language === "en" ? "en" : "es";
    const resultSummary = clampString(body.resultSummary, 500);
    const resultHtml = typeof body.resultHtml === "string" ? body.resultHtml.slice(0, 8000) : "";
    const result = typeof body.result === "object" && body.result !== null ? body.result : {};

    if (!VALID_TOOLS.has(tool) || !isValidEmail(email) || !resultSummary) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const db = createServiceClient();

    const { error: dbError } = await db.from("tool_leads").insert({
      tool,
      email,
      name: name || null,
      language,
      result,
      source: "herramientas",
      created_at: new Date().toISOString(),
    });
    if (dbError) {
      console.error("[/api/tools-lead] tool_leads insert error:", dbError);
    }

    const { error: subError } = await db
      .from("subscribers")
      .upsert(
        { email, name: name || null, source: "herramientas", language, active: true, created_at: new Date().toISOString() },
        { onConflict: "email" }
      );
    if (subError) {
      console.error("[/api/tools-lead] subscribers upsert error:", subError);
    }

    const safeName = escapeHtml(name);
    const subject = (TOOL_SUBJECT[tool] || TOOL_SUBJECT["visa-quiz"])[language as "es" | "en"];
    const greeting = language === "en" ? `Hi${safeName ? ` ${safeName}` : ""},` : `Hola${safeName ? ` ${safeName}` : ""},`;
    const intro =
      language === "en"
        ? "Here's the result from the tool you just used on Expat507:"
        : "Aquí está el resultado de la herramienta que acabas de usar en Expat507:";
    const ctaText = language === "en" ? "Want personalized guidance? Book a free consultation." : "¿Quieres orientación personalizada? Agenda una consulta gratuita.";
    const ctaButton = language === "en" ? "Book Free Consultation" : "Agendar Consulta Gratuita";

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0B1A17; padding: 32px 24px; text-align: center;">
          <h1 style="color: #B8935A; margin: 0; font-size: 24px;">Expat507</h1>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #0B1A17; margin: 0 0 16px;">${greeting}</h2>
          <p style="color: #374151; line-height: 1.6;">${intro}</p>
          <div style="background: #F4F6F9; border-radius: 12px; padding: 20px; margin: 24px 0;">
            ${resultHtml || `<p style="color: #0B1A17; margin: 0;">${escapeHtml(resultSummary)}</p>`}
          </div>
          <p style="text-align: center; margin: 24px 0;">
            <a href="${SITE_URL}/consulta" style="background: #B8935A; color: #0B1A17; font-weight: bold; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block;">${ctaButton}</a>
          </p>
          <p style="color: #6B7280; font-size: 13px; text-align: center;">${ctaText}</p>
        </div>
        <div style="background: #F4F6F9; padding: 16px 24px; text-align: center;">
          <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Expat507 · Panamá</p>
        </div>
      </div>
    `;

    const { error: emailError } = await resend.emails.send({ from: EMAIL_FROM, to: email, subject, html });
    if (emailError) {
      console.error("[/api/tools-lead] Resend error:", emailError);
    }

    return NextResponse.json({ ok: true, emailSent: !emailError });
  } catch (err) {
    console.error("[/api/tools-lead]", err);
    const detail = process.env.NODE_ENV === "development" && err instanceof Error ? err.message : undefined;
    return NextResponse.json({ error: "Internal Server Error", detail }, { status: 500 });
  }
}
