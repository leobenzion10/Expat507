import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Newsletter — Expat507" : "Newsletter — Expat507";
  const description = isEn
    ? "Subscribe for free weekly insights on Panama real estate, banking, and migration, plus our free Definitive Guide."
    : "Suscríbete gratis a información semanal sobre bienes raíces, banca y migración en Panamá, más nuestra Guía Definitiva gratuita.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/newsletter` },
    openGraph: { title, description, url: `${SITE_URL}/newsletter`, type: "website" },
  };
}

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
