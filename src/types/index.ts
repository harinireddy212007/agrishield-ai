export type CropType = 'Rice' | 'Tomato' | 'Chilli' | 'Other';

export type GrowthStage = 'Seedling' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Maturity';

export type Severity = 'low' | 'moderate' | 'high';

export interface CropAnalysisResult {
  crop: CropType;
  condition: string;
  confidence: number;
  severity: Severity;
  symptoms: string[];
  recommendedActions: string[];
  precautions: string[];
  monitoringAdvice: string[];
}

export interface WeatherCurrent {
  temperature: number;
  feelsLike: number;
  humidity: number;
  rainProbability: number;
  precipitation: number;
  windSpeed: number;
  condition: string;
  conditionIcon: string;
  isDemo: boolean;
}

export interface HourlyForecast {
  hour: string;
  label: string;
  temperature: number;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  actionWindow: 'favorable' | 'monitor' | 'avoid';
}

export interface DailyForecast {
  day: string;
  dayLabel: string;
  high: number;
  low: number;
  rainProbability: number;
  condition: string;
  conditionIcon: string;
}

export interface WeatherData {
  current: WeatherCurrent;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  locationName: string;
  isDemo: boolean;
}

export interface AdvisoryResult {
  overallRisk: Severity;
  weatherRisk: Severity;
  diseaseRisk: Severity;
  recommendedAction: string;
  actionTiming: string;
  avoidAction: string;
  reasoning: string;
  monitoringWindow: string;
  riskFactors: RiskFactor[];
  fieldRiskScore: number;
}

export interface RiskFactor {
  label: string;
  score: number;
  description: string;
}

export interface AdvisoryRecord {
  id: string;
  date: string;
  crop: CropType;
  growthStage: GrowthStage;
  condition: string;
  confidence: number;
  severity: Severity;
  riskLevel: RiskLevel;
  recommendedAction: string;
  actionWindow: string;
  locationName: string;
  analysis: CropAnalysisResult;
  weather: WeatherData;
  advisory: AdvisoryResult;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
}

export type Page =
  | 'landing'
  | 'dashboard'
  | 'check-crop'
  | 'report'
  | 'weather'
  | 'crop-health'
  | 'history'
  | 'settings';

export type RiskLevel = 'good' | 'monitor' | 'high' | 'info';
