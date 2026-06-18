"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ArrowRight, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import GoldDivider from "@/components/ui/GoldDivider";
import { useLocale } from "@/components/providers/LocaleProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AsistentePage() {
  const { locale, dict } = useLocale();
  const t = dict.asistente;
  const SUGGESTED_QUESTIONS = t.suggestedQuestions;
  const chatbotEnabled = process.env.NEXT_PUBLIC_CHATBOT_ENABLED === "true";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

      if (!res.ok) throw new Error("Error");
      if (!res.body) throw new Error("No stream");

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
      inputRef.current?.focus();
    }
  }

  const lastIsAssistant =
    messages.length > 0 && messages[messages.length - 1].role === "assistant";
  const showCTA = lastIsAssistant && !loading && messages.length >= 2;

  if (!chatbotEnabled) {
    const cs = t.comingSoon;
    return (
      <div className="pt-20 min-h-screen flex flex-col">
        <div className="gradient-navy flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-lg w-full text-center">
            <div className="inline-flex items-center gap-2 bg-[#B8935A]/15 border border-[#B8935A]/30 rounded-full px-4 py-1.5 mb-6">
              <Clock size={14} className="text-[#B8935A]" />
              <span className="text-[#B8935A] text-xs font-semibold tracking-wide uppercase">{cs.badge}</span>
            </div>
            <div className="w-14 h-14 bg-[#B8935A]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles size={24} className="text-[#B8935A]" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {cs.title}
            </h1>
            <p className="text-white/60 mb-8">{cs.description}</p>
            <Link
              href="/consulta"
              className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-6 py-3.5 rounded-xl text-sm transition-colors"
            >
              {cs.button}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      {/* Header */}
      <div className="gradient-navy pt-10 pb-12 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#B8935A]" />
          <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
            {t.eyebrow}
          </span>
          <div className="h-px w-10 bg-[#B8935A]" />
        </div>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 bg-[#B8935A]/20 rounded-2xl flex items-center justify-center">
            <Sparkles size={22} className="text-[#B8935A]" />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </h1>
        </div>
        <p className="text-white/60 max-w-lg mx-auto">
          {t.subtitle}
        </p>
        <p className="text-white/30 text-xs mt-2">
          {t.footnote}
        </p>
      </div>

      <GoldDivider />

      {/* Chat area */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        {messages.length === 0 ? (
          /* Welcome state */
          <div>
            <div className="text-center mb-8">
              <p className="text-[#6B7280] mb-6">
                {t.welcome}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left bg-white border border-gray-100 hover:border-[#B8935A] hover:shadow-md rounded-xl px-5 py-4 text-sm text-[#0B1A17] transition-all duration-200 group"
                >
                  <span className="text-[#B8935A] mr-2 group-hover:mr-3 transition-all">→</span>
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-[#B8935A]/20 flex items-center justify-center text-[#B8935A] text-xs font-bold mr-3 flex-shrink-0 mt-1">
                    IA
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#0B1A17] text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-[#374151] rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.content ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="w-2 h-2 bg-[#B8935A] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#B8935A] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#B8935A] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* CTA after response */}
            {showCTA && (
              <div className="bg-[#FBF6EC] border border-[#B8935A]/30 rounded-2xl p-6 text-center">
                <p className="text-[#0B1A17] font-semibold mb-2">
                  {t.ctaTitle}
                </p>
                <p className="text-[#6B7280] text-sm mb-4">
                  {t.ctaDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/consulta"
                    className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-6 py-3 rounded-xl text-sm transition-colors"
                  >
                    {t.ctaButton}
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => {
                      setMessages([]);
                      setInput("");
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-[#F4F6F9] text-[#0B1A17] font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                  >
                    {t.newQuestion}
                  </button>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-100 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-[#F4F6F9] rounded-2xl border border-gray-200 focus-within:border-[#B8935A] focus-within:ring-2 focus-within:ring-[#B8935A]/20 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={t.placeholder}
                className="w-full bg-transparent px-5 py-4 text-sm text-[#0B1A17] placeholder-gray-400 outline-none"
                disabled={loading}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-12 h-12 bg-[#B8935A] hover:bg-[#96763F] disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A17] rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-2">
            {t.footnoteBar} ·{" "}
            <Link href="/consulta" className="text-[#B8935A] hover:underline">
              {t.footnoteLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
