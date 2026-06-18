import { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site";
import ARTICLES_META from "@/content/articles-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/guias`, priority: 0.9, changeFrequency: "weekly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/guia-completa`, priority: 0.9, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/herramientas`, priority: 0.9, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/herramientas/quiz-visa`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/herramientas/calculadora-costo-vida`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/herramientas/simulador-inversion`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/herramientas/comparador-visas`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/consulta`, priority: 0.9, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/asistente`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/newsletter`, priority: 0.7, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/sobre-nosotros`, priority: 0.6, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/contacto`, priority: 0.6, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/privacidad`, priority: 0.3, changeFrequency: "yearly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/terminos`, priority: 0.3, changeFrequency: "yearly" as const, lastModified: new Date() },
  ];

  const guidePages = ARTICLES_META.map((article) => ({
    url: `${BASE_URL}/guias/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: "monthly" as const,
    priority: article.pillar ? 0.85 : 0.7,
  }));

  return [
    ...staticPages.map((page) => ({
      url: page.url,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...guidePages,
  ];
}
