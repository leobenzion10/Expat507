import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Clock } from "lucide-react";
import { type Article } from "@/types";

const FEATURED_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Visa de Jubilados Pensionado: La guía completa 2024",
    slug: "visa-jubilados-pensionado-guia-completa",
    excerpt:
      "Todo lo que necesitas saber sobre la visa más atractiva de Panamá para extranjeros que reciben ingresos pasivos regulares.",
    content: "",
    category: "migracion",
    author: "Expat507",
    published_at: "2024-01-15",
    read_time: 8,
    featured: true,
    tags: ["visa", "jubilados", "residencia"],
  },
  {
    id: "2",
    title: "Cómo abrir una cuenta bancaria en Panamá siendo extranjero",
    slug: "abrir-cuenta-bancaria-panama-extranjero",
    excerpt:
      "Proceso paso a paso, documentos requeridos y los mejores bancos para no residentes en 2024.",
    content: "",
    category: "banca",
    author: "Expat507",
    published_at: "2024-02-10",
    read_time: 6,
    featured: true,
    tags: ["banca", "cuenta bancaria", "requisitos"],
  },
  {
    id: "3",
    title: "Mercado inmobiliario en Panamá: zonas clave para invertir",
    slug: "mercado-inmobiliario-panama-zonas-clave",
    excerpt:
      "Análisis comparativo de los mejores barrios para inversión inmobiliaria: Punta Pacífica, Costa del Este, Casco Antiguo y más.",
    content: "",
    category: "bienes-raices",
    author: "Expat507",
    published_at: "2024-03-05",
    read_time: 10,
    featured: true,
    tags: ["bienes raíces", "inversión", "zonas"],
  },
];

export default function FeaturedArticles() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
                Artículos Destacados
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0A1628]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Las guías más leídas
            </h2>
          </div>
          <Link
            href="/guias"
            className="text-sm font-semibold text-[#C9A84C] hover:text-[#A8883A] transition-colors border-b border-[#C9A84C] pb-0.5 whitespace-nowrap"
          >
            Ver todo →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_ARTICLES.map((article, i) => (
            <Link
              key={article.id}
              href={`/guias/${article.slug}`}
              className={`group ${i === 0 ? "md:col-span-1" : ""}`}
            >
              <article className="h-full bg-[#F4F6F9] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 card-hover border border-gray-100">
                {/* Image placeholder */}
                <div className="relative h-48 gradient-navy flex items-center justify-center overflow-hidden">
                  <div className="text-5xl opacity-30">
                    {article.category === "migracion" && "🛂"}
                    {article.category === "banca" && "🏦"}
                    {article.category === "bienes-raices" && "🏙️"}
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge category={article.category} />
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className="text-lg font-bold text-[#0A1628] mb-3 group-hover:text-[#C9A84C] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <Clock size={12} />
                    <span>{article.read_time} min de lectura</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
