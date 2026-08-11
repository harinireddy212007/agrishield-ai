import { useState, useCallback } from 'react';
import type { LocationData } from '@/types';

export function useGeolocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let name = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (response.ok) {
            const data = await response.json();
            const addr = data.address;
            const parts = [
              addr.city || addr.town || addr.village || addr.county,
              addr.state,
              addr.country,
            ].filter(Boolean);
            if (parts.length > 0) name = parts.join(', ');
          }
        } catch {
          // keep coordinate-based name
        }

        setLocation({ latitude, longitude, name });
        setLoading(false);
      },
      (err) => {
        let msg = 'Unable to retrieve your location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission denied. You can enter your location manually below.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'Location information is unavailable.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        setError(msg);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const setManualLocation = useCallback((lat: number, lon: number, name?: string) => {
    setLocation({
      latitude: lat,
      longitude: lon,
      name: name || `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
    });
    setError(null);
  }, []);

  return { location, loading, error, requestLocation, setManualLocation };
}
