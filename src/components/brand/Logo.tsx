import { Sprout, ShieldCheck } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'full';
  className?: string;
}

const sizes = {
  sm: { box: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-sm', sub: 'text-[9px]' },
  md: { box: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-base', sub: 'text-[10px]' },
  lg: { box: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-2xl', sub: 'text-xs' },
};

export function Logo({ size = 'md', variant = 'full', className = '' }: LogoProps) {
  const s = sizes[size];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${s.box} rounded-xl bg-gradient-to-br from-forest-700 to-forest-900 flex items-center justify-center shadow-sm relative overflow-hidden`}>
        <ShieldCheck className={`${s.icon} text-leaf-300 absolute`} />
        <Sprout className={`${s.icon} text-leaf-400 relative z-10`} />
      </div>
      {variant === 'full' && (
        <div className="text-left leading-none">
          <div className={`font-display font-bold text-forest-950 ${s.text}`}>
            AgriShield
          </div>
          <div className={`${s.sub} uppercase tracking-widest text-forest-500 font-semibold mt-0.5`}>
            AI
          </div>
        </div>
      )}
    </div>
  );
}

export function LogoMark({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const s = sizes[size];
  return (
    <div className={`${s.box} rounded-xl bg-gradient-to-br from-forest-700 to-forest-900 flex items-center justify-center shadow-sm relative overflow-hidden ${className}`}>
      <ShieldCheck className={`${s.icon} text-leaf-300 absolute`} />
      <Sprout className={`${s.icon} text-leaf-400 relative z-10`} />
    </div>
  );
}
