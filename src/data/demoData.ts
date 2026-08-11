import type {
  CropType,
  GrowthStage,
  CropAnalysisResult,
  WeatherData,
  HourlyForecast,
  DailyForecast,
  WeatherCurrent,
} from '@/types';

export const CROP_OPTIONS: CropType[] = ['Rice', 'Tomato', 'Chilli', 'Other'];

export const GROWTH_STAGE_OPTIONS: GrowthStage[] = [
  'Seedling',
  'Vegetative',
  'Flowering',
  'Fruiting',
  'Maturity',
];

export const DEMO_SCENARIOS = [
  {
    id: 'tomato-blight',
    label: 'Tomato — Early Blight + Humid/Rainy',
    crop: 'Tomato' as CropType,
    growthStage: 'Flowering' as GrowthStage,
    condition: 'Early Blight',
    confidence: 91,
    severity: 'moderate' as const,
    summary: 'Tomato + suspected Early Blight + high humidity + upcoming rain',
  },
  {
    id: 'rice-healthy',
    label: 'Rice — Healthy Crop + Moderate Weather',
    crop: 'Rice' as CropType,
    growthStage: 'Vegetative' as GrowthStage,
    condition: 'Healthy Crop',
    confidence: 88,
    severity: 'low' as const,
    summary: 'Rice + healthy crop + moderate weather',
  },
  {
    id: 'chilli-leaf',
    label: 'Chilli — Leaf Disease + Hot/Dry',
    crop: 'Chilli' as CropType,
    growthStage: 'Fruiting' as GrowthStage,
    condition: 'Leaf Curl Disease',
    confidence: 84,
    severity: 'high' as const,
    summary: 'Chilli + suspected leaf disease + hot/dry weather',
  },
];

export function getDemoAnalysis(
  crop: CropType,
  scenarioId?: string
): CropAnalysisResult {
  const scenario =
    DEMO_SCENARIOS.find((s) => s.id === scenarioId) ?? DEMO_SCENARIOS[0];

  if (scenario.crop === 'Rice') {
    return {
      crop: 'Rice',
      condition: 'Healthy Crop',
      confidence: 88,
      severity: 'low',
      symptoms: [
        'No significant visual symptoms detected',
        'Leaf color appears healthy and uniform',
        'No spots, lesions, or discoloration observed',
      ],
      recommendedActions: [
        'Continue regular monitoring of the field',
        'Maintain current irrigation and nutrient schedule',
        'Inspect for pests during routine field walks',
      ],
      precautions: [
        'Avoid over-fertilizing during vegetative stage',
        'Do not let water stagnate for extended periods',
      ],
      monitoringAdvice: [
        'Check the field every 2–3 days',
        'Pay attention to lower leaves for early signs of disease',
      ],
    };
  }

  if (scenario.crop === 'Chilli') {
    return {
      crop: 'Chilli',
      condition: 'Leaf Curl Disease',
      confidence: 84,
      severity: 'high',
      symptoms: [
        'Upward curling and distortion of leaves',
        'Yellowing along leaf margins',
        'Stunted growth on affected branches',
        'Reduced fruit set on severely affected plants',
      ],
      recommendedActions: [
        'Inspect nearby plants for similar curling symptoms',
        'Remove and destroy severely affected leaves to reduce spread',
        'Monitor for whitefly activity, a common vector',
        'Improve airflow around plants by managing weed cover',
      ],
      precautions: [
        'Avoid handling healthy plants after touching affected ones',
        'Do not introduce new seedlings without inspection',
        'Avoid overhead irrigation during hot, dry periods',
      ],
      monitoringAdvice: [
        'Check new growth every 2 days for curling symptoms',
        'Watch for whitefly presence on leaf undersides',
      ],
    };
  }

  // Tomato — Early Blight (default)
  return {
    crop: 'Tomato',
    condition: 'Early Blight',
    confidence: 91,
    severity: 'moderate',
    symptoms: [
      'Brown to dark brown concentric ring spots on leaves',
      'Yellowing around affected leaf areas',
      'Progressive leaf damage starting from lower leaves',
      'Lesions may develop on stems in advanced stages',
    ],
    recommendedActions: [
      'Inspect nearby plants for similar symptoms',
      'Remove severely affected lower leaves where appropriate',
      'Improve airflow by pruning dense foliage',
      'Avoid unnecessary leaf wetness — water at the base',
      'Monitor disease progression over the next 3–5 days',
    ],
    precautions: [
      'Avoid unnecessary spraying immediately before rain',
      'Avoid overwatering, which prolongs leaf wetness',
      'Avoid ignoring rapidly spreading symptoms',
    ],
    monitoringAdvice: [
      'Check the field daily during humid conditions',
      'Photograph affected leaves every 2 days to track progression',
    ],
  };
}

