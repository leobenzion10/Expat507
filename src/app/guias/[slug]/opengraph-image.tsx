import { ImageResponse } from "next/og";
import { getArticle } from "@/content/articles";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CATEGORIES } from "@/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticle(locale, slug);
  const dict = getDictionary(locale);
  const categoryInfo = article ? CATEGORIES.find((c) => c.id === article.category) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0B1A17 0%, #15302A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#B8935A", letterSpacing: -0.5 }}>
          Expat507
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {categoryInfo && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "rgba(184,147,90,0.16)",
                color: "#B8935A",
                padding: "10px 24px",
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {dict.categories[categoryInfo.id].label}
            </div>
          )}
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.18, color: "white", maxWidth: 1000 }}>
            {article?.title || "Expat507"}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.45)" }}>
          expat507.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
