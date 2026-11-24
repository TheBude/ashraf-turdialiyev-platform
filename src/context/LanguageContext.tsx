'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Language, translations, TranslationDictionary } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  currentLocale: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  getLocalized: (item: any, field: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Language;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Detect locale from pathname (e.g. /en/about -> 'en')
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const routeLocale = (pathSegments[0] && ['uz', 'en', 'ru', 'tr'].includes(pathSegments[0]))
    ? (pathSegments[0] as Language)
    : undefined;

  const [lang, setLangState] = useState<Language>(routeLocale || initialLocale || 'uz');

  useEffect(() => {
    if (routeLocale && routeLocale !== lang) {
      setLangState(routeLocale);
      localStorage.setItem('ashraf_lang', routeLocale);
      document.cookie = `ashraf_lang=${routeLocale}; path=/; max-age=31536000`;
    }
  }, [routeLocale]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('ashraf_lang', newLang);
    document.cookie = `ashraf_lang=${newLang}; path=/; max-age=31536000`;

    // If currently on a localized route, replace the route segment
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0 && ['uz', 'en', 'ru', 'tr'].includes(segments[0])) {
        segments[0] = newLang;
        router.push(`/${segments.join('/')}`);
      } else {
        router.push(`/${newLang}`);
      }
    } else {
      router.push(`/${newLang}`);
    }
  };

  const getLocalized = (item: any, field: string): string => {
    if (!item) return '';

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

    return item[field] || item[`${field}Uz`] || item[`${field}En`] || '';
  };

  const value = {
    lang,
    currentLocale: lang,
    setLang,
    t: translations[lang] || translations.uz,
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
