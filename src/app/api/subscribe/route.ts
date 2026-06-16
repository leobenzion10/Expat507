import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "Expat507 <noreply@expat507.com>";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = createServiceClient();
    const { error: dbError } = await db.from("subscribers").insert({
      name: name || null,
      email,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      console.error("[/api/subscribe] Supabase error:", dbError);
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Bienvenido/a al newsletter de Expat507",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #0A1628; padding: 32px 24px; text-align: center;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 24px;">Expat507</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Tu guía insider para vivir, invertir y establecerte en Panamá</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #0A1628; margin: 0 0 16px;">¡Bienvenido/a${name ? `, ${name}` : ""}!</h2>
            <p style="color: #374151; line-height: 1.6;">Ya eres parte de la comunidad Expat507. Cada semana recibirás análisis del mercado, alertas regulatorias y guías exclusivas sobre Panamá.</p>

            <div style="background: #FBF6EC; border: 1px solid rgba(201,168,76,0.3); border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
              <p style="color: #C9A84C; font-size: 24px; margin: 0 0 8px;">🎁</p>
              <h3 style="color: #0A1628; margin: 0 0 8px;">Tu guía de bienvenida</h3>
              <p style="color: #374151; font-size: 14px; margin: 0 0 16px;">"Los 7 errores que cometen los expatriados al llegar a Panamá"</p>
              <a href="https://expat507.com/guias" style="display: inline-block; background: #C9A84C; color: #0A1628; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Descargar guía gratuita</a>
            </div>

            <p style="color: #374151; line-height: 1.6;">Si tienes alguna pregunta específica sobre Panamá, no dudes en escribirnos o usar nuestro <a href="https://expat507.com/asistente" style="color: #C9A84C;">asistente IA</a>.</p>
          </div>
          <div style="background: #F4F6F9; padding: 16px 24px; text-align: center;">
            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Puedes cancelar tu suscripción en cualquier momento · Expat507 · hola@expat507.com</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/subscribe]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
