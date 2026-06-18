"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Clock } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { simulateInvestment, type SimulatorResult } from "@/lib/tools/investmentSimulator";

export default function InvestmentSimulatorPage() {
  const { locale, dict } = useLocale();
  const t = dict.herramientas.investmentSimulator;

  const [amountInput, setAmountInput] = useState("");
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [emailForm, setEmailForm] = useState({ name: "", email: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSimulate(e: React.FormEvent) {
    e.preventDefault();
    const amount = parseInt(amountInput.replace(/[^0-9]/g, ""), 10);
    if (!amount || amount <= 0) return;
    setResult(simulateInvestment(amount));
    setSent(false);
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !emailForm.email) return;
    setSending(true);
    try {
      const resultHtml = result.qualifies
        ? `
          <p style="color:#0B1A17;font-weight:bold;margin:0 0 12px;">${t.results.qualifiedTitle}</p>
          <ul style="color:#374151;margin:0;padding-left:20px;">
            ${result.modalities.map((m) => `<li style="margin-bottom:6px;">${t.modalities[m].title} (${t.modalities[m].amount}) — ${t.modalities[m].desc}</li>`).join("")}
          </ul>
          <p style="color:#374151;margin:12px 0 0;">${t.results.timelineText}</p>
        `
        : `<p style="color:#0B1A17;font-weight:bold;margin:0;">${t.results.notQualifiedTitle}</p><p style="color:#374151;margin:8px 0 0;">${t.results.notQualifiedSubtitle}</p>`;

      const res = await fetch("/api/tools-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "investment-simulator",
          name: emailForm.name,
          email: emailForm.email,
          language: locale,
          result: { amount: result.amount, qualifies: result.qualifies, modalities: result.modalities },
          resultSummary: result.qualifies ? t.results.qualifiedTitle : t.results.notQualifiedTitle,
          resultHtml,
        }),
      });
      if (res.ok) {
        setSent(true);
        toast.success(t.form2.successMessage);
      } else {
        toast.error(t.form2.toastError);
      }
    } catch {
      toast.error(t.form2.toastConnError);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="gradient-navy grain pt-12 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#B8935A]" />
          <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">{t.eyebrow}</span>
          <div className="h-px w-10 bg-[#B8935A]" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
          {t.title}
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      <GoldDivider />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="w-12 h-12 bg-[#FBF6EC] rounded-xl flex items-center justify-center mb-5">
            <Building2 size={20} className="text-[#B8935A]" />
          </div>
          <form onSubmit={handleSimulate}>
            <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.form.amountLabel}</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder={t.form.amountPlaceholder}
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-6 py-3.5 rounded-xl transition-all duration-200 whitespace-nowrap"
              >
                {t.form.simulateButton}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8">
            {result.qualifies ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 size={24} className="text-[#B8935A]" />
                  <h3 className="text-xl font-semibold text-[#0B1A17]" style={{ fontFamily: "var(--font-display)" }}>
                    {t.results.qualifiedTitle}
                  </h3>
                </div>
                <p className="text-[#6B7280] text-sm mb-5">
                  {t.results.qualifiedSubtitle.replace("${amount}", `$${result.amount.toLocaleString()}`)}
                </p>

                <div className="space-y-3 mb-6">
                  {result.modalities.map((m) => (
                    <div key={m} className="flex items-start gap-3 bg-[#FBF6EC] border border-[#B8935A]/20 rounded-xl p-4">
                      <div className="flex-1">
                        <p className="font-semibold text-[#0B1A17] text-sm">{t.modalities[m].title} — {t.modalities[m].amount}</p>
                        <p className="text-[#6B7280] text-xs mt-0.5">{t.modalities[m].desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 bg-[#F4F6F9] rounded-xl p-4 mb-6">
                  <Clock size={18} className="text-[#B8935A] flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0B1A17] text-sm">{t.results.timelineTitle}</p>
                    <p className="text-[#6B7280] text-xs">{t.results.timelineText}</p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#0B1A17] mb-3">{t.results.stepsTitle}</p>
                <ol className="space-y-2 mb-6">
                  {t.results.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-[#374151]">
                      <span className="text-[#B8935A] font-semibold flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>

                <Link
                  href="/guias/residencia-permanente-inversionista-calificado-panama"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8935A] hover:text-[#96763F] mb-6 transition-colors"
                >
                  {t.results.guideCta} →
                </Link>

                <p className="text-xs text-[#9CA3AF] mb-6">{t.results.disclaimer}</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-[#0B1A17] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {t.results.notQualifiedTitle}
                </h3>
                <p className="text-[#6B7280] text-sm mb-5">{t.results.notQualifiedSubtitle}</p>
                <Link
                  href="/herramientas/quiz-visa"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8935A] hover:text-[#96763F] mb-6 transition-colors"
                >
                  {t.results.notQualifiedCta} →
                </Link>
              </>
            )}

            <GoldDivider className="mb-6" />

            {sent ? (
              <p className="text-center text-sm text-[#0B1A17] font-semibold">{t.form2.successMessage}</p>
            ) : (
              <>
                <p className="text-sm font-semibold text-[#0B1A17] mb-3">{t.form2.title}</p>
                <form onSubmit={handleSendEmail} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder={t.form2.namePlaceholder}
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A]"
                  />
                  <input
                    type="email"
                    required
                    value={emailForm.email}
                    onChange={(e) => setEmailForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder={t.form2.emailPlaceholder}
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A]"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-[#B8935A] hover:bg-[#96763F] disabled:opacity-50 text-[#0B1A17] font-semibold px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-colors"
                  >
                    {sending ? t.form2.submitLoading : t.form2.submitIdle}
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        <div className="gradient-navy grain rounded-2xl p-6 text-center mt-8">
          <p className="text-white font-semibold mb-4">{t.consultaCta}</p>
          <Link
            href="/consulta"
            className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-6 py-3 rounded-xl transition-all duration-200"
          >
            {t.consultaButton}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
