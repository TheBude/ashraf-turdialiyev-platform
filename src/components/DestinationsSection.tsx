'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, Calendar, MapPin, X, ArrowRight, Eye, Sparkles } from 'lucide-react';

export interface DestinationItem {
  id: string;
  slug: string;
  title: string;
  titleUz?: string | null;
  titleRu?: string | null;
  titleTr?: string | null;
  country: string;
  countryCode: string;
  city?: string | null;
  coordinates?: string | null;
  description: string;
  descriptionUz?: string | null;
  descriptionRu?: string | null;
  descriptionTr?: string | null;
  story?: string | null;
  storyUz?: string | null;
  storyRu?: string | null;
  storyTr?: string | null;
  photos: string; // JSON string
  status: string;
  featured: boolean;
  visitedAt: string | Date;
}

interface DestinationsProps {
  destinations: DestinationItem[];
}

export default function DestinationsSection({ destinations }: DestinationsProps) {
  const { lang, t, getLocalized } = useLanguage();
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const getPhotos = (photosStr: string): string[] => {
    try {
      const parsed = JSON.parse(photosStr);
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : ['https://images.unsplash.com/photo-1596484552829-9e8c07c29377?q=80&w=1200'];
    } catch {
      return ['https://images.unsplash.com/photo-1596484552829-9e8c07c29377?q=80&w=1200'];
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : lang === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <section id="destinations" className="py-24 bg-[#0a0d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.destinations.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Curated Chronicles of Earth
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              {t.destinations.subtitle}
            </p>
          </div>
          <span className="text-xs text-[#eedda5] px-3 py-1.5 rounded-full bg-[#161b26] border border-[#d4af37]/30 self-start md:self-auto">
            {destinations.length} Expeditions Published
          </span>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {destinations.map((dest) => {
            const photoList = getPhotos(dest.photos);
            const coverPhoto = photoList[0];

            return (
              <div
                key={dest.id}
                className="group rounded-2xl bg-[#121622] border border-slate-800/90 overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300 shadow-xl flex flex-col"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={coverPhoto}
                    alt={getLocalized(dest, 'title')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-black/30"></div>

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#08090c]/80 backdrop-blur-md border border-slate-700 text-xs font-medium text-white flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#d4af37]" />
                      {dest.city ? `${dest.city}, ${dest.country}` : dest.country}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      {formatDate(dest.visitedAt)}
                    </span>
                    {dest.coordinates && (
                      <span className="font-mono text-[11px] bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-slate-400">
                        {dest.coordinates}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#eedda5] transition-colors">
                      {getLocalized(dest, 'title')}
                    </h3>
                    <p className="text-sm text-slate-300/90 leading-relaxed line-clamp-3">
                      {getLocalized(dest, 'description')}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedDestination(dest);
                        setActivePhotoIndex(0);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] hover:text-[#f6eccb] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t.destinations.readStory}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {photoList.length} photos
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chronicle Story Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#10141e] border border-[#d4af37]/40 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 text-slate-400 hover:text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery View */}
            <div className="relative aspect-[16/9] w-full bg-black">
              <img
                src={getPhotos(selectedDestination.photos)[activePhotoIndex]}
                alt={getLocalized(selectedDestination, 'title')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10141e] via-transparent to-black/30"></div>

              {/* Photo thumbnails if multiple */}
              {getPhotos(selectedDestination.photos).length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1">
                  {getPhotos(selectedDestination.photos).map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activePhotoIndex === idx ? 'border-[#d4af37] scale-105' : 'border-slate-700 opacity-60'
                      }`}
                    >
                      <img src={p} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedDestination.city ? `${selectedDestination.city}, ` : ''}{selectedDestination.country}</span>
                  <span>&bull;</span>
                  <span>{formatDate(selectedDestination.visitedAt)}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {getLocalized(selectedDestination, 'title')}
                </h3>
              </div>

              {/* Narrative Story */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Field Chronicle & Research Summary
                </h4>
                <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-3 bg-[#151a26]/70 p-5 rounded-xl border border-slate-800">
                  <p>
                    {getLocalized(selectedDestination, 'story') || getLocalized(selectedDestination, 'description')}
                  </p>
                </div>
              </div>

              {/* Coordinates info */}
              {selectedDestination.coordinates && (
                <div className="p-3.5 rounded-xl bg-[#151a26] border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Geographic Coordinates:</span>
                  <span className="font-mono text-[#eedda5]">{selectedDestination.coordinates}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
