import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleFull } from "@/content/articles";

export default function RelatedGuides({
  title,
  articles,
}: {
  title: string;
  articles: ArticleFull[];
}) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-[#0B1A17] mb-5" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/guias/${a.slug}`}
            className="group bg-white border border-gray-100 hover:border-[#B8935A] rounded-xl p-4 transition-colors"
          >
            <p className="font-semibold text-[#0B1A17] text-sm mb-1 leading-snug group-hover:text-[#B8935A] transition-colors">
              {a.title}
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-[#B8935A]">
              {a.read_time} min <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
