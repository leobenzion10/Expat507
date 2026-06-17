import type { Category } from "@/types";

export interface ArticleMeta {
  id: string;
  slug: string;
  category: Category;
  published_at: string;
  read_time: number;
  featured: boolean;
}

const ARTICLES_META: ArticleMeta[] = [
  { id: "1", slug: "visa-jubilados-pensionado-guia-completa", category: "migracion", published_at: "2024-01-15", read_time: 8, featured: true },
  { id: "2", slug: "visa-nomada-digital-panama", category: "migracion", published_at: "2024-02-20", read_time: 7, featured: false },
  { id: "3", slug: "abrir-cuenta-bancaria-panama-extranjero", category: "banca", published_at: "2024-02-10", read_time: 6, featured: true },
  { id: "4", slug: "mejores-bancos-panama-expatriados", category: "banca", published_at: "2024-03-01", read_time: 9, featured: false },
  { id: "5", slug: "mercado-inmobiliario-panama-zonas-clave", category: "bienes-raices", published_at: "2024-03-05", read_time: 10, featured: true },
  { id: "6", slug: "comprar-propiedad-panama-extranjero", category: "bienes-raices", published_at: "2024-03-18", read_time: 12, featured: false },
  { id: "7", slug: "fundaciones-interes-privado-panama", category: "legal", published_at: "2024-04-05", read_time: 8, featured: false },
  { id: "8", slug: "sociedades-anonimas-panama", category: "legal", published_at: "2024-04-20", read_time: 7, featured: false },
  { id: "9", slug: "planificacion-patrimonial-latinoamericanos-panama", category: "patrimonio", published_at: "2024-05-01", read_time: 11, featured: false },
  { id: "10", slug: "costo-de-vida-ciudad-de-panama-2024", category: "expat-life", published_at: "2024-05-15", read_time: 9, featured: false },
  { id: "11", slug: "mejores-barrios-ciudad-de-panama", category: "expat-life", published_at: "2024-06-01", read_time: 8, featured: false },
  { id: "12", slug: "sistema-salud-panama-expatriados", category: "expat-life", published_at: "2024-06-20", read_time: 7, featured: false },
];

export default ARTICLES_META;
