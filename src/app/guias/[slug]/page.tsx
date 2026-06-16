import { notFound } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import GoldDivider from "@/components/ui/GoldDivider";
import { Clock, ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { CATEGORIES, type Article } from "@/types";
import type { Metadata } from "next";

const ARTICLES: Record<string, Article & { content: string }> = {
  "visa-jubilados-pensionado-guia-completa": {
    id: "1",
    title: "Visa de Jubilados Pensionado: La guía completa 2024",
    slug: "visa-jubilados-pensionado-guia-completa",
    excerpt:
      "Todo lo que necesitas saber sobre la visa más atractiva de Panamá para extranjeros que reciben ingresos pasivos regulares.",
    category: "migracion",
    author: "Equipo Expat507",
    published_at: "2024-01-15",
    read_time: 8,
    featured: true,
    tags: ["visa", "jubilados", "residencia"],
    content: `
## ¿Qué es la Visa de Jubilados Pensionado?

La Visa de Jubilados Pensionado (también llamada Visa Pensionado) es uno de los programas de residencia más atractivos del mundo para personas que reciben ingresos pasivos regulares. Panamá la creó para atraer residentes con capacidad económica que contribuyan al país sin competir en el mercado laboral.

## Requisitos principales

Para calificar a esta visa, el solicitante debe demostrar que recibe al menos **$1,000 USD mensuales** de una fuente de pensión reconocida, como:

- Pensión del gobierno de su país
- Pensión de empresa privada (con un mínimo de antigüedad)
- Beneficios del Seguro Social
- Pensión militar o gubernamental

Si el solicitante tiene propiedad inmueble en Panamá por valor de **$100,000 USD o más**, el requisito de ingresos se reduce a **$750 USD mensuales**.

## Documentos necesarios

El expediente para esta visa incluye:

- Pasaporte vigente con mínimo 6 meses de validez
- Carta oficial de pensión apostillada y traducida al español
- Certificado de antecedentes penales del país de origen (apostillado)
- Certificado de salud emitido por médico panameño
- Fotografías recientes (según especificaciones del SNM)
- Pago de tasas gubernamentales

## Beneficios de la Visa Pensionado

Los titulares de esta visa gozan de beneficios excepcionales:

- **Descuentos permanentes**: 50% en entretenimiento, 30% en transporte, 20% en restaurantes y salud
- **Exención de impuestos** en importación de menaje del hogar
- **Importación de vehículo** libre de impuestos cada 2 años
- **Residencia permanente** desde el primer trámite
- **Derecho a traer dependientes** (cónyuge e hijos)

## Proceso y timeline

El proceso completo toma entre **3 y 6 meses** desde la presentación del expediente. El timeline típico es:

1. **Semanas 1-4**: Reunión de documentos, apostillas y traducciones
2. **Semanas 5-6**: Presentación ante el Servicio Nacional de Migración
3. **Semanas 7-16**: Revisión del expediente y posibles solicitudes de subsanación
4. **Semana 16-24**: Aprobación y emisión del carnet de residencia

## Costos estimados

Los costos incluyen:

- Honorarios de abogado: $1,500 - $3,000 USD
- Tasas del SNM: ~$500 USD
- Apostillas y traducciones: $200 - $500 USD
- Exámenes médicos: $150 - $300 USD

**Total estimado: $2,500 - $4,500 USD**

## ¿Vale la pena?

La respuesta corta es sí. Panamá ofrece una combinación única de:

- Estabilidad económica (dólar como moneda)
- Excelente sistema de salud privado
- Sin impuesto sobre la renta para ingresos del exterior
- Clima tropical con infraestructura de primer nivel
- Ubicación estratégica en centro del continente

Si recibes una pensión regular y buscas un país para establecerte con calidad de vida alta y costos moderados, la Visa Pensionado es difícilmente superable.

## Siguiente paso

Si te interesa iniciar el proceso, te recomendamos agendar una consulta gratuita para evaluar tu situación específica y orientarte con los profesionales correctos.
    `,
  },
  "abrir-cuenta-bancaria-panama-extranjero": {
    id: "3",
    title: "Cómo abrir una cuenta bancaria en Panamá siendo extranjero",
    slug: "abrir-cuenta-bancaria-panama-extranjero",
    excerpt:
      "Proceso paso a paso, documentos requeridos y los mejores bancos para no residentes en 2024.",
    category: "banca",
    author: "Equipo Expat507",
    published_at: "2024-02-10",
    read_time: 6,
    featured: true,
    tags: ["banca", "cuenta bancaria", "requisitos"],
    content: `
## La realidad de la banca panameña para extranjeros

Abrir una cuenta bancaria en Panamá siendo extranjero no residente es posible, pero se ha vuelto más complejo en los últimos años. Los bancos panameños están sujetos a estrictos estándares internacionales de compliance y regulación anti-lavado. Esto significa que el proceso requiere paciencia y documentación sólida.

## Bancos que aceptan no residentes

No todos los bancos son iguales. Los más abiertos a clientes extranjeros no residentes son:

- **Banistmo** (filial de HSBC): servicios en inglés, banca online robusta
- **Banco General**: el más grande del país, servicio profesional
- **MultiBank**: flexible con extranjeros, buena banca digital
- **Global Bank**: muy activo con clientes internacionales

Los bancos estatales (Caja de Ahorros, Banco Nacional) generalmente no abren cuentas a no residentes.

## Documentos que necesitarás

El paquete básico de documentos incluye:

- Pasaporte vigente (copia notariada)
- Referencias bancarias internacionales (1-2 de tu banco actual)
- Estado de cuenta de los últimos 3 meses
- Declaración de origen de fondos (explicar de dónde viene el dinero)
- Carta de referencia personal o de trabajo
- Declaración de impuestos del país de residencia (algunos bancos)

## El proceso paso a paso

1. **Investiga y elige el banco** que mejor se adapte a tus necesidades
2. **Reúne toda la documentación** antes de presentarte
3. **Agenda una cita** con el oficial de cuenta (no es walk-in)
4. **Entrevista de conocimiento del cliente** (KYC)
5. **Espera la aprobación** (2-8 semanas según el banco)
6. **Depósito inicial** para activar la cuenta

## Depósito mínimo

Los depósitos mínimos varían:

- Cuenta de ahorro personal: $500 - $1,000 USD
- Cuenta corriente personal: $1,000 - $2,500 USD
- Cuenta empresarial: $2,500 - $5,000 USD

## Consejo práctico

La clave del éxito es la documentación de origen de fondos. Los bancos quieren entender claramente cómo ganas tu dinero. Una declaración bien redactada, con respaldo de documentos, aumenta significativamente las probabilidades de aprobación.

Si tienes una sociedad panameña o residencia legal, el proceso es considerablemente más ágil.
    `,
  },
  "mercado-inmobiliario-panama-zonas-clave": {
    id: "5",
    title: "Mercado inmobiliario en Panamá: zonas clave para invertir",
    slug: "mercado-inmobiliario-panama-zonas-clave",
    excerpt:
      "Análisis comparativo de los mejores barrios para inversión inmobiliaria: Punta Pacífica, Costa del Este, Casco Antiguo y más.",
    category: "bienes-raices",
    author: "Equipo Expat507",
    published_at: "2024-03-05",
    read_time: 10,
    featured: true,
    tags: ["bienes raíces", "inversión", "zonas"],
    content: `
## El mercado inmobiliario panameño en 2024

Ciudad de Panamá ofrece uno de los mercados inmobiliarios más dinámicos de América Latina. La combinación de dolarización, crecimiento constante y ausencia de restricciones para extranjeros crea un ambiente favorable para la inversión.

## Las zonas más importantes

### Punta Pacífica y Punta Paitilla
La zona más premium de la ciudad. Torres de lujo con vistas al océano Pacífico y al skyline. Precios entre $2,500 y $5,000 por m². Alta demanda de alquileres cortos y corporativos. Ideal para inversión con retornos de 5-8% anual.

### Costa del Este
El distrito financiero y corporativo. Prefer por familias de alto ingreso y ejecutivos. Excelentes colegios internacionales cercanos. Precios entre $1,800 y $3,500 por m². Mercado de alquiler muy estable.

### Casco Antiguo (San Felipe)
El barrio histórico declarado Patrimonio de la Humanidad por la UNESCO. En plena gentrificación. Boutique hotels, restaurantes gourmet y embajadas. Precios entre $2,000 y $4,500 por m². Alta apreciación del capital esperada.

### San Francisco y Marbella
Zonas residenciales consolidadas. Buena relación precio-calidad. Precios entre $1,500 y $2,800 por m². Alta liquidez en el mercado secundario.

### Coronado y Playa Blanca
Zonas costeras a 80km de la ciudad. Para quien busca segunda residencia o retiro en playa. Precios significativamente más bajos. Menor liquidez pero potencial turístico alto.

## El proceso de compra para extranjeros

Los extranjeros tienen los mismos derechos que los nacionales para comprar propiedades en Panamá, con algunas excepciones en zonas fronterizas.

El proceso incluye:

1. Carta de intención y negociación
2. Contrato de promesa de compraventa (con pago del 10%)
3. Due diligence legal
4. Escritura pública ante notario
5. Inscripción en el Registro Público

Los costos adicionales suman aproximadamente **2-5%** del valor de compra.

## Rendimientos y mercado de alquiler

Los rendimientos de alquiler en las zonas premium oscilan entre **5% y 9% anual** dependiendo de la zona y el tipo de operación (largo vs. corto plazo).

El mercado de alquiler corporativo y diplomático en Panamá City es particularmente sólido, respaldado por la presencia de +100 multinacionales y organismos internacionales.

## Consideraciones fiscales

- Impuesto de transferencia de inmuebles: 2% sobre el mayor valor entre precio de compra y valor catastral
- Impuesto sobre la propiedad: 1-2.1% anual (con exenciones para propiedades nuevas)
- Sin impuesto sobre ganancias de capital para no residentes (en muchos casos)

*Consulta siempre con un abogado local para tu situación específica.*
    `,
  },
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Artículo no encontrado" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) notFound();

  const categoryInfo = CATEGORIES.find((c) => c.id === article.category);

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="gradient-navy pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver a Guías
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <Badge category={article.category} />
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h1>
          <p className="text-white/70 text-lg mb-6">{article.excerpt}</p>
          <div className="flex items-center gap-5 text-white/50 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatDate(article.published_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{article.read_time} min de lectura</span>
            </div>
            <span>Por {article.author}</span>
          </div>
        </div>
      </div>

      <GoldDivider />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="prose-expat">
              {article.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-[#0A1628] mt-10 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                      {block.slice(3)}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-xl font-bold text-[#0A1628] mt-8 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                      {block.slice(4)}
                    </h3>
                  );
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="space-y-2 mb-5">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-[#374151]">
                          <span className="text-[#C9A84C] mt-1 text-xs">✦</span>
                          <span dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.startsWith("1. ")) {
                  const items = block.split("\n").filter((l) => /^\d+\./.test(l));
                  return (
                    <ol key={i} className="space-y-2 mb-5 counter-reset-list">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-[#374151]">
                          <span className="w-6 h-6 rounded-full bg-[#FBF6EC] text-[#C9A84C] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {j + 1}
                          </span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (block.trim()) {
                  return (
                    <p key={i} className="text-[#374151] leading-relaxed mb-5"
                       dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#0A1628]">$1</strong>') }}
                    />
                  );
                }
                return null;
              })}
            </div>

            <GoldDivider className="my-10" />

            {/* Disclaimer */}
            <div className="bg-[#F4F6F9] rounded-xl p-5 text-sm text-[#6B7280]">
              <strong className="text-[#0A1628]">Aviso:</strong> La información
              de este artículo es de carácter informativo y no constituye
              asesoría legal, fiscal o financiera. Consulta siempre con un
              profesional calificado.
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#F4F6F9] text-[#6B7280] px-3 py-1.5 rounded-full border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* CTA Card */}
            <div className="gradient-navy rounded-2xl p-6 text-white sticky top-24">
              <div className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-3">
                Siguiente paso
              </div>
              <h3
                className="font-bold text-lg mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ¿Quieres asesoría personalizada?
              </h3>
              <p className="text-white/60 text-sm mb-5">
                Agenda una consulta gratuita y te conectamos con el especialista
                correcto de nuestra red privada.
              </p>
              <Link
                href="/consulta"
                className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                Consulta Gratuita
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/asistente"
                className="flex items-center justify-center mt-3 text-white/60 hover:text-white text-sm transition-colors gap-1"
              >
                O pregunta al Asistente IA →
              </Link>
            </div>

            {/* Category */}
            {categoryInfo && (
              <div className="bg-[#F4F6F9] rounded-2xl p-5">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">
                  Categoría
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: categoryInfo.bgColor }}
                  >
                    {categoryInfo.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628] text-sm">
                      {categoryInfo.label}
                    </p>
                    <Link
                      href={`/guias?category=${categoryInfo.id}`}
                      className="text-xs text-[#C9A84C] hover:underline"
                    >
                      Ver más guías →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
