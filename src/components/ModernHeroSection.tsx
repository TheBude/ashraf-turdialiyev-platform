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
    ? 'Sayyoh. Olim. Global Fikrlaydigan Yetakchi.'
    : isRu
    ? 'Исследователь. Ученый. Мыслитель.'
    : isTr
    ? 'Kâşif. Akademisyen. Küresel Vizyoner.'
    : 'Explorer. Scholar. Global Thinker.';

  const defaultBio = isUz
    ? "O'tmishning ilmiy merosini zamonaviy global innovatsiyalar bilan bog'lash."
    : isRu
    ? 'Соединяя богатое историческое наследие с передовыми мировыми инновациями.'
    : isTr
    ? 'Tarihi ilmi mirası çağdaş küresel inovasyonla buluşturmak.'
    : 'Connecting historical scientific heritage with cutting-edge global innovation.';

  const headline = settingsMap[`hero_headline_${currentLang}`] || settingsMap['hero_headline_en'] || defaultHeadline;
  const bio = settingsMap[`bio_${currentLang}`] || settingsMap['bio_en'] || defaultBio;

  // Localized hero elements
  const badgeText = isUz
    ? 'Rasmiy Shaxsiy Brend Platformasi'
    : isRu
    ? 'Официальная персональная платформа'
    : isTr
    ? 'Resmi Kişisel Marka Platformu'
    : 'Official Personal Brand Platform';

  const expeditionsCountText = isUz
    ? `${globeLocationsCount || 40}+ Xaritaga kiritilgan ekspeditsiyalar`
    : isRu
    ? `${globeLocationsCount || 40}+ Экспедиций на карте`
    : isTr
    ? `${globeLocationsCount || 40}+ Haritalanan Sefer`
    : `${globeLocationsCount || 40}+ Expeditions Mapped`;

  const attrs = {
    silk: {
      title: isUz ? 'Ipak Yo‘li' : isRu ? 'Шелковый путь' : isTr ? 'İpek Yolu' : 'Silk Road',
      desc: isUz ? 'Savdo koridorlari' : isRu ? 'Торговые пути' : isTr ? 'Ticaret Koridorları' : 'Trade Corridors',
    },
    alpine: {
      title: isUz ? 'Baland Tog‘lar' : isRu ? 'Высокогорье' : isTr ? 'Yüksek İrtifa' : 'High Alpine',
      desc: isUz ? 'Muzliklar & Iqlim' : isRu ? 'Гляциология и климат' : isTr ? 'Buzul ve İklim' : 'Glaciology & Climate',
    },
    diplomacy: {
      title: isUz ? 'Diplomatiya' : isRu ? 'Дипломатия' : isTr ? 'Diplomasi' : 'Diplomacy',
      desc: isUz ? 'Yoshlar elchisi' : isRu ? 'Посланник молодежи' : isTr ? 'Gençlik Elçisi' : 'Youth Envoy',
    },
  };

  const cta = {
    globe: isUz ? '3D Yer Sharini Ochish' : isRu ? 'Исследовать 3D Глобус' : isTr ? '3D Küreyi Keşfet' : 'Explore 3D Earth Globe',
    travels: isUz ? 'Sayohatlar Xronikasi' : isRu ? 'Избранные Экспедиции' : isTr ? 'Keşif Günlükleri' : 'Curated Expeditions',
    contact: isUz ? 'Diplomatik Aloqalar' : isRu ? 'Дипломатические Запросы' : isTr ? 'Diplomatik İletişim' : 'Diplomatic Inquiries',
  };

  const portraitCard = {
    fieldwork: isUz ? 'Dala tadqiqoti' : isRu ? 'Полевые работы' : isTr ? 'Saha Çalışması' : 'Fieldwork',
    nations: isUz ? '40+ Davlatlar' : isRu ? '40+ Стран' : isTr ? '40+ Ülke' : '40+ Nations',
    expeditions: isUz ? 'Ekspeditsiyalar' : isRu ? 'Экспедиции' : isTr ? 'Keşifler' : 'Expeditions',
    highAlpine: isUz ? 'Baland Tog‘lar' : isRu ? 'Высокогорье' : isTr ? 'Yüksek İrtifa' : 'High Alpine',
    location: isUz ? 'Jeneva • Toshkent • Global' : isRu ? 'Женева • Ташкент • Мир' : isTr ? 'Cenevre • Taşkent • Küresel' : 'Geneva • Tashkent • Global',
    envoy: isUz ? 'Elchi' : isRu ? 'Посланник' : isTr ? 'Elçi' : 'Envoy',
    role: isUz
      ? 'Xalqaro tadqiqotchi, alpinist va ma’ruzachi'
      : isRu
      ? 'Международный исследователь, альпинист и спикер'
      : isTr
      ? 'Uluslararası araştırmacı, dağcı ve konuşmacı'
      : 'International Researcher, Alpinist & Keynote Speaker',
  };

  // 3D Tilt Card Parallax values
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

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
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Golden & Azure Ambient Glows */}
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 right-1/4 w-[550px] h-[550px] bg-gradient-radial from-[#B99A5B]/15 via-[#7CA4CD]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -left-32 w-[480px] h-[480px] bg-gradient-radial from-[#17243A]/10 via-[#ACC7E1]/15 to-transparent rounded-full blur-3xl"
        />

        {/* Dynamic Expedition SVG Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.22] stroke-slate-400/40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative, Typography & Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Top Interactive Verification Badge */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 border border-[#ACC7E1]/70 shadow-subtle backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B99A5B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B99A5B]"></span>
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-[#17243A]">
                {badgeText}
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs font-semibold text-[#2B4D76] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#B99A5B]" />
                {expeditionsCountText}
              </span>
            </motion.div>

            {/* Name and Animated Title */}
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#17243A] leading-[1.06]"
              >
                Ashraf{' '}
                <span className="relative inline-block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B99A5B] via-[#9e7d38] to-[#6d501b]">
                  Turdialiyev
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#B99A5B] to-transparent origin-left rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#252B35] leading-snug font-normal"
              >
                {headline}
              </motion.p>
            </div>

            {/* Narrative Bio */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal"
            >
              {bio}
            </motion.p>

            {/* Quick Interactive Expedition Attributes */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-2 max-w-xl"
            >
              <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-subtle hover:border-[#B99A5B]/60 transition-all group">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#17243A]">
                  <Compass className="w-3.5 h-3.5 text-[#B99A5B] group-hover:rotate-45 transition-transform" />
                  <span>{attrs.silk.title}</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">{attrs.silk.desc}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-subtle hover:border-[#B99A5B]/60 transition-all group">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#17243A]">
                  <Mountain className="w-3.5 h-3.5 text-[#2B4D76] group-hover:-translate-y-0.5 transition-transform" />
                  <span>{attrs.alpine.title}</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">{attrs.alpine.desc}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-subtle hover:border-[#B99A5B]/60 transition-all group">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#17243A]">
                  <Award className="w-3.5 h-3.5 text-[#B99A5B] group-hover:scale-110 transition-transform" />
                  <span>{attrs.diplomacy.title}</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">{attrs.diplomacy.desc}</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <Link
                href={`/${currentLang}/globe`}
                className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#17243A] text-white font-semibold text-xs tracking-wider uppercase shadow-card hover:bg-[#2B4D76] hover:shadow-card-hover transition-all duration-300"
              >
                <Globe className="w-4 h-4 text-[#eedda5] group-hover:rotate-180 transition-transform duration-700" />
                <span>{cta.globe}</span>
                <ArrowRight className="w-4 h-4 text-[#eedda5] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`/${currentLang}/travels`}
                className="group inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white border border-slate-200/90 text-[#17243A] font-semibold text-xs tracking-wider uppercase shadow-subtle hover:border-[#B99A5B] hover:shadow-card transition-all duration-300"
              >
                <Compass className="w-4 h-4 text-[#B99A5B] group-hover:rotate-45 transition-transform" />
                <span>{cta.travels}</span>
              </Link>

              <Link
                href={`/${currentLang}/contact`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#B99A5B] px-3 py-2 transition-colors"
              >
                <span>{cta.contact}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Tilt Card with Ashraf's Real Cutout & Badges */}
          <div className="lg:col-span-5 relative perspective-1000">
            {/* Ambient Aura behind the portrait */}
            <motion.div 
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-[#B99A5B]/30 via-[#7CA4CD]/20 to-transparent rounded-[36px] blur-2xl -z-10"
            />

            {/* Parallax Tilt Card Container */}
            <motion.div
              ref={cardRef}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl bg-gradient-to-b from-white via-slate-50 to-[#EAF1F8]/40 border border-slate-200/90 shadow-card p-3 sm:p-4 group cursor-pointer"
            >
              {/* Inner Portrait Frame */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#17243A] via-[#223B5A] to-[#121b2b]">
                {/* Subtle Radial Glow inside the portrait */}
                <div className="absolute inset-0 bg-gradient-radial from-[#B99A5B]/25 via-transparent to-transparent opacity-80" />
                
                {/* Atmospheric Map Lines Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#eedda5_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-20" />

                {/* Real Photo Cutout of Ashraf Turdialiyev */}
                <motion.div 
                  className="relative w-full h-full flex items-end justify-center"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <img
                    src="/images/ashraf-turdialiyev-cutout.png"
                    alt="Ashraf Turdialiyev"
                    className="w-[92%] h-[95%] object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </motion.div>

                {/* Dark Vignette Overlay for bottom text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17243A] via-[#17243A]/40 to-transparent pointer-events-none" />

                {/* Bottom Identity Plaque */}
                <motion.div 
                  style={{ transform: "translateZ(45px)" }}
                  className="absolute bottom-5 left-5 right-5 text-white space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#eedda5] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5B] animate-pulse" />
                      {portraitCard.location}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold text-[#eedda5] border border-[#B99A5B]/40">
                      {portraitCard.envoy}
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-serif tracking-tight text-white">
                    Ashraf Turdialiyev
                  </div>
                  <div className="text-xs text-slate-300 font-normal leading-snug">
                    {portraitCard.role}
                  </div>
                </motion.div>
              </div>

              {/* Floating Glass Widget 1: Top Right - Sovereign Nations */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(60px)" }}
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EAF1F8] border border-[#ACC7E1] flex items-center justify-center text-[#2B4D76]">
                  <Globe className="w-5 h-5 text-[#2B4D76]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">{portraitCard.fieldwork}</span>
                  <span className="text-sm font-extrabold text-[#17243A]">{portraitCard.nations}</span>
                </div>
              </motion.div>

              {/* Floating Glass Widget 2: Bottom Left - Glaciology & Alpinism */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ transform: "translateZ(60px)" }}
                className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 px-4 py-2.5 rounded-2xl bg-[#17243A]/95 text-white border border-[#B99A5B]/40 shadow-2xl backdrop-blur-md flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-[#B99A5B]/20 border border-[#B99A5B]/50 flex items-center justify-center text-[#eedda5]">
                  <Mountain className="w-5 h-5 text-[#eedda5]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#eedda5] font-bold block">{portraitCard.expeditions}</span>
                  <span className="text-sm font-extrabold text-white">{portraitCard.highAlpine}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
