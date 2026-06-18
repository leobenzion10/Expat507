export type ComparatorVisaKey = "investor" | "pensionado" | "friendly" | "nomad";
export type BudgetFilter = "any" | "less_300k" | "300k_500k" | "500k_plus";
export type YesNoAny = "any" | "yes" | "no";

export interface ComparatorFilters {
  budget: BudgetFilter;
  wantsWork: YesNoAny;
  isRetired: YesNoAny;
}

export interface VisaAttributes {
  key: ComparatorVisaKey;
  minRequirement: string;
  pathToResidency: string;
  setupCost: string;
  maintenanceCost: string;
  worksLocally: boolean | "conditional";
}

export const VISA_DATA: VisaAttributes[] = [
  {
    key: "investor",
    minRequirement: "$300,000 - $750,000",
    pathToResidency: "permanent_immediate",
    setupCost: "$3,000 - $7,000",
    maintenanceCost: "$800 - $1,200/yr",
    worksLocally: false,
  },
  {
    key: "pensionado",
    minRequirement: "$1,000/mo (or $750/mo with $100k+ property)",
    pathToResidency: "permanent_immediate",
    setupCost: "$1,500 - $3,000",
    maintenanceCost: "~$500/yr",
    worksLocally: false,
  },
  {
    key: "friendly",
    minRequirement: "Variable (economic/professional tie)",
    pathToResidency: "temporary_then_permanent",
    setupCost: "$2,000 - $4,000",
    maintenanceCost: "$800 - $1,200/yr",
    worksLocally: true,
  },
  {
    key: "nomad",
    minRequirement: "$3,000/mo remote income",
    pathToResidency: "temporary_no_permanent",
    setupCost: "$1,000 - $2,500",
    maintenanceCost: "$300 - $600/yr",
    worksLocally: false,
  },
];

export function filterVisas(filters: ComparatorFilters): ComparatorVisaKey[] {
  return VISA_DATA.filter((visa) => {
    if (visa.key === "investor" && filters.budget === "less_300k") return false;
    if (visa.key === "pensionado" && filters.isRetired === "no") return false;
    if (visa.key === "friendly" && filters.wantsWork === "no") return false;
    if (visa.key === "nomad" && filters.wantsWork === "yes") return false;
    return true;
  }).map((v) => v.key);
}
