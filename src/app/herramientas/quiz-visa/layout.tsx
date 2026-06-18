import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await getLocale()) === "en";
  const title = isEn ? "Which Panama Visa Is Right for You? — Free Quiz | Expat507" : "¿Qué Visa de Panamá es Para Ti? — Quiz Gratis | Expat507";
  const description = isEn
    ? "Answer 7 quick questions and find out which Panama residency visa fits your situation: Investor, Pensionado, Friendly Nations, or Digital Nomad."
    : "Responde 7 preguntas rápidas y descubre qué visa de residencia en Panamá se ajusta a tu situación: Inversionista, Pensionado, Naciones Amigas o Nómada Digital.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/herramientas/quiz-visa` },
    openGraph: { title, description, url: `${SITE_URL}/herramientas/quiz-visa`, type: "website" },
  };
}

export default function QuizVisaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
