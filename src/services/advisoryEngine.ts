import type {
  CropAnalysisResult,
  WeatherData,
  Severity,
  AdvisoryResult,
  RiskFactor,
} from '@/types';
import { clampScore } from '@/utils/format';

export interface AdvisoryInput {
  analysis: CropAnalysisResult;
  weather: WeatherData;
  growthStage: string;
}

function severityToNumber(s: Severity): number {
  switch (s) {
    case 'low':
      return 25;
    case 'moderate':
      return 55;
    case 'high':
      return 85;
  }
}

function clampSeverity(n: number): Severity {
  if (n >= 70) return 'high';
  if (n >= 40) return 'moderate';
  return 'low';
}

export function generateAdvisory(input: AdvisoryInput): AdvisoryResult {
  const { analysis, weather, growthStage } = input;
  const w = weather.current;

  // Disease risk from analysis
  const diseaseRiskNum = severityToNumber(analysis.severity);

  // Rain risk from rain probability + precipitation
  const rainRiskNum = clampScore(
    w.rainProbability * 0.7 + w.precipitation * 8
  );

  // Heat stress from temperature
  const heatStressNum = clampScore(
    w.temperature > 35
      ? (w.temperature - 35) * 12 + 40
      : w.temperature < 15
        ? (15 - w.temperature) * 8 + 30
        : Math.max(0, (w.temperature - 30) * 3)
  );

  // Wind risk
  const windRiskNum = clampScore(
    w.windSpeed > 20 ? (w.windSpeed - 20) * 6 + 50 : w.windSpeed * 1.5
  );

  // Water stress — high temp + low humidity
  const waterStressNum = clampScore(
    w.temperature > 30 && w.humidity < 40
      ? (w.temperature - 30) * 6 + 30
      : w.humidity < 30
        ? 40
        : 15
  );

  // Humidity contribution to disease-favorable conditions
  const humidityFactor = w.humidity > 75 ? 15 : w.humidity > 60 ? 8 : 0;

  const diseaseRisk = clampSeverity(diseaseRiskNum + humidityFactor);
  const weatherRisk = clampSeverity(
    Math.max(rainRiskNum, heatStressNum, windRiskNum)
  );
  const overallRisk = clampSeverity(
    (severityToNumber(diseaseRisk) +
      severityToNumber(weatherRisk) +
      diseaseRiskNum) /
      3
  );

  const fieldRiskScore = clampScore(
    (diseaseRiskNum +
      rainRiskNum * 0.8 +
      heatStressNum * 0.6 +
      windRiskNum * 0.5 +
      waterStressNum * 0.5) /
      3.4
  );

  const riskFactors: RiskFactor[] = [
    {
      label: 'Disease Risk',
      score: clampScore(diseaseRiskNum + humidityFactor),
      description:
        analysis.severity === 'low'
          ? 'No significant disease symptoms detected'
          : `Suspected ${analysis.condition} at ${analysis.confidence}% confidence`,
    },
    {
      label: 'Rain Risk',
      score: rainRiskNum,
      description: `${w.rainProbability}% rain probability, ${w.precipitation}mm expected`,
    },
    {
      label: 'Heat Stress',
      score: heatStressNum,
      description: `${w.temperature}°C current temperature`,
    },
    {
      label: 'Wind Risk',
      score: windRiskNum,
      description: `${w.windSpeed} km/h wind speed`,
    },
    {
      label: 'Water Stress',
      score: waterStressNum,
      description:
        waterStressNum > 40
          ? 'Dry and hot — plants may need irrigation'
          : 'Adequate moisture conditions',
    },
  ];

  // Find best action window from hourly forecast
  const favorableHours = weather.hourly.filter(
    (h) => h.actionWindow === 'favorable'
  );
  const avoidHours = weather.hourly.filter((h) => h.actionWindow === 'avoid');

  let actionTiming = 'Today or tomorrow morning';
  if (favorableHours.length > 0) {
    const firstFavorable = favorableHours[0];
    actionTiming =
      firstFavorable.label === 'Now'
        ? 'Now — current conditions are suitable'
        : `${firstFavorable.label} today`;
  }

  let avoidAction = 'Avoid weather-sensitive field activity during heavy rain or high winds.';
  if (avoidHours.length > 0) {
    const firstAvoid = avoidHours[0];
    avoidAction = `Avoid weather-sensitive field activity around ${firstAvoid.label} when rain probability is high (${firstAvoid.rainProbability}%).`;
  }

  // Build reasoning
  const reasoningParts: string[] = [];

  if (analysis.severity !== 'low') {
    reasoningParts.push(
      `The AI detected possible ${analysis.condition} at ${analysis.confidence}% confidence with ${analysis.severity} severity.`
    );
  } else {
    reasoningParts.push(
      `The crop appears healthy at ${analysis.confidence}% confidence.`
    );
  }

  if (w.rainProbability > 60) {
    reasoningParts.push(
      `Rain is likely soon (${w.rainProbability}% probability), which may affect field activity timing.`
    );
  } else if (w.rainProbability > 35) {
    reasoningParts.push(
      `Moderate rain chance (${w.rainProbability}%) — keep this in mind for timing field work.`
    );
  }

  if (w.humidity > 75 && analysis.severity !== 'low') {
    reasoningParts.push(
      `High humidity (${w.humidity}%) may increase disease-favorable conditions.`
    );
  }

  if (w.temperature > 35) {
    reasoningParts.push(
      `High temperature (${w.temperature}°C) may cause heat stress, especially at the ${growthStage.toLowerCase()} stage.`
    );
  }

  if (w.windSpeed > 15) {
    reasoningParts.push(
      `Wind speeds of ${w.windSpeed} km/h may affect spraying or field operations.`
    );
  }

  // Recommended action
  let recommendedAction: string;

  if (analysis.severity === 'low') {
    recommendedAction = w.rainProbability > 50
      ? 'The crop looks healthy. Since rain is likely, postpone any planned field treatments until after the weather window. Continue routine monitoring.'
      : 'The crop looks healthy. Continue your regular field management routine and monitor every 2–3 days.';
  } else if (w.rainProbability > 60) {
    recommendedAction = `Conditions may favor disease development. Inspect affected leaves and nearby plants. Because rainfall is likely soon (${w.rainProbability}%), avoid weather-sensitive field activity immediately before the expected rain. Reassess field conditions after the weather window and follow locally approved agronomic guidance.`;
  } else if (w.humidity > 75) {
    recommendedAction = `High humidity may increase disease-favorable conditions. Inspect affected leaves and nearby plants regularly. Consider improving airflow around the crop and avoiding unnecessary leaf wetness. Follow locally approved agronomic guidance for any treatment decisions.`;
  } else if (w.temperature > 35) {
    recommendedAction = `Hot and dry conditions are present. The suspected condition may stress the crop further. Monitor closely, ensure adequate irrigation, and avoid field activity during peak heat hours. Follow locally approved agronomic guidance for any treatment decisions.`;
  } else {
    recommendedAction = `The suspected condition warrants attention. Inspect the affected area and nearby plants. Current weather conditions are moderate, so field activity may be considered during the next favorable window. Follow locally approved agronomic guidance for any treatment decisions.`;
  }

  // Monitoring window
  let monitoringWindow: string;
  if (analysis.severity === 'high') {
    monitoringWindow = 'Inspect the field daily for the next 3–5 days.';
  } else if (analysis.severity === 'moderate') {
    monitoringWindow = 'Check the field every 1–2 days over the next week.';
  } else {
    monitoringWindow = 'Routine monitoring every 2–3 days is sufficient.';
  }

  return {
    overallRisk,
    weatherRisk,
    diseaseRisk,
    recommendedAction,
    actionTiming,
    avoidAction,
    reasoning: reasoningParts.join(' '),
    monitoringWindow,
    riskFactors,
    fieldRiskScore,
  };
}
