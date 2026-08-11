import type { WeatherData, LocationData } from '@/types';
import { getDemoWeather } from '@/data/demoData';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;

type OpenWeatherItem = { dt: number; main: { temp: number; feels_like: number; humidity: number }; wind: { speed: number }; weather: Array<{ main: string }>; pop?: number; rain?: Record<string, number> };
type DailyAggregate = { date: Date; high: number; low: number; rainProb: number; condition: string };

export function isWeatherApiKeyConfigured(): boolean {
  return Boolean(API_KEY && API_KEY.length > 5);
}

export async function fetchWeather(
  location: LocationData,
  scenarioId?: string
): Promise<WeatherData> {
  if (!isWeatherApiKeyConfigured()) {
    return getDemoWeather(scenarioId, location.name);
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json() as { main: { temp: number; feels_like: number; humidity: number }; rain?: Record<string, number>; wind: { speed: number }; weather: Array<{ main: string }> };

    const current: WeatherData['current'] = {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      rainProbability: data.rain ? Math.round(data.rain['1h'] / 10) : 10,
      precipitation: data.rain ? data.rain['1h'] : 0,
      windSpeed: Math.round(data.wind.speed * 3.6),
      condition: data.weather[0].main,
      conditionIcon: data.weather[0].main,
      isDemo: false,
    };

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`
    );

    let hourly: WeatherData['hourly'] = [];
    let daily: WeatherData['daily'] = [];

    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json() as { list: OpenWeatherItem[] };
      hourly = forecastData.list.slice(0, 24).map((item: OpenWeatherItem, i: number) => {
        const d = new Date(item.dt * 1000);
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

        const rainProb = item.pop ? Math.round(item.pop * 100) : 0;
        let actionWindow: 'favorable' | 'monitor' | 'avoid' = 'favorable';
        if (rainProb > 60) actionWindow = 'avoid';
        else if (rainProb > 35) actionWindow = 'monitor';

        return {
          hour: `${i}`,
          label,
          temperature: Math.round(item.main.temp),
          rainProbability: rainProb,
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6),
          condition: item.weather[0].main,
          actionWindow,
        };
      });

      const dailyMap = new Map<string, DailyAggregate>();
      forecastData.list.forEach((item: OpenWeatherItem) => {
        const date = new Date(item.dt * 1000);
        const key = date.toDateString();
        if (!dailyMap.has(key)) {
          dailyMap.set(key, {
            date,
            high: item.main.temp,
            low: item.main.temp,
            rainProb: item.pop || 0,
            condition: item.weather[0].main,
          });
        } else {
          const d = dailyMap.get(key);
          if (d) {
            d.high = Math.max(d.high, item.main.temp);
            d.low = Math.min(d.low, item.main.temp);
            d.rainProb = Math.max(d.rainProb, item.pop || 0);
          }
        }
      });

      daily = Array.from(dailyMap.values())
        .slice(0, 5)
        .map((d, i) => ({
          day: `${i}`,
          dayLabel:
            i === 0
              ? 'Today'
              : i === 1
                ? 'Tomorrow'
                : d.date.toLocaleDateString('en-US', { weekday: 'short' }),
          high: Math.round(d.high),
          low: Math.round(d.low),
          rainProbability: Math.round(d.rainProb * 100),
          condition: d.condition,
          conditionIcon: d.condition,
        }));
    }

    return {
      current,
      hourly,
      daily,
      locationName: location.name,
      isDemo: false,
    };
  } catch {
    return getDemoWeather(scenarioId, location.name);
  }
}

export function getDemoWeatherData(
  locationName = 'Demo Location',
  scenarioId?: string
): WeatherData {
  return getDemoWeather(scenarioId, locationName);
}
