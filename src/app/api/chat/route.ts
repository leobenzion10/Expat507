import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/security";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

const SYSTEM_PROMPT = `Eres el asistente experto de Expat507, la plataforma de referencia para expatriados e inversionistas internacionales interesados en Panamá.

Tu rol es proporcionar información precisa, actualizada y contextualizada sobre todos los aspectos de vivir e invertir en Panamá. Respondes siempre en español, con un tono profesional pero accesible.

Áreas de expertise:
- Visas y residencia: Visa de Jubilado (Pensionado), Visa de Inversionista Calificado, Visa de Nómada Digital, Visa de Países Amigos, proceso de naturalización
- Bienes raíces: mercado inmobiliario, barrios (Punta Pacífica, Costa del Este, Casco Viejo, Santa María, Coronado, Boquete), proceso de compra para extranjeros, títulos de propiedad
- Banca: apertura de cuentas para no residentes, bancos más accesibles, requisitos de due diligence, banca offshore
- Legal y tributario: sistema territorial de impuestos, estructuras corporativas (SA, Fundación de Interés Privado), planificación patrimonial
- Vida cotidiana: costo de vida, sistema de salud, educación, seguridad, clima, transporte
- Empresas: constitución de sociedades, régimen SEM, zonas francas, Zona Libre de Colón

Principios:
1. Sé honesto sobre las limitaciones: si algo cambia frecuentemente (tasas, requisitos), recomienda verificar con un profesional actualizado
2. Siempre agrega el disclaimer: tu información es educativa, no reemplaza asesoría legal ni financiera profesional
3. Cuando sea relevante, sugiere que el usuario considere una consulta gratuita en Expat507 para orientación personalizada
4. No inventes información — si no estás seguro de algo específico, dilo claramente
5. Respuestas concisas y estructuradas, usando listas cuando ayuden a la claridad`;

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(req, "chat", 15, 60_000)) {
      return new Response("Too many requests, please try again shortly", { status: 429 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid request body", { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response("Conversation too long", { status: 400 });
    }

    const sanitized: { role: "user" | "assistant"; content: string }[] = [];
    for (const m of messages) {
      if (
        !m ||
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string" ||
        m.content.length === 0 ||
        m.content.length > MAX_MESSAGE_LENGTH
      ) {
        return new Response("Invalid message in conversation", { status: 400 });
      }
      sanitized.push({ role: m.role, content: m.content });
    }

    const stream = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      messages: sanitized,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const chunk = JSON.stringify({ type: "text", text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("[/api/chat]", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
