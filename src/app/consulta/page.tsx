"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, MessageCircle, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import { useLocale } from "@/components/providers/LocaleProvider";

type FormState = {
  name: string;
  email: string;
  phoneCode: string;
  phone: string;
  country: string;
  objectives: string[];
  budget: string;
  urgency: string;
  message: string;
  subscribeNewsletter: boolean;
};

const STEP_KEYS = ["name", "email", "phone", "country", "objective", "budget", "urgency", "message"] as const;
type StepKey = (typeof STEP_KEYS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ConsultaPage() {
  const { locale, dict } = useLocale();
  const t = dict.consulta;
  const COUNTRIES = dict.countries;
  const DIAL_CODES = dict.dialCodes;
  const OBJECTIVES = t.objectives;
  const BUDGETS = t.budgets;
  const URGENCIES = t.urgencies;

  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phoneCode: "",
    phone: "",
    country: "",
    objectives: [],
    budget: "",
    urgency: "",
    message: "",
    subscribeNewsletter: false,
  });

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waEnabled = process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true" && !!waNumber;
  const waMessage = encodeURIComponent(
    t.success.waMessage.replace("{name}", form.name || "...").replace("{objective}", form.objectives.join(", ") || "...")
  );
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const calendlyEnabled = process.env.NEXT_PUBLIC_CALENDLY_ENABLED === "true" && !!calendlyUrl;

  const totalSteps = STEP_KEYS.length;
  const currentKey: StepKey = STEP_KEYS[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;

  function update(field: Exclude<keyof FormState, "objectives">, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleObjective(value: string) {
    setForm((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(value)
        ? prev.objectives.filter((o) => o !== value)
        : [...prev.objectives, value],
    }));
  }

  function canContinue(): boolean {
    switch (currentKey) {
      case "name":
        return form.name.trim().length > 0;
      case "email":
        return EMAIL_RE.test(form.email.trim());
      case "phone":
        return form.phoneCode !== "" && form.phone.trim().length > 0;
      case "country":
        return form.country !== "";
      case "objective":
        return form.objectives.length > 0;
      case "budget":
        return form.budget !== "";
      case "urgency":
        return form.urgency !== "";
      case "message":
        return true;
    }
  }

  function goNext() {
    if (isLastStep) {
      handleSubmit();
      return;
    }
    if (!canContinue()) return;
    setStepIndex((s) => s + 1);
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex((s) => s - 1);
  }

  function selectChoice(field: "budget" | "urgency", value: string) {
    update(field, value);
    setTimeout(() => {
      setStepIndex((s) => Math.min(s + 1, totalSteps - 1));
    }, 220);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const { phoneCode, phone, objectives, ...rest } = form;
      const payload = { ...rest, phone: `${phoneCode} ${phone}`.trim(), objective: objectives.join(", "), locale, source: "consulta" };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && currentKey !== "message") {
      e.preventDefault();
      goNext();
    }
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="gradient-navy pt-12 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#B8935A]/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={30} className="text-[#B8935A]" />
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
          {waEnabled && (
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366] rounded-2xl p-6 text-white text-center hover:opacity-90 transition-opacity mb-6"
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

          {calendlyEnabled && (
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#0B1A17] rounded-2xl p-6 text-white text-center hover:opacity-90 transition-opacity mb-6"
            >
              <div className="w-12 h-12 bg-[#B8935A]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar size={22} className="text-[#B8935A]" />
              </div>
              <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {t.success.calendlyTitle}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {t.success.calendlyDesc}
              </p>
              <span className="inline-flex items-center gap-1.5 bg-[#B8935A] text-[#0B1A17] text-sm font-bold px-4 py-2.5 rounded-xl">
                {t.success.calendlyButton}
                <ArrowRight size={15} />
              </span>
            </a>
          )}

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
          <div className="h-px w-10 bg-[#B8935A]" />
          <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
            {t.eyebrowBadge}
          </span>
          <div className="h-px w-10 bg-[#B8935A]" />
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">
              {t.progressLabel.replace("{current}", String(stepIndex + 1)).replace("{total}", String(totalSteps))}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B8935A] rounded-full transition-all duration-300"
              style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz card */}
        <div key={stepIndex} className="quiz-step bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8">
          {currentKey === "name" && (
            <div>
              <label className="block text-lg font-bold text-[#0B1A17] mb-4">{t.fields.name}</label>
              <input
                autoFocus
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.fields.namePlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-base text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
              />
            </div>
          )}

          {currentKey === "email" && (
            <div>
              <label className="block text-lg font-bold text-[#0B1A17] mb-4">{t.fields.email}</label>
              <input
                autoFocus
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.fields.emailPlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-base text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
              />
            </div>
          )}

          {currentKey === "phone" && (
            <div>
              <label className="block text-lg font-bold text-[#0B1A17] mb-4">{t.fields.phone}</label>
              <div className="flex gap-3">
                <select
                  autoFocus
                  value={form.phoneCode}
                  onChange={(e) => update("phoneCode", e.target.value)}
                  className="w-32 sm:w-40 border border-gray-200 rounded-xl px-3 py-3.5 text-base text-[#0B1A17] focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all bg-white"
                >
                  <option value="">{t.fields.phoneCodePlaceholder}</option>
                  {DIAL_CODES.map((d) => (
                    <option key={`${d.code}-${d.label}`} value={d.code}>{d.label}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.fields.phonePlaceholder}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                />
              </div>
            </div>
          )}

          {currentKey === "country" && (
            <div>
              <label className="block text-lg font-bold text-[#0B1A17] mb-4">{t.fields.country}</label>
              <select
                autoFocus
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-base text-[#0B1A17] focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all bg-white"
              >
                <option value="">{t.fields.countryPlaceholder}</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {currentKey === "objective" && (
            <div>
              <label className="block text-lg font-bold text-[#0B1A17] mb-1">{t.fields.objective}</label>
              <p className="text-xs text-[#6B7280] mb-4">{t.fields.objectiveHint}</p>
              <div className="grid grid-cols-1 gap-2">
                {OBJECTIVES.map((obj) => {
                  const selected = form.objectives.includes(obj);
                  return (
                    <button
                      key={obj}
                      type="button"
                      onClick={() => toggleObjective(obj)}
                      className={`flex items-center gap-3 text-left p-3.5 rounded-xl border transition-all ${
                        selected ? "border-[#B8935A] bg-[#FBF6EC]" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          selected ? "border-[#B8935A] bg-[#B8935A]" : "border-gray-300"
                        }`}
                      >
                        {selected && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <span className="text-sm text-[#374151]">{obj}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentKey === "budget" && (
            <div>
              <label className="block text-lg font-bold text-[#0B1A17] mb-4">{t.fields.budget}</label>
              <div className="grid grid-cols-1 gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => selectChoice("budget", b)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      form.budget === b
                        ? "border-[#B8935A] bg-[#FBF6EC]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm text-[#374151]">{b}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentKey === "urgency" && (
            <div>
              <label className="block text-lg font-bold text-[#0B1A17] mb-4">{t.fields.urgency}</label>
              <div className="grid grid-cols-1 gap-2">
                {URGENCIES.map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => selectChoice("urgency", u)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      form.urgency === u
                        ? "border-[#B8935A] bg-[#FBF6EC]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm text-[#374151]">{u}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentKey === "message" && (
            <div>
              <label className="block text-lg font-bold text-[#0B1A17] mb-4">{t.fields.message}</label>
              <textarea
                autoFocus
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={t.fields.messagePlaceholder}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-base text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all resize-none"
              />
              <label className="flex items-start gap-3 mt-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.subscribeNewsletter}
                  onChange={(e) => setForm((prev) => ({ ...prev, subscribeNewsletter: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 accent-[#B8935A] flex-shrink-0"
                />
                <span className="text-sm text-[#374151]">{t.fields.newsletterOptIn}</span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#0B1A17] transition-colors px-2 py-2"
              >
                <ArrowLeft size={15} />
                {t.backButton}
              </button>
            ) : (
              <span />
            )}

            {/* Multi-select and text-input steps need an explicit continue button; single-choice steps auto-advance */}
            {(currentKey === "name" || currentKey === "email" || currentKey === "phone" || currentKey === "country" || currentKey === "objective" || currentKey === "message") && (
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue() || loading}
                className="inline-flex items-center gap-2 bg-[#B8935A] hover:bg-[#96763F] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B1A17] font-bold px-6 py-3 rounded-xl transition-all"
              >
                {isLastStep ? (loading ? t.submitLoading : t.submitIdle) : t.continueButton}
                {!loading && <ArrowRight size={16} />}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-[#6B7280] mt-6">
          {t.privacyNote}
        </p>
      </div>
    </div>
  );
}
