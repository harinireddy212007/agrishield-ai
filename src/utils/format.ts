import type { Severity, RiskLevel } from '@/types';

export function severityToColor(s: Severity): string {
  switch (s) {
    case 'low':
      return 'text-leaf-700 bg-leaf-100 border-leaf-200';
    case 'moderate':
      return 'text-earth-700 bg-earth-100 border-earth-200';
    case 'high':
      return 'text-red-700 bg-red-100 border-red-200';
  }
}

export function severityToRiskLevel(s: Severity): RiskLevel {
  switch (s) {
    case 'low':
      return 'good';
    case 'moderate':
      return 'monitor';
    case 'high':
      return 'high';
  }
}

export function riskLevelColor(r: RiskLevel): string {
  switch (r) {
    case 'good':
      return 'text-leaf-700 bg-leaf-50 border-leaf-200';
    case 'monitor':
      return 'text-earth-700 bg-earth-50 border-earth-200';
    case 'high':
      return 'text-red-700 bg-red-50 border-red-200';
    case 'info':
      return 'text-blue-700 bg-blue-50 border-blue-200';
  }
}

export function riskLevelDot(r: RiskLevel): string {
  switch (r) {
    case 'good':
      return 'bg-leaf-500';
    case 'monitor':
      return 'bg-earth-400';
    case 'high':
      return 'bg-red-500';
    case 'info':
      return 'bg-blue-500';
  }
}

export function riskLevelLabel(r: RiskLevel): string {
  switch (r) {
    case 'good':
      return 'Good';
    case 'monitor':
      return 'Monitor';
    case 'high':
      return 'High Risk';
    case 'info':
      return 'Info';
  }
}

export function severityLabel(s: Severity): string {
  switch (s) {
    case 'low':
      return 'Low';
    case 'moderate':
      return 'Moderate';
    case 'high':
      return 'High';
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}
