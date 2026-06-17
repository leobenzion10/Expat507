"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, ArrowRight } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function NewsletterBanner() {
  const { locale, dict } = useLocale();
  const t = dict.newsletterBanner;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      if (res.ok) {
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
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 sm:p-14 text-center max-w-3xl mx-auto relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A84C] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0A1628] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <div className="w-14 h-14 bg-[#FBF6EC] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Mail size={24} className="text-[#C9A84C]" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
                {t.eyebrow}
              </span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>

            <h2
              className="text-3xl font-bold text-[#0A1628] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.title}
            </h2>
            <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
              {t.subtitle}
            </p>

            {done ? (
              <div className="bg-[#FBF6EC] border border-[#C9A84C]/30 rounded-2xl px-8 py-5">
                <p className="text-[#0A1628] font-semibold">
                  {t.successTitle}
                </p>
                <p className="text-[#6B7280] text-sm mt-1">
                  {t.successSubtitle}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] font-bold px-6 py-3.5 rounded-xl transition-all duration-200 whitespace-nowrap disabled:opacity-60"
                >
                  {loading ? t.submitLoading : t.submitIdle}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>
            )}

            <p className="text-xs text-[#6B7280] mt-4">
              {t.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
