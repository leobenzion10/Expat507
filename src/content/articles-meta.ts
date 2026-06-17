import type { Category } from "@/types";

export interface ArticleMeta {
  id: string;
  slug: string;
  category: Category;
  published_at: string;
  updated_at: string;
  read_time: number;
  featured: boolean;
  pillar: boolean;
}

const ARTICLES_META: ArticleMeta[] = [
  { id: "1", slug: "visa-jubilados-pensionado-guia-completa", category: "migracion", published_at: "2026-01-12", updated_at: "2026-01-12", read_time: 8, featured: true, pillar: false },
  { id: "2", slug: "visa-nomada-digital-panama", category: "migracion", published_at: "2026-02-03", updated_at: "2026-02-03", read_time: 7, featured: false, pillar: false },
  { id: "3", slug: "abrir-cuenta-bancaria-panama-extranjero", category: "banca", published_at: "2026-02-18", updated_at: "2026-06-17", read_time: 11, featured: true, pillar: true },
  { id: "4", slug: "mejores-bancos-panama-expatriados", category: "banca", published_at: "2026-03-02", updated_at: "2026-03-02", read_time: 9, featured: false, pillar: false },
  { id: "5", slug: "mercado-inmobiliario-panama-zonas-clave", category: "bienes-raices", published_at: "2026-03-16", updated_at: "2026-03-16", read_time: 10, featured: true, pillar: false },
  { id: "6", slug: "comprar-propiedad-panama-extranjero", category: "bienes-raices", published_at: "2026-04-01", updated_at: "2026-06-17", read_time: 12, featured: false, pillar: true },
  { id: "7", slug: "fundaciones-interes-privado-panama", category: "legal", published_at: "2026-04-15", updated_at: "2026-04-15", read_time: 8, featured: false, pillar: false },
  { id: "8", slug: "sociedades-anonimas-panama", category: "legal", published_at: "2026-04-29", updated_at: "2026-06-17", read_time: 9, featured: false, pillar: false },
  { id: "9", slug: "planificacion-patrimonial-latinoamericanos-panama", category: "patrimonio", published_at: "2026-05-08", updated_at: "2026-05-08", read_time: 11, featured: false, pillar: false },
  { id: "10", slug: "costo-de-vida-ciudad-de-panama", category: "expat-life", published_at: "2026-05-20", updated_at: "2026-05-20", read_time: 9, featured: false, pillar: false },
  { id: "11", slug: "mejores-barrios-ciudad-de-panama", category: "expat-life", published_at: "2026-06-02", updated_at: "2026-06-02", read_time: 8, featured: false, pillar: false },
  { id: "12", slug: "sistema-salud-panama-expatriados", category: "expat-life", published_at: "2026-06-10", updated_at: "2026-06-10", read_time: 7, featured: false, pillar: false },
  { id: "13", slug: "residencia-permanente-inversionista-calificado-panama", category: "migracion", published_at: "2026-06-17", updated_at: "2026-06-17", read_time: 13, featured: true, pillar: true },
  { id: "14", slug: "comparativa-visas-residencia-panama", category: "migracion", published_at: "2026-06-17", updated_at: "2026-06-17", read_time: 9, featured: false, pillar: false },
  { id: "15", slug: "naturalizacion-ciudadania-panama", category: "migracion", published_at: "2026-06-17", updated_at: "2026-06-17", read_time: 9, featured: false, pillar: false },
  { id: "16", slug: "fundaciones-vs-fideicomisos-panama", category: "legal", published_at: "2026-06-17", updated_at: "2026-06-17", read_time: 10, featured: false, pillar: true },
  { id: "17", slug: "preconstruccion-vs-propiedad-terminada-panama", category: "bienes-raices", published_at: "2026-06-17", updated_at: "2026-06-17", read_time: 9, featured: false, pillar: false },
  { id: "18", slug: "sistema-fiscal-territorial-panama", category: "patrimonio", published_at: "2026-06-17", updated_at: "2026-06-17", read_time: 10, featured: false, pillar: true },
];

export default ARTICLES_META;
