'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { Menu, X, Shield, ChevronDown, Globe, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/travels`, label: t.nav.travels },
    { href: `/${lang}/globe`, label: t.nav.globe, badge: '3D' },
    { href: `/${lang}/journey`, label: t.nav.journey },
    { href: `/${lang}/research`, label: t.nav.research },
    { href: `/${lang}/certificates`, label: t.nav.certificates },
    { href: `/${lang}/experience`, label: t.nav.experience },
    { href: `/${lang}/audience`, label: t.nav.audience },
    { href: `/${lang}/contact`, label: t.nav.contact },
  ];

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0];

  const isActive = (href: string) => {
    if (href === `/${lang}` && pathname === `/${lang}`) return true;
    if (href !== `/${lang}` && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F8F5]/90 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3'
          : 'bg-[#F8F8F5]/60 backdrop-blur-sm border-b border-slate-200/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram & Identity */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#B99A5B]/40 flex items-center justify-center font-serif text-lg font-bold text-[#17243A] shadow-subtle group-hover:border-[#B99A5B] transition-all">
              AT
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#17243A] text-base tracking-tight leading-snug group-hover:text-[#B99A5B] transition-colors">
                Ashraf Turdialiyev
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#B99A5B] font-semibold">
                Explorer &bull; Scholar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wide transition-colors relative py-1 flex items-center gap-1.5 ${
                    active
                      ? 'text-[#17243A] font-bold'
                      : 'text-slate-600 hover:text-[#17243A]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-[#EAF1F8] text-[9px] font-bold text-[#2B4D76] border border-[#ACC7E1]">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B99A5B] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher & Admin Portal */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#B99A5B]/60 text-xs text-[#17243A] font-medium shadow-subtle transition-all"
                title="Change Platform Language"
              >
                <span>{currentLangObj.flag}</span>
                <span className="font-semibold">{currentLangObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  {languageOptions.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-left transition-colors ${
                        lang === item.code
                          ? 'bg-[#EAF1F8] text-[#17243A] font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CMS Portal link */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#17243A] hover:border-[#B99A5B] hover:text-[#B99A5B] shadow-subtle transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>{t.nav.admin}</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Mobile quick language toggle */}
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#17243A] flex items-center gap-1 shadow-subtle"
            >
              <span>{currentLangObj.flag}</span>
              <span className="uppercase text-[11px] font-bold">{currentLangObj.code}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-14 top-14 w-32 rounded-xl bg-white border border-slate-200 shadow-xl p-1 z-50">
                {languageOptions.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-left rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-[#17243A] hover:bg-slate-50 shadow-subtle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-5 pt-4 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-[#EAF1F8] text-[#17243A] font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-white text-[9px] font-bold text-[#2B4D76] border border-slate-200">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#17243A]"
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
