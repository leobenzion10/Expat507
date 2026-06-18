import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import FadeInUp from "@/components/motion/FadeInUp";

export default async function HerramientasPage() {
  const locale = await getLocale();
  const t = getDictionary(locale).herramientas.hub;

  return (
    <div className="pt-20">
      <div className="gradient-navy grain py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
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
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </div>

      <GoldDivider />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.tools.map((tool, i) => (
            <FadeInUp key={tool.slug} delay={i * 0.08}>
              <Link href={`/herramientas/${tool.slug}`} className="card-editorial group block bg-white rounded-2xl p-7 h-full">
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h3
                  className="text-xl font-semibold text-[#0B1A17] mb-2 group-hover:text-[#B8935A] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tool.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{tool.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[#B8935A] text-sm font-semibold">
                  {locale === "en" ? "Try it" : "Probarla"}
                  <ArrowRight size={14} />
                </span>
              </Link>
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
}
