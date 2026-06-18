"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotWidget() {
  const { locale, dict } = useLocale();
  const t = dict.widgets.chatbot;
  const SUGGESTED = t.suggested;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.welcome },
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
        body: JSON.stringify({ messages: newMessages, locale }),
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
          content: t.errorMessage,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  if (process.env.NEXT_PUBLIC_CHATBOT_ENABLED !== "true") return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 print:hidden">
      {open ? (
        <div
          className={`bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-200 ${
            minimized ? "w-72 h-14" : "w-80 sm:w-96 h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0B1A17] rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#B8935A] rounded-full flex items-center justify-center text-[#0B1A17] font-bold text-sm">
                IA
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">{t.title}</p>
                {!minimized && (
                  <p className="text-white/50 text-xs mt-0.5">
                    {loading ? t.typing : t.online}
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
                          ? "bg-[#0B1A17] text-white rounded-br-sm"
                          : "bg-[#F4F6F9] text-[#0B1A17] rounded-bl-sm"
                      }`}
                    >
                      {msg.content || (
                        <span className="inline-flex gap-1">
                          <span className="w-1.5 h-1.5 bg-[#B8935A] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-[#B8935A] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-[#B8935A] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* CTA after last assistant message */}
                {messages.length > 2 &&
                  messages[messages.length - 1].role === "assistant" &&
                  !loading && (
                    <div className="bg-[#FBF6EC] border border-[#B8935A]/30 rounded-xl p-3 text-center">
                      <p className="text-xs text-[#0B1A17] mb-2 font-medium">
                        {t.ctaTitle}
                      </p>
                      <Link
                        href="/consulta"
                        className="inline-block bg-[#B8935A] text-[#0B1A17] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#96763F] transition-colors"
                      >
                        {t.ctaButton}
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
                      className="text-xs bg-[#F4F6F9] hover:bg-[#E8ECF2] text-[#0B1A17] px-2.5 py-1.5 rounded-full transition-colors border border-gray-200"
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
                    placeholder={t.placeholder}
                    className="flex-1 bg-transparent text-sm text-[#0B1A17] placeholder-gray-400 outline-none"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="text-[#B8935A] disabled:opacity-40 hover:text-[#96763F] transition-colors p-1"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  {t.footnote}
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-12 h-12 bg-[#0B1A17] hover:bg-[#11241F] rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 border-2 border-[#B8935A]"
          aria-label={t.openLabel}
        >
          <MessageCircle size={20} className="text-[#B8935A]" />
        </button>
      )}
    </div>
  );
}
