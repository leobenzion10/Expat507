import { ImageResponse } from "next/og";
import { getLocale } from "@/lib/i18n/locale";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 28,
          background: "linear-gradient(135deg, #0B1A17 0%, #15302A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#B8935A", letterSpacing: -1 }}>
          Expat507
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "white", maxWidth: 820, textAlign: "center" }}>
          {isEn
            ? "Your insider guide to living and investing in Panama"
            : "Tu guía insider para vivir e invertir en Panamá"}
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.45)", marginTop: 12 }}>
          expat507.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
