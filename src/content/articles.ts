import ARTICLES_META from "./articles-meta";
import ARTICLES_ES from "./articles-i18n-es";
import ARTICLES_EN from "./articles-i18n-en";
import type { Locale } from "@/lib/i18n/locale";
import type { Category } from "@/types";

import visaJubiladosEs from "./body/visa-jubilados-es";
import visaJubiladosEn from "./body/visa-jubilados-en";
import cuentaBancariaEs from "./body/cuenta-bancaria-es";
import cuentaBancariaEn from "./body/cuenta-bancaria-en";
import mercadoInmobiliarioEs from "./body/mercado-inmobiliario-es";
import mercadoInmobiliarioEn from "./body/mercado-inmobiliario-en";

const CONTENT: Record<string, { es: string; en: string }> = {
  "visa-jubilados-pensionado-guia-completa": { es: visaJubiladosEs, en: visaJubiladosEn },
  "abrir-cuenta-bancaria-panama-extranjero": { es: cuentaBancariaEs, en: cuentaBancariaEn },
  "mercado-inmobiliario-panama-zonas-clave": { es: mercadoInmobiliarioEs, en: mercadoInmobiliarioEn },
};

const TEXT = { es: ARTICLES_ES, en: ARTICLES_EN };

export interface ArticleFull {
  id: string;
  slug: string;
  category: Category;
  published_at: string;
  read_time: number;
  featured: boolean;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
  content?: string;
}

export function getArticles(locale: Locale): ArticleFull[] {
  return ARTICLES_META.map((m) => ({
    ...m,
    ...TEXT[locale][m.slug],
    content: CONTENT[m.slug]?.[locale],
  }));
}

export function getFeaturedArticles(locale: Locale): ArticleFull[] {
  return getArticles(locale).filter((a) => a.featured);
}

export function getArticle(locale: Locale, slug: string): ArticleFull | null {
  const meta = ARTICLES_META.find((m) => m.slug === slug);
  if (!meta) return null;
  return {
    ...meta,
    ...TEXT[locale][slug],
    content: CONTENT[slug]?.[locale],
  };
}
