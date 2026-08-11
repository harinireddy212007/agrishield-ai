import { Menu, Bell, MapPin, Cloud, CloudRain, Sun } from 'lucide-react';
import type { LocationData, WeatherCurrent } from '@/types';

interface TopBarProps {
  onMenuClick: () => void;
  location: LocationData | null;
  weather: WeatherCurrent | null;
  onNavigate: (page: 'weather') => void;
}

function WeatherIcon({ condition }: { condition: string }) {
  const c = condition.toLowerCase();
  if (c.includes('rain') || c.includes('drizzle')) return <CloudRain className="w-4 h-4" />;
  if (c.includes('cloud')) return <Cloud className="w-4 h-4" />;
  return <Sun className="w-4 h-4" />;
}

export function TopBar({ onMenuClick, location, weather, onNavigate }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-charcoal-100 flex items-center px-4 lg:px-6 gap-3">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-charcoal-500 hover:text-charcoal-700 p-1.5 rounded-lg hover:bg-charcoal-100"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-charcoal-600 min-w-0">
        <MapPin className="w-4 h-4 text-forest-600 flex-shrink-0" />
        <span className="truncate font-medium">
          {location ? location.name : 'Location not set'}
        </span>
      </div>

      <div className="flex-1" />

      {/* Weather summary */}
      {weather && (
        <button
          onClick={() => onNavigate('weather')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-50 text-forest-800 hover:bg-forest-100 transition-colors"
        >
          <WeatherIcon condition={weather.condition} />
          <span className="text-sm font-medium">{weather.temperature}°C</span>
          <span className="hidden sm:inline text-xs text-forest-600">
            {weather.humidity}% humidity
          </span>
        </button>
      )}

      {/* Notifications */}
      <button
        className="relative p-2 rounded-lg text-charcoal-500 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-earth-400 rounded-full" />
      </button>

      {/* Profile */}
      <div className="w-9 h-9 rounded-full bg-earth-200 flex items-center justify-center text-earth-700 font-semibold text-sm flex-shrink-0">
        F
      </div>
    </header>
  );
}
