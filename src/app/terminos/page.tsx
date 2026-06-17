import type { Metadata } from "next";
import GoldDivider from "@/components/ui/GoldDivider";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale).terminos;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function TerminosPage() {
  const locale = await getLocale();
  const t = getDictionary(locale).terminos;

  return (
    <div className="pt-20 min-h-screen">
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.title}
        </h1>
        <p className="text-white/50 text-sm">{t.lastUpdated.replace("{date}", t.lastUpdatedDate)}</p>
      </div>

      <GoldDivider />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose-expat">
        {t.sections.map((s, i) => (
          <div key={i}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
            {s.body2 && <p>{s.body2}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
