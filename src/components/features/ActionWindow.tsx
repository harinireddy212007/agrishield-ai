import { CheckCircle2, Clock3, CloudRain, Wind, AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AdvisoryResult, WeatherData } from '@/types';
import { Card } from '@/components/ui/Card';

interface ActionWindowProps { advisory: AdvisoryResult; weather: WeatherData; }

export function ActionWindow({ advisory, weather }: ActionWindowProps) {
  const hours = weather.hourly.slice(0, 12);
  const firstAvoid = hours.find((hour) => hour.actionWindow === 'avoid');
  const nextFavorable = hours.find((hour) => hour.actionWindow === 'favorable');
  const status = firstAvoid && !nextFavorable ? 'monitor' : 'favorable';
  const tone = status === 'favorable' ? 'leaf' : 'earth';
  return (
    <Card className="overflow-hidden border-forest-200 shadow-card-lg">
      <div className="bg-forest-800 px-5 py-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3"><div className="text-leaf-300 mt-0.5"><Clock3 className="w-5 h-5" /></div><div><h3 className="font-display font-bold text-lg text-white">Best Time to Act</h3><p className="text-sm text-forest-200 mt-0.5">Weather-aware timing for your next field decision</p></div></div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-leaf-500/20 border border-leaf-300/30 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-leaf-200">
            <span className="w-1.5 h-1.5 rounded-full bg-leaf-300" /> Signature insight
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className={`rounded-2xl border p-5 ${tone === 'leaf' ? 'bg-leaf-50 border-leaf-200' : 'bg-earth-50 border-earth-200'}`}>
          <div className="flex items-start gap-4">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${tone === 'leaf' ? 'bg-leaf-100 text-leaf-700' : 'bg-earth-100 text-earth-700'}`}>
              {tone === 'leaf' ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <p className={`text-xs uppercase tracking-widest font-bold ${tone === 'leaf' ? 'text-leaf-700' : 'text-earth-700'}`}>
                {tone === 'leaf' ? 'Potentially favorable window' : 'Monitor conditions'}
              </p>
              <p className="font-display font-bold text-forest-900 text-2xl mt-1">{advisory.actionTiming}</p>
              <p className="text-sm text-charcoal-600 mt-2 leading-relaxed">Current conditions suggest this period may be more suitable. Forecast indicates lower weather disruption and moderate field conditions.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
          <Window label="Current window" value={weather.current.rainProbability > 60 ? 'Monitor' : 'Potentially favorable'} icon={weather.current.rainProbability > 60 ? <CloudRain /> : <CheckCircle2 />} tone={weather.current.rainProbability > 60 ? 'amber' : 'green'} />
          <Window label="Next window" value={nextFavorable?.label ?? 'Reassess later'} icon={<Clock3 />} tone="green" />
          <Window label="Avoid window" value={firstAvoid?.label ?? 'No clear risk'} icon={<AlertTriangle />} tone="red" />
        </div>
        <div className="mt-5 rounded-xl border border-charcoal-100 p-4">
          <div className="flex items-center justify-between mb-3"><p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Next 12 hours · action timeline</p><span className="text-[10px] text-charcoal-400">Rain · temperature · timing</span></div>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
            {hours.map((hour) => <div key={hour.hour} className={`min-w-0 rounded-lg p-1.5 text-center ${hour.actionWindow === 'favorable' ? 'bg-leaf-50 text-leaf-800' : hour.actionWindow === 'monitor' ? 'bg-earth-50 text-earth-800' : 'bg-red-50 text-red-800'}`} title={`${hour.label}: ${hour.temperature}°, ${hour.rainProbability}% rain`}><span className="block text-[9px] font-semibold truncate">{hour.label}</span><span className="block text-xs font-bold mt-1">{hour.temperature}°</span><span className="block text-[9px] mt-0.5">{hour.rainProbability}%</span></div>)}
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 text-sm text-charcoal-600"><Wind className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" /><span>{advisory.avoidAction}</span></div>
      </div>
    </Card>
  );
}
function Window({ label, value, icon, tone }: { label: string; value: string; icon: ReactNode; tone: 'green' | 'amber' | 'red' }) { const tones = { green: 'bg-leaf-50 text-leaf-700 border-leaf-200', amber: 'bg-earth-50 text-earth-700 border-earth-200', red: 'bg-red-50 text-red-700 border-red-200' }; return <div className={`rounded-lg border p-3 ${tones[tone]}`}><div className="flex items-center gap-1 text-[10px] uppercase tracking-wide font-semibold opacity-80"><span className="w-3.5">{icon}</span>{label}</div><p className="font-semibold text-sm mt-1">{value}</p></div>; }
