"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Mail, BookOpen, TrendingUp, Shield, Download } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import HoneypotField from "@/components/ui/HoneypotField";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useHoneypot } from "@/lib/useHoneypot";
import { trackEvent } from "@/lib/analyticsEvents";

const ICONS = [TrendingUp, Shield, BookOpen, Mail];

export default function NewsletterPage() {
  const { locale, dict } = useLocale();
  const t = dict.newsletter;
  const tg = dict.guiaCompleta;
  const [form, setForm] = useState({ name: "", email: "" });
  const [language, setLanguage] = useState<"es" | "en">(locale);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const honeypot = useHoneypot();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language, source: "newsletter_page", website: honeypot.website, ts: honeypot.ts }),
      });
      if (res.ok) {
        trackEvent("newsletter_subscribed", { language, source: "newsletter_page" });
        setDone(true);
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

  const BENEFITS = t.benefits.map((b, i) => ({ ...b, icon: ICONS[i] }));

  if (done) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="gradient-navy py-24 px-4 text-center">
          <div className="w-20 h-20 bg-[#B8935A]/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-[#B8935A]" />
          </div>
          <h1
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.success.title}
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto mb-6">
            {t.success.subtitlePrefix}
            <strong className="text-[#B8935A]">{form.email}</strong>{t.success.subtitleSuffix}
          </p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-sm mx-auto mb-6">
            <p className="text-white text-sm">
              {t.success.boxText}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`/guias/guia-expat507-${language}.pdf`}
              download
              className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-6 py-3.5 rounded-xl transition-all duration-200"
            >
              <Download size={16} />
              {t.success.downloadButton}
            </a>
            <Link
              href="/guias/errores-comunes-expatriados-panama"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-xl transition-all duration-200"
            >
              {t.success.readArticleButton}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <HoneypotField value={honeypot.website} onChange={honeypot.setWebsite} />
      {/* Header */}
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#B8935A]" />
          <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
            {t.badge}
          </span>
          <div className="h-px w-10 bg-[#B8935A]" />
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.title}
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <GoldDivider />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Benefits */}
          <div>
            <h2
              className="text-2xl font-bold text-[#0B1A17] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.benefitsTitle}
            </h2>
            <div className="space-y-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FBF6EC] rounded-xl flex items-center justify-center flex-shrink-0">
                    <b.icon size={20} className="text-[#B8935A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1A17] mb-1">{b.title}</h3>
                    <p className="text-sm text-[#6B7280]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#FBF6EC] border border-[#B8935A]/30 rounded-2xl p-5">
              <p className="text-sm text-[#374151] mb-2">
                {t.highlightText}
              </p>
              <p className="text-sm text-[#374151]">
                {t.highlightLinkPrefix}{" "}
                <Link
                  href="/guias/errores-comunes-expatriados-panama"
                  className="font-semibold text-[#B8935A] hover:text-[#96763F] transition-colors"
                >
                  {t.highlightLinkText}
                </Link>
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8">
              <div className="w-14 h-14 bg-[#FBF6EC] rounded-2xl flex items-center justify-center mb-5">
                <Mail size={24} className="text-[#B8935A]" />
              </div>
              <h3
                className="text-xl font-bold text-[#0B1A17] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.formTitle}
              </h3>
              <p className="text-[#6B7280] text-sm mb-6">
                {t.formSubtitle}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1A17] mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder={t.namePlaceholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1A17] mb-2">
                    {t.emailLabel}
                  </label>
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
                  <label className="block text-sm font-semibold text-[#0B1A17] mb-2">
                    {tg.languageLabel}
                  </label>
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
                        {l === "es" ? tg.languageEs : tg.languageEn}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!form.email || loading}
                  className="w-full bg-[#B8935A] hover:bg-[#96763F] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B1A17] font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? t.submitLoading : t.submitIdle}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex justify-center gap-6 text-xs text-[#6B7280]">
                  {t.footnotes.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
