"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { CATEGORIES, type Category } from "@/types";
import { Clock, Search } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getArticles, getPillar } from "@/content/articles";

export default function GuiasPage() {
  const { locale, dict } = useLocale();
  const t = dict.guias;
  const ALL_ARTICLES = getArticles(locale);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const clusters = CATEGORIES.map((cat) => ({
    ...cat,
    pillarArticle: getPillar(locale, cat.id),
    count: ALL_ARTICLES.filter((a) => a.category === cat.id).length,
  }));

  const filtered = ALL_ARTICLES.filter((a) => {
    const matchCat = activeCategory === "all" || a.category === activeCategory;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h1
            className="text-3xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {t.subtitle}
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mt-8">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-colors"
            />
          </div>
        </div>
      </div>

      <GoldDivider />

      {/* Clusters overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-6">
          {t.clustersEyebrow}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: cluster.bgColor }}
                >
                  {cluster.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0A1628] text-base" style={{ fontFamily: "var(--font-display)" }}>
                    {dict.categories[cluster.id].label}
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    {cluster.count === 1 ? t.guidesCountOne : t.guidesCount.replace("{n}", String(cluster.count))}
                  </p>
                </div>
              </div>

              {cluster.pillarArticle ? (
                <Link
                  href={`/guias/${cluster.pillarArticle.slug}`}
                  className="block bg-[#F4F6F9] hover:bg-[#FBF6EC] rounded-xl p-3.5 mb-4 transition-colors group"
                >
                  <p className="text-[10px] font-semibold text-[#C9A84C] uppercase tracking-wide mb-1">
                    {t.pillarLabel}
                  </p>
                  <p className="text-sm font-semibold text-[#0A1628] leading-snug group-hover:text-[#C9A84C] transition-colors">
                    {cluster.pillarArticle.title}
                  </p>
                </Link>
              ) : (
                <div className="bg-[#F4F6F9] rounded-xl p-3.5 mb-4">
                  <p className="text-xs text-[#9CA3AF]">{t.pillarComingSoon}</p>
                </div>
              )}

              <button
                onClick={() => setActiveCategory(cluster.id)}
                className="text-sm text-[#C9A84C] hover:underline font-medium inline-flex items-center gap-1"
              >
                {t.viewCluster}
              </button>
            </div>
          ))}
        </div>

        <GoldDivider className="mb-12" />

        <h2 className="text-xl font-bold text-[#0A1628] mb-6" style={{ fontFamily: "var(--font-display)" }}>
          {t.browseAllTitle}
        </h2>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-[#0A1628] text-white"
                : "bg-[#F4F6F9] text-[#6B7280] hover:bg-[#E8ECF2]"
            }`}
          >
            {t.filterAll}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0A1628] text-white"
                  : "bg-[#F4F6F9] text-[#6B7280] hover:bg-[#E8ECF2]"
              }`}
            >
              {cat.icon} {dict.categories[cat.id].label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-[#6B7280] mb-6">
          {t.resultsFound
            .replace("{n}", String(filtered.length))
            .replace("{label}", filtered.length === 1 ? t.guideSingular : t.guidePlural)}
          {activeCategory !== "all" && t.inCategory.replace("{category}", dict.categories[activeCategory].label)}
        </p>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#6B7280] text-lg">
              {t.noResults}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.id}
                href={`/guias/${article.slug}`}
                className="group"
              >
                <article className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
                  <div className="h-36 gradient-navy flex items-center justify-center relative">
                    <span className="text-4xl opacity-25">
                      {CATEGORIES.find((c) => c.id === article.category)?.icon}
                    </span>
                    <div className="absolute top-3 left-3">
                      <Badge category={article.category} label={dict.categories[article.category].label} />
                    </div>
                    {article.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                          {t.featuredBadge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3
                      className="font-bold text-[#0A1628] mb-2 leading-snug group-hover:text-[#C9A84C] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                      <Clock size={11} />
                      <span>{t.readTime.replace("{n}", String(article.read_time))}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
