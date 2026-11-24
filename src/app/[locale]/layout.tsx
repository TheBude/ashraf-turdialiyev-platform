import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

const META_TRANSLATIONS: Record<string, { title: string; description: string }> = {
  uz: {
    title: 'Ashraf Turdialiyev — Xalqaro Sayohat va Ilmiy Tadqiqot Platformasi',
    description: 'Ashraf Turdialiyevning rasmiy shaxsiy portali: 3D interaktiv yer globusi, ilmiy maqolalar, xalqaro sayohatlar va sertifikatlar arxivi.',
  },
  en: {
    title: 'Ashraf Turdialiyev — Global Explorer & Academic Scholar',
    description: 'Official personal brand platform of Ashraf Turdialiyev: interactive 3D Earth globe, expeditions chronicle, scholarly research, and executive appointments.',
  },
  ru: {
    title: 'Ашраф Турдиалиев — Международный исследователь и ученый',
    description: 'Официальная персональная платформа Ашрафа Турдиалиева: 3D интерактивный глобус, научные публикации, хроника экспедиций и сертификаты.',
  },
  tr: {
    title: 'Ashraf Turdialiyev — Uluslararası Gezgin ve Akademik Araştırmacı',
    description: 'Ashraf Turdialiyev resmi kişisel platformu: 3D etkileşimli dünya küresi, bilimsel yayınlar, keşif günlükleri ve sertifikalar.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META_TRANSLATIONS[locale] || META_TRANSLATIONS.en;

  return {
    title: {
      default: meta.title,
      template: `%s | Ashraf Turdialiyev`,
    },
    description: meta.description,
    keywords: [
      'Ashraf Turdialiyev',
      'Explorer',
      'Scholar',
      'Central Asia',
      'Geopolitics',
      'Scientific Research',
      '3D Globe',
    ],
    authors: [{ name: 'Ashraf Turdialiyev' }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        uz: '/uz',
        en: '/en',
        ru: '/ru',
        tr: '/tr',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      siteName: 'Ashraf Turdialiyev Platform',
    },
  };
}

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
