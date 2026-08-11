import type { ReactNode } from 'react';
import type { RiskLevel } from '@/types';
import { riskLevelColor, riskLevelDot, riskLevelLabel } from '@/utils/format';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-charcoal-100 text-charcoal-600',
    success: 'bg-leaf-100 text-leaf-700',
    warning: 'bg-earth-100 text-earth-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };
  return (
    <span className={`chip ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  level: RiskLevel;
  label?: string;
}

export function StatusBadge({ level, label }: StatusBadgeProps) {
  return (
    <span className={`chip border ${riskLevelColor(level)}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${riskLevelDot(level)}`} />
      {label || riskLevelLabel(level)}
    </span>
  );
}
