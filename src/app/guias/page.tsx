"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { CATEGORIES, CATEGORY_LABELS, type Article, type Category } from "@/types";
import { Clock, Search } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";

const ALL_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Visa de Jubilados Pensionado: La guía completa 2024",
    slug: "visa-jubilados-pensionado-guia-completa",
    excerpt: "Todo lo que necesitas saber sobre la visa más atractiva de Panamá para extranjeros que reciben ingresos pasivos.",
    content: "",
    category: "migracion",
    author: "Expat507",
    published_at: "2024-01-15",
    read_time: 8,
    featured: true,
    tags: ["visa", "jubilados"],
  },
  {
    id: "2",
    title: "Visa de Nómada Digital en Panamá: requisitos y proceso",
    slug: "visa-nomada-digital-panama",
    excerpt: "Panamá ofrece una visa especial para trabajadores remotos. Aquí el proceso completo, costos y timeline.",
    content: "",
    category: "migracion",
    author: "Expat507",
    published_at: "2024-02-20",
    read_time: 7,
    featured: false,
    tags: ["visa", "nomada digital"],
  },
  {
    id: "3",
    title: "Cómo abrir una cuenta bancaria en Panamá siendo extranjero",
    slug: "abrir-cuenta-bancaria-panama-extranjero",
    excerpt: "Proceso paso a paso, documentos requeridos y los mejores bancos para no residentes en 2024.",
    content: "",
    category: "banca",
    author: "Expat507",
    published_at: "2024-02-10",
    read_time: 6,
    featured: true,
    tags: ["banca", "cuenta bancaria"],
  },
  {
    id: "4",
    title: "Los mejores bancos de Panamá para expatriados",
    slug: "mejores-bancos-panama-expatriados",
    excerpt: "Comparativo detallado de los principales bancos: servicios en inglés, banca online y condiciones para extranjeros.",
    content: "",
    category: "banca",
    author: "Expat507",
    published_at: "2024-03-01",
    read_time: 9,
    featured: false,
    tags: ["banca", "comparativo"],
  },
  {
    id: "5",
    title: "Mercado inmobiliario en Panamá: zonas clave para invertir",
    slug: "mercado-inmobiliario-panama-zonas-clave",
    excerpt: "Análisis comparativo de los mejores barrios: Punta Pacífica, Costa del Este, Casco Antiguo y más.",
    content: "",
    category: "bienes-raices",
    author: "Expat507",
    published_at: "2024-03-05",
    read_time: 10,
    featured: true,
    tags: ["bienes raíces", "inversión"],
  },
  {
    id: "6",
    title: "Cómo comprar propiedad en Panamá siendo extranjero",
    slug: "comprar-propiedad-panama-extranjero",
    excerpt: "Desde la búsqueda hasta la escritura pública: el proceso completo con sus costos y tiempos reales.",
    content: "",
    category: "bienes-raices",
    author: "Expat507",
    published_at: "2024-03-18",
    read_time: 12,
    featured: false,
    tags: ["bienes raíces", "proceso"],
  },
  {
    id: "7",
    title: "Fundaciones de interés privado en Panamá: qué son y para qué sirven",
    slug: "fundaciones-interes-privado-panama",
    excerpt: "Las fundaciones panameñas son uno de los mejores vehículos de protección patrimonial. Guía completa.",
    content: "",
    category: "legal",
    author: "Expat507",
    published_at: "2024-04-05",
    read_time: 8,
    featured: false,
    tags: ["legal", "fundaciones"],
  },
  {
    id: "8",
    title: "Sociedades anónimas en Panamá: estructura, costos y usos",
    slug: "sociedades-anonimas-panama",
    excerpt: "La sociedad anónima panameña es mundialmente reconocida. Cuándo usarla, cómo constituirla y qué costos tiene.",
    content: "",
    category: "legal",
    author: "Expat507",
    published_at: "2024-04-20",
    read_time: 7,
    featured: false,
    tags: ["legal", "sociedades"],
  },
  {
    id: "9",
    title: "Planificación patrimonial para latinoamericanos en Panamá",
    slug: "planificacion-patrimonial-latinoamericanos-panama",
    excerpt: "Cómo estructurar tu patrimonio usando vehículos panameños para protegerlo de riesgos políticos y fiscales.",
    content: "",
    category: "patrimonio",
    author: "Expat507",
    published_at: "2024-05-01",
    read_time: 11,
    featured: false,
    tags: ["patrimonio", "planificación"],
  },
  {
    id: "10",
    title: "Costo de vida en Ciudad de Panamá: datos reales 2024",
    slug: "costo-de-vida-ciudad-de-panama-2024",
    excerpt: "Alquiler, comida, transporte, educación y salud: los números reales de vivir bien en Panamá.",
    content: "",
    category: "expat-life",
    author: "Expat507",
    published_at: "2024-05-15",
    read_time: 9,
    featured: false,
    tags: ["expat life", "costo de vida"],
  },
  {
    id: "11",
    title: "Los mejores barrios para vivir en Ciudad de Panamá",
    slug: "mejores-barrios-ciudad-de-panama",
    excerpt: "Guía honesta de los barrios más populares entre expatriados: ventajas, desventajas y precios reales.",
    content: "",
    category: "expat-life",
    author: "Expat507",
    published_at: "2024-06-01",
    read_time: 8,
    featured: false,
    tags: ["expat life", "barrios"],
  },
  {
    id: "12",
    title: "Sistema de salud en Panamá: hospitales, seguros y calidad",
    slug: "sistema-salud-panama-expatriados",
    excerpt: "Cómo funciona el sistema de salud, los mejores hospitales privados y qué seguro médico conviene contratar.",
    content: "",
    category: "expat-life",
    author: "Expat507",
    published_at: "2024-06-20",
    read_time: 7,
    featured: false,
    tags: ["expat life", "salud"],
  },
];

export default function GuiasPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = ALL_ARTICLES.filter((a) => {
    const matchCat = activeCategory === "all" || a.category === activeCategory;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
              Centro de Conocimiento
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h1
            className="text-3xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Guías y Recursos
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Información profunda y actualizada sobre migración, inversión y vida
            en Panamá.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mt-8">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar guías..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-colors"
            />
          </div>
        </div>
      </div>

      <GoldDivider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-[#0A1628] text-white"
                : "bg-[#F4F6F9] text-[#6B7280] hover:bg-[#E8ECF2]"
            }`}
          >
            Todas
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0A1628] text-white"
                  : "bg-[#F4F6F9] text-[#6B7280] hover:bg-[#E8ECF2]"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-[#6B7280] mb-6">
          {filtered.length} {filtered.length === 1 ? "guía" : "guías"} encontradas
          {activeCategory !== "all" && ` en ${CATEGORY_LABELS[activeCategory]}`}
        </p>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#6B7280] text-lg">
              No encontramos guías con esos criterios.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.id}
                href={`/guias/${article.slug}`}
                className="group"
              >
                <article className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
                  <div className="h-36 gradient-navy flex items-center justify-center relative">
                    <span className="text-4xl opacity-25">
                      {CATEGORIES.find((c) => c.id === article.category)?.icon}
                    </span>
                    <div className="absolute top-3 left-3">
                      <Badge category={article.category} />
                    </div>
                    {article.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                          Destacado
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3
                      className="font-bold text-[#0A1628] mb-2 leading-snug group-hover:text-[#C9A84C] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                      <Clock size={11} />
                      <span>{article.read_time} min de lectura</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
