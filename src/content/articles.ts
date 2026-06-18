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
import residenciaInversionistaEs from "./body/residencia-inversionista-es";
import residenciaInversionistaEn from "./body/residencia-inversionista-en";
import comparativaVisasEs from "./body/comparativa-visas-es";
import comparativaVisasEn from "./body/comparativa-visas-en";
import naturalizacionEs from "./body/naturalizacion-es";
import naturalizacionEn from "./body/naturalizacion-en";
import fundacionesVsFideicomisosEs from "./body/fundaciones-vs-fideicomisos-es";
import fundacionesVsFideicomisosEn from "./body/fundaciones-vs-fideicomisos-en";
import sociedadesPatrimonialesEs from "./body/sociedades-patrimoniales-es";
import sociedadesPatrimonialesEn from "./body/sociedades-patrimoniales-en";
import comprarPropiedadEs from "./body/comprar-propiedad-es";
import comprarPropiedadEn from "./body/comprar-propiedad-en";
import preconstruccionEs from "./body/preconstruccion-es";
import preconstruccionEn from "./body/preconstruccion-en";
import sistemaFiscalEs from "./body/sistema-fiscal-es";
import sistemaFiscalEn from "./body/sistema-fiscal-en";
import erroresComunesEs from "./body/errores-comunes-expatriados-es";
import erroresComunesEn from "./body/errores-comunes-expatriados-en";

const CONTENT: Record<string, { es: string; en: string }> = {
  "visa-jubilados-pensionado-guia-completa": { es: visaJubiladosEs, en: visaJubiladosEn },
  "abrir-cuenta-bancaria-panama-extranjero": { es: cuentaBancariaEs, en: cuentaBancariaEn },
  "mercado-inmobiliario-panama-zonas-clave": { es: mercadoInmobiliarioEs, en: mercadoInmobiliarioEn },
  "residencia-permanente-inversionista-calificado-panama": { es: residenciaInversionistaEs, en: residenciaInversionistaEn },
  "comparativa-visas-residencia-panama": { es: comparativaVisasEs, en: comparativaVisasEn },
  "naturalizacion-ciudadania-panama": { es: naturalizacionEs, en: naturalizacionEn },
  "fundaciones-vs-fideicomisos-panama": { es: fundacionesVsFideicomisosEs, en: fundacionesVsFideicomisosEn },
  "sociedades-anonimas-panama": { es: sociedadesPatrimonialesEs, en: sociedadesPatrimonialesEn },
  "comprar-propiedad-panama-extranjero": { es: comprarPropiedadEs, en: comprarPropiedadEn },
  "preconstruccion-vs-propiedad-terminada-panama": { es: preconstruccionEs, en: preconstruccionEn },
  "sistema-fiscal-territorial-panama": { es: sistemaFiscalEs, en: sistemaFiscalEn },
  "errores-comunes-expatriados-panama": { es: erroresComunesEs, en: erroresComunesEn },
};

const TEXT = { es: ARTICLES_ES, en: ARTICLES_EN };

export interface ArticleFull {
  id: string;
  slug: string;
  category: Category;
  published_at: string;
  updated_at: string;
  read_time: number;
  featured: boolean;
  pillar: boolean;
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

export function getClusterArticles(locale: Locale, category: Category): ArticleFull[] {
  return getArticles(locale)
    .filter((a) => a.category === category)
    .sort((a, b) => (b.pillar ? 1 : 0) - (a.pillar ? 1 : 0));
}

export function getPillar(locale: Locale, category: Category): ArticleFull | null {
  return getArticles(locale).find((a) => a.category === category && a.pillar) || null;
}

export function getRelatedArticles(locale: Locale, slug: string, limit = 4): ArticleFull[] {
  const current = getArticle(locale, slug);
  if (!current) return [];
  return getArticles(locale)
    .filter((a) => a.slug !== slug && a.category === current.category && a.content)
    .sort((a, b) => (b.pillar ? 1 : 0) - (a.pillar ? 1 : 0))
    .slice(0, limit);
}
