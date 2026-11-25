import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Milestone, MapPin, Sparkles } from 'lucide-react';

interface JourneyPageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { locale } = await params;

  let events: any[] = [];
  try {
    events = await prisma.timelineEvent.findMany({
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
    });
  } catch (error) {
    console.error('Failed to load timeline events:', error);
  }

  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const title = isUz
    ? 'Hayot Yo‘li va Bosqichlar'
    : isRu
    ? 'Жизненный Путь и Этапы'
    : isTr
    ? 'Yaşam Yolculuğu ve Dönüm Noktaları'
    : 'Life Journey & Milestones';

  const subtitle = isUz
    ? "Ashraf Turdialiyevning akademik yuksalishi, ilmiy kashfiyotlari, davlat xizmati va dunyo bo'ylab ekspeditsiyalari xronologiyasi."
    : isRu
    ? 'Хроника академических достижений, научных открытий, государственной службы и глобальных экспедиций Ашрафа Турдиалиева.'
    : isTr
    ? "Ashraf Turdialiyev'in akademik başarıları, bilimsel keşifleri, kamu hizmeti ve küresel keşiflerinin kronolojisi."
    : "A curated chronological dossier documenting academic milestones, leadership appointments, scientific breakthroughs, and alpine expeditions.";

  return (
    <div className="min-h-screen py-10 space-y-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Milestone className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>{isUz ? 'Xronologik Dossier' : isRu ? 'Хронологическое Досье' : isTr ? 'Kronolojik Dosya' : 'Chronological Dossier'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#101827] dark:text-[#F4F5F7] font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Timeline Stream with Aurora Glowing Nodes */}
        <div className="relative border-l-2 border-[#B99A5B]/40 ml-4 sm:ml-32 space-y-12">
          {events.length === 0 ? (
            <div className="p-12 text-center liquid-glass rounded-3xl text-slate-500">
              No milestones recorded yet.
            </div>
          ) : (
            events.map((ev, idx) => {
              const evTitle = (isUz && ev.titleUz) || (isRu && ev.titleRu) || (isTr && ev.titleTr) || ev.title;
              const evDesc = (isUz && ev.descriptionUz) || (isRu && ev.descriptionRu) || (isTr && ev.descriptionTr) || ev.description;

              return (
                <div key={ev.id || idx} className="relative pl-8 sm:pl-12 group">
                  {/* Glowing Node Dot with Aurora Pulse */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#101827] border-4 border-[#B99A5B] group-hover:scale-125 transition-transform duration-300 shadow-gold" />

                  {/* Year Tag on Left */}
                  <div className="sm:absolute sm:-left-32 sm:top-0 text-left sm:text-right sm:w-24 mb-2 sm:mb-0">
                    <span className="font-editorial text-2xl font-bold text-[#101827] dark:text-white group-hover:text-[#B99A5B] transition-colors block">
                      {ev.year}
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      {ev.date}
                    </span>
                  </div>

                  {/* Liquid Glass Card Content */}
                  <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-glass hover:shadow-2xl hover:border-[#B99A5B]/60 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase liquid-glass-badge text-[#B99A5B]">
                        {ev.category}
                      </span>
                      {ev.location && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#B99A5B]" />
                          <span>{ev.location}</span>
                        </span>
                      )}
                    </div>

                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#101827] dark:text-white mb-3">
                      {evTitle}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-normal">
                      {evDesc}
                    </p>

                    {ev.mediaUrl && (
                      <div className="rounded-2xl overflow-hidden mt-4 max-h-72 border border-black/5 dark:border-white/10 shadow-glass-sm">
                        <img
                          src={ev.mediaUrl}
                          alt={evTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
