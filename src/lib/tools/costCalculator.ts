export type Zone =
  | "punta-pacifica"
  | "punta-paitilla"
  | "santa-maria"
  | "obarrio"
  | "san-francisco"
  | "costa-del-este"
  | "casco-antiguo"
  | "coronado"
  | "chame"
  | "buenaventura"
  | "other";
export type FamilySize = "single" | "couple" | "family" | "large-family";
export type Transport = "public" | "car" | "mixed";
export type Education = "none" | "public" | "private-national" | "international";

export interface CostInputs {
  zone: Zone;
  familySize: FamilySize;
  transport: Transport;
  education: Education;
}

export interface CostBreakdown {
  housing: number;
  food: number;
  transport: number;
  utilities: number;
  health: number;
  education: number;
  misc: number;
  total: number;
  comparisons: { miami: number; madrid: number; toronto: number };
}

const HOUSING_BASE: Record<Zone, number> = {
  "punta-paitilla": 1700,
  "punta-pacifica": 1600,
  "santa-maria": 1550,
  "costa-del-este": 1500,
  obarrio: 1450,
  "san-francisco": 1400,
  "casco-antiguo": 1300,
  buenaventura: 1300,
  coronado: 1100,
  chame: 950,
  other: 900,
};

const FAMILY_FACTOR: Record<FamilySize, { housing: number; adults: number; children: number }> = {
  single: { housing: 0.7, adults: 1, children: 0 },
  couple: { housing: 1.0, adults: 2, children: 0 },
  family: { housing: 1.4, adults: 2, children: 2 },
  "large-family": { housing: 1.8, adults: 2, children: 3 },
};

const TRANSPORT_COST: Record<Transport, number> = {
  public: 60,
  car: 450,
  mixed: 300,
};

const EDUCATION_COST_PER_CHILD: Record<Education, number> = {
  none: 0,
  public: 50,
  "private-national": 400,
  international: 900,
};

const UTILITIES_BASE: Record<FamilySize, number> = {
  single: 150,
  couple: 180,
  family: 230,
  "large-family": 280,
};

const FOOD_PER_ADULT = 350;
const FOOD_PER_CHILD = 150;
const HEALTH_PER_ADULT = 200;
const HEALTH_PER_CHILD = 100;
const MISC_RATE = 0.1;

// Reference multipliers for an equivalent lifestyle in other cities.
// These are general reference estimates for comparison purposes, not precise indices.
const CITY_MULTIPLIERS = { miami: 1.35, madrid: 1.05, toronto: 1.25 };

export function calculateCost(inputs: CostInputs): CostBreakdown {
  const fam = FAMILY_FACTOR[inputs.familySize];

  const housing = Math.round(HOUSING_BASE[inputs.zone] * fam.housing);
  const food = fam.adults * FOOD_PER_ADULT + fam.children * FOOD_PER_CHILD;
  const transport = TRANSPORT_COST[inputs.transport] + (inputs.familySize === "large-family" && inputs.transport === "car" ? 100 : 0);
  const utilities = UTILITIES_BASE[inputs.familySize];
  const health = fam.adults * HEALTH_PER_ADULT + fam.children * HEALTH_PER_CHILD;
  const education = fam.children * EDUCATION_COST_PER_CHILD[inputs.education];

  const subtotal = housing + food + transport + utilities + health + education;
  const misc = Math.round(subtotal * MISC_RATE);
  const total = subtotal + misc;

  return {
    housing,
    food,
    transport,
    utilities,
    health,
    education,
    misc,
    total,
    comparisons: {
      miami: Math.round(total * CITY_MULTIPLIERS.miami),
      madrid: Math.round(total * CITY_MULTIPLIERS.madrid),
      toronto: Math.round(total * CITY_MULTIPLIERS.toronto),
    },
  };
}
