import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Free Consultation — Expat507" : "Consulta Gratuita — Expat507";
  const description = isEn
    ? "Tell us your situation and get a free strategy call about moving to or investing in Panama. No cost, no commitment."
    : "Cuéntanos tu situación y agenda una llamada estratégica gratuita sobre mudarte o invertir en Panamá. Sin costo, sin compromiso.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/consulta` },
    openGraph: { title, description, url: `${SITE_URL}/consulta`, type: "website" },
  };
}

export default function ConsultaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
