import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Free Definitive Guide to Panama (PDF) — Expat507" : "Guía Definitiva de Panamá Gratis (PDF) — Expat507";
  const description = isEn
    ? "Download our free 9-chapter guide covering residency, real estate, banking, legal structures, and expat life in Panama."
    : "Descarga gratis nuestra guía de 9 capítulos sobre residencia, bienes raíces, banca, estructuras legales y vida expat en Panamá.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/guia-completa` },
    openGraph: { title, description, url: `${SITE_URL}/guia-completa`, type: "website" },
  };
}

export default function GuiaCompletaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
