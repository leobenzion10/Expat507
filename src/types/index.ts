export type Category =
  | "migracion"
  | "bienes-raices"
  | "banca"
  | "legal"
  | "patrimonio"
  | "expat-life";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  published_at: string;
  read_time: number;
  featured: boolean;
  cover_image?: string;
  tags: string[];
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  country: string;
  objective: string;
  budget: string;
  urgency: string;
  created_at?: string;
}

export interface Subscriber {
  id?: string;
  email: string;
  name?: string;
  created_at?: string;
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "migracion",
    label: "Migración y Residencia",
    description: "Visas, permisos de residencia y ciudadanía",
    icon: "🛂",
    color: "#B8935A",
    bgColor: "#FBF6EC",
  },
  {
    id: "bienes-raices",
    label: "Bienes Raíces",
    description: "Mercado inmobiliario, inversiones y propiedades",
    icon: "🏙️",
    color: "#0B1A17",
    bgColor: "#EEF1F6",
  },
  {
    id: "banca",
    label: "Banca y Finanzas",
    description: "Apertura de cuentas y servicios financieros",
    icon: "🏦",
    color: "#B8935A",
    bgColor: "#FBF6EC",
  },
  {
    id: "legal",
    label: "Legal y Estructuras",
    description: "Estructuras jurídicas, fundaciones y contratos",
    icon: "⚖️",
    color: "#0B1A17",
    bgColor: "#EEF1F6",
  },
  {
    id: "patrimonio",
    label: "Patrimonio y Fiscalidad",
    description: "Planificación patrimonial, protección de activos y fiscalidad",
    icon: "💼",
    color: "#B8935A",
    bgColor: "#FBF6EC",
  },
  {
    id: "expat-life",
    label: "Vida Expat",
    description: "Vida cotidiana, cultura y comunidad en Panamá",
    icon: "🌴",
    color: "#0B1A17",
    bgColor: "#EEF1F6",
  },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  migracion: "Migración y Residencia",
  "bienes-raices": "Bienes Raíces",
  banca: "Banca y Finanzas",
  legal: "Legal y Estructuras",
  patrimonio: "Patrimonio y Fiscalidad",
  "expat-life": "Vida Expat",
};
