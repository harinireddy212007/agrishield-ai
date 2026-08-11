import { CloudRain, Droplets, Wind, Thermometer, MapPin, Sun } from 'lucide-react';
import type { WeatherData } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface WeatherCardProps { weather: WeatherData; compact?: boolean; }

export function WeatherCard({ weather, compact = false }: WeatherCardProps) {
  const { current } = weather;
  return (
    <Card className={compact ? '' : 'overflow-hidden'}>
      <div className="p-5 bg-forest-800 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-forest-200 text-xs mb-2"><MapPin className="w-3.5 h-3.5" />{weather.locationName}</div>
            <div className="flex items-end gap-2"><span className="font-display text-4xl font-bold">{current.temperature}°</span><span className="text-forest-200 text-sm pb-1">Feels like {current.feelsLike}°</span></div>
            <p className="text-forest-100 mt-1 text-sm">{current.condition}</p>
          </div>
          <Sun className="w-10 h-10 text-leaf-300" />
        </div>
        {current.isDemo && <Badge variant="warning" className="mt-4 bg-white/15 text-white">Demo weather data</Badge>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-charcoal-100 p-4">
        <WeatherMetric icon={<Droplets />} value={`${current.humidity}%`} label="Humidity" />
        <WeatherMetric icon={<CloudRain />} value={`${current.rainProbability}%`} label="Rain chance" />
        <WeatherMetric icon={<Wind />} value={`${current.windSpeed} km/h`} label="Wind" />
        <WeatherMetric icon={<Thermometer />} value={`${current.precipitation} mm`} label="Rainfall" />
      </div>
    </Card>
  );
}
function WeatherMetric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return <div className="flex flex-col items-center gap-1 px-2 text-center"><span className="text-forest-600">{icon}</span><span className="text-sm font-semibold text-charcoal-800">{value}</span><span className="text-[10px] text-charcoal-400">{label}</span></div>;
}
