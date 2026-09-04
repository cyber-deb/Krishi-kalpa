import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Play, Bell, User, Wifi, Sparkles, MapPin, Globe, ChevronDown } from 'lucide-react';

interface TopbarProps {
  onToggleSidebar: () => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onStart2MinDemo: () => void;
  isDemoRunning: boolean;
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'as', label: 'অসমীয়া', flag: '🇮🇳' },
];

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  isDemoMode,
  onToggleDemoMode,
  onStart2MinDemo,
  isDemoRunning
}) => {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

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
          <span className="hidden xs:inline">{isDemoRunning ? t('topbar.runningTour') : t('topbar.startDemo')}</span>
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
            {t('topbar.demoMode')}
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
            {t('topbar.liveIot')}
          </button>
        </div>

        {/* Language Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all"
            aria-label={t('topbar.language')}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{currentLang.label}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>

          {langOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                  {i18n.language === lang.code && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  )}
                </button>
              ))}
            </div>
          )}
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
