'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, MapPin, Award, BookOpen, Compass, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

export interface TimelineItem {
  id: string;
  year: number;
  date: string;
  title: string;
  titleUz?: string | null;
  titleRu?: string | null;
  titleTr?: string | null;
  category: string;
  description: string;
  descriptionUz?: string | null;
  descriptionRu?: string | null;
  descriptionTr?: string | null;
  location?: string | null;
  mediaUrl?: string | null;
  order: number;
}

interface TimelineProps {
  events: TimelineItem[];
}

export default function TimelineSection({ events }: TimelineProps) {
  const { lang, t, getLocalized } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    { key: 'ALL', label: t.timeline.filterAll },
    { key: 'EDUCATION', label: t.timeline.filterEducation },
    { key: 'CAREER', label: t.timeline.filterCareer },
    { key: 'TRAVEL', label: t.timeline.filterTravel },
    { key: 'ACHIEVEMENT', label: t.timeline.filterAchievement },
    { key: 'SCIENTIFIC', label: t.timeline.filterScientific },
  ];

  const filteredEvents = events.filter((e) => {
    if (activeCategory === 'ALL') return true;
    return e.category.toUpperCase() === activeCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toUpperCase()) {
      case 'EDUCATION':
        return <GraduationCap className="w-4 h-4 text-sky-400" />;
      case 'CAREER':
        return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'TRAVEL':
        return <Compass className="w-4 h-4 text-[#d4af37]" />;
      case 'ACHIEVEMENT':
        return <Award className="w-4 h-4 text-amber-400" />;
      case 'SCIENTIFIC':
        return <BookOpen className="w-4 h-4 text-violet-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#d4af37]" />;
    }
  };

  return (
    <section id="journey" className="py-24 bg-[#08090c] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.timeline.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            The Journey & Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.timeline.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-16">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === c.key
                  ? 'bg-[#d4af37] text-black shadow-gold font-bold scale-105'
                  : 'bg-[#121620] text-slate-300 border border-slate-800 hover:border-[#d4af37]/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-[#d4af37]/30 ml-4 sm:ml-32 space-y-12">
          {filteredEvents.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-10 group">
              {/* Year Marker Badge on the Left (Desktop) */}
              <div className="hidden sm:block absolute -left-32 top-0.5 text-right w-24">
                <span className="font-mono text-sm font-bold text-[#eedda5] block">
                  {item.year}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {item.date}
                </span>
              </div>

              {/* Node on Line */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#08090c] border-2 border-[#d4af37] group-hover:scale-125 group-hover:bg-[#d4af37] transition-all"></div>

              {/* Event Card */}
              <div className="p-6 rounded-2xl bg-[#10141e] border border-slate-800 hover:border-[#d4af37]/50 shadow-xl transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#181e2b] border border-slate-700">
                      {getCategoryIcon(item.category)}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#181e2b] text-[#eedda5]">
                      {item.category}
                    </span>
                  </div>

                  {item.location && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#d4af37]" />
                      {item.location}
                    </span>
                  )}
                </div>

                <div className="sm:hidden text-xs font-mono font-bold text-[#eedda5]">
                  {item.year} &bull; {item.date}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#eedda5] transition-colors">
                  {getLocalized(item, 'title')}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {getLocalized(item, 'description')}
                </p>

                {item.mediaUrl && (
                  <div className="pt-2">
                    <div className="w-full max-w-md aspect-[16/9] rounded-xl overflow-hidden border border-slate-800">
                      <img
                        src={item.mediaUrl}
                        alt={getLocalized(item, 'title')}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
