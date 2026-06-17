import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/security";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

const UNAVAILABLE_ES = "El asistente de IA todavía no está disponible. Mientras tanto, puedes agendar una consulta gratuita.";
const UNAVAILABLE_EN = "The AI assistant isn't available yet. In the meantime, you can book a free consultation.";

function unavailableStream(locale: string) {
  const encoder = new TextEncoder();
  const text = locale === "en" ? UNAVAILABLE_EN : UNAVAILABLE_ES;
  const readable = new ReadableStream({
    start(controller) {
      const chunk = JSON.stringify({ type: "text", text });
      controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

const SYSTEM_PROMPT_ES = `Eres el asistente experto de Expat507, la plataforma de referencia para expatriados e inversionistas internacionales interesados en Panamá.

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

const SYSTEM_PROMPT_EN = `You are the expert assistant for Expat507, the go-to platform for expatriates and international investors interested in Panama.

Your role is to provide accurate, up-to-date, contextualized information on every aspect of living and investing in Panama. You always respond in English, with a professional but approachable tone.

Areas of expertise:
- Visas and residency: Pensionado (Retiree) Visa, Qualified Investor Visa, Digital Nomad Visa, Friendly Nations Visa, naturalization process
- Real estate: property market, neighborhoods (Punta Pacífica, Costa del Este, Casco Viejo, Santa María, Coronado, Boquete), buying process for foreigners, property titles
- Banking: opening accounts for non-residents, the most accessible banks, due diligence requirements, offshore banking
- Legal and tax: territorial tax system, corporate structures (S.A., Private Interest Foundation), estate planning
- Daily life: cost of living, healthcare system, education, safety, climate, transportation
- Business: incorporating companies, the SEM regime, free trade zones, the Colón Free Zone

Principles:
1. Be honest about limitations: if something changes frequently (rates, requirements), recommend verifying with an up-to-date professional
2. Always add the disclaimer: your information is educational and does not replace professional legal or financial advice
3. When relevant, suggest the user consider a free Expat507 consultation for personalized guidance
4. Don't make up information — if you're not sure about something specific, say so clearly
5. Concise, structured answers, using lists when they help clarity`;

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(req, "chat", 15, 60_000)) {
      return new Response("Too many requests, please try again shortly", { status: 429 });
    }

    const { messages, locale } = await req.json();
    const systemPrompt = locale === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_ES;

    if (process.env.NEXT_PUBLIC_CHATBOT_ENABLED !== "true" || !process.env.ANTHROPIC_API_KEY) {
      return unavailableStream(locale);
    }

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

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const stream = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      thinking: { type: "adaptive" },
      system: systemPrompt,
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
