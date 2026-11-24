'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Search, ExternalLink, Quote, Sparkles, FileText } from 'lucide-react';

export interface PublicationItem {
  id: string;
  title: string;
  titleUz?: string | null;
  titleRu?: string | null;
  titleTr?: string | null;
  authors: string;
  journal: string;
  year: number;
  doi?: string | null;
  link?: string | null;
  pdfUrl?: string | null;
  abstract: string;
  abstractUz?: string | null;
  abstractRu?: string | null;
  abstractTr?: string | null;
  tags: string; // JSON array string
  citations: number;
  featured: boolean;
}

interface PublicationsProps {
  publications: PublicationItem[];
}

export default function PublicationsSection({ publications }: PublicationsProps) {
  const { lang, t, getLocalized } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const getTags = (tagsStr: string): string[] => {
    try {
      const parsed = JSON.parse(tagsStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const filteredPublications = publications.filter((pub) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = getLocalized(pub, 'title').toLowerCase().includes(term);
    const authorMatch = pub.authors.toLowerCase().includes(term);
    const journalMatch = pub.journal.toLowerCase().includes(term);
    const tagsMatch = pub.tags.toLowerCase().includes(term);
    return titleMatch || authorMatch || journalMatch || tagsMatch;
  });

  return (
    <section id="research" className="py-24 bg-[#0a0d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.publications.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Scholarly Inquiries & Treatises
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              {t.publications.subtitle}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.publications.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121622] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#111520] border border-slate-800/90 hover:border-[#d4af37]/45 transition-all shadow-xl space-y-4 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#eedda5] font-semibold">{pub.year}</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-slate-400 italic">{pub.journal}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#181e2b] text-xs font-medium text-emerald-400 border border-emerald-500/20">
                    <Quote className="w-3 h-3" />
                    <span>{pub.citations} {t.publications.citations}</span>
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#eedda5] transition-colors">
                {getLocalized(pub, 'title')}
              </h3>

              <div className="text-xs text-slate-400">
                <span className="font-medium text-slate-300">Authors:</span> {pub.authors}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed bg-[#161b26]/50 p-4 rounded-xl border border-slate-800/60">
                {getLocalized(pub, 'abstract')}
              </p>

              {/* Tags and Action */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {getTags(pub.tags).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#181f2c] border border-slate-700/60 text-slate-300"
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
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] hover:text-white transition-colors"
                  >
                    <span>{t.publications.readPaper}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {filteredPublications.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-[#111520] border border-slate-800 text-slate-400 text-sm">
              No publications match the query &ldquo;{searchTerm}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
