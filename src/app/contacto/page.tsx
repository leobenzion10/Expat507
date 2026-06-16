"use client";

import { useState } from "react";
import { ArrowRight, Mail, MessageCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import type { Metadata } from "next";

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50712345678";

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setDone(true);
      } else {
        toast.error("Algo salió mal. Intenta de nuevo.");
      }
    } catch {
      toast.error("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
            Estamos aquí
          </span>
          <div className="h-px w-10 bg-[#C9A84C]" />
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Contáctanos
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          ¿Tienes alguna pregunta o comentario? Escríbenos y te respondemos en
          menos de 24 horas hábiles.
        </p>
      </div>

      <GoldDivider />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact options */}
          <div className="space-y-5">
            <h2
              className="text-lg font-bold text-[#0A1628]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Otras formas de contacto
            </h2>

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hola, tengo una consulta sobre Expat507")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#F4F6F9] hover:bg-[#E8ECF2] rounded-xl p-4 transition-colors group"
            >
              <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0A1628] group-hover:text-[#C9A84C] transition-colors">
                  WhatsApp
                </p>
                <p className="text-xs text-[#6B7280]">Respuesta rápida</p>
              </div>
            </a>

            <a
              href="mailto:hola@expat507.com"
              className="flex items-center gap-3 bg-[#F4F6F9] hover:bg-[#E8ECF2] rounded-xl p-4 transition-colors group"
            >
              <div className="w-10 h-10 bg-[#C9A84C]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0A1628] group-hover:text-[#C9A84C] transition-colors">
                  Email directo
                </p>
                <p className="text-xs text-[#6B7280]">hola@expat507.com</p>
              </div>
            </a>

            <div className="bg-[#FBF6EC] border border-[#C9A84C]/30 rounded-xl p-4">
              <p className="text-xs text-[#6B7280] leading-relaxed">
                <strong className="text-[#0A1628]">Nota:</strong> Para consultas sobre migración, bienes raíces u otros temas especializados, te recomendamos usar el formulario de{" "}
                <a href="/consulta" className="text-[#C9A84C] hover:underline">
                  Consulta Gratuita
                </a>{" "}
                para que podamos orientarte mejor.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {done ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#FBF6EC] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-[#C9A84C]" />
                </div>
                <h3
                  className="text-xl font-bold text-[#0A1628] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Mensaje enviado
                </h3>
                <p className="text-[#6B7280]">
                  Te responderemos a <strong>{form.email}</strong> en menos de
                  24 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Cuéntanos más..."
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9A84C] hover:bg-[#A8883A] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A1628] font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? "Enviando..." : "Enviar mensaje"}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
