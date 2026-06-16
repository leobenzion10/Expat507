"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Mail, BookOpen, TrendingUp, Shield } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";

export default function NewsletterPage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setDone(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error("Algo salió mal. Intenta de nuevo.");
      }
    } catch {
      toast.error("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  const BENEFITS = [
    {
      icon: TrendingUp,
      title: "Análisis del mercado semanal",
      desc: "Tendencias inmobiliarias, cambios en tasas y oportunidades de inversión.",
    },
    {
      icon: Shield,
      title: "Alertas regulatorias",
      desc: "Cambios en leyes de migración, tributación y regulación bancaria.",
    },
    {
      icon: BookOpen,
      title: "Guías exclusivas",
      desc: "Contenido de profundidad que no publicamos en el sitio web.",
    },
    {
      icon: Mail,
      title: "Lead magnet de bienvenida",
      desc: 'Recibe gratis nuestra guía "Los 7 errores que cometen los expatriados al llegar a Panamá".',
    },
  ];

  if (done) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="gradient-navy py-24 px-4 text-center">
          <div className="w-20 h-20 bg-[#C9A84C]/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-[#C9A84C]" />
          </div>
          <h1
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¡Bienvenido/a a Expat507!
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto mb-6">
            Te enviamos un email de confirmación a{" "}
            <strong className="text-[#C9A84C]">{form.email}</strong>. Revisa tu
            bandeja de entrada y también tu carpeta de spam.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-sm mx-auto">
            <p className="text-white text-sm">
              🎁 Tu guía de bienvenida está en camino. En el email encontrarás
              el link de descarga.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
            Gratis · Sin spam
          </span>
          <div className="h-px w-10 bg-[#C9A84C]" />
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Newsletter Expat507
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Información privilegiada sobre Panamá, directa a tu inbox cada semana.
          Más de 500 lectores activos.
        </p>
      </div>

      <GoldDivider />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Benefits */}
          <div>
            <h2
              className="text-2xl font-bold text-[#0A1628] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ¿Qué recibirás cada semana?
            </h2>
            <div className="space-y-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FBF6EC] rounded-xl flex items-center justify-center flex-shrink-0">
                    <b.icon size={20} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1628] mb-1">{b.title}</h3>
                    <p className="text-sm text-[#6B7280]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#F4F6F9] rounded-2xl p-5">
              <p className="text-sm text-[#6B7280] italic">
                &ldquo;El newsletter de Expat507 es lo primero que leo los
                lunes. La información es concisa, útil y sin relleno.&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-7 h-7 bg-[#C9A84C]/20 rounded-full flex items-center justify-center text-sm">
                  🇺🇸
                </div>
                <span className="text-xs text-[#6B7280]">
                  Robert K. · Inversionista, Miami
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8">
              <div className="w-14 h-14 bg-[#FBF6EC] rounded-2xl flex items-center justify-center mb-5">
                <Mail size={24} className="text-[#C9A84C]" />
              </div>
              <h3
                className="text-xl font-bold text-[#0A1628] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Suscríbete gratis
              </h3>
              <p className="text-[#6B7280] text-sm mb-6">
                Cancela cuando quieras. Sin spam, prometido.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
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
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="tu@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!form.email || loading}
                  className="w-full bg-[#C9A84C] hover:bg-[#A8883A] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A1628] font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? "Enviando..." : "Suscribirme gratis"}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex justify-center gap-6 text-xs text-[#6B7280]">
                  <span>✓ Sin spam</span>
                  <span>✓ Cancela cuando quieras</span>
                  <span>✓ Gratis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
