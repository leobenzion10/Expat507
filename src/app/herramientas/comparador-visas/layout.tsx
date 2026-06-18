import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Panama Visa Comparator — Free Tool | Expat507" : "Comparador de Visas de Panamá — Herramienta Gratis | Expat507";
  const description = isEn
    ? "Filter and compare the 4 Panama residency routes — Investor, Pensionado, Friendly Nations, and Digital Nomad — by budget, work intent, and retirement status."
    : "Filtra y compara las 4 rutas de residencia en Panamá — Inversionista, Pensionado, Naciones Amigas y Nómada Digital — por presupuesto, intención laboral y jubilación.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/herramientas/comparador-visas` },
    openGraph: { title, description, url: `${SITE_URL}/herramientas/comparador-visas`, type: "website" },
  };
}

export default function VisaComparatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
