import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { isValidEmail, clampString } from "@/lib/security";

function page(title: string, message: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:Arial,sans-serif;background:#0B1A17;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;text-align:center}
.card{max-width:420px;background:#11241F;border-radius:16px;padding:40px 32px}
h1{color:#B8935A;font-size:20px;margin:0 0 12px}
p{color:rgba(255,255,255,0.7);line-height:1.6;margin:0}
a{color:#B8935A}</style></head>
<body><div class="card"><h1>${title}</h1><p>${message}</p></div></body></html>`;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = clampString(url.searchParams.get("email") || "", 254);
  const locale = url.searchParams.get("locale") === "en" ? "en" : "es";

  if (!isValidEmail(email)) {
    const title = locale === "en" ? "Invalid request" : "Solicitud inválida";
    const message = locale === "en" ? "This unsubscribe link is invalid." : "Este enlace de cancelación no es válido.";
    return new NextResponse(page(title, message), { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  const db = createServiceClient();
  await db.from("subscribers").update({ active: false }).eq("email", email);

  const title = locale === "en" ? "You've been unsubscribed" : "Cancelaste tu suscripción";
  const message =
    locale === "en"
      ? "You won't receive any more emails from the Expat507 newsletter. You can subscribe again anytime."
      : "Ya no recibirás más correos del newsletter de Expat507. Puedes suscribirte de nuevo cuando quieras.";

  return new NextResponse(page(title, message), { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
