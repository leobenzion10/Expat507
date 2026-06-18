import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import FadeInUp from "@/components/motion/FadeInUp";

export default async function ToolsCTA() {
  const locale = await getLocale();
  const t = getDictionary(locale).herramientas.hub;

  return (
    <section className="py-16 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-10">
            <p className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase mb-2">{t.eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B1A17]" style={{ fontFamily: "var(--font-display)" }}>
              {t.title}
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-2">{t.subtitle}</p>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {t.tools.map((tool, i) => (
            <FadeInUp key={tool.slug} delay={i * 0.06}>
              <Link href={`/herramientas/${tool.slug}`} className="card-editorial group block bg-white rounded-2xl p-6 h-full">
                <div className="text-2xl mb-3">{tool.icon}</div>
                <h3 className="text-base font-semibold text-[#0B1A17] mb-1.5 group-hover:text-[#B8935A] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {tool.title}
                </h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{tool.desc}</p>
              </Link>
            </FadeInUp>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/herramientas"
            className="inline-flex items-center justify-center gap-2 bg-[#0B1A17] hover:bg-[#0E2A24] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
          >
            {locale === "en" ? "See all tools" : "Ver todas las herramientas"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
