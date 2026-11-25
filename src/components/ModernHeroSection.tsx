'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  Globe,
  Compass,
  ArrowRight,
  Mountain,
  Award,
  BookOpen,
  Sparkles,
  MousePointer,
  ChevronDown,
} from 'lucide-react';

interface ModernHeroProps {
  settingsMap: Record<string, string>;
  globeLocationsCount: number;
  locale: string;
}

export default function ModernHeroSection({
  settingsMap,
  globeLocationsCount,
  locale,
}: ModernHeroProps) {
  const { lang, t } = useLanguage();
  const currentLang = locale || lang || 'uz';

  const isUz = currentLang === 'uz';
  const isRu = currentLang === 'ru';
  const isTr = currentLang === 'tr';

  const defaultHeadline = isUz
    ? 'Ilm-fan, Diplomatiya va Global Ekspeditsiyalar.'
    : isRu
    ? 'Наука, Дипломатия и Глобальные Экспедиции.'
    : isTr
    ? 'Bilim, Diplomasi ve Küresel Keşifler.'
    : 'Science, Diplomacy & Global Expeditions.';

  const defaultBio = isUz
    ? "O‘tmishning ilmiy merosini zamonaviy multimodal logistika, yuqori tog‘ gidrologiyasi va xalqaro yoshlar yetakchiligi bilan bog‘lovchi platforma."
    : isRu
    ? 'Платформа, объединяющая историческое наследие Шелкового пути с современной логистикой, гляциологией и молодежным лидерством.'
    : isTr
    ? 'Tarihi İpek Yolu mirasını çağdaş lojistik, buzul bilimi ve gençlik liderliğiyle buluşturan uluslararası platform.'
    : 'Bridging ancient Eurasian trade corridors with contemporary multimodal logistics, high-altitude glaciology, and youth mentorship.';

  const headline = settingsMap[`hero_headline_${currentLang}`] || settingsMap['hero_headline_en'] || defaultHeadline;
  const bio = settingsMap[`bio_${currentLang}`] || settingsMap['bio_en'] || defaultBio;

  const badgeText = isUz
    ? 'Rasmiy Shaxsiy Brend Platformasi'
    : isRu
    ? 'Официальная персональная платформа'
    : isTr
    ? 'Resmi Kişisel Marka Platformu'
    : 'Official Personal Brand Platform';

  const statusText = isUz
    ? 'Ilmiy ma’ruzalar va konsultatsiyalar uchun ochiq'
    : isRu
    ? 'Открыт для научных докладов и консультаций'
    : isTr
    ? 'Akademik konferans ve danışmanlık için müsait'
    : 'Available for Keynotes & Advisory';

  const statsLabels = {
    stat1Val: `${globeLocationsCount || 40}+`,
    stat1Label: isUz ? 'Tashrif etilgan davlatlar' : isRu ? 'Посещенных стран' : isTr ? 'Ziyaret Edilen Ülke' : 'Nations Explored',
    stat1Sub: isUz ? 'Yevroosiyo & Amerika' : isRu ? 'Евразия и Америка' : isTr ? 'Avrasya ve Amerika' : 'Eurasia & Americas',

    stat2Val: '100+',
    stat2Label: isUz ? 'Ilmiy maqolalar & nashrlar' : isRu ? 'Публикаций и статей' : isTr ? 'Bilimsel Yayın' : 'Scholarly Papers',
    stat2Sub: isUz ? 'Scopus / WoS indeksli' : isRu ? 'Scopus / WoS индексы' : isTr ? 'Scopus / WoS İndeksli' : 'Indexed in Scopus',

    stat3Val: '10K+',
    stat3Label: isUz ? 'Talabalar & yosh yetakchilar' : isRu ? 'Студентов и менти' : isTr ? 'Genç Lider & Öğrenci' : 'Mentees & Fellows',
    stat3Sub: isUz ? 'Xalqaro stipendiyalar' : isRu ? 'Глобальные стипендии' : isTr ? 'Uluslararası burslar' : 'Global Fellowships',
  };

  const cta = {
    globe: isUz ? '3D Globusni Ochish' : isRu ? 'Запустить 3D-глобус' : isTr ? '3D Küreyi Başlat' : 'Explore 3D Earth Globe',
    travels: isUz ? 'Sayohatlar Xronikasi' : isRu ? 'Избранные Экспедиции' : isTr ? 'Keşif Günlükleri' : 'Curated Expeditions',
    scroll: isUz ? 'Kashf etish uchun pastga siljiting' : isRu ? 'Листайте вниз для обзора' : isTr ? 'Keşfetmek için kaydırın' : 'Scroll to explore',
  };

  // 3D Tilt Parallax
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-20 lg:pt-12 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* =========================================================
              LEFT COLUMN: Editorial Typography & Actions
              ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 relative z-10"
          >
            {/* Top Interactive Liquid Glass Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-glass-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B99A5B] animate-pulse" />
              <span className="uppercase tracking-widest text-[11px] font-bold">
                {badgeText}
              </span>
              <span className="text-slate-400 dark:text-slate-600">&bull;</span>
              <span className="text-[11px] font-mono text-[#B99A5B]">Geneva &bull; Tashkent</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#101827] dark:text-[#F4F5F7]">
                Ashraf{' '}
                <span className="relative inline-block font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B99A5B] via-[#ecd499] to-[#d4af37]">
                  Turdialiyev
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#B99A5B] via-[#eedda5] to-transparent rounded-full" />
                </span>
              </h1>

              <p className="text-xl sm:text-2xl lg:text-3xl font-editorial text-slate-700 dark:text-slate-300 leading-snug font-normal">
                {headline}
              </p>
            </div>

            {/* Narrative Bio */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-normal">
              {bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`/${currentLang}/globe`}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl gold-glow-button font-bold text-xs tracking-wider uppercase"
              >
                <Globe className="w-4 h-4 text-[#101827] group-hover:rotate-180 transition-transform duration-700" />
                <span>{cta.globe}</span>
                <ArrowRight className="w-4 h-4 text-[#101827] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`/${currentLang}/travels`}
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl liquid-glass text-slate-800 dark:text-slate-200 font-bold text-xs tracking-wider uppercase hover:border-[#B99A5B] transition-all"
              >
                <Compass className="w-4 h-4 text-[#B99A5B] group-hover:rotate-45 transition-transform" />
                <span>{cta.travels}</span>
              </Link>
            </div>

            {/* Bottom 3 Floating Key Metrics (Reference Image 4 Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-black/5 dark:border-white/10">
              <div className="p-4 rounded-2xl liquid-glass-subtle space-y-1">
                <div className="flex items-center gap-2 text-2xl font-extrabold text-[#101827] dark:text-white font-editorial">
                  <Globe className="w-4 h-4 text-[#8D9FC5]" />
                  <span>{statsLabels.stat1Val}</span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">
                  {statsLabels.stat1Label}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {statsLabels.stat1Sub}
                </div>
              </div>

              <div className="p-4 rounded-2xl liquid-glass-subtle space-y-1">
                <div className="flex items-center gap-2 text-2xl font-extrabold text-[#101827] dark:text-white font-editorial">
                  <BookOpen className="w-4 h-4 text-[#A78BFA]" />
                  <span>{statsLabels.stat2Val}</span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">
                  {statsLabels.stat2Label}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {statsLabels.stat2Sub}
                </div>
              </div>

              <div className="p-4 rounded-2xl liquid-glass-subtle space-y-1">
                <div className="flex items-center gap-2 text-2xl font-extrabold text-[#101827] dark:text-white font-editorial">
                  <Award className="w-4 h-4 text-[#B99A5B]" />
                  <span>{statsLabels.stat3Val}</span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">
                  {statsLabels.stat3Label}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {statsLabels.stat3Sub}
                </div>
              </div>
            </div>

            {/* Micro Scroll Indicator */}
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-500">
              <div className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-[#B99A5B] animate-bounce" />
              </div>
              <span>{cta.scroll}</span>
            </div>
          </motion.div>

          {/* =========================================================
              RIGHT COLUMN: Ashraf's Portrait + Floating Liquid Glass Widgets
              (Exact reference style from Reference Image 4)
              ========================================================= */}
          <div className="lg:col-span-5 relative perspective-1000">
            {/* Ambient Aurora Glow directly behind portrait */}
            <motion.div
              animate={{
                scale: [0.95, 1.08, 0.95],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-radial from-[#A78BFA]/30 via-[#8D9FC5]/20 to-transparent rounded-[40px] blur-3xl -z-10"
            />

            {/* Parallax Tilt Card Container */}
            <motion.div
              ref={cardRef}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.94, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl liquid-glass p-3 sm:p-4 group shadow-2xl"
            >
              {/* Inner Portrait Frame with High-Altitude Backdrop */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#101827] via-[#182A42] to-[#0B0F19]">
                {/* Radial Glow Layer inside */}
                <div className="absolute inset-0 bg-gradient-radial from-[#B99A5B]/25 via-transparent to-transparent opacity-80" />

                {/* Subtle Geometric Constellation Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#eedda5_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-25" />

                {/* Real Photo Cutout of Ashraf Turdialiyev */}
                <motion.div
                  className="relative w-full h-full flex items-end justify-center"
                  style={{ transform: 'translateZ(35px)' }}
                >
                  <img
                    src="/images/ashraf-turdialiyev-cutout.png"
                    alt="Ashraf Turdialiyev"
                    className="w-[94%] h-[96%] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </motion.div>

                {/* Vignette Overlay for bottom text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/40 to-transparent pointer-events-none" />

                {/* Identity Plaque on bottom */}
                <motion.div
                  style={{ transform: 'translateZ(50px)' }}
                  className="absolute bottom-4 left-4 right-4 text-white space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#eedda5] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5B] animate-pulse" />
                      Geneva &bull; Tashkent &bull; Global
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-mono font-bold text-[#eedda5] border border-[#B99A5B]/40">
                      Explorer &bull; Envoy
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-editorial tracking-tight text-white">
                    Ashraf Turdialiyev
                  </div>
                  <div className="text-xs text-slate-300 font-normal leading-snug">
                    International Explorer &bull; Scholar &bull; Envoy
                  </div>
                </motion.div>
              </div>

              {/* Floating Liquid Glass Card 1 (Top Right): Live Status Indicator */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(65px)' }}
                className="absolute -top-4 -right-3 sm:-top-5 sm:-right-5 px-4 py-2.5 rounded-2xl liquid-glass shadow-2xl backdrop-blur-glass flex items-center gap-3 z-20 border border-white/60 dark:border-white/15"
              >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                    Status
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {statusText}
                  </span>
                </div>
              </motion.div>

              {/* Floating Liquid Glass Card 2 (Bottom Left): Expedition Highlights */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{ transform: 'translateZ(65px)' }}
                className="absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-5 px-4 py-3 rounded-2xl liquid-glass shadow-2xl backdrop-blur-glass flex items-center gap-3 z-20 border border-white/60 dark:border-white/15"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B99A5B]/20 border border-[#B99A5B]/40 flex items-center justify-center text-[#B99A5B]">
                  <Mountain className="w-5 h-5 text-[#B99A5B]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B99A5B] font-bold block">
                    High Alpine & Glaciers
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Pamir, Alps & Tien Shan
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
