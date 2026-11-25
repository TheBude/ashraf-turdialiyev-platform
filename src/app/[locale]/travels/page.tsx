import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

const TRAVELS_I18N = {
  uz: {
    badge: 'To‘liq Dala Arxivi',
    title: 'Saralangan Sayohat Ekspeditsiyalari',
    subtitle: 'Baland tog‘ tizmalari, qadimiy sivilizatsiyalar chorrahalari va 40 dan ortiq davlatlar bo‘ylab o‘tkazilgan madaniy ekspeditsiyalar xronikasi.',
    readChronicle: 'Kundalikni o‘qish',
  },
  en: {
    badge: 'Complete Field Archives',
    title: 'Curated Travel Expeditions',
    subtitle: 'Chronicles of high-altitude alpine treks, ancient civilizational crossroads, and cultural documentation across 40+ sovereign nations.',
    readChronicle: 'Read Chronicle',
  },
  ru: {
    badge: 'Полный архив полевых записей',
    title: 'Избранные Экспедиции',
    subtitle: 'Хроники высокогорных альпийских маршрутов, перекрестков цивилизаций и культурных исследований в более чем 40 странах.',
    readChronicle: 'Читать хронику',
  },
  tr: {
    badge: 'Eksiksiz Saha Arşivi',
    title: 'Seçilmiş Seyahat Seferleri',
    subtitle: 'Yüksek irtifa dağ yürüyüşleri, kadim uygarlıkların kavşakları ve 40tan fazla egemen devletteki kültürel belgeleme günlükleri.',
    readChronicle: 'Günlüğü Oku',
  },
};

export default async function TravelsCatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const t = TRAVELS_I18N[locale as keyof typeof TRAVELS_I18N] || TRAVELS_I18N.uz;

  const destinations = await prisma.destination.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { visitedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B] block">
          {t.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#17243A] font-serif">
          {t.title}
        </h1>
        <p className="text-base text-slate-600">
          {t.subtitle}
        </p>
      </div>

      {/* Grid of All Destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => {
          let photos = [];
          try { photos = JSON.parse(dest.photos); } catch { photos = []; }
          const cover = photos[0] || 'https://images.unsplash.com/photo-1596484552829-9e8c07c29377?q=80&w=1200';

          const destTitle = (isUz && dest.titleUz) || (isRu && dest.titleRu) || (isTr && dest.titleTr) || dest.title;
          const destDesc = (isUz && dest.descriptionUz) || (isRu && dest.descriptionRu) || (isTr && dest.descriptionTr) || dest.description;

          return (
            <Link
              key={dest.id}
              href={`/${locale}/travels/${dest.slug}`}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={cover}
                  alt={destTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#17243A] shadow-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B99A5B]" />
                  <span>{dest.city ? `${dest.city}, ` : ''}{dest.country}</span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#17243A] group-hover:text-[#B99A5B] transition-colors">
                    {destTitle}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {destDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#17243A]">
                  <span className="text-slate-400 font-normal flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(dest.visitedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 text-[#B99A5B] group-hover:underline">
                    {t.readChronicle} &rarr;
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
