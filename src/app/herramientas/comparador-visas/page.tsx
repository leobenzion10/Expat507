"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import HoneypotField from "@/components/ui/HoneypotField";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useHoneypot } from "@/lib/useHoneypot";
import { VISA_DATA, filterVisas, type BudgetFilter, type YesNoAny, type ComparatorVisaKey } from "@/lib/tools/visaComparator";
import { trackEvent } from "@/lib/analyticsEvents";

export default function VisaComparatorPage() {
  const { locale, dict } = useLocale();
  const t = dict.herramientas.visaComparator;

  const [budget, setBudget] = useState<BudgetFilter>("any");
  const [wantsWork, setWantsWork] = useState<YesNoAny>("any");
  const [isRetired, setIsRetired] = useState<YesNoAny>("any");
  const [emailForm, setEmailForm] = useState({ name: "", email: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const honeypot = useHoneypot();

  const visibleKeys = useMemo(() => filterVisas({ budget, wantsWork, isRetired }), [budget, wantsWork, isRetired]);
  const visibleData = VISA_DATA.filter((v) => visibleKeys.includes(v.key));

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!emailForm.email) return;
    setSending(true);
    try {
      const resultHtml = `
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <th style="text-align:left;padding:6px;border-bottom:1px solid #E5E7EB;">${t.table.visaHeader}</th>
            <th style="text-align:left;padding:6px;border-bottom:1px solid #E5E7EB;">${t.table.minRequirementHeader}</th>
            <th style="text-align:left;padding:6px;border-bottom:1px solid #E5E7EB;">${t.table.pathHeader}</th>
          </tr>
          ${visibleData
            .map(
              (v) =>
                `<tr><td style="padding:6px;color:#374151;">${t.visas[v.key].name}</td><td style="padding:6px;color:#374151;">${v.minRequirement}</td><td style="padding:6px;color:#374151;">${t.paths[v.pathToResidency as keyof typeof t.paths]}</td></tr>`
            )
            .join("")}
        </table>
      `;
      const res = await fetch("/api/tools-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "visa-comparator",
          name: emailForm.name,
          email: emailForm.email,
          language: locale,
          result: { filters: { budget, wantsWork, isRetired }, visibleKeys },
          resultSummary: `${t.title}: ${visibleData.map((v) => t.visas[v.key].name).join(", ")}`,
          resultHtml,
          website: honeypot.website,
          ts: honeypot.ts,
        }),
      });
      if (res.ok) {
        trackEvent("tool_completed", { tool: "visa-comparator" });
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
      <HoneypotField value={honeypot.website} onChange={honeypot.setWebsite} />
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Filters */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#FBF6EC] rounded-xl flex items-center justify-center">
              <SlidersHorizontal size={18} className="text-[#B8935A]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.filters.budgetLabel}</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value as BudgetFilter)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0B1A17] focus:outline-none focus:border-[#B8935A] bg-white"
              >
                {Object.entries(t.filters.budgetOptions).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.filters.wantsWorkLabel}</label>
              <select
                value={wantsWork}
                onChange={(e) => setWantsWork(e.target.value as YesNoAny)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0B1A17] focus:outline-none focus:border-[#B8935A] bg-white"
              >
                {Object.entries(t.filters.wantsWorkOptions).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.filters.isRetiredLabel}</label>
              <select
                value={isRetired}
                onChange={(e) => setIsRetired(e.target.value as YesNoAny)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0B1A17] focus:outline-none focus:border-[#B8935A] bg-white"
              >
                {Object.entries(t.filters.isRetiredOptions).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {visibleData.length > 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-x-auto mb-8">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-[#0B1A17]">{t.table.visaHeader}</th>
                  <th className="text-left p-4 font-semibold text-[#0B1A17]">{t.table.minRequirementHeader}</th>
                  <th className="text-left p-4 font-semibold text-[#0B1A17]">{t.table.pathHeader}</th>
                  <th className="text-center p-4 font-semibold text-[#0B1A17]">{t.table.worksLocallyHeader}</th>
                  <th className="text-left p-4 font-semibold text-[#0B1A17]">{t.table.setupCostHeader}</th>
                  <th className="text-left p-4 font-semibold text-[#0B1A17]">{t.table.maintenanceCostHeader}</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {visibleData.map((visa) => (
                  <tr key={visa.key} className="border-b border-gray-50 last:border-0">
                    <td className="p-4 font-semibold text-[#0B1A17]">{t.visas[visa.key as ComparatorVisaKey].name}</td>
                    <td className="p-4 text-[#374151]">{visa.minRequirement}</td>
                    <td className="p-4 text-[#374151]">{t.paths[visa.pathToResidency as keyof typeof t.paths]}</td>
                    <td className="p-4 text-center">
                      {visa.worksLocally === true ? (
                        <Check size={16} className="text-[#0E5B4A] inline" />
                      ) : visa.worksLocally === "conditional" ? (
                        <span className="text-[#B8935A] text-xs font-semibold">~</span>
                      ) : (
                        <X size={16} className="text-gray-300 inline" />
                      )}
                    </td>
                    <td className="p-4 text-[#374151]">{visa.setupCost}</td>
                    <td className="p-4 text-[#374151]">{visa.maintenanceCost}</td>
                    <td className="p-4">
                      <Link
                        href={`/guias/${t.visas[visa.key as ComparatorVisaKey].slug}`}
                        className="text-[#B8935A] hover:text-[#96763F] font-semibold text-xs whitespace-nowrap transition-colors"
                      >
                        {t.viewGuideButton} →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-[#F4F6F9] border border-gray-100 rounded-3xl p-10 text-center mb-8">
            <p className="font-semibold text-[#0B1A17] mb-1">{t.table.noResultsTitle}</p>
            <p className="text-[#6B7280] text-sm">{t.table.noResultsSubtitle}</p>
          </div>
        )}

        <p className="text-xs text-[#9CA3AF] mb-8 text-center">{t.disclaimer}</p>

        {/* Email capture */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
          {sent ? (
            <p className="text-center text-sm text-[#0B1A17] font-semibold">{t.form2.successMessage}</p>
          ) : (
            <>
              <p className="text-sm font-semibold text-[#0B1A17] mb-3 text-center">{t.form2.title}</p>
              <form onSubmit={handleSendEmail} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
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

        <div className="gradient-navy grain rounded-2xl p-6 text-center">
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
