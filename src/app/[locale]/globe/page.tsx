import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/page-seo';
import prisma from '@/lib/prisma';
import EarthGlobe3D, { GlobeLocationItem } from '@/components/globe/EarthGlobe3D';
import Link from 'next/link';
import { Globe, Compass, ArrowRight, Sparkles } from 'lucide-react';

interface GlobePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, 'globe');
}

export default async function GlobePage({ params }: GlobePageProps) {
  const { locale } = await params;

  // Fetch all published globe locations from database
  let locations: GlobeLocationItem[] = [];
  try {
    const rawLocations = await prisma.globeLocation.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ featured: 'desc' }, { visitDate: 'desc' }],
    });

    locations = rawLocations.map((l) => ({
      id: l.id,
      title: l.title,
      titleUz: l.titleUz,
      titleRu: l.titleRu,
      titleTr: l.titleTr,
      country: l.country,
      countryCode: l.countryCode,
      city: l.city,
      latitude: l.latitude,
      longitude: l.longitude,
      visitDate: l.visitDate.toISOString(),
      description: l.description,
      descriptionUz: l.descriptionUz,
      descriptionRu: l.descriptionRu,
      descriptionTr: l.descriptionTr,
      story: l.story,
      category: l.category,
      coverImage: l.coverImage,
      photos: l.photos,
      featured: l.featured,
    }));
  } catch (error) {
    console.error('Failed to load globe locations:', error);
  }

  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const title = isUz
    ? 'Interaktiv 3D Yer Shari'
    : isRu
    ? 'Интерактивный 3D Земной Шар'
    : isTr
    ? 'Etkileşimli 3D Dünya Küresi'
    : 'Interactive 3D Earth Globe';

  const subtitle = isUz
    ? "Ashraf Turdialiyevning ilmiy safarlari, alpinistik ekspeditsiyalari va xalqaro tashriflarining to'liq geografik xaritasi."
    : isRu
    ? 'Полная географическая карта научных визитов, альпинистских экспедиций и дипломатических миссий Ашрафа Турдиалиева.'
    : isTr
    ? "Ashraf Turdialiyev'in bilimsel ziyaretleri, dağcılık keşifleri ve uluslararası misyonlarının coğrafi haritası."
    : "A real-time geographical exploration of Ashraf Turdialiyev's scientific missions, alpine ascents, and international forums.";

  // Distinct countries count
  const countriesCount = new Set(locations.map((l) => l.countryCode)).size;

  return (
    <div className="min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Globe className="w-3.5 h-3.5 text-[#B99A5B] animate-spin" style={{ animationDuration: '14s' }} />
            <span>{isUz ? 'Global Ekspeditsiyalar' : isRu ? 'Глобальные Экспедиции' : isTr ? 'Küresel Keşifler' : 'Global Expeditions'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-extrabold text-[#101827] dark:text-[#F4F5F7] tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Quick Stats Row in Liquid Glass */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl liquid-glass-subtle text-center space-y-1 border border-white/50 dark:border-white/10 shadow-glass-sm">
            <span className="block text-3xl font-editorial font-bold text-[#101827] dark:text-white">{countriesCount}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {isUz ? "Tashrif etilgan davlatlar" : isRu ? "Посещенные страны" : isTr ? "Ziyaret Edilen Ülkeler" : "Countries Visited"}
            </span>
          </div>
          <div className="p-5 rounded-2xl liquid-glass-subtle text-center space-y-1 border border-white/50 dark:border-white/10 shadow-glass-sm">
            <span className="block text-3xl font-editorial font-bold text-[#B99A5B]">{locations.length}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {isUz ? "Qayd etilgan nuqtalar" : isRu ? "Зафиксированные точки" : isTr ? "Kayıtlı Konumlar" : "Documented Locations"}
            </span>
          </div>
          <div className="p-5 rounded-2xl liquid-glass-subtle text-center space-y-1 border border-white/50 dark:border-white/10 shadow-glass-sm">
            <span className="block text-3xl font-editorial font-bold text-[#101827] dark:text-white">5,642 m</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {isUz ? "Maksimal cho'qqi (Elbrus)" : isRu ? "Макс. вершина (Эльбрус)" : isTr ? "Maks. Zirve (Elbruz)" : "Peak Altitude (Elbrus)"}
            </span>
          </div>
          <div className="p-5 rounded-2xl liquid-glass-subtle text-center space-y-1 border border-white/50 dark:border-white/10 shadow-glass-sm">
            <span className="block text-3xl font-editorial font-bold text-[#8D9FC5]">100%</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {isUz ? "Haqiqiy koordinatalar" : isRu ? "Точные координаты" : isTr ? "Hassas Koordinatlar" : "Precise Coordinates"}
            </span>
          </div>
        </div>

        {/* 3D Earth Globe Component in Liquid Glass Container */}
        <div className="shadow-2xl rounded-3xl overflow-hidden mb-16 liquid-glass border border-white/60 dark:border-white/15 p-2 sm:p-3">
          <div className="rounded-2xl overflow-hidden">
            <EarthGlobe3D
              locations={locations}
              height="h-[750px]"
              showControls={true}
              showSidebar={true}
            />
          </div>
        </div>

        {/* Catalog of Featured Locations */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#101827] dark:text-white font-bold">
                {isUz ? "Barcha qayd etilgan lokatsiyalar" : isRu ? "Все зафиксированные локации" : isTr ? "Tüm Kayıtlı Konumlar" : "All Documented Locations"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {isUz ? "Har bir manzil bo'yicha suratlar va ekspeditsiya xotiralari" : isRu ? "Фотографии и заметки по каждой локации" : isTr ? "Her konum için fotoğraflar ve notlar" : "Detailed photos and journal entries for each site"}
              </p>
            </div>
            <Link
              href={`/${locale}/travels`}
              className="text-xs font-bold text-[#B99A5B] hover:underline flex items-center gap-1.5"
            >
              <span>{isUz ? "Barcha safarlar ro'yxati" : isRu ? "Список всех поездок" : isTr ? "Tüm Seyahatler" : "Expeditions catalog"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.slice(0, 6).map((loc) => {
              const locTitle = (isUz && loc.titleUz) || (isRu && loc.titleRu) || (isTr && loc.titleTr) || loc.title;
              const locDesc = (isUz && loc.descriptionUz) || (isRu && loc.descriptionRu) || (isTr && loc.descriptionTr) || loc.description;

              return (
                <div
                  key={loc.id}
                  className="liquid-glass rounded-3xl overflow-hidden shadow-glass hover:shadow-2xl hover:border-[#B99A5B]/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {loc.coverImage ? (
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                        <img
                          src={loc.coverImage}
                          alt={locTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase liquid-glass-badge text-[#101827] dark:text-white">
                          {loc.category}
                        </span>
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-[#182A42]/30 flex items-center justify-center text-[#B99A5B] font-editorial text-2xl">
                        {loc.country}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2 flex items-center justify-between">
                        <span>📍 {loc.city ? `${loc.city}, ` : ''}{loc.country}</span>
                        <span>{new Date(loc.visitDate).getFullYear()}</span>
                      </div>
                      <h3 className="font-editorial text-xl font-bold text-[#101827] dark:text-white group-hover:text-[#B99A5B] transition-colors mb-2">
                        {locTitle}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {locDesc}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>{loc.latitude}° N, {loc.longitude}° E</span>
                    <span className="text-[#B99A5B] font-semibold">
                      {isUz ? "Tashrif etilgan" : isRu ? "Посещено" : isTr ? "Ziyaret edildi" : "Visited"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
