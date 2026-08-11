import { describe, expect, it } from 'vitest';
import { getDemoAnalysis, getDemoWeather } from '@/data/demoData';
import { generateAdvisory } from './advisoryEngine';

function advisoryFor(scenarioId: string) {
  const analysis = getDemoAnalysis(scenarioId === 'rice-healthy' ? 'Rice' : scenarioId === 'chilli-leaf' ? 'Chilli' : 'Tomato', scenarioId);
  const weather = getDemoWeather(scenarioId);
  return generateAdvisory({ analysis, weather, growthStage: 'Flowering' });
}

describe('weather-aware advisory engine', () => {
  it('raises weather concern when disease risk and rain probability are high', () => {
    const result = advisoryFor('tomato-blight');
    expect(result.diseaseRisk).not.toBe('low');
    expect(result.recommendedAction).toContain('rainfall');
    expect(result.actionTiming).toBeTruthy();
  });

  it('provides a usable timing recommendation in moderate weather', () => {
    const result = advisoryFor('rice-healthy');
    expect(result.overallRisk).toBe('low');
    expect(result.actionTiming.length).toBeGreaterThan(0);
    expect(result.riskFactors).toHaveLength(5);
  });

  it('keeps healthy crop risk lower than a stressed crop scenario', () => {
    const healthy = advisoryFor('rice-healthy');
    const stressed = advisoryFor('chilli-leaf');
    expect(healthy.fieldRiskScore).toBeLessThan(stressed.fieldRiskScore);
  });

  it('returns a safe fallback recommendation when forecast data is missing', () => {
    const analysis = getDemoAnalysis('Tomato', 'tomato-blight');
    const weather = getDemoWeather('tomato-blight');
    const result = generateAdvisory({ analysis, weather: { ...weather, hourly: [], daily: [] }, growthStage: 'Flowering' });
    expect(result.recommendedAction).toBeTruthy();
    expect(result.monitoringWindow).toBeTruthy();
  });
});
