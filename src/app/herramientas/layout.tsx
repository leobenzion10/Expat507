import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Free Interactive Tools — Expat507" : "Herramientas Interactivas Gratuitas — Expat507";
  const description = isEn
    ? "Free tools to plan your move or investment in Panama: visa quiz, cost of living calculator, investment simulator, and visa comparator."
    : "Herramientas gratuitas para planificar tu mudanza o inversión en Panamá: quiz de visas, calculadora de costo de vida, simulador de inversión y comparador de visas.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/herramientas` },
    openGraph: { title, description, url: `${SITE_URL}/herramientas`, type: "website" },
  };
}

export default function HerramientasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
