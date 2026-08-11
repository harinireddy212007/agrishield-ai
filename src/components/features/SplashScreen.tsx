import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timings = reduced
      ? [0, 50, 100, 400]
      : [0, 400, 800, 1600];

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), timings[1]));
    timers.push(setTimeout(() => setPhase(2), timings[2]));
    timers.push(setTimeout(() => {
      setPhase(3);
      setTimeout(onComplete, reduced ? 100 : 400);
    }, timings[3]));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 transition-opacity duration-500 ${
        phase >= 3 ? 'opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading AgriShield AI"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, #8fc258 1px, transparent 1px), radial-gradient(circle at 80% 70%, #8fc258 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Logo */}
      <div
        className={`relative z-10 transition-all duration-500 ${
          reduced
            ? 'opacity-100 scale-100'
            : phase >= 1
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-75'
        }`}
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center shadow-2xl relative overflow-hidden">
          <svg viewBox="0 0 24 24" className="w-11 h-11 relative z-10" fill="none">
            <path d="M12 2L4 6V12C4 17 7.5 21 12 22C16.5 21 20 17 20 12V6L12 2Z" stroke="#8fc258" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 8C12 8 9 10 9 13C9 15 10.5 16.5 12 16.5C13.5 16.5 15 15 15 13C15 10 12 8 12 8Z" fill="#aed77e" />
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <h1
        className={`relative z-10 font-display font-bold text-3xl text-white mt-6 transition-all duration-500 ${
          reduced ? 'opacity-100' : phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        AgriShield AI
      </h1>

      {/* Tagline */}
      <p
        className={`relative z-10 text-leaf-300 text-sm mt-3 transition-all duration-500 ${
          reduced ? 'opacity-100' : phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        Know your crop. Read the weather. Act at the right time.
      </p>

      {/* Loading bar */}
      <div className={`relative z-10 w-32 h-0.5 bg-forest-700 rounded-full mt-8 overflow-hidden transition-opacity duration-300 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className={`h-full bg-leaf-400 rounded-full ${reduced ? 'w-full' : 'animate-[shimmer_1.2s_ease-in-out_infinite]'}`}
          style={reduced ? undefined : { animationName: 'shimmer', animationDuration: '1.2s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
        />
      </div>
    </div>
  );
}
