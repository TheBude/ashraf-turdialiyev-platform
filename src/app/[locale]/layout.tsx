import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale: Language = ['uz', 'en', 'ru', 'tr'].includes(locale)
    ? (locale as Language)
    : 'uz';

  return (
    <LanguageProvider initialLocale={activeLocale}>
      <div className="min-h-screen bg-[#F8F8F5] text-[#17243A] flex flex-col justify-between selection:bg-[#B99A5B] selection:text-white">
        <Header />
        <main className="flex-1 pt-20 sm:pt-24">
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
