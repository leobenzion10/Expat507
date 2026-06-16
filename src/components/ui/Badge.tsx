import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type Category } from "@/types";

interface BadgeProps {
  category: Category;
  className?: string;
}

const categoryStyles: Record<Category, string> = {
  migracion: "bg-amber-50 text-amber-800 border border-amber-200",
  "bienes-raices": "bg-blue-50 text-blue-800 border border-blue-200",
  banca: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  legal: "bg-slate-50 text-slate-700 border border-slate-200",
  patrimonio: "bg-purple-50 text-purple-800 border border-purple-200",
  "expat-life": "bg-teal-50 text-teal-800 border border-teal-200",
};

export default function Badge({ category, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase",
        categoryStyles[category],
        className
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
