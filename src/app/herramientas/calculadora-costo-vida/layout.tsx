import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Panama Cost of Living Calculator — Free | Expat507" : "Calculadora de Costo de Vida en Panamá — Gratis | Expat507";
  const description = isEn
    ? "Estimate your monthly cost of living in Panama by zone, family size, transport, and education."
    : "Estima tu costo de vida mensual en Panamá según zona, tamaño familiar, transporte y educación.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/herramientas/calculadora-costo-vida` },
    openGraph: { title, description, url: `${SITE_URL}/herramientas/calculadora-costo-vida`, type: "website" },
  };
}

export default function CostCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
