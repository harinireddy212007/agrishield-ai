import { useState } from 'react';
import { Info } from 'lucide-react';

interface ConfidenceRingProps {
  value: number;
  size?: number;
}

export function ConfidenceRing({ value, size = 120 }: ConfidenceRingProps) {
  const [showInfo, setShowInfo] = useState(false);
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e7e5e4" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#548628" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold text-2xl text-forest-800">{value}%</span>
        <span className="text-[10px] uppercase tracking-wider text-charcoal-400">AI confidence</span>
      </div>
      <button
        type="button"
        onClick={() => setShowInfo((visible) => !visible)}
        className="absolute -right-1 -top-1 rounded-full bg-white text-charcoal-500 hover:text-forest-700 focus-visible:ring-2 focus-visible:ring-leaf-500"
        aria-label="Explain AI confidence"
        aria-expanded={showInfo}
      >
        <Info className="w-4 h-4" />
      </button>
      {showInfo && (
        <div className="absolute z-20 right-0 top-7 w-56 rounded-lg bg-charcoal-900 text-white p-3 text-xs leading-relaxed shadow-xl">
          Confidence represents how strongly the AI analysis matches visual characteristics detected in the uploaded image. It is not a guarantee of diagnosis.
        </div>
      )}
    </div>
  );
}
