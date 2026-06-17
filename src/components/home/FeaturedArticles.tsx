import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Clock } from "lucide-react";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getFeaturedArticles } from "@/content/articles";

export default async function FeaturedArticles() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.featuredArticles;
  const FEATURED_ARTICLES = getFeaturedArticles(locale);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
                {t.eyebrow}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0A1628]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.title}
            </h2>
          </div>
          <Link
            href="/guias"
            className="text-sm font-semibold text-[#C9A84C] hover:text-[#A8883A] transition-colors border-b border-[#C9A84C] pb-0.5 whitespace-nowrap"
          >
            {t.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_ARTICLES.map((article, i) => (
            <Link
              key={article.id}
              href={`/guias/${article.slug}`}
              className={`group ${i === 0 ? "md:col-span-1" : ""}`}
            >
              <article className="h-full bg-[#F4F6F9] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 card-hover border border-gray-100">
                {/* Image placeholder */}
                <div className="relative h-48 gradient-navy flex items-center justify-center overflow-hidden">
                  <div className="text-5xl opacity-30">
                    {article.category === "migracion" && "🛂"}
                    {article.category === "banca" && "🏦"}
                    {article.category === "bienes-raices" && "🏙️"}
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge category={article.category} label={dict.categories[article.category].label} />
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className="text-lg font-bold text-[#0A1628] mb-3 group-hover:text-[#C9A84C] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <Clock size={12} />
                    <span>{t.readTime.replace("{n}", String(article.read_time))}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
