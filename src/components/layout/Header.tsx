'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import {
  Menu,
  X,
  Shield,
  ChevronDown,
  Globe,
  Compass,
  BookOpen,
  Award,
  Activity,
  Briefcase,
  User,
  Milestone,
  Mail,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0];

  const isUz = lang === 'uz';
  const isRu = lang === 'ru';
  const isTr = lang === 'tr';

  // Mega-menu grouped definitions as required by Section 6.B
  const navGroups = [
    {
      id: 'about',
      label: isUz ? 'Haqida' : isRu ? 'Об авторе' : isTr ? 'Hakkında' : 'About',
      items: [
        {
          href: `/${lang}/about`,
          title: t.nav.about,
          desc: isUz ? 'Tarjimai hol va ilmiy missiya' : isRu ? 'Биография и научная миссия' : isTr ? 'Biyografi ve bilimsel vizyon' : 'Biography & scientific vision',
          icon: User,
        },
        {
          href: `/${lang}/experience`,
          title: t.nav.experience,
          desc: isUz ? 'Akademik tayinlovlar va boshqaruv' : isRu ? 'Академические и руководящие посты' : isTr ? 'Akademik görevler ve liderlik' : 'Appointments & leadership',
          icon: Briefcase,
        },
      ],
    },
    {
      id: 'journey',
      label: isUz ? 'Sayohatlar' : isRu ? 'Экспедиции' : isTr ? 'Yolculuk' : 'Journey',
      items: [
        {
          href: `/${lang}/travels`,
          title: t.nav.travels,
          desc: isUz ? '40+ davlat bo‘yicha dala xronikalari' : isRu ? 'Полевые хроники по 40+ странам' : isTr ? '40+ ülkede saha günlükleri' : 'Field chronicles across 40+ nations',
          icon: Compass,
        },
        {
          href: `/${lang}/globe`,
          title: t.nav.globe,
          badge: '3D',
          desc: isUz ? 'Fotorealistik WebGL 3D yer globusi' : isRu ? 'Интерактивный 3D-глобус Земли' : isTr ? 'Etkileşimli 3D Dünya Küresi' : 'Photorealistic WebGL 3D globe',
          icon: Globe,
        },
      ],
    },
    {
      id: 'research',
      label: isUz ? 'Ilm-fan' : isRu ? 'Наука' : isTr ? 'Araştırma' : 'Research',
      items: [
        {
          href: `/${lang}/research`,
          title: t.nav.research,
          desc: isUz ? 'Scopus/WoS indeksli ilmiy maqolalar' : isRu ? 'Рецензируемые публикации Scopus' : isTr ? 'Hakemli bilimsel makaleler' : 'Peer-reviewed scholarly publications',
          icon: BookOpen,
        },
        {
          href: `/${lang}/certificates`,
          title: t.nav.certificates,
          desc: isUz ? 'Xalqaro diplom va sertifikatlar' : isRu ? 'Верифицированные дипломы' : isTr ? 'Uluslararası onaylı belgeler' : 'Verified credentials & honors',
          icon: Award,
        },
      ],
    },
    {
      id: 'impact',
      label: isUz ? 'Natijalar' : isRu ? 'Влияние' : isTr ? 'Etki' : 'Impact',
      items: [
        {
          href: `/${lang}/journey`,
          title: t.nav.journey,
          desc: isUz ? 'Asosiy bosqichlar xronologiyasi' : isRu ? 'Хронология вех и достижений' : isTr ? 'Dönüm noktaları kronolojisi' : 'Chronological milestones archive',
          icon: Milestone,
        },
        {
          href: `/${lang}/audience`,
          title: t.nav.audience,
          desc: isUz ? 'Jonli global auditoriya telemetriyasi' : isRu ? 'Живая телеметрия аудитории' : isTr ? 'Canlı küresel telemetri' : 'Real-time readership telemetry',
          icon: Activity,
        },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}` && pathname === `/${lang}`) return true;
    if (href !== `/${lang}` && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <div
          className={`pointer-events-auto rounded-full transition-all duration-500 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border backdrop-blur-glass ${
            isScrolled
              ? 'bg-white/85 dark:bg-[#101827]/85 border-white/80 dark:border-white/15 shadow-2xl py-2'
              : 'bg-white/70 dark:bg-[#101827]/60 border-white/60 dark:border-white/10 shadow-glass'
          }`}
        >
          {/* Brand Monogram & Persona */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#B99A5B]/60 bg-[#101827] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/ashraf-turdialiyev-avatar.jpg"
                alt="Ashraf Turdialiyev"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#101827] dark:text-[#F4F5F7] text-sm sm:text-base tracking-tight leading-snug group-hover:text-[#B99A5B] transition-colors">
                Ashraf Turdialiyev
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#B99A5B] font-semibold flex items-center gap-1">
                <span>Explorer</span>
                <span>&bull;</span>
                <span>Scholar</span>
              </span>
            </div>
          </Link>

          {/* Desktop Mega-Menu Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Direct Home link */}
            <Link
              href={`/${lang}`}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                pathname === `/${lang}`
                  ? 'bg-[#B99A5B]/15 text-[#B99A5B] font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#101827] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Mega-menu groups with hover/click dropdowns */}
            {navGroups.map((group) => {
              const isOpen = activeMegaMenu === group.id;
              const hasActiveChild = group.items.some((item) => isActive(item.href));

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(group.id)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button
                    onClick={() => setActiveMegaMenu(isOpen ? null : group.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      hasActiveChild || isOpen
                        ? 'bg-[#B99A5B]/15 text-[#B99A5B] font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#101827] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#B99A5B]' : ''
                      }`}
                    />
                  </button>

                  {/* Mega-Menu Floating Liquid Glass Card */}
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 animate-in fade-in zoom-in-95 duration-200 z-50">
                      <div className="liquid-glass p-2.5 shadow-2xl border border-white/60 dark:border-white/15 rounded-3xl bg-white/90 dark:bg-[#182A42]/90 backdrop-blur-glass">
                        <div className="space-y-1">
                          {group.items.map((subItem) => {
                            const Icon = subItem.icon;
                            const isSubActive = isActive(subItem.href);

                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setActiveMegaMenu(null)}
                                className={`flex items-start gap-3 p-2.5 rounded-2xl transition-all group ${
                                  isSubActive
                                    ? 'bg-[#B99A5B]/15 text-[#101827] dark:text-white'
                                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <div
                                  className={`p-2 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${
                                    isSubActive
                                      ? 'bg-[#B99A5B] text-black shadow-sm'
                                      : 'bg-black/5 dark:bg-white/10 text-[#B99A5B]'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold leading-none">
                                      {subItem.title}
                                    </span>
                                    {subItem.badge && (
                                      <span className="px-1.5 py-0.2 rounded bg-[#B99A5B]/20 text-[9px] font-mono font-bold text-[#B99A5B] border border-[#B99A5B]/40">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                    {subItem.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct Contact link */}
            <Link
              href={`/${lang}/contact`}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                pathname?.startsWith(`/${lang}/contact`)
                  ? 'bg-[#B99A5B]/15 text-[#B99A5B] font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#101827] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right Action Controls: Language, Theme, Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle (Light / Dark) */}
            <ThemeSwitcher compact={true} />

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full liquid-glass-subtle text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#B99A5B]/50 transition-all"
                title="Change Platform Language"
              >
                <span className="text-sm">{currentLangObj.flag}</span>
                <span className="hidden sm:inline font-bold uppercase text-[11px]">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl liquid-glass p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 shadow-2xl bg-white/95 dark:bg-[#182A42]/95 backdrop-blur-glass border border-white/60 dark:border-white/15">
                  {languageOptions.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        lang === item.code
                          ? 'bg-[#B99A5B]/20 text-[#B99A5B] font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="text-sm">{item.flag}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin CMS Access Link */}
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#B99A5B] dark:hover:text-[#B99A5B] hover:border-[#B99A5B]/60 transition-all group"
              title="CMS Executive Portal"
            >
              <Shield className="w-3.5 h-3.5 text-[#B99A5B] group-hover:rotate-12 transition-transform" />
              <span className="hidden md:inline">{t.nav.admin}</span>
            </Link>

            {/* Mobile Hamburger Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full liquid-glass-subtle text-slate-700 dark:text-slate-200 hover:text-[#B99A5B]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto max-w-lg mx-auto mt-2 rounded-3xl liquid-glass p-5 shadow-2xl border border-white/70 dark:border-white/15 bg-white/95 dark:bg-[#101827]/95 backdrop-blur-glass animate-in slide-in-from-top-4 duration-300 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A5B]">
              Navigation Directory
            </span>
            <ThemeSwitcher />
          </div>

          <div className="space-y-3">
            {navGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block px-2">
                  {group.label}
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {group.items.map((subItem) => {
                    const isSubActive = isActive(subItem.href);
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                          isSubActive
                            ? 'bg-[#B99A5B] text-black font-bold shadow-sm'
                            : 'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <subItem.icon className="w-3.5 h-3.5 text-[#B99A5B]" />
                        <span className="truncate">{subItem.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Direct Links */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/5 dark:border-white/10">
              <Link
                href={`/${lang}`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-semibold text-center text-slate-700 dark:text-slate-300"
              >
                {t.nav.home}
              </Link>
              <Link
                href={`/${lang}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#B99A5B]/15 text-[#B99A5B] text-xs font-bold text-center"
              >
                {t.nav.contact}
              </Link>
            </div>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#101827] text-white dark:bg-white/10 font-bold text-xs tracking-wider uppercase border border-[#B99A5B]/40 shadow-sm"
            >
              <Shield className="w-4 h-4 text-[#B99A5B]" />
              <span>{t.nav.admin}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
