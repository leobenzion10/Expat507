import Link from "next/link";
import { CATEGORIES } from "@/types";
import GoldDivider from "@/components/ui/GoldDivider";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import FadeInUp from "@/components/motion/FadeInUp";

export default async function CategoryGrid() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.categoryGrid;

  return (
    <section className="py-20 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#B8935A]" />
            <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-[#B8935A]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[#0B1A17] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </FadeInUp>

        <GoldDivider className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <FadeInUp key={cat.id} delay={i * 0.06}>
              <Link
                href={`/guias?category=${cat.id}`}
                className="card-editorial group block bg-white rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: cat.bgColor }}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-[#0B1A17] mb-1 group-hover:text-[#B8935A] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {dict.categories[cat.id].label}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {dict.categories[cat.id].description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[#B8935A] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t.viewGuides}</span>
                  <span>→</span>
                </div>
              </Link>
            </FadeInUp>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 text-[#0B1A17] font-semibold hover:text-[#B8935A] transition-colors border-b-2 border-[#B8935A] pb-1"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
