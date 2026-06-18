"use client";

import { useState } from "react";
import { ArrowRight, Calculator, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { calculateCost, type Zone, type FamilySize, type Transport, type Education, type CostBreakdown } from "@/lib/tools/costCalculator";
import { trackEvent } from "@/lib/analyticsEvents";

export default function CostCalculatorPage() {
  const { locale, dict } = useLocale();
  const t = dict.herramientas.costCalculator;

  const [inputs, setInputs] = useState<{ zone: Zone; familySize: FamilySize; transport: Transport; education: Education }>({
    zone: "other",
    familySize: "couple",
    transport: "mixed",
    education: "none",
  });
  const [result, setResult] = useState<CostBreakdown | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: "", email: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setResult(calculateCost(inputs));
    setSent(false);
    trackEvent("tool_completed", { tool: "cost-calculator" });
  }

  function shareText(r: CostBreakdown) {
    const cat = t.results.categories;
    return [
      `${t.results.title}: $${r.total.toLocaleString()}/mo`,
      `${cat.housing}: $${r.housing.toLocaleString()}`,
      `${cat.food}: $${r.food.toLocaleString()}`,
      `${cat.transport}: $${r.transport.toLocaleString()}`,
      `${cat.utilities}: $${r.utilities.toLocaleString()}`,
      `${cat.health}: $${r.health.toLocaleString()}`,
      `${cat.education}: $${r.education.toLocaleString()}`,
    ].join("\n");
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(shareText(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !emailForm.email) return;
    setSending(true);
    try {
      const resultHtml = `
        <p style="color:#0B1A17;font-weight:bold;margin:0 0 12px;">${t.results.title}: $${result.total.toLocaleString()}/mo</p>
        <table style="width:100%;border-collapse:collapse;">
          ${Object.entries(t.results.categories)
            .map(
              ([key, label]) =>
                `<tr><td style="padding:4px 0;color:#374151;">${label}</td><td style="padding:4px 0;text-align:right;color:#0B1A17;font-weight:600;">$${(result as unknown as Record<string, number>)[key].toLocaleString()}</td></tr>`
            )
            .join("")}
        </table>
      `;
      const res = await fetch("/api/tools-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "cost-calculator",
          name: emailForm.name,
          email: emailForm.email,
          language: locale,
          result: { inputs, breakdown: result },
          resultSummary: `${t.results.title}: $${result.total}/mo`,
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

  const categoryRows: { key: keyof typeof t.results.categories; value: number }[] = result
    ? [
        { key: "housing", value: result.housing },
        { key: "food", value: result.food },
        { key: "transport", value: result.transport },
        { key: "utilities", value: result.utilities },
        { key: "health", value: result.health },
        { key: "education", value: result.education },
        { key: "misc", value: result.misc },
      ]
    : [];

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8 h-fit">
            <div className="w-12 h-12 bg-[#FBF6EC] rounded-xl flex items-center justify-center mb-5">
              <Calculator size={20} className="text-[#B8935A]" />
            </div>
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.form.zoneLabel}</label>
                <select
                  value={inputs.zone}
                  onChange={(e) => setInputs((p) => ({ ...p, zone: e.target.value as Zone }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B1A17] focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 bg-white"
                >
                  {Object.entries(t.form.zoneOptions).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.form.familySizeLabel}</label>
                <select
                  value={inputs.familySize}
                  onChange={(e) => setInputs((p) => ({ ...p, familySize: e.target.value as FamilySize }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B1A17] focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 bg-white"
                >
                  {Object.entries(t.form.familySizeOptions).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.form.transportLabel}</label>
                <select
                  value={inputs.transport}
                  onChange={(e) => setInputs((p) => ({ ...p, transport: e.target.value as Transport }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B1A17] focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 bg-white"
                >
                  {Object.entries(t.form.transportOptions).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.form.educationLabel}</label>
                <select
                  value={inputs.education}
                  onChange={(e) => setInputs((p) => ({ ...p, education: e.target.value as Education }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B1A17] focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 bg-white"
                >
                  {Object.entries(t.form.educationOptions).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {result ? t.recalculateButton : t.form.calculateButton}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Result */}
          <div>
            {result ? (
              <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8">
                <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide mb-1">{t.results.title}</h3>
                <p className="text-4xl font-semibold text-[#0B1A17] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  ${result.total.toLocaleString()}<span className="text-base text-[#6B7280] font-normal">/{locale === "en" ? "mo" : "mes"}</span>
                </p>

                <div className="divide-y divide-gray-100 mb-6">
                  {categoryRows.map((row) => (
                    <div key={row.key} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-[#6B7280]">{t.results.categories[row.key]}</span>
                      <span className="font-semibold text-[#0B1A17]">${row.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#9CA3AF] mb-6">{t.results.disclaimer}</p>

                <button
                  onClick={handleCopy}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F4F6F9] hover:bg-[#E8ECF2] text-[#0B1A17] font-semibold py-3 rounded-xl transition-all duration-200 mb-6"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? t.results.copiedLabel : t.results.shareButton}
                </button>

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
            ) : (
              <div className="bg-[#F4F6F9] border border-gray-100 rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center">
                <p className="text-[#6B7280] text-sm">
                  {locale === "en" ? "Fill out the form to see your estimate." : "Completa el formulario para ver tu estimado."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
