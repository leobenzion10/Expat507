"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "¿Cuál es la mejor visa para jubilados?",
  "¿Cómo abrir cuenta bancaria en Panamá?",
  "¿Qué zonas son mejores para invertir?",
  "¿Cuánto cuesta vivir en Panamá?",
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hola 👋 Soy el asistente de Expat507. Puedo ayudarte con preguntas sobre migración, bienes raíces, banca y la vida en Panamá. ¿Qué te gustaría saber?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimized]);

  async function sendMessage(text?: string) {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Error en la respuesta");
      if (!res.body) throw new Error("No hay stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === "text") {
                full += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: full };
                  return updated;
                });
              }
            } catch {
              // skip
            }
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Lo siento, hubo un error. Por favor intenta de nuevo o usa el Asistente completo.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {open ? (
        <div
          className={`bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-200 ${
            minimized ? "w-72 h-14" : "w-80 sm:w-96 h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0A1628] rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C9A84C] rounded-full flex items-center justify-center text-[#0A1628] font-bold text-sm">
                IA
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">Asistente Expat507</p>
                {!minimized && (
                  <p className="text-white/50 text-xs mt-0.5">
                    {loading ? "Escribiendo..." : "En línea"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(!minimized)}
                className="text-white/60 hover:text-white p-1 rounded transition-colors"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform ${minimized ? "rotate-180" : ""}`}
                />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] text-sm rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#0A1628] text-white rounded-br-sm"
                          : "bg-[#F4F6F9] text-[#0A1628] rounded-bl-sm"
                      }`}
                    >
                      {msg.content || (
                        <span className="inline-flex gap-1">
                          <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* CTA after last assistant message */}
                {messages.length > 2 &&
                  messages[messages.length - 1].role === "assistant" &&
                  !loading && (
                    <div className="bg-[#FBF6EC] border border-[#C9A84C]/30 rounded-xl p-3 text-center">
                      <p className="text-xs text-[#0A1628] mb-2 font-medium">
                        ¿Listo para dar el siguiente paso?
                      </p>
                      <Link
                        href="/consulta"
                        className="inline-block bg-[#C9A84C] text-[#0A1628] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#A8883A] transition-colors"
                      >
                        Agenda Consulta Gratuita
                      </Link>
                    </div>
                  )}
                <div ref={bottomRef} />
              </div>

              {/* Suggested */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs bg-[#F4F6F9] hover:bg-[#E8ECF2] text-[#0A1628] px-2.5 py-1.5 rounded-full transition-colors border border-gray-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-gray-100">
                <div className="flex items-center gap-2 bg-[#F4F6F9] rounded-xl px-3 py-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 bg-transparent text-sm text-[#0A1628] placeholder-gray-400 outline-none"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="text-[#C9A84C] disabled:opacity-40 hover:text-[#A8883A] transition-colors p-1"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  IA informativa · No es asesoría legal
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-12 h-12 bg-[#0A1628] hover:bg-[#122040] rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 border-2 border-[#C9A84C]"
          aria-label="Abrir asistente IA"
        >
          <MessageCircle size={20} className="text-[#C9A84C]" />
        </button>
      )}
    </div>
  );
}
