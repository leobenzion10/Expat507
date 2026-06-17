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
    title: "Cómo abrir una cuenta bancaria en Panamá siendo extranjero",
    excerpt: "Proceso paso a paso, documentos requeridos y los mejores bancos para no residentes.",
    author: "Equipo Expat507",
    tags: ["banca", "cuenta bancaria", "requisitos"],
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
    title: "Cómo comprar propiedad en Panamá siendo extranjero",
    excerpt: "Desde la búsqueda hasta la escritura pública: el proceso completo con sus costos y tiempos reales.",
    author: "Equipo Expat507",
    tags: ["bienes raíces", "proceso"],
  },
  "fundaciones-interes-privado-panama": {
    title: "Fundaciones de interés privado en Panamá: qué son y para qué sirven",
    excerpt: "Las fundaciones panameñas son uno de los mejores vehículos de protección patrimonial. Guía completa.",
    author: "Equipo Expat507",
    tags: ["legal", "fundaciones"],
  },
  "sociedades-anonimas-panama": {
    title: "Sociedades anónimas en Panamá: estructura, costos y usos",
    excerpt: "La sociedad anónima panameña es mundialmente reconocida. Cuándo usarla, cómo constituirla y qué costos tiene.",
    author: "Equipo Expat507",
    tags: ["legal", "sociedades"],
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
};

export default ARTICLES_ES;
