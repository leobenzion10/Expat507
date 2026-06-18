"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import GoldDivider from "@/components/ui/GoldDivider";
import HoneypotField from "@/components/ui/HoneypotField";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useHoneypot } from "@/lib/useHoneypot";
import { trackEvent } from "@/lib/analyticsEvents";

export default function NewsletterBanner() {
  const { locale, dict } = useLocale();
  const t = dict.newsletterBanner;
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<"es" | "en">(locale);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const honeypot = useHoneypot();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, language, source: "newsletter_banner", website: honeypot.website, ts: honeypot.ts }),
      });
      if (res.ok) {
        trackEvent("newsletter_subscribed", { language, source: "newsletter_banner" });
        setDone(true);
        toast.success(t.toastSuccess);
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
    <section className="py-20 bg-[#F4F6F9]">
      <GoldDivider className="mb-0 -mt-px" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-gray-100 p-10 sm:p-14 text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <HoneypotField value={honeypot.website} onChange={honeypot.setWebsite} />
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B8935A] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0B1A17] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <div className="w-14 h-14 bg-[#FBF6EC] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Mail size={24} className="text-[#B8935A]" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
                {t.eyebrow}
              </span>
              <div className="h-px w-8 bg-[#B8935A]" />
            </div>

            <h2
              className="text-3xl font-semibold text-[#0B1A17] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.title}
            </h2>
            <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
              {t.subtitle}
            </p>

            {done ? (
              <div className="bg-[#FBF6EC] border border-[#B8935A]/30 rounded-2xl px-8 py-6">
                <p className="text-[#0B1A17] font-semibold">
                  {t.successTitle}
                </p>
                <p className="text-[#6B7280] text-sm mt-1 mb-4">
                  {t.successSubtitle}
                </p>
                <a
                  href={`/guias/guia-expat507-${language}.pdf`}
                  download
                  className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-6 py-3 rounded-xl transition-all duration-200"
                >
                  <Download size={16} />
                  {t.downloadButton}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex justify-center gap-2 mb-3">
                  {(["es", "en"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLanguage(l)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        language === l
                          ? "bg-[#0B1A17] text-white border-[#0B1A17]"
                          : "bg-white text-[#6B7280] border-gray-200 hover:border-[#B8935A]"
                      }`}
                    >
                      {l === "es" ? t.languageEs : t.languageEn}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-6 py-3.5 rounded-xl transition-all duration-200 whitespace-nowrap disabled:opacity-60"
                  >
                    {loading ? t.submitLoading : t.submitIdle}
                    {!loading && <ArrowRight size={16} />}
                  </button>
                </div>
              </form>
            )}

            <p className="text-xs text-[#6B7280] mt-4">
              {t.footnote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
