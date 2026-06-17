import Link from "next/link";
import { CATEGORIES } from "@/types";
import GoldDivider from "@/components/ui/GoldDivider";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function CategoryGrid() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.categoryGrid;

  return (
    <section className="py-20 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </div>

        <GoldDivider className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/guias?category=${cat.id}`}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 card-hover"
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
                    className="text-lg font-bold text-[#0A1628] mb-1 group-hover:text-[#C9A84C] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {dict.categories[cat.id].label}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {dict.categories[cat.id].description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[#C9A84C] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{t.viewGuides}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 text-[#0A1628] font-semibold hover:text-[#C9A84C] transition-colors border-b-2 border-[#C9A84C] pb-1"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
