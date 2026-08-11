import { Leaf, CloudRain, Droplets, Wind } from 'lucide-react';
import type { AdvisoryResult, CropAnalysisResult } from '@/types';
import { Card, CardHeader } from '@/components/ui/Card';

interface WhyRecommendationProps {
  analysis: CropAnalysisResult;
  advisory: AdvisoryResult;
}

export function WhyRecommendation({ analysis, advisory }: WhyRecommendationProps) {
  const w = advisory.riskFactors;
  const rain = w.find((f) => f.label === 'Rain Risk');
  const humidity = w.find((f) => f.label.includes('Humidity') || f.label === 'Disease Risk');
  const wind = w.find((f) => f.label === 'Wind Risk');
  const disease = w.find((f) => f.label === 'Disease Risk');

  const factors = [
    {
      icon: <Leaf className="w-4 h-4" />,
      title: 'Crop condition',
      detail: analysis.severity === 'low'
        ? 'No significant disease risk detected'
        : `Detected ${analysis.severity} disease risk`,
    },
    {
      icon: <CloudRain className="w-4 h-4" />,
      title: 'Upcoming rain',
      detail: rain
        ? rain.score >= 60 ? 'Rain probability elevated' : 'Rain probability is low'
        : 'No rain data available',
    },
    {
      icon: <Droplets className="w-4 h-4" />,
      title: 'Humidity',
      detail: disease && disease.score >= 55
        ? 'Conditions may favor disease development'
        : 'Humidity levels are manageable',
    },
    {
      icon: <Wind className="w-4 h-4" />,
      title: 'Wind',
      detail: wind
        ? wind.score >= 50 ? 'Wind conditions may affect field operations' : 'Moderate wind conditions'
        : 'Wind data unavailable',
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Why This Recommendation?"
        subtitle="The factors that shaped this advisory"
        icon={<Leaf className="w-5 h-5" />}
      />
      <div className="px-5 pb-5">
        <div className="grid sm:grid-cols-2 gap-3">
          {factors.map((f) => (
            <div key={f.title} className="flex gap-3 p-3 rounded-lg bg-earth-50 border border-charcoal-100">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-forest-700 flex-shrink-0">
                {f.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-charcoal-800">{f.title}</p>
                <p className="text-xs text-charcoal-500 mt-0.5 leading-relaxed">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-charcoal-400 mt-4 italic">
          These factors influenced the current advisory. The recommendation is guidance based on available signals, not a guaranteed outcome.
        </p>
      </div>
    </Card>
  );
}
