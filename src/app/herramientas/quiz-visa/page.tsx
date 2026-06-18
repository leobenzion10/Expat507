"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle, Compass } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import HoneypotField from "@/components/ui/HoneypotField";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useHoneypot } from "@/lib/useHoneypot";
import { QUIZ_QUESTIONS, scoreQuiz, VISA_GUIDE_SLUG, type VisaKey } from "@/lib/tools/visaQuiz";
import { trackEvent } from "@/lib/analyticsEvents";

type Phase = "quiz" | "form" | "result";

export default function VisaQuizPage() {
  const { locale, dict } = useLocale();
  const t = dict.herramientas.quiz;

  const [phase, setPhase] = useState<Phase>("quiz");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VisaKey | null>(null);
  const honeypot = useHoneypot();

  const totalSteps = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[stepIndex];
  const qLabel = t.questions[currentQuestion.id as keyof typeof t.questions];

  function selectOption(optionId: string) {
    const next = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(next);
    setTimeout(() => {
      if (stepIndex < totalSteps - 1) {
        setStepIndex((s) => s + 1);
      } else {
        setPhase("form");
      }
    }, 180);
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      const { result: visaKey } = scoreQuiz(answers);
      const r = t.results[visaKey];
      const resultHtml = `
        <h3 style="color:#0B1A17;margin:0 0 8px;">${r.title}</h3>
        <p style="color:#374151;margin:0 0 12px;">${r.description}</p>
        <ul style="color:#374151;margin:0;padding-left:20px;">
          ${r.requirements.map((req) => `<li style="margin-bottom:6px;">${req}</li>`).join("")}
        </ul>
      `;
      const res = await fetch("/api/tools-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "visa-quiz",
          name: form.name,
          email: form.email,
          language: locale,
          result: { visaKey, answers },
          resultSummary: r.title,
          resultHtml,
          website: honeypot.website,
          ts: honeypot.ts,
        }),
      });
      if (res.ok) {
        trackEvent("tool_completed", { tool: "visa-quiz", result: visaKey });
        setResult(visaKey);
        setPhase("result");
      } else {
        toast.error(t.form.toastError);
      }
    } catch {
      toast.error(t.form.toastConnError);
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setResult(null);
    setPhase("quiz");
  }

  if (phase === "result" && result) {
    const r = t.results[result];
    return (
      <div className="pt-20 min-h-screen">
        <div className="gradient-navy grain pt-12 pb-16 px-4 text-center">
          <div className="w-16 h-16 bg-[#B8935A]/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={30} className="text-[#B8935A]" />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-semibold text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {r.title}
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">{r.description}</p>
        </div>

        <GoldDivider />

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8 mb-6">
            <h3 className="font-semibold text-[#0B1A17] mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {locale === "en" ? "Requirements" : "Requisitos"}
            </h3>
            <ul className="space-y-2">
              {r.requirements.map((req) => (
                <li key={req} className="flex gap-2 text-sm text-[#374151]">
                  <span className="text-[#B8935A]">✦</span>
                  {req}
                </li>
              ))}
            </ul>
            <Link
              href={`/guias/${VISA_GUIDE_SLUG[result]}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8935A] hover:text-[#96763F] mt-5 transition-colors"
            >
              {r.guideCta} →
            </Link>
          </div>

          <div className="gradient-navy grain rounded-2xl p-6 text-center mb-6">
            <p className="text-white font-semibold mb-4">{t.consultaCta}</p>
            <Link
              href="/consulta"
              className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-6 py-3 rounded-xl transition-all duration-200"
            >
              {t.consultaButton}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="text-center">
            <button onClick={restart} className="text-sm text-[#6B7280] hover:text-[#0B1A17] transition-colors">
              {t.restartButton}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <HoneypotField value={honeypot.website} onChange={honeypot.setWebsite} />
      <div className="gradient-navy grain pt-12 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#B8935A]" />
          <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">{t.eyebrow}</span>
          <div className="h-px w-10 bg-[#B8935A]" />
        </div>
        <h1
          className="text-3xl sm:text-5xl font-semibold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.title}
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      <GoldDivider />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {phase === "quiz" && (
          <>
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

            <div key={stepIndex} className="quiz-step bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8">
              <div className="w-12 h-12 bg-[#FBF6EC] rounded-xl flex items-center justify-center mb-5">
                <Compass size={20} className="text-[#B8935A]" />
              </div>
              <label className="block text-lg font-semibold text-[#0B1A17] mb-5">{qLabel.label}</label>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(qLabel.options).map(([optId, optLabel]) => (
                  <button
                    key={optId}
                    type="button"
                    onClick={() => selectOption(optId)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      answers[currentQuestion.id] === optId
                        ? "border-[#B8935A] bg-[#FBF6EC]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm text-[#374151]">{optLabel}</span>
                  </button>
                ))}
              </div>

              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#0B1A17] transition-colors mt-6"
                >
                  <ArrowLeft size={15} />
                  {t.backButton}
                </button>
              )}
            </div>
          </>
        )}

        {phase === "form" && (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-[#0B1A17] mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {t.form.title}
            </h3>
            <p className="text-[#6B7280] text-sm mb-6">{t.form.subtitle}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.form.nameLabel}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder={t.form.namePlaceholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.form.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder={t.form.emailPlaceholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B8935A] hover:bg-[#96763F] disabled:opacity-50 text-[#0B1A17] font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {loading ? t.form.submitLoading : t.form.submitIdle}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
            <p className="text-xs text-[#6B7280] mt-4 text-center">{t.form.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
