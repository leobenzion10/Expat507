"use client";

import { useState } from "react";
import { Download, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { trackEvent } from "@/lib/analyticsEvents";

export default function GuiaCompletaPage() {
  const { locale, dict } = useLocale();
  const t = dict.guiaCompleta;

  const [form, setForm] = useState({ name: "", email: "", country: "" });
  const [language, setLanguage] = useState<"es" | "en">(locale);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ downloadUrl: string; emailSent: boolean } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.country) return;
    setLoading(true);
    try {
      const res = await fetch("/api/guide-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        trackEvent("guide_downloaded", { language, source: "guia-completa" });
        setResult({ downloadUrl: data.downloadUrl, emailSent: data.emailSent !== false });
      } else {
        toast.error(t.toastError);
      }
    } catch {
      toast.error(t.toastConnError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="gradient-navy grain py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#B8935A]" />
            <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-[#B8935A]" />
          </div>
          <h1
            className="text-3xl sm:text-5xl font-semibold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </div>

      <GoldDivider />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: cover mockup + chapters */}
          <div>
            {/* Cover mockup */}
            <div className="relative max-w-sm mx-auto lg:mx-0 mb-12">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-[#0B1A17]/15" />
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-[#0B1A17]/25" />
              <div className="gradient-navy grain relative rounded-2xl aspect-[3/4] p-8 flex flex-col justify-between border border-[#B8935A]/30 shadow-2xl overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-10 -right-6 text-white/[0.06] select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontStyle: "italic", fontSize: "9rem", lineHeight: 0.8 }}
                >
                  507
                </div>
                <div className="relative">
                  <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-[#B8935A] border border-[#B8935A]/40 rounded-full px-3 py-1 mb-6">
                    {t.coverBadge}
                  </span>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{t.coverSubtitle}</p>
                  <h2
                    className="text-white text-2xl leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.coverTitle}
                  </h2>
                </div>
                <div className="relative text-white/40 text-xs font-semibold tracking-widest uppercase">
                  Expat507
                </div>
              </div>
            </div>

            <h3
              className="text-xl font-semibold text-[#0B1A17] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.chaptersTitle}
            </h3>
            <div className="divide-y divide-gray-100">
              {t.chapters.map((ch) => (
                <div key={ch.n} className="flex gap-4 py-4">
                  <span
                    className="text-[#B8935A] text-lg font-semibold w-8 flex-shrink-0"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {ch.n}
                  </span>
                  <div>
                    <p className="font-semibold text-[#0B1A17] text-sm mb-0.5">{ch.title}</p>
                    <p className="text-[#6B7280] text-sm">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8 sm:p-10">
              {result ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FBF6EC] rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={28} className="text-[#B8935A]" />
                  </div>
                  <h3
                    className="text-2xl font-semibold text-[#0B1A17] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.success.title}
                  </h3>
                  <p className="text-[#6B7280] mb-6">{t.success.subtitle}</p>

                  {!result.emailSent && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-left mb-6">
                      <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">{t.success.emailFailedNote}</p>
                    </div>
                  )}

                  <a
                    href={result.downloadUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Download size={18} />
                    {t.success.downloadButton}
                  </a>
                </div>
              ) : (
                <>
                  <h3
                    className="text-xl font-semibold text-[#0B1A17] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.formTitle}
                  </h3>
                  <p className="text-[#6B7280] text-sm mb-6">{t.formSubtitle}</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.nameLabel}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder={t.namePlaceholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.emailLabel}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder={t.emailPlaceholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.countryLabel}</label>
                      <select
                        required
                        value={form.country}
                        onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all bg-white"
                      >
                        <option value="">{t.countryPlaceholder}</option>
                        {dict.countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1A17] mb-2">{t.languageLabel}</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["es", "en"] as const).map((l) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setLanguage(l)}
                            className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                              language === l
                                ? "bg-[#0B1A17] text-white border-[#0B1A17]"
                                : "bg-white text-[#6B7280] border-gray-200 hover:border-[#B8935A]"
                            }`}
                          >
                            {l === "es" ? t.languageEs : t.languageEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#B8935A] hover:bg-[#96763F] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B1A17] font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {loading ? t.submitLoading : t.submitIdle}
                      {!loading && <ArrowRight size={16} />}
                    </button>
                  </form>

                  <p className="text-xs text-[#6B7280] mt-4 text-center">{t.disclaimer}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
