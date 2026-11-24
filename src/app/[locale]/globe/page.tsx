import React from 'react';
import prisma from '@/lib/prisma';
import EarthGlobe3D, { GlobeLocationItem } from '@/components/globe/EarthGlobe3D';
import Link from 'next/link';

interface GlobePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

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
    <div className="bg-[#F8F8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-navy/10 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>{isUz ? 'Global Ekspeditsiyalar' : isRu ? 'Глобальные Экспедиции' : isTr ? 'Küresel Keşifler' : 'Global Expeditions'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-navy font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-navy/5 shadow-sm text-center">
            <span className="block text-3xl font-editorial font-bold text-navy">{countriesCount}</span>
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              {isUz ? "Tashrif etilgan davlatlar" : isRu ? "Посещенные страны" : isTr ? "Ziyaret Edilen Ülkeler" : "Countries Visited"}
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-navy/5 shadow-sm text-center">
            <span className="block text-3xl font-editorial font-bold text-gold">{locations.length}</span>
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              {isUz ? "Qayd etilgan nuqtalar" : isRu ? "Зафиксированные точки" : isTr ? "Kayıtlı Konumlar" : "Documented Locations"}
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-navy/5 shadow-sm text-center">
            <span className="block text-3xl font-editorial font-bold text-navy">5,642 m</span>
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              {isUz ? "Maksimal cho'qqi (Elbrus)" : isRu ? "Макс. вершина (Эльбрус)" : isTr ? "Maks. Zirve (Elbruz)" : "Peak Altitude (Elbrus)"}
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-navy/5 shadow-sm text-center">
            <span className="block text-3xl font-editorial font-bold text-navy">100%</span>
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              {isUz ? "Haqiqiy koordinatalar" : isRu ? "Точные координаты" : isTr ? "Hassas Koordinatlar" : "Precise Coordinates"}
            </span>
          </div>
        </div>

        {/* 3D Earth Globe Component */}
        <div className="shadow-2xl rounded-3xl overflow-hidden mb-12">
          <EarthGlobe3D
            locations={locations}
            height="h-[750px]"
            showControls={true}
            showSidebar={true}
          />
        </div>

        {/* Catalog of Featured Locations */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-navy font-bold">
                {isUz ? "Barcha qayd etilgan lokatsiyalar" : isRu ? "Все зафиксированные локации" : isTr ? "Tüm Kayıtlı Konumlar" : "All Documented Locations"}
              </h2>
              <p className="text-sm text-charcoal/70 mt-1">
                {isUz ? "Har bir manzil bo'yicha suratlar va ekspeditsiya xotiralari" : isRu ? "Фотографии и заметки по каждой локации" : isTr ? "Her konum için fotoğraflar ve notlar" : "Detailed photos and journal entries for each site"}
              </p>
            </div>
            <Link
              href={`/${locale}/travels`}
              className="text-sm font-semibold text-gold hover:underline flex items-center space-x-1"
            >
              <span>{isUz ? "Barcha safarlar ro'yxati" : isRu ? "Список всех поездок" : isTr ? "Tüm Seyahatler" : "Expeditions catalog"}</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.slice(0, 6).map((loc) => {
              const locTitle = (isUz && loc.titleUz) || (isRu && loc.titleRu) || (isTr && loc.titleTr) || loc.title;
              const locDesc = (isUz && loc.descriptionUz) || (isRu && loc.descriptionRu) || (isTr && loc.descriptionTr) || loc.description;

              return (
                <div
                  key={loc.id}
                  className="bg-white rounded-2xl overflow-hidden border border-navy/5 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div>
                    {loc.coverImage ? (
                      <div className="relative h-48 w-full overflow-hidden bg-navy/5">
                        <img
                          src={loc.coverImage}
                          alt={locTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-navy/80 text-white backdrop-blur-md">
                          {loc.category}
                        </span>
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-soft-blue flex items-center justify-center text-navy/40 font-editorial text-2xl">
                        {loc.country}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-xs text-charcoal/60 font-mono mb-2 flex items-center justify-between">
                        <span>📍 {loc.city ? `${loc.city}, ` : ''}{loc.country}</span>
                        <span>{new Date(loc.visitDate).getFullYear()}</span>
                      </div>
                      <h3 className="font-editorial text-xl font-bold text-navy group-hover:text-gold transition-colors mb-2">
                        {locTitle}
                      </h3>
                      <p className="text-sm text-charcoal/80 line-clamp-2 leading-relaxed">
                        {locDesc}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-navy/5 flex items-center justify-between text-xs font-mono text-charcoal/60">
                    <span>{loc.latitude}° N, {loc.longitude}° E</span>
                    <span className="text-gold font-semibold">Visited</span>
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
