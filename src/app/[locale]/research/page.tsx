import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';

interface ResearchPageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export default async function ResearchPage({ params }: ResearchPageProps) {
  const { locale } = await params;

  let publications: any[] = [];
  try {
    publications = await prisma.publication.findMany({
      orderBy: [{ year: 'desc' }, { citations: 'desc' }],
    });
  } catch (error) {
    console.error('Failed to load publications:', error);
  }

  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const title = isUz
    ? 'Ilmiy Tadqiqotlar va Nashrlar'
    : isRu
    ? 'Научные Исследования и Публикации'
    : isTr
    ? 'Bilimsel Araştırmalar ve Yayınlar'
    : 'Scientific Research & Publications';

  const subtitle = isUz
    ? "Xalqaro ilmiy jurnallarda chop etilgan maqolalar, fundamental monografiyalar va tadqiqot natijalari."
    : isRu
    ? 'Статьи в международных реферируемых журналах, монографии и фундаментальные научные труды.'
    : isTr
    ? 'Uluslararası hakemli dergilerde yayınlanan makaleler, monografiler ve temel araştırma çalışmaları.'
    : 'Peer-reviewed journal articles, international monographs, and citation-indexed scientific breakthroughs.';

  const totalCitations = publications.reduce((acc, p) => acc + (p.citations || 0), 0);

  return (
    <div className="bg-[#F8F8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-navy/10 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>{isUz ? 'Akademik Portfel' : isRu ? 'Академический Портфель' : isTr ? 'Akademik Portföy' : 'Academic Portfolio'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-navy font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-navy/5 shadow-sm text-center">
            <span className="block text-3xl sm:text-4xl font-editorial font-bold text-navy">{publications.length}</span>
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              {isUz ? "Ilmiy nashrlar" : isRu ? "Публикации" : isTr ? "Yayınlar" : "Publications"}
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-navy/5 shadow-sm text-center">
            <span className="block text-3xl sm:text-4xl font-editorial font-bold text-gold">{totalCitations}+</span>
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              {isUz ? "Iqtiboslar (Citations)" : isRu ? "Индексы цитирования" : isTr ? "Atıflar" : "Total Citations"}
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-navy/5 shadow-sm text-center">
            <span className="block text-3xl sm:text-4xl font-editorial font-bold text-navy">Scopus / WoS</span>
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              {isUz ? "Indekslangan jurnallar" : isRu ? "Индексируемые базы" : isTr ? "İndeksli Dergiler" : "Indexed Journals"}
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-navy/5 shadow-sm text-center">
            <span className="block text-3xl sm:text-4xl font-editorial font-bold text-navy">100%</span>
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              {isUz ? "Ochiq kirish (Open Access)" : isRu ? "Открытый доступ" : isTr ? "Açık Erişim" : "Open Access Available"}
            </span>
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {publications.map((pub) => {
            const pubTitle = (isUz && pub.titleUz) || (isRu && pub.titleRu) || (isTr && pub.titleTr) || pub.title;
            const pubAbstract = (isUz && pub.abstractUz) || (isRu && pub.abstractRu) || (isTr && pub.abstractTr) || pub.abstract;

            let parsedTags: string[] = [];
            try {
              parsedTags = typeof pub.tags === 'string' ? JSON.parse(pub.tags) : pub.tags;
            } catch {}

            return (
              <div
                key={pub.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-navy/5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-soft-blue text-navy border border-navy/10">
                      {pub.journal}
                    </span>
                    <span className="text-xs text-charcoal/60 font-mono">
                      {pub.year}
                    </span>
                    {pub.citations > 0 && (
                      <span className="text-xs text-gold font-mono font-semibold">
                        ★ {pub.citations} citations
                      </span>
                    )}
                  </div>

                  <h2 className="font-editorial text-2xl font-bold text-navy mb-2 leading-snug">
                    {pubTitle}
                  </h2>

                  <p className="text-xs text-charcoal/70 font-mono mb-4">
                    Authors: {pub.authors}
                  </p>

                  <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                    {pubAbstract}
                  </p>

                  {/* Tags */}
                  {parsedTags && parsedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {parsedTags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-[#F8F8F5] text-charcoal/80 border border-navy/5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-navy/5">
                  {pub.doi && (
                    <a
                      href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-semibold tracking-wider hover:bg-navy/90 transition shadow-sm whitespace-nowrap"
                    >
                      DOI Article ↗
                    </a>
                  )}
                  {pub.pdfUrl && (
                    <a
                      href={pub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-soft-blue text-navy text-xs font-semibold tracking-wider hover:bg-soft-blue/80 border border-navy/10 transition whitespace-nowrap"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
