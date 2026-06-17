interface ArticleText {
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
}

const ARTICLES_ES: Record<string, ArticleText> = {
  "visa-jubilados-pensionado-guia-completa": {
    title: "Visa de Jubilados Pensionado: La guía completa",
    excerpt: "Todo lo que necesitas saber sobre la visa más atractiva de Panamá para extranjeros que reciben ingresos pasivos regulares.",
    author: "Equipo Expat507",
    tags: ["visa", "jubilados", "residencia"],
  },
  "visa-nomada-digital-panama": {
    title: "Visa de Nómada Digital en Panamá: requisitos y proceso",
    excerpt: "Panamá ofrece una visa especial para trabajadores remotos. Aquí el proceso completo, costos y timeline.",
    author: "Equipo Expat507",
    tags: ["visa", "nómada digital"],
  },
  "abrir-cuenta-bancaria-panama-extranjero": {
    title: "Cómo abrir una cuenta bancaria o de inversión en Panamá",
    excerpt: "Tipos de cuenta, proceso de debida diligencia, documentación y tiempos reales para personas naturales, empresas e inversionistas.",
    author: "Equipo Expat507",
    tags: ["banca", "cuenta bancaria", "debida diligencia"],
  },
  "mejores-bancos-panama-expatriados": {
    title: "Los mejores bancos de Panamá para expatriados",
    excerpt: "Comparativo detallado de los principales bancos: servicios en inglés, banca online y condiciones para extranjeros.",
    author: "Equipo Expat507",
    tags: ["banca", "comparativo"],
  },
  "mercado-inmobiliario-panama-zonas-clave": {
    title: "Mercado inmobiliario en Panamá: zonas clave para invertir",
    excerpt: "Análisis comparativo de los mejores barrios para inversión inmobiliaria: Punta Pacífica, Costa del Este, Casco Viejo y más.",
    author: "Equipo Expat507",
    tags: ["bienes raíces", "inversión", "zonas"],
  },
  "comprar-propiedad-panama-extranjero": {
    title: "Guía del inversionista extranjero en bienes raíces",
    excerpt: "Tipos de propiedad, zonas de plusvalía, propiedad titulada vs. derecho posesorio, costos de cierre y errores comunes que cometen los extranjeros.",
    author: "Equipo Expat507",
    tags: ["bienes raíces", "inversión", "proceso de compra"],
  },
  "fundaciones-interes-privado-panama": {
    title: "Fundaciones de interés privado en Panamá: qué son y para qué sirven",
    excerpt: "Las fundaciones panameñas son uno de los mejores vehículos de protección patrimonial. Guía completa.",
    author: "Equipo Expat507",
    tags: ["legal", "fundaciones"],
  },
  "sociedades-anonimas-panama": {
    title: "Sociedades patrimoniales: cómo estructurar y proteger tu patrimonio",
    excerpt: "Cómo usar una sociedad panameña como holding de activos, combinada con el régimen territorial y, cuando aplica, con una fundación de interés privado.",
    author: "Equipo Expat507",
    tags: ["legal", "sociedades", "patrimonio"],
  },
  "planificacion-patrimonial-latinoamericanos-panama": {
    title: "Planificación patrimonial para latinoamericanos en Panamá",
    excerpt: "Cómo estructurar tu patrimonio usando vehículos panameños para protegerlo de riesgos políticos y fiscales.",
    author: "Equipo Expat507",
    tags: ["patrimonio", "planificación"],
  },
  "costo-de-vida-ciudad-de-panama": {
    title: "Costo de vida en Ciudad de Panamá: datos reales",
    excerpt: "Alquiler, comida, transporte, educación y salud: los números reales de vivir bien en Panamá.",
    author: "Equipo Expat507",
    tags: ["expat life", "costo de vida"],
  },
  "mejores-barrios-ciudad-de-panama": {
    title: "Los mejores barrios para vivir en Ciudad de Panamá",
    excerpt: "Guía honesta de los barrios más populares entre expatriados: ventajas, desventajas y precios reales.",
    author: "Equipo Expat507",
    tags: ["expat life", "barrios"],
  },
  "sistema-salud-panama-expatriados": {
    title: "Sistema de salud en Panamá: hospitales, seguros y calidad",
    excerpt: "Cómo funciona el sistema de salud, los mejores hospitales privados y qué seguro médico conviene contratar.",
    author: "Equipo Expat507",
    tags: ["expat life", "salud"],
  },
  "residencia-permanente-inversionista-calificado-panama": {
    title: "Residencia Permanente como Inversionista Calificado",
    excerpt: "Las tres modalidades de inversión, requisitos, proceso paso a paso y la ruta completa hacia la residencia permanente y la naturalización en Panamá.",
    author: "Equipo Expat507",
    tags: ["visa", "inversionista calificado", "residencia permanente"],
  },
  "comparativa-visas-residencia-panama": {
    title: "Comparativa de visas de residencia en Panamá",
    excerpt: "Inversionista Calificado, Pensionado, Naciones Amigas y Nómada Digital cara a cara: requisitos, costos y a quién le conviene cada una.",
    author: "Equipo Expat507",
    tags: ["visa", "comparativo", "residencia"],
  },
  "naturalizacion-ciudadania-panama": {
    title: "Proceso de naturalización y ciudadanía panameña",
    excerpt: "Requisitos tras 5 años de residencia, el examen de naturalización, doble nacionalidad y qué cambia al obtener el pasaporte panameño.",
    author: "Equipo Expat507",
    tags: ["naturalización", "ciudadanía", "pasaporte"],
  },
  "fundaciones-vs-fideicomisos-panama": {
    title: "Fundaciones vs. Fideicomisos en Panamá: cuál necesitas",
    excerpt: "Diferencias reales entre ambos vehículos, ventajas y desventajas de cada uno, y qué conviene según tu objetivo: protección, herencia o sucesión.",
    author: "Equipo Expat507",
    tags: ["legal", "fundaciones", "fideicomisos"],
  },
  "preconstruccion-vs-propiedad-terminada-panama": {
    title: "Pre-construcción vs. propiedad terminada en Panamá",
    excerpt: "Riesgos, retornos y diferencias clave entre comprar sobre planos y comprar una propiedad ya construida.",
    author: "Equipo Expat507",
    tags: ["bienes raíces", "preconstrucción", "inversión"],
  },
  "sistema-fiscal-territorial-panama": {
    title: "El sistema fiscal territorial de Panamá",
    excerpt: "Qué se grava y qué no, el ITBMS, las ganancias de capital y una nota especial para ciudadanos de Estados Unidos.",
    author: "Equipo Expat507",
    tags: ["fiscalidad", "impuestos", "régimen territorial"],
  },
};

export default ARTICLES_ES;
