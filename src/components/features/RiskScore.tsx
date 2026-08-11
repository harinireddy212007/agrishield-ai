import { ShieldCheck, Info } from 'lucide-react';
import type { AdvisoryResult } from '@/types';
import { Card, CardHeader } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

interface RiskScoreProps { advisory: AdvisoryResult; }
export function RiskScore({ advisory }: RiskScoreProps) {
  const score = advisory.fieldRiskScore;
  const label = score >= 70 ? 'High Risk' : score >= 40 ? 'Moderate Risk' : 'Low Risk';
  const color = score >= 70 ? 'text-red-700' : score >= 40 ? 'text-earth-700' : 'text-leaf-700';
  return <Card><CardHeader title="Field Risk Score" subtitle="An explainable view of current conditions" icon={<ShieldCheck className="w-5 h-5" />} /><div className="px-5 pb-5"><div className="flex items-end gap-3 mb-5"><span className={`font-display text-5xl font-bold ${color}`}>{score}</span><span className="text-charcoal-400 text-sm pb-1">/ 100</span><span className={`chip ml-auto ${score >= 70 ? 'bg-red-50 text-red-700' : score >= 40 ? 'bg-earth-50 text-earth-700' : 'bg-leaf-50 text-leaf-700'}`}>{label}</span></div><div className="space-y-4">{advisory.riskFactors.map((factor) => <div key={factor.label}><div className="flex justify-between text-xs mb-1.5"><span className="font-medium text-charcoal-700">{factor.label}</span><span className="text-charcoal-500">{factor.score}/100</span></div><Progress value={factor.score} color={factor.score >= 70 ? 'bg-red-500' : factor.score >= 40 ? 'bg-earth-400' : 'bg-leaf-500'} /><p className="text-[11px] text-charcoal-400 mt-1">{factor.description}</p></div>)}</div><div className="flex gap-2 mt-5 p-3 rounded-lg bg-blue-50 text-blue-800 text-xs leading-relaxed"><Info className="w-4 h-4 flex-shrink-0 mt-0.5" />Score combines visual symptoms with current temperature, humidity, rain, wind, and forecast signals. It is guidance, not a guaranteed diagnosis.</div></div></Card>;
}
