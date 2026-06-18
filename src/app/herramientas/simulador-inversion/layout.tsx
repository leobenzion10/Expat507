import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Investment Residency Simulator — Free | Expat507" : "Simulador de Residencia por Inversión — Gratis | Expat507";
  const description = isEn
    ? "Enter your available investment amount and find out which Qualified Investor Visa modality you qualify for, with timelines and next steps."
    : "Indica tu monto disponible para invertir y descubre qué modalidad de la Visa de Inversionista Calificado califica para ti, con plazos y próximos pasos.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/herramientas/simulador-inversion` },
    openGraph: { title, description, url: `${SITE_URL}/herramientas/simulador-inversion`, type: "website" },
  };
}

export default function InvestmentSimulatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
