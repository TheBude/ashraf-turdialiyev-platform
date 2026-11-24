import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';

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

  // Distinct categories
  const categories = ['ALL', 'EDUCATION', 'CAREER', 'TRAVEL', 'ACHIEVEMENT', 'SCIENTIFIC'];

  return (
    <div className="bg-[#F8F8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-navy/10 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>{isUz ? 'Xronologik Dossier' : isRu ? 'Хронологическое Досье' : isTr ? 'Kronolojik Dosya' : 'Chronological Dossier'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-navy font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l-2 border-gold/40 ml-4 sm:ml-32 space-y-12">
          {events.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-navy/10 text-charcoal/60">
              No milestones recorded yet.
            </div>
          ) : (
            events.map((ev, idx) => {
              const evTitle = (isUz && ev.titleUz) || (isRu && ev.titleRu) || (isTr && ev.titleTr) || ev.title;
              const evDesc = (isUz && ev.descriptionUz) || (isRu && ev.descriptionRu) || (isTr && ev.descriptionTr) || ev.description;

              return (
                <div key={ev.id || idx} className="relative pl-8 sm:pl-12 group">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-navy border-4 border-gold group-hover:scale-125 transition-transform duration-300 shadow-md" />

                  {/* Year Tag on Left (for desktop) */}
                  <div className="sm:absolute sm:-left-32 sm:top-0 text-left sm:text-right sm:w-24 mb-2 sm:mb-0">
                    <span className="font-editorial text-2xl font-bold text-navy group-hover:text-gold transition-colors block">
                      {ev.year}
                    </span>
                    <span className="text-xs font-mono text-charcoal/60 uppercase tracking-wider block">
                      {ev.date}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-navy/5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-soft-blue text-navy border border-navy/10">
                        {ev.category}
                      </span>
                      {ev.location && (
                        <span className="text-xs text-charcoal/60 font-mono">
                          📍 {ev.location}
                        </span>
                      )}
                    </div>

                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-navy mb-3 group-hover:text-navy/90">
                      {evTitle}
                    </h2>

                    <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed mb-4">
                      {evDesc}
                    </p>

                    {ev.mediaUrl && (
                      <div className="rounded-2xl overflow-hidden mt-4 max-h-72 border border-navy/5">
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
