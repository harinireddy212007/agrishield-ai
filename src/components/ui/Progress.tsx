interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
}

export function Progress({ value, max = 100, color = 'bg-forest-600', className = '' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`w-full h-2 bg-charcoal-100 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
