import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, LanguageOption } from '../types';

import en from './translations/en.json';
import hi from './translations/hi.json';
import bn from './translations/bn.json';
import mr from './translations/mr.json';
import te from './translations/te.json';
import ta from './translations/ta.json';
import gu from './translations/gu.json';
import kn from './translations/kn.json';
import ml from './translations/ml.json';
import pa from './translations/pa.json';
import or from './translations/or.json';
import as from './translations/as.json';
import ur from './translations/ur.json';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi' },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil' },
  { code: 'gu', nativeName: 'ગુજરાતી', englishName: 'Gujarati' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada' },
  { code: 'ml', nativeName: 'മലയാളം', englishName: 'Malayalam' },
  { code: 'pa', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi' },
  { code: 'or', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia' },
  { code: 'as', nativeName: 'অসমীয়া', englishName: 'Assamese' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu' },
];

const translations: Record<LanguageCode, any> = {
  en,
  hi,
  bn,
  mr,
  te,
  ta,
  gu,
  kn,
  ml,
  pa,
  or,
  as,
  ur,
};

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (keyPath: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('krishi_kalpa_lang') as LanguageCode;
    return saved && translations[saved] ? saved : 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('krishi_kalpa_lang', lang);
    } catch {
      // safe fallback
    }
  };

  const t = (keyPath: string, fallback?: string): string => {
    const keys = keyPath.split('.');
    let current: any = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        current = undefined;
        break;
      }
    }

    if (typeof current === 'string') {
      return current;
    }

    // Fallback to English
    let engCurrent: any = translations['en'];
    for (const key of keys) {
      if (engCurrent && typeof engCurrent === 'object' && key in engCurrent) {
        engCurrent = engCurrent[key];
      } else {
        engCurrent = undefined;
        break;
      }
    }

    if (typeof engCurrent === 'string') {
      return engCurrent;
    }

    return fallback || keyPath;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
