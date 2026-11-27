import React from 'react';
import type { Metadata } from 'next';
import { buildDestinationMetadata } from '@/lib/page-seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { ArrowLeft, MapPin, Calendar, Compass, Share2 } from 'lucide-react';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const destination = await prisma.destination.findUnique({ where: { slug } });
  if (!destination) return {};
  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';
  const title =
    (isUz && destination.titleUz) || (isRu && destination.titleRu) || (isTr && destination.titleTr) || destination.title;
  const description =
    (isUz && destination.descriptionUz) ||
    (isRu && destination.descriptionRu) ||
    (isTr && destination.descriptionTr) ||
    destination.description;
  let image: string | undefined;
  try {
    const photos = JSON.parse(destination.photos);
    if (Array.isArray(photos) && typeof photos[0] === 'string') image = photos[0];
  } catch {
    image = undefined;
  }
  return buildDestinationMetadata(locale, slug, title, description, image);
}

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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Return button */}
      <Link
        href={`/${locale}/travels`}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-subtle text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#B99A5B] dark:hover:text-[#B99A5B] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.back}</span>
      </Link>

      {/* Title & Metadata */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#B99A5B]">
          <span className="px-3.5 py-1.5 rounded-full liquid-glass-badge text-[#101827] dark:text-white flex items-center gap-1.5 font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#B99A5B]" />
            {destination.city ? `${destination.city}, ` : ''}{destination.country}
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-[#B99A5B]" />
            {new Date(destination.visitedAt).toLocaleDateString()}
          </span>
          {destination.coordinates && (
            <span className="font-mono text-slate-400 dark:text-slate-500 text-[11px]">
              {destination.coordinates}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#101827] dark:text-white font-editorial leading-tight">
          {title}
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300 font-editorial leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Hero Photograph in Liquid Glass Frame */}
      {photos[0] && (
        <div className="rounded-3xl overflow-hidden liquid-glass p-2 sm:p-3 shadow-2xl">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 dark:bg-slate-900">
            <img
              src={photos[0]}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Narrative Story Section */}
      <div className="p-8 sm:p-12 rounded-3xl liquid-glass shadow-glass space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed text-base">
        <h2 className="text-2xl font-bold text-[#101827] dark:text-white font-editorial border-b border-black/5 dark:border-white/10 pb-4">
          {t.chronicleTitle}
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed font-normal">
          <p>{story}</p>
        </div>
      </div>

      {/* Additional Photos Gallery if multiple */}
      {photos.length > 1 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-[#101827] dark:text-white font-editorial">
            {t.galleryTitle(photos.length)}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {photos.slice(1).map((imgUrl, i) => (
              <div key={i} className="rounded-2xl overflow-hidden liquid-glass p-2 shadow-glass aspect-[4/3] bg-slate-100 dark:bg-slate-900 group">
                <img
                  src={imgUrl}
                  alt={`${title} photo ${i + 2}`}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
