export const VISA_KEYS = ["investor", "pensionado", "friendly", "nomad"] as const;
export type VisaKey = (typeof VISA_KEYS)[number];

interface QuizOption {
  id: string;
  scores: Partial<Record<VisaKey, number>>;
}

interface QuizQuestion {
  id: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "situation",
    options: [
      { id: "capital", scores: { investor: 3 } },
      { id: "pension", scores: { pensionado: 3 } },
      { id: "job_offer", scores: { friendly: 3 } },
      { id: "remote", scores: { nomad: 3 } },
    ],
  },
  {
    id: "capital_amount",
    options: [
      { id: "none", scores: { investor: -3 } },
      { id: "300_500", scores: { investor: 2 } },
      { id: "500_plus", scores: { investor: 3 } },
    ],
  },
  {
    id: "pension_amount",
    options: [
      { id: "yes", scores: { pensionado: 3 } },
      { id: "no", scores: { pensionado: -3 } },
    ],
  },
  {
    id: "remote_income",
    options: [
      { id: "yes", scores: { nomad: 3 } },
      { id: "no", scores: { nomad: -3 } },
    ],
  },
  {
    id: "wants_local_job",
    options: [
      { id: "yes", scores: { friendly: 3, nomad: -2 } },
      { id: "no", scores: { nomad: 1, friendly: -1 } },
    ],
  },
  {
    id: "priority",
    options: [
      { id: "speed", scores: { investor: 2 } },
      { id: "cost", scores: { friendly: 1, pensionado: 1 } },
      { id: "flexibility", scores: { nomad: 2 } },
      { id: "citizenship", scores: { investor: 1, pensionado: 1, friendly: 1 } },
    ],
  },
  {
    id: "timeline",
    options: [
      { id: "fast", scores: { investor: 2 } },
      { id: "flexible", scores: { friendly: 1, nomad: 1, pensionado: 1 } },
    ],
  },
];

const TIE_BREAK_ORDER: VisaKey[] = ["investor", "pensionado", "friendly", "nomad"];

export function scoreQuiz(answers: Record<string, string>): { result: VisaKey; totals: Record<VisaKey, number> } {
  const totals: Record<VisaKey, number> = { investor: 0, pensionado: 0, friendly: 0, nomad: 0 };

  for (const q of QUIZ_QUESTIONS) {
    const chosen = answers[q.id];
    const opt = q.options.find((o) => o.id === chosen);
    if (!opt) continue;
    for (const [key, value] of Object.entries(opt.scores)) {
      totals[key as VisaKey] += value as number;
    }
  }

  let best: VisaKey = "investor";
  let bestScore = -Infinity;
  for (const key of TIE_BREAK_ORDER) {
    if (totals[key] > bestScore) {
      bestScore = totals[key];
      best = key;
    }
  }

  return { result: best, totals };
}

export const VISA_GUIDE_SLUG: Record<VisaKey, string> = {
  investor: "residencia-permanente-inversionista-calificado-panama",
  pensionado: "comparativa-visas-residencia-panama",
  friendly: "comparativa-visas-residencia-panama",
  nomad: "comparativa-visas-residencia-panama",
};
