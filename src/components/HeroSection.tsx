'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, BookOpen, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  settingsMap: Record<string, string>;
}

export default function HeroSection({ settingsMap }: HeroProps) {
  const { lang, t } = useLanguage();

  // Localized headline and bio from settings
  const headlineKey = `hero_headline_${lang}`;
  const bioKey = `bio_${lang}`;

  const headline = settingsMap[headlineKey] || settingsMap['hero_headline_en'] || 'Explorer. Scholar. Global Thinker.';
  const bio = settingsMap[bioKey] || settingsMap['bio_en'] || t.hero.subtitle;

  return (
    <section id="about" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#d4af37]/10 via-[#38bdf8]/5 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#10131a]/90 border border-[#d4af37]/35 shadow-lg shadow-black/50 backdrop-blur-sm animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping"></span>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#eedda5]">
            {t.hero.badge}
          </span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-xs text-slate-400">40+ Nations Explored</span>
        </div>

        {/* Name and Signature Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            Ashraf <span className="gold-shimmer">Turdialiyev</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#eedda5] font-normal tracking-wide">
            {headline}
          </p>
        </div>

        {/* Narrative Biography */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal">
          {bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#destinations"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89028] text-black font-semibold text-sm shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all duration-200"
          >
            <Compass className="w-4 h-4 text-black" />
            <span>{t.hero.exploreJourney}</span>
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#10131a] border border-slate-700 hover:border-[#d4af37]/60 text-slate-200 font-semibold text-sm hover:bg-[#161b26] transition-all"
          >
            <span>{t.hero.getInTouch}</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </a>
        </div>

        {/* Expedition Quick Attributes */}
        <div className="pt-8 border-t border-slate-800/80 max-w-2xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="block text-xl font-bold text-white">Silk Road</span>
            <span className="text-xs text-slate-400">Historical Geography</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-[#eedda5]">High Alpine</span>
            <span className="text-xs text-slate-400">Glaciology & Climate</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-white">Eurasia</span>
            <span className="text-xs text-slate-400">Trade Corridors</span>
          </div>
        </div>
      </div>
    </section>
  );
}
