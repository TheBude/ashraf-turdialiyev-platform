import React from 'react';
import prisma from '@/lib/prisma';
import AudienceStatsSection from '@/components/AudienceStatsSection';

interface AudiencePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export default async function AudiencePage({ params }: AudiencePageProps) {
  const { locale } = await params;

  let stats: any[] = [];
  try {
    stats = await prisma.audienceStat.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Failed to load audience stats:', error);
  }

  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const title = isUz
    ? 'Auditoriya va Global Qamrov'
    : isRu
    ? 'Аудитория и Глобальный Охват'
    : isTr
    ? 'Hedef Kitle ve Küresel Erişim'
    : 'Audience Reach & Global Telemetry';

  const subtitle = isUz
    ? "O'quvchilar, ilmiy izdoshlar, talabalar va xalqaro hamjamiyat qamrovi bo'yicha dinamik telemetriya ko'rsatkichlari."
    : isRu
    ? 'Динамические показатели телеметрии: читательская аудитория, исследователи, студенты и охват публикаций.'
    : isTr
    ? 'Okuyucular, bilim insanları, öğrenciler ve uluslararası topluluk erişimine dair dinamik telemetri göstergeleri.'
    : 'Real-time telemetry and simulated readership dynamics across academic lectures, digital platforms, and expedition followers.';

  return (
    <div className="bg-[#F8F8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-navy/10 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isUz ? 'Jonli Telemetriya' : isRu ? 'Телеметрия' : isTr ? 'Canlı Telemetri' : 'Live Telemetry'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-navy font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Interactive Stats Component */}
        <div className="mb-16">
          <AudienceStatsSection initialStats={stats} />
        </div>

        {/* Global Demographics / Channel Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-navy/5 shadow-sm">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">
              01 • Academic Citations
            </span>
            <h3 className="font-editorial text-2xl font-bold text-navy mb-2">
              Peer-Reviewed Reach
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Research publications indexed in international indexing databases with researchers spanning 28+ countries.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-navy/5 shadow-sm">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">
              02 • Digital Mentorship
            </span>
            <h3 className="font-editorial text-2xl font-bold text-navy mb-2">
              Next-Gen Scholars
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Seminars, masterclasses, and educational webinars delivered to aspiring Central Asian tech and science fellows.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-navy/5 shadow-sm">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">
              03 • Expedition Community
            </span>
            <h3 className="font-editorial text-2xl font-bold text-navy mb-2">
              Alpine & Travel Logs
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Explorers and mountain enthusiasts engaging with geographical dispatches, photography, and high-altitude field notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
