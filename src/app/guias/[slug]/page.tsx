import { notFound } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import GoldDivider from "@/components/ui/GoldDivider";
import { Clock, ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { CATEGORIES } from "@/types";
import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getArticle } from "@/content/articles";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticle(locale, slug);
  if (!article) return { title: getDictionary(locale).guiaDetail.notFoundTitle };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.guiaDetail;
  const article = getArticle(locale, slug);

  if (!article) notFound();

  const categoryInfo = CATEGORIES.find((c) => c.id === article.category);

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="gradient-navy pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            {t.back}
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <Badge category={article.category} label={dict.categories[article.category].label} />
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h1>
          <p className="text-white/70 text-lg mb-6">{article.excerpt}</p>
          <div className="flex items-center gap-5 text-white/50 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatDate(article.published_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{t.readTime.replace("{n}", String(article.read_time))}</span>
            </div>
            <span>{t.by.replace("{author}", article.author)}</span>
          </div>
        </div>
      </div>

      <GoldDivider />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="prose-expat">
              {article.content ? (
                article.content.split("\n\n").map((block, i) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-2xl font-bold text-[#0A1628] mt-10 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                        {block.slice(3)}
                      </h2>
                    );
                  }
                  if (block.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-xl font-bold text-[#0A1628] mt-8 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                        {block.slice(4)}
                      </h3>
                    );
                  }
                  if (block.startsWith("- ")) {
                    const items = block.split("\n").filter((l) => l.startsWith("- "));
                    return (
                      <ul key={i} className="space-y-2 mb-5">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-[#374151]">
                            <span className="text-[#C9A84C] mt-1 text-xs">✦</span>
                            <span dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.startsWith("1. ")) {
                    const items = block.split("\n").filter((l) => /^\d+\./.test(l));
                    return (
                      <ol key={i} className="space-y-2 mb-5 counter-reset-list">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-[#374151]">
                            <span className="w-6 h-6 rounded-full bg-[#FBF6EC] text-[#C9A84C] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {j + 1}
                            </span>
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  if (block.trim()) {
                    return (
                      <p key={i} className="text-[#374151] leading-relaxed mb-5"
                         dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#0A1628]">$1</strong>') }}
                      />
                    );
                  }
                  return null;
                })
              ) : (
                <div className="bg-[#F4F6F9] rounded-2xl p-8 text-center">
                  <h2 className="text-xl font-bold text-[#0A1628] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {t.comingSoonTitle}
                  </h2>
                  <p className="text-[#6B7280]">{t.comingSoonText}</p>
                </div>
              )}
            </div>

            <GoldDivider className="my-10" />

            {/* Disclaimer */}
            <div className="bg-[#F4F6F9] rounded-xl p-5 text-sm text-[#6B7280]">
              <strong className="text-[#0A1628]">{t.disclaimerLabel}</strong> {t.disclaimerText}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#F4F6F9] text-[#6B7280] px-3 py-1.5 rounded-full border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* CTA Card */}
            <div className="gradient-navy rounded-2xl p-6 text-white sticky top-24">
              <div className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-3">
                {t.nextStepLabel}
              </div>
              <h3
                className="font-bold text-lg mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.ctaTitle}
              </h3>
              <p className="text-white/60 text-sm mb-5">
                {t.ctaDescription}
              </p>
              <Link
                href="/consulta"
                className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                {t.ctaButton}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/asistente"
                className="flex items-center justify-center mt-3 text-white/60 hover:text-white text-sm transition-colors gap-1"
              >
                {t.ctaAssistant}
              </Link>
            </div>

            {/* Category */}
            {categoryInfo && (
              <div className="bg-[#F4F6F9] rounded-2xl p-5">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">
                  {t.categoryLabel}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: categoryInfo.bgColor }}
                  >
                    {categoryInfo.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628] text-sm">
                      {dict.categories[categoryInfo.id].label}
                    </p>
                    <Link
                      href={`/guias?category=${categoryInfo.id}`}
                      className="text-xs text-[#C9A84C] hover:underline"
                    >
                      {t.viewMoreInCategory}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
