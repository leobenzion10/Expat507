import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Knowledge Center — Expat507" : "Centro de Conocimiento — Expat507";
  const description = isEn
    ? "19 in-depth guides on Panama residency, real estate, banking, legal structures, taxes, and expat life."
    : "19 guías a fondo sobre residencia, bienes raíces, banca, estructuras legales, impuestos y vida expat en Panamá.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/guias` },
    openGraph: { title, description, url: `${SITE_URL}/guias`, type: "website" },
  };
}

export default function GuiasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
