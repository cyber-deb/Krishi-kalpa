import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, LANGUAGES } from '../i18n';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-sm font-medium transition shadow-sm"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-agri-600" />
        <span className="font-semibold text-stone-900">{currentLang.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-stone-100 py-1.5 z-50 max-h-80 overflow-y-auto">
          <div className="px-3 py-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-100 mb-1">
            Languages
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-agri-50 transition ${
                lang.code === language ? 'bg-agri-50 text-agri-800 font-bold' : 'text-stone-700'
              }`}
            >
              <span className="text-sm">{lang.nativeName}</span>
              {lang.code === language && <Check className="w-4 h-4 text-agri-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
