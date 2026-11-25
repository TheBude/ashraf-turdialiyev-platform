import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ModernHeroSection from '@/components/ModernHeroSection';
import { ArrowRight, Globe, BookOpen, MapPin, Activity, ExternalLink, Compass, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

const I18N = {
  uz: {
    telemetryBadge: 'Tasdiqlangan Global Qamrov va Tahlil',
    telemetryTitle: 'Empirik Telemetriya va Natijalar',
    telemetryLink: 'Batafsil Auditoriya Tahlili',
    telemetryLive: 'Jonli telemetriya faol',
    globeBadge: 'Fotorealistik WebGL Kartografiya',
    globeTitle: 'Sayyorani Haqiqiy 3D Makonda Kashf Eting',
    globeDesc: 'Fotorealistik, aylanuvchi 3D Yer shariga kiring. Yevroosiyo va Amerika qit’alari bo‘ylab baland tog‘ ilmiy ekspeditsiyalari, qadimiy Buyuk Ipak yo‘li manzillari va diplomatik sammitlarni ko‘zdan kechiring.',
    globeButton: '3D Globusni Ochish',
    expeditionsBadge: 'Dala Xronikalari',
    expeditionsTitle: 'Saralangan Sayohat Ekspeditsiyalari',
    expeditionsLink: 'Barcha Ekspeditsiyalarni Ko‘rish',
    readChronicle: 'Kundalikni o‘qish',
    researchBadge: 'Asosiy Ilmiy Risola',
    accessPapers: 'Ilmiy Maqolalarga Kirish',
    doiLink: 'To‘g‘ridan-to‘g‘ri DOI Havolasi',
  },
  en: {
    telemetryBadge: 'Verified Global Reach & Analytics',
    telemetryTitle: 'Empirical Telemetry & Impact',
    telemetryLink: 'Detailed Audience Analytics',
    telemetryLive: 'Live telemetry feed',
    globeBadge: 'Photorealistic WebGL Cartography',
    globeTitle: 'Explore the Planet in Real 3D Space',
    globeDesc: 'Step into a photorealistic, rotating 3D Earth globe. Inspect high-altitude research expeditions, ancient Silk Road waypoints, and diplomatic summits across Eurasia and the Americas.',
    globeButton: 'Launch 3D Globe',
    expeditionsBadge: 'Field Chronicles',
    expeditionsTitle: 'Curated Travel Expeditions',
    expeditionsLink: 'View All Expeditions',
    readChronicle: 'Read Chronicle',
    researchBadge: 'Featured Scholarly Treatise',
    accessPapers: 'Access Research Papers',
    doiLink: 'Direct DOI Link',
  },
  ru: {
    telemetryBadge: 'Проверенный глобальный охват и аналитика',
    telemetryTitle: 'Эмпирическая телеметрия и результаты',
    telemetryLink: 'Подробная аналитика аудитории',
    telemetryLive: 'Живой поток телеметрии',
    globeBadge: 'Фотореалистичная WebGL-картография',
    globeTitle: 'Исследуйте планету в реальном 3D-пространстве',
    globeDesc: 'Погрузитесь в фотореалистичный вращающийся 3D-глобус Земли. Исследуйте высокогорные научные экспедиции, древние караванные пути Шелкового пути и дипломатические саммиты по всей Евразии и Америке.',
    globeButton: 'Запустить 3D-глобус',
    expeditionsBadge: 'Полевые Хроники',
    expeditionsTitle: 'Избранные Экспедиции',
    expeditionsLink: 'Все экспедиции',
    readChronicle: 'Читать хронику',
    researchBadge: 'Главный Научный Труд',
    accessPapers: 'Перейти к научным статьям',
    doiLink: 'Прямая ссылка DOI',
  },
  tr: {
    telemetryBadge: 'Doğrulanmış Küresel Erişim ve Analitik',
    telemetryTitle: 'Ampirik Telemetri ve Etki',
    telemetryLink: 'Ayrıntılı Hedef Kitle Analitiği',
    telemetryLive: 'Canlı telemetri akışı',
    globeBadge: 'Fotogerçekçi WebGL Haritacılığı',
    globeTitle: 'Gezegeni Gerçek 3D Uzayda Keşfedin',
    globeDesc: 'Fotogerçekçi, dönen 3D Dünya küresine adım atın. Avrasya ve Amerika genelindeki yüksek irtifa araştırma seferlerini, antik İpek Yolu duraklarını ve diplomatik zirveleri keşfedin.',
    globeButton: '3D Küreyi Başlat',
    expeditionsBadge: 'Saha Günlükleri',
    expeditionsTitle: 'Seçilmiş Seyahat Seferleri',
    expeditionsLink: 'Tüm Seferleri Gör',
    readChronicle: 'Günlüğü Oku',
    researchBadge: 'Öne Çıkan Bilimsel Makale',
    accessPapers: 'Makalelere Eriş',
    doiLink: 'Doğrudan DOI Bağlantısı',
  },
};

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const t = I18N[locale as keyof typeof I18N] || I18N.uz;

  const getLoc = (item: any, field: string) => {
    if (!item) return '';
    if (isUz && item[`${field}Uz`]) return item[`${field}Uz`];
    if (isRu && item[`${field}Ru`]) return item[`${field}Ru`];
    if (isTr && item[`${field}Tr`]) return item[`${field}Tr`];
    return item[field] || item[`${field}Uz`] || item[`${field}En`] || '';
  };

  const [
    featuredDestinations,
    globeLocationsCount,
    timelinePreview,
    featuredPub,
    audienceStats,
    settings,
  ] = await Promise.all([
    prisma.destination.findMany({
      where: { status: 'PUBLISHED' },
      take: 3,
      orderBy: { visitedAt: 'desc' },
    }),
    prisma.globeLocation.count({ where: { status: 'PUBLISHED' } }),
    prisma.timelineEvent.findMany({
      take: 4,
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
    }),
    prisma.publication.findFirst({
      where: { featured: true },
      orderBy: { year: 'desc' },
    }),
    prisma.audienceStat.findMany({ orderBy: { order: 'asc' } }),
    prisma.siteSetting.findMany(),
  ]);

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="space-y-24 sm:space-y-32 pb-28">
      {/* 1. MODERN ANIMATED HERO SECTION WITH ASHRAF TURDIALIYEV 3D TILT PORTRAIT */}
      <ModernHeroSection 
        settingsMap={settingsMap}
        globeLocationsCount={globeLocationsCount}
        locale={locale}
      />

      {/* 2. LIVE AUDIENCE & IMPACT TELEMETRY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 rounded-3xl liquid-glass border border-white/60 dark:border-white/12 shadow-2xl space-y-8 overflow-hidden">
          {/* Subtle Aurora Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99A5B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8D9FC5]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/5 dark:border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B] flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B99A5B] animate-pulse" />
                {t.telemetryBadge}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#101827] dark:text-[#F4F5F7] font-editorial tracking-tight">
                {t.telemetryTitle}
              </h2>
            </div>
            <Link
              href={`/${locale}/audience`}
              className="group text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#B99A5B] flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-full liquid-glass-subtle transition-all"
            >
              <span>{t.telemetryLink}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {audienceStats.map((stat) => (
              <div 
                key={stat.id} 
                className="space-y-2 p-5 sm:p-6 rounded-2xl liquid-glass-subtle border border-white/50 dark:border-white/10 shadow-sm hover:border-[#B99A5B]/60 hover:shadow-glass hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block truncate">
                    {getLoc(stat, 'label')}
                  </span>
                  <Activity className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#B99A5B] transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#101827] dark:text-white tracking-tight font-editorial group-hover:text-[#B99A5B] transition-colors">
                  {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                </div>
                {stat.isSimulated && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    {t.telemetryLive}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 3D GLOBE CALLOUT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#101827] via-[#182A42] to-[#0B0F19] text-white p-8 sm:p-14 shadow-2xl overflow-hidden border border-[#B99A5B]/35">
          {/* Animated Ambient Light Rings */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#A78BFA]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8D9FC5]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#B99A5B]/40 text-xs font-bold text-[#eedda5] backdrop-blur-md">
                <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
                <span>{t.globeBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-editorial leading-tight">
                {t.globeTitle}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
                {t.globeDesc}
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href={`/${locale}/globe`}
                className="group relative inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl gold-glow-button text-[#101827] font-extrabold text-sm shadow-xl"
              >
                <Globe className="w-5 h-5 text-[#101827] group-hover:rotate-180 transition-transform duration-700" />
                <span>{t.globeButton}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED EXPEDITIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B] block mb-1">
              {t.expeditionsBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101827] dark:text-[#F4F5F7] font-editorial">
              {t.expeditionsTitle}
            </h2>
          </div>
          <Link
            href={`/${locale}/travels`}
            className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#B99A5B] flex items-center gap-1.5"
          >
            <span>{t.expeditionsLink}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => {
            let photos = [];
            try { photos = JSON.parse(dest.photos); } catch { photos = []; }
            const cover = photos[0] || 'https://images.unsplash.com/photo-1596484552829-9e8c07c29377?q=80&w=1200';
            const destTitle = getLoc(dest, 'title');
            const destDesc = getLoc(dest, 'description');

            return (
              <Link
                key={dest.id}
                href={`/${locale}/travels/${dest.slug}`}
                className="group rounded-3xl liquid-glass overflow-hidden shadow-glass hover:shadow-2xl hover:border-[#B99A5B]/60 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={cover}
                    alt={destTitle}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full liquid-glass-badge text-[11px] font-bold text-[#101827] dark:text-white shadow-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B99A5B]" />
                    <span>{dest.city ? `${dest.city}, ` : ''}{dest.country}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#101827] dark:text-white group-hover:text-[#B99A5B] transition-colors line-clamp-2 font-editorial">
                      {destTitle}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {destDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#101827] dark:text-white">
                    <span className="text-slate-400 font-normal">
                      {new Date(dest.visitedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#B99A5B] group-hover:translate-x-1 transition-transform">
                      {t.readChronicle} &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURED RESEARCH TEASER */}
      {featuredPub && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 rounded-3xl liquid-glass border border-white/60 dark:border-white/12 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden group">
            <div className="space-y-3 max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-badge text-[11px] font-bold uppercase tracking-wider text-[#B99A5B]">
                <BookOpen className="w-3.5 h-3.5 text-[#B99A5B]" />
                {t.researchBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101827] dark:text-white font-editorial leading-snug">
                {getLoc(featuredPub, 'title')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {featuredPub.authors} &bull; <span className="italic">{featuredPub.journal}</span> ({featuredPub.year})
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-2">
                {getLoc(featuredPub, 'abstract')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 relative z-10">
              <Link
                href={`/${locale}/research`}
                className="px-7 py-3.5 rounded-2xl bg-[#101827] text-white dark:bg-white dark:text-[#101827] font-bold text-xs tracking-wide shadow-card hover:bg-[#B99A5B] dark:hover:bg-[#B99A5B] dark:hover:text-black transition-all text-center"
              >
                {t.accessPapers}
              </Link>
              {featuredPub.link && (
                <a
                  href={featuredPub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl liquid-glass-subtle text-[#101827] dark:text-white font-bold text-xs hover:border-[#B99A5B] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{t.doiLink}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#B99A5B]" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
