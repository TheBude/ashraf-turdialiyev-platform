import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

const SLUG_I18N = {
  uz: {
    back: 'Barcha Ekspeditsiyalarga Qaytish',
    chronicleTitle: 'Dala Xronikasi va Ilmiy Hujjatlashtirish',
    galleryTitle: (count: number) => `Ekspeditsiya Fotogalereyasi (${count} ta fotosurat)`,
  },
  en: {
    back: 'Back to All Expeditions',
    chronicleTitle: 'Field Chronicle & Research Documentation',
    galleryTitle: (count: number) => `Expedition Visual Gallery (${count} photographs)`,
  },
  ru: {
    back: 'Назад ко всем экспедициям',
    chronicleTitle: 'Полевая хроника и научная документация',
    galleryTitle: (count: number) => `Фотогалерея экспедиции (${count} фотографий)`,
  },
  tr: {
    back: 'Tüm Seferlere Geri Dön',
    chronicleTitle: 'Saha Günlüğü ve Bilimsel Dokümantasyon',
    galleryTitle: (count: number) => `Sefer Fotoğraf Galerisi (${count} fotoğraf)`,
  },
};

export default async function DestinationStoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const t = SLUG_I18N[locale as keyof typeof SLUG_I18N] || SLUG_I18N.uz;

  const destination = await prisma.destination.findUnique({
    where: { slug },
  });

  if (!destination) {
    notFound();
  }

  const title = (isUz && destination.titleUz) || (isRu && destination.titleRu) || (isTr && destination.titleTr) || destination.title;
  const description = (isUz && destination.descriptionUz) || (isRu && destination.descriptionRu) || (isTr && destination.descriptionTr) || destination.description;
  const story = (isUz && (destination as any).storyUz) || (isRu && (destination as any).storyRu) || (isTr && (destination as any).storyTr) || destination.story || description;

  let photos: string[] = [];
  try {
    photos = JSON.parse(destination.photos);
  } catch {
    photos = [];
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Return link */}
      <Link
        href={`/${locale}/travels`}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#17243A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.back}</span>
      </Link>

      {/* Title & Metadata */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#B99A5B] uppercase tracking-wider">
          <span className="px-3 py-1 rounded-full bg-[#EAF1F8] text-[#17243A] border border-[#ACC7E1] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#B99A5B]" />
            {destination.city ? `${destination.city}, ` : ''}{destination.country}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(destination.visitedAt).toLocaleDateString()}
          </span>
          {destination.coordinates && (
            <span className="font-mono text-slate-400">
              {destination.coordinates}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17243A] font-serif leading-tight">
          {title}
        </h1>

        <p className="text-lg text-slate-600 font-serif leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Hero Photograph */}
      {photos[0] && (
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-card aspect-[16/9] bg-slate-100">
          <img
            src={photos[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Narrative Story Section */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-subtle space-y-6 text-slate-800 leading-relaxed text-base">
        <h2 className="text-xl font-bold text-[#17243A] font-serif border-b border-slate-100 pb-3">
          {t.chronicleTitle}
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 space-y-4 leading-relaxed">
          <p>{story}</p>
        </div>
      </div>

      {/* Additional Photos Gallery if multiple */}
      {photos.length > 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#17243A] font-serif">
            {t.galleryTitle(photos.length)}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {photos.slice(1).map((imgUrl, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 shadow-subtle aspect-[4/3] bg-slate-100">
                <img
                  src={imgUrl}
                  alt={`${title} photo ${i + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
