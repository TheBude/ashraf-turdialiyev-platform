import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { BookOpen, ExternalLink, Sparkles, Award } from 'lucide-react';

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
    <div className="min-h-screen py-10 space-y-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200">
            <BookOpen className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>{isUz ? 'Akademik Portfel' : isRu ? 'Академический Портфель' : isTr ? 'Akademik Portföy' : 'Academic Portfolio'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#101827] dark:text-[#F4F5F7] font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Metric Badges in Liquid Glass */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-3xl liquid-glass-subtle text-center space-y-1 shadow-glass-sm border border-white/50 dark:border-white/10">
            <span className="block text-3xl sm:text-4xl font-editorial font-bold text-[#101827] dark:text-white">{publications.length}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {isUz ? "Ilmiy nashrlar" : isRu ? "Публикации" : isTr ? "Yayınlar" : "Publications"}
            </span>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-subtle text-center space-y-1 shadow-glass-sm border border-white/50 dark:border-white/10">
            <span className="block text-3xl sm:text-4xl font-editorial font-bold text-[#B99A5B]">{totalCitations}+</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {isUz ? "Iqtiboslar (Citations)" : isRu ? "Индексы цитирования" : isTr ? "Atıflar" : "Total Citations"}
            </span>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-subtle text-center space-y-1 shadow-glass-sm border border-white/50 dark:border-white/10">
            <span className="block text-2xl sm:text-3xl font-editorial font-bold text-[#8D9FC5]">Scopus &bull; WoS</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {isUz ? "Indekslangan jurnallar" : isRu ? "Индексируемые базы" : isTr ? "İndeksli Dergiler" : "Indexed Journals"}
            </span>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-subtle text-center space-y-1 shadow-glass-sm border border-white/50 dark:border-white/10">
            <span className="block text-3xl sm:text-4xl font-editorial font-bold text-emerald-500">100%</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {isUz ? "Ochiq kirish (Open Access)" : isRu ? "Открытый доступ" : isTr ? "Açık Erişim" : "Open Access Available"}
            </span>
          </div>
        </div>

        {/* Publications List in Liquid Glass Cards */}
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
                className="liquid-glass p-7 sm:p-9 rounded-3xl shadow-glass hover:shadow-2xl hover:border-[#B99A5B]/60 transition-all duration-300 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase liquid-glass-badge text-[#B99A5B]">
                      {pub.journal || 'Academic Journal'}
                    </span>
                    <span className="font-mono text-slate-400 dark:text-slate-500">
                      ({pub.year})
                    </span>
                  </div>
                  {pub.citations > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B99A5B]/15 text-[#B99A5B] font-bold text-xs font-mono">
                      {pub.citations} {isUz ? 'iqtibos' : 'citations'}
                    </span>
                  )}
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#101827] dark:text-white leading-snug">
                  {pubTitle}
                </h2>

                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 font-sans">
                  {pub.authors}
                </p>

                {pubAbstract && (
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {pubAbstract}
                  </p>
                )}

                {/* Footer with Tags and Direct DOI */}
                <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(parsedTags) &&
                      parsedTags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-mono text-slate-600 dark:text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>

                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gold-glow-button text-xs font-bold uppercase tracking-wider shrink-0"
                    >
                      <span>Direct DOI Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
