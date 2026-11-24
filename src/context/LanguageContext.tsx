'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationDictionary } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  getLocalized: (item: any, field: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('uz');

  useEffect(() => {
    // Read saved preference or browser language
    const saved = localStorage.getItem('ashraf_lang') as Language;
    if (saved && ['en', 'uz', 'ru', 'tr'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('ashraf_lang', newLang);
    document.cookie = `ashraf_lang=${newLang}; path=/; max-age=31536000`;
  };

  const getLocalized = (item: any, field: string): string => {
    if (!item) return '';

    // Field suffix mapping
    const suffixMap: Record<Language, string> = {
      uz: 'Uz',
      ru: 'Ru',
      tr: 'Tr',
      en: '',
    };

    const specificKey = `${field}${suffixMap[lang]}`;
    if (item[specificKey]) {
      return item[specificKey];
    }

    // Fallback to base field (English or default)
    return item[field] || item[`${field}Uz`] || item[`${field}En`] || '';
  };

  const value = {
    lang,
    setLang,
    t: translations[lang] || translations.en,
    getLocalized,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
