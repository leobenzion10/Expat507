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
    label: "Migración",
    description: "Visas, permisos de residencia y ciudadanía",
    icon: "🛂",
    color: "#C9A84C",
    bgColor: "#FBF6EC",
  },
  {
    id: "bienes-raices",
    label: "Bienes Raíces",
    description: "Mercado inmobiliario, inversiones y propiedades",
    icon: "🏙️",
    color: "#0A1628",
    bgColor: "#EEF1F6",
  },
  {
    id: "banca",
    label: "Banca",
    description: "Apertura de cuentas y servicios financieros",
    icon: "🏦",
    color: "#C9A84C",
    bgColor: "#FBF6EC",
  },
  {
    id: "legal",
    label: "Legal",
    description: "Estructuras jurídicas, fundaciones y contratos",
    icon: "⚖️",
    color: "#0A1628",
    bgColor: "#EEF1F6",
  },
  {
    id: "patrimonio",
    label: "Patrimonio",
    description: "Planificación patrimonial y protección de activos",
    icon: "💼",
    color: "#C9A84C",
    bgColor: "#FBF6EC",
  },
  {
    id: "expat-life",
    label: "Expat Life",
    description: "Vida cotidiana, cultura y comunidad en Panamá",
    icon: "🌴",
    color: "#0A1628",
    bgColor: "#EEF1F6",
  },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  migracion: "Migración",
  "bienes-raices": "Bienes Raíces",
  banca: "Banca",
  legal: "Legal",
  patrimonio: "Patrimonio",
  "expat-life": "Expat Life",
};
