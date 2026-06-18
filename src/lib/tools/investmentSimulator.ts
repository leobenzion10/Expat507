export type Modality = "real-estate" | "securities" | "deposit";

export interface SimulatorResult {
  qualifies: boolean;
  modalities: Modality[];
  recommended: Modality | null;
  amount: number;
}

export const THRESHOLDS: Record<Modality, number> = {
  "real-estate": 300000,
  securities: 500000,
  deposit: 750000,
};

const ORDER: Modality[] = ["real-estate", "securities", "deposit"];

export function simulateInvestment(amount: number): SimulatorResult {
  const modalities = ORDER.filter((m) => amount >= THRESHOLDS[m]);
  return {
    qualifies: modalities.length > 0,
    modalities,
    recommended: modalities[0] || null,
    amount,
  };
}
