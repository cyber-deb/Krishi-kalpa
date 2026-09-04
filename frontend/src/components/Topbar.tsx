import React from 'react';
import { Menu, Play, Bell, User, Wifi, Sparkles, MapPin } from 'lucide-react';

interface TopbarProps {
  onToggleSidebar: () => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onStart2MinDemo: () => void;
  isDemoRunning: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  isDemoMode,
  onToggleDemoMode,
  onStart2MinDemo,
  isDemoRunning
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Farm Selector */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-800">Green Meadows Farm (2.4 Acres)</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">Karnal, HR</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 2-Minute Guided Demo Button */}
        <button
          onClick={onStart2MinDemo}
          disabled={isDemoRunning}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm
            ${isDemoRunning
              ? 'bg-amber-500 text-white animate-pulse'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:shadow'}
          `}
        >
          {isDemoRunning ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span className="hidden xs:inline">{isDemoRunning ? 'RUNNING TOUR...' : 'START 2-MINUTE DEMO'}</span>
        </button>

        {/* Live/Demo Mode Switch */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={onToggleDemoMode}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              isDemoMode
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            DEMO MODE
          </button>
          <button
            onClick={onToggleDemoMode}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
              !isDemoMode
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wifi className="w-3 h-3" />
            LIVE IoT
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
            RP
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">Rajinder Singh</p>
            <p className="text-[10px] text-slate-500">Lead Agronomist</p>
          </div>
        </div>
      </div>
    </header>
  );
};
