import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Contact — Expat507" : "Contacto — Expat507";
  const description = isEn
    ? "Get in touch with Expat507 for questions about living, investing, or relocating to Panama."
    : "Contáctanos con tus preguntas sobre vivir, invertir o mudarte a Panamá.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/contacto` },
    openGraph: { title, description, url: `${SITE_URL}/contacto`, type: "website" },
  };
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
