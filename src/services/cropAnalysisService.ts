import type { CropType, GrowthStage, CropAnalysisResult } from '@/types';
import { getDemoAnalysis, DEMO_SCENARIOS } from '@/data/demoData';

export interface AnalysisInput {
  crop: CropType;
  growthStage: GrowthStage;
  scenarioId?: string;
}

const ANALYSIS_STEPS = [
  { id: 'image', label: 'Reading crop image' },
  { id: 'symptoms', label: 'Identifying visual symptoms' },
  { id: 'crop', label: 'Checking crop information' },
  { id: 'weather', label: 'Reading local weather' },
  { id: 'climate', label: 'Evaluating climate risk' },
  { id: 'advisory', label: 'Preparing advisory' },
] as const;

export const ANALYSIS_PROGRESS_STEPS = ANALYSIS_STEPS;

export async function analyzeCrop(input: AnalysisInput): Promise<CropAnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const scenario = input.scenarioId
    ? DEMO_SCENARIOS.find((s) => s.id === input.scenarioId)
    : DEMO_SCENARIOS.find((s) => s.crop === input.crop) ?? DEMO_SCENARIOS[0];

  const result = getDemoAnalysis(input.crop, scenario?.id);

  await new Promise((resolve) => setTimeout(resolve, 300));

  return result;
}

export function getScenarioForCrop(crop: CropType): string {
  return DEMO_SCENARIOS.find((s) => s.crop === crop)?.id ?? DEMO_SCENARIOS[0].id;
}
