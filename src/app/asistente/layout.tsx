import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "AI Assistant — Expat507" : "Asistente IA — Expat507";
  const description = isEn
    ? "Ask Expat507's AI assistant your questions about visas, real estate, banking, and taxes in Panama."
    : "Pregúntale al asistente IA de Expat507 tus dudas sobre visas, bienes raíces, banca e impuestos en Panamá.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/asistente` },
    openGraph: { title, description, url: `${SITE_URL}/asistente`, type: "website" },
  };
}

export default function AsistenteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