function buildHourly(
  baseTemp: number,
  baseHumidity: number,
  rainStart: number,
  rainEnd: number
): HourlyForecast[] {
  const hours: HourlyForecast[] = [];
  const now = new Date();
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'];

  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getTime() + i * 60 * 60 * 1000);
    const h = d.getHours();
    const label =
      i === 0
        ? 'Now'
        : h === 0
          ? '12am'
          : h < 12
            ? `${h}am`
            : h === 12
              ? '12pm'
              : `${h - 12}pm`;

    // Temperature follows a daily curve
    const tempCurve = Math.sin(((h - 6) / 24) * Math.PI * 2) * 5;
    const temperature = Math.round(baseTemp + tempCurve);

    // Rain probability spikes during rain window
    let rainProb = 15 + Math.round(Math.sin((i / 24) * Math.PI) * 10);
    if (i >= rainStart && i <= rainEnd) {
      rainProb = 65 + Math.round(Math.random() * 20);
    }

    const humidity = Math.min(
      95,
      Math.max(40, baseHumidity + Math.round(Math.cos((i / 24) * Math.PI * 2) * 8))
    );

    const windSpeed = 6 + Math.round(Math.sin((i / 12) * Math.PI) * 4);

    let condition = conditions[0];
    if (rainProb > 60) condition = conditions[4];
    else if (rainProb > 40) condition = conditions[3];
    else if (humidity > 70) condition = conditions[2];
    else if (humidity > 55) condition = conditions[1];

    let actionWindow: HourlyForecast['actionWindow'] = 'favorable';
    if (rainProb > 60) actionWindow = 'avoid';
    else if (rainProb > 35 || windSpeed > 14) actionWindow = 'monitor';

    hours.push({
      hour: `${i}`,
      label,
      temperature,
      rainProbability: rainProb,
      humidity,
      windSpeed,
      condition,
      actionWindow,
    });
  }
  return hours;
}

export function getDemoWeather(
  scenarioId?: string,
  locationName = 'Demo Location'
): WeatherData {
  const scenario =
    DEMO_SCENARIOS.find((s) => s.id === scenarioId) ?? DEMO_SCENARIOS[0];

  let baseTemp = 31;
  let baseHumidity = 84;
  let rainStart = 5;
  let rainEnd = 9;
  let condition = 'Partly Cloudy';
  let precipitation = 2.1;

  if (scenario.crop === 'Rice') {
    baseTemp = 28;
    baseHumidity = 65;
    rainStart = 30;
    rainEnd = 30;
    condition = 'Sunny';
    precipitation = 0;
  } else if (scenario.crop === 'Chilli') {
    baseTemp = 37;
    baseHumidity = 42;
    rainStart = 30;
    rainEnd = 30;
    condition = 'Sunny';
    precipitation = 0;
  }

  const current: WeatherCurrent = {
    temperature: baseTemp,
    feelsLike: baseTemp + (baseHumidity > 70 ? 3 : -1),
    humidity: baseHumidity,
    rainProbability: rainStart < 24 ? 72 : 12,
    precipitation,
    windSpeed: 8,
    condition,
    conditionIcon: condition,
    isDemo: true,
  };

  const hourly = buildHourly(baseTemp, baseHumidity, rainStart, rainEnd);

  const daily: DailyForecast[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const dayLabel =
      i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    daily.push({
      day: `${i}`,
      dayLabel,
      high: baseTemp + 2 + Math.round(Math.sin(i) * 2),
      low: baseTemp - 6 + Math.round(Math.cos(i) * 2),
      rainProbability:
        scenario.crop === 'Tomato' && i < 2
          ? 65 + Math.round(Math.sin(i) * 15)
          : scenario.crop === 'Rice'
            ? 20 + Math.round(Math.sin(i) * 10)
            : 5 + Math.round(Math.sin(i) * 5),
      condition:
        scenario.crop === 'Tomato' && i === 0
          ? 'Heavy Rain'
          : scenario.crop === 'Rice'
            ? 'Sunny'
            : 'Sunny',
      conditionIcon:
        scenario.crop === 'Tomato' && i === 0
          ? 'Heavy Rain'
          : 'Sunny',
    });
  }

  return {
    current,
    hourly,
    daily,
    locationName,
    isDemo: true,
  };
}

// A sample leaf image (public domain from Pexels - tomato leaf)
export const DEMO_LEAF_IMAGE_URL =
  'https://images.pexels.com/photos/5685910/pexels-photo-5685910.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const now = new Date();
