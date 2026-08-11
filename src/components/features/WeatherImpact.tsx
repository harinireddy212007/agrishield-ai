import { CloudRain, Droplets, Thermometer, Wind, Info } from 'lucide-react';
import type { WeatherData, AdvisoryResult } from '@/types';
import { Card, CardHeader } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

interface WeatherImpactProps {
  weather: WeatherData;
  advisory: AdvisoryResult;
}

function riskLabel(score: number): { label: string; color: string } {
  if (score >= 70) return { label: 'High', color: 'bg-red-500' };
  if (score >= 40) return { label: 'Moderate', color: 'bg-earth-400' };
  return { label: 'Low', color: 'bg-leaf-500' };
}

export function WeatherImpact({ weather, advisory }: WeatherImpactProps) {
  const factors = advisory.riskFactors;
  const rain = factors.find((f) => f.label === 'Rain Risk') ?? factors[1];
  const humidity = factors.find((f) => f.label.includes('Humidity')) ?? factors[0];
  const heat = factors.find((f) => f.label === 'Heat Stress') ?? factors[2];
  const wind = factors.find((f) => f.label === 'Wind Risk') ?? factors[3];

  const items = [
    { icon: <CloudRain className="w-4 h-4" />, label: 'Rain Risk', score: rain?.score ?? 0, color: riskLabel(rain?.score ?? 0).color },
    { icon: <Droplets className="w-4 h-4" />, label: 'Humidity Risk', score: humidity?.score ?? 0, color: riskLabel(humidity?.score ?? 0).color },
    { icon: <Thermometer className="w-4 h-4" />, label: 'Heat Risk', score: heat?.score ?? 0, color: riskLabel(heat?.score ?? 0).color },
    { icon: <Wind className="w-4 h-4" />, label: 'Wind Risk', score: wind?.score ?? 0, color: riskLabel(wind?.score ?? 0).color },
  ];

  const whyThisMatters = advisory.reasoning;

  return (
    <Card>
      <CardHeader
        title="Weather Impact on Your Crop"
        subtitle="How current conditions may affect your field"
        icon={<CloudRain className="w-5 h-5" />}
      />
      <div className="px-5 pb-5">
        <div className="space-y-4">
          {items.map((item) => {
            const r = riskLabel(item.score);
            return (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-2 text-charcoal-700 font-medium">
                    <span className="text-forest-600">{item.icon}</span>
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold text-charcoal-600">{r.label}</span>
                </div>
                <Progress value={item.score} color={item.color} />
              </div>
            );
          })}
        </div>

        <div className="mt-5 p-4 rounded-xl bg-forest-50 border border-forest-100">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1">Why this matters</p>
              <p className="text-sm text-charcoal-700 leading-relaxed">{whyThisMatters}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
