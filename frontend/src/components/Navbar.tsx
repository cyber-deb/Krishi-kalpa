import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import { LanguageSelector } from './LanguageSelector';
import { Sprout, Wifi, Cpu, Menu, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { t, tText } = useTranslation();
  const { farmState, toggleFarmMode, isBackendConnected } = useFarmState();

  const isDemo = farmState.mode === 'demo';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Motto */}
          <div className="flex items-center space-x-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            <Link to="/app" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-agri-600 flex items-center justify-center text-white shadow-md group-hover:bg-agri-700 transition">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-agri-950 font-serif">
                    Krishi-Kalpa
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-agri-100 text-agri-800 uppercase tracking-wider">
                    v1.0
                  </span>
                </div>
                <p className="text-[11px] font-medium text-stone-500 hidden sm:block">
                  " Cultivating Intelligence, Growing Prosperity "
                </p>
              </div>
            </Link>
          </div>

          {/* Farm Info Pill (Wardha, 2.4 Acres) */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-700">
            <MapPin className="w-3.5 h-3.5 text-agri-600" />
            <span className="font-bold text-stone-900">{farmState.config.farm_name}</span>
            <span className="text-stone-400">•</span>
            <span>{farmState.config.area_acres} {t('common.acres')}</span>
            <span className="text-stone-400">•</span>
            <span className="text-stone-600">{tText(farmState.config.crop_type)}</span>
          </div>

          {/* Right Controls: Mode Toggle, Language, Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mode Switcher */}
            <button
              onClick={() => toggleFarmMode(isDemo ? 'live' : 'demo')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition shadow-sm ${
                isDemo
                  ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
              }`}
              title={isDemo ? 'Switch to Live IoT Hardware Mode' : 'Switch to Demo Simulation Mode'}
            >
              {isDemo ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">{t('common.demo_mode')}</span>
                  <span className="sm:hidden">Demo</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span className="hidden sm:inline">{t('common.live_mode')}</span>
                  <span className="sm:hidden">Live</span>
                </>
              )}
            </button>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};
