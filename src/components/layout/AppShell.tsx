import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import type { Page, LocationData, WeatherCurrent } from '@/types';

interface AppShellProps {
  current: Page;
  onNavigate: (page: Page) => void;
  location: LocationData | null;
  weather: WeatherCurrent | null;
  children: ReactNode;
}

export function AppShell({ current, onNavigate, location, weather, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-earth-50">
      <Sidebar
        current={current}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          location={location}
          weather={weather}
          onNavigate={onNavigate}
        />
        <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
