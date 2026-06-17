"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Calendar, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import { useLocale } from "@/components/providers/LocaleProvider";

type Step = "form" | "success";

export default function ConsultaPage() {
  const { dict } = useLocale();
  const t = dict.consulta;
  const COUNTRIES = dict.countries;
  const OBJECTIVES = t.objectives;
  const BUDGETS = t.budgets;
  const URGENCIES = t.urgencies;
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    objective: "",
    budget: "",
    urgency: "",
    message: "",
  });

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/expat507";
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waMessage = encodeURIComponent(
    t.success.waMessage.replace("{name}", form.name || "...").replace("{objective}", form.objective || "...")
  );

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStep("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(t.toastError);
      }
    } catch {
      toast.error(t.toastConnError);
    } finally {
      setLoading(false);
    }
  }

  const isFormValid =
    form.name && form.email && form.country && form.objective && form.budget && form.urgency;

  if (step === "success") {
    return (
      <div className="pt-20 min-h-screen">
        <div className="gradient-navy pt-12 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#C9A84C]/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={30} className="text-[#C9A84C]" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.success.title.replace("{name}", form.name)}
            </h1>
            <p className="text-white/70 text-lg">
              {t.success.subtitle}
            </p>
          </div>
        </div>

        <GoldDivider />

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className={`grid grid-cols-1 ${waNumber ? "sm:grid-cols-2" : ""} gap-5 mb-10`}>
            {/* Calendly option */}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-navy rounded-2xl p-6 text-white text-center hover:opacity-90 transition-opacity"
            >
              <div className="w-12 h-12 bg-[#C9A84C]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {t.success.calendlyTitle}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {t.success.calendlyDesc}
              </p>
              <span className="inline-flex items-center gap-1.5 bg-[#C9A84C] text-[#0A1628] text-sm font-bold px-4 py-2.5 rounded-xl">
                {t.success.calendlyButton}
                <ArrowRight size={15} />
              </span>
            </a>

            {/* WhatsApp option */}
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] rounded-2xl p-6 text-white text-center hover:opacity-90 transition-opacity"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {t.success.whatsappTitle}
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  {t.success.whatsappDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 bg-white text-[#25D366] text-sm font-bold px-4 py-2.5 rounded-xl">
                  {t.success.whatsappButton}
                  <ArrowRight size={15} />
                </span>
              </a>
            )}
          </div>

          <div className="bg-[#F4F6F9] rounded-2xl p-6 text-center">
            <p className="text-[#6B7280] text-sm">
              {t.success.footer}
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
            {t.eyebrowBadge}
          </span>
          <div className="h-px w-10 bg-[#C9A84C]" />
        </div>
        <h1
          className="text-3xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.title}
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <GoldDivider />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {t.steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="text-[#C9A84C] text-2xl font-bold opacity-40 mb-2">
                {s.step}
              </div>
              <p className="font-semibold text-[#0A1628] text-sm mb-1">{s.title}</p>
              <p className="text-[#6B7280] text-xs">{s.desc}</p>
            </div>
          ))}
        </div>

        <GoldDivider className="mb-10" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                {t.fields.name}
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder={t.fields.namePlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                {t.fields.email}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder={t.fields.emailPlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">
              {t.fields.country}
            </label>
            <select
              required
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all bg-white"
            >
              <option value="">{t.fields.countryPlaceholder}</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">
              {t.fields.objective}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OBJECTIVES.map((obj) => (
                <label
                  key={obj}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.objective === obj
                      ? "border-[#C9A84C] bg-[#FBF6EC]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="objective"
                    value={obj}
                    checked={form.objective === obj}
                    onChange={(e) => update("objective", e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    form.objective === obj ? "border-[#C9A84C]" : "border-gray-300"
                  }`}>
                    {form.objective === obj && (
                      <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                    )}
                  </div>
                  <span className="text-sm text-[#374151]">{obj}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">
              {t.fields.budget}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BUDGETS.map((b) => (
                <label
                  key={b}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.budget === b
                      ? "border-[#C9A84C] bg-[#FBF6EC]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={b}
                    checked={form.budget === b}
                    onChange={(e) => update("budget", e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    form.budget === b ? "border-[#C9A84C]" : "border-gray-300"
                  }`}>
                    {form.budget === b && (
                      <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                    )}
                  </div>
                  <span className="text-sm text-[#374151]">{b}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">
              {t.fields.urgency}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {URGENCIES.map((u) => (
                <label
                  key={u}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.urgency === u
                      ? "border-[#C9A84C] bg-[#FBF6EC]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={u}
                    checked={form.urgency === u}
                    onChange={(e) => update("urgency", e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    form.urgency === u ? "border-[#C9A84C]" : "border-gray-300"
                  }`}>
                    {form.urgency === u && (
                      <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                    )}
                  </div>
                  <span className="text-sm text-[#374151]">{u}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">
              {t.fields.message}
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder={t.fields.messagePlaceholder}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full bg-[#C9A84C] hover:bg-[#A8883A] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A1628] font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-lg hover:shadow-xl"
          >
            {loading ? t.submitLoading : t.submitIdle}
            {!loading && <ArrowRight size={18} />}
          </button>

          <p className="text-center text-xs text-[#6B7280]">
            {t.privacyNote}
          </p>
        </form>
      </div>
    </div>
  );
}
