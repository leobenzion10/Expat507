import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import FadeInUp from "@/components/motion/FadeInUp";

export default async function ConsultaCTA() {
  const locale = await getLocale();
  const t = getDictionary(locale).consultaCTA;

  return (
    <section className="py-20 bg-white">
      <GoldDivider className="mb-0 -mt-px" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <FadeInUp>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
                {t.eyebrow}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[#0B1A17] mb-5 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.titleLine1}
              <br />
              <span className="text-gradient-gold">{t.titleLine2}</span>
            </h2>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
              {t.description}
            </p>
            <div className="space-y-3 mb-8">
              {t.steps.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#FBF6EC] border border-[#B8935A]/30 flex items-center justify-center text-[#B8935A] text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-[#374151] text-sm">{step}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/consulta"
                className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-7 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Calendar size={18} />
                {t.ctaPrimary}
              </Link>
              <Link
                href="/asistente"
                className="inline-flex items-center justify-center gap-2 bg-[#F4F6F9] hover:bg-[#E8ECF2] text-[#0B1A17] font-semibold px-7 py-4 rounded-xl transition-all duration-200"
              >
                <MessageSquare size={18} />
                {t.ctaSecondary}
              </Link>
            </div>
          </FadeInUp>

          {/* Right - Visual */}
          <FadeInUp delay={0.15} className="relative">
            <div className="gradient-navy grain rounded-3xl p-8 text-white">
              <div className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase mb-6">
                {t.processTitle}
              </div>
              <div className="space-y-6">
                {t.process.map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-[#B8935A] text-2xl font-semibold opacity-40 w-8 flex-shrink-0" style={{ fontFamily: "var(--font-display)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="font-semibold mb-0.5">{item.title}</p>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <ArrowRight size={18} className="text-[#B8935A]" />
                <span className="text-white/70 text-sm">
                  {t.processFootnote}
                </span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
