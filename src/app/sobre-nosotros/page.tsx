import Link from "next/link";
import GoldDivider from "@/components/ui/GoldDivider";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale).sobreNosotros;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function SobreNosotrosPage() {
  const locale = await getLocale();
  const t = getDictionary(locale).sobreNosotros;

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
            {t.badge}
          </span>
          <div className="h-px w-10 bg-[#C9A84C]" />
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Story */}
        <div className="prose-expat max-w-none mb-16">
          <h2
            className="text-2xl font-bold text-[#0A1628] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.storyTitle}
          </h2>
          {t.storyParagraphs.map((p, i) => (
            <p key={i} className="text-[#374151] leading-relaxed mb-5">
              {p}
            </p>
          ))}
        </div>

        <GoldDivider className="mb-16" />

        {/* Values */}
        <div className="mb-16">
          <h2
            className="text-2xl font-bold text-[#0A1628] mb-8 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.values.map((v) => (
              <div
                key={v.title}
                className="bg-[#F4F6F9] rounded-2xl p-6"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3
                  className="font-bold text-[#0A1628] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="gradient-navy rounded-3xl p-10 text-center">
          <h3
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.ctaTitle}
          </h3>
          <p className="text-white/60 mb-6">
            {t.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/consulta"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] font-bold px-6 py-3.5 rounded-xl transition-colors"
            >
              {t.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/guias"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-xl transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
