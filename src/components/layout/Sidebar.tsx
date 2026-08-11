import {
  LayoutDashboard,
  Leaf,
  CloudRain,
  HeartPulse,
  History,
  Settings,
  Sprout,
  X,
} from 'lucide-react';
import type { Page } from '@/types';

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'check-crop', label: 'Check My Crop', icon: Leaf },
  { id: 'weather', label: 'Weather', icon: CloudRain },
  { id: 'crop-health', label: 'Crop Health', icon: HeartPulse },
  { id: 'history', label: 'Advisory History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ current, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal-900/40 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-charcoal-100 z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-charcoal-100">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-lg bg-forest-700 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-leaf-200" />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-charcoal-800 text-sm leading-tight">
                AgriShield
              </div>
              <div className="text-[10px] text-forest-600 font-medium tracking-wide uppercase">
                AI
              </div>
            </div>
          </button>
          <button
            onClick={onClose}
            className="lg:hidden text-charcoal-400 hover:text-charcoal-600 p-1"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-forest-50 text-forest-800'
                    : 'text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-700'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? 'text-forest-700' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-charcoal-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-earth-200 flex items-center justify-center text-earth-700 font-semibold text-sm">
              F
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-charcoal-700 truncate">Farmer</div>
              <div className="text-xs text-charcoal-400 truncate">Demo Account</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
