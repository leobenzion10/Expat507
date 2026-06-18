import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Clock } from "lucide-react";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getFeaturedArticles } from "@/content/articles";
import FadeInUp from "@/components/motion/FadeInUp";

export default async function FeaturedArticles() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.featuredArticles;
  const FEATURED_ARTICLES = getFeaturedArticles(locale);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
                {t.eyebrow}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[#0B1A17]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.title}
            </h2>
          </div>
          <Link
            href="/guias"
            className="text-sm font-semibold text-[#B8935A] hover:text-[#96763F] transition-colors border-b border-[#B8935A] pb-0.5 whitespace-nowrap"
          >
            {t.viewAll}
          </Link>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_ARTICLES.map((article, i) => (
            <FadeInUp key={article.id} delay={i * 0.08} className={i === 0 ? "md:col-span-1" : ""}>
              <Link href={`/guias/${article.slug}`} className="group block h-full">
                <article className="card-editorial h-full bg-[#F4F6F9] rounded-2xl overflow-hidden">
                  {/* Image placeholder */}
                  <div className="relative h-48 gradient-navy grain flex items-center justify-center overflow-hidden">
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
                      className="text-lg font-semibold text-[#0B1A17] mb-3 group-hover:text-[#B8935A] transition-colors leading-snug"
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
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
