'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { Menu, X, Shield, Globe2, ChevronDown, Sparkles } from 'lucide-react';

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
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
    { href: '#about', label: t.nav.about },
    { href: '#destinations', label: t.nav.destinations },
    { href: '#world-map', label: t.nav.map },
    { href: '#journey', label: t.nav.timeline },
    { href: '#research', label: t.nav.publications },
    { href: '#credentials', label: t.nav.certificates },
    { href: '#contact', label: t.nav.contact },
  ];

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090c]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#161b26] to-[#1e2433] border border-[#d4af37]/40 flex items-center justify-center font-serif text-lg font-bold text-[#d4af37] group-hover:border-[#d4af37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
              AT
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-base tracking-wide group-hover:text-[#eedda5] transition-colors">
                Ashraf Turdialiyev
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#d4af37] font-medium">
                Explorer &bull; Scholar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-wider text-slate-300 hover:text-[#d4af37] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions: Language Switcher & Admin Portal */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10131a] border border-slate-800 hover:border-[#d4af37]/40 text-xs text-slate-200 transition-all"
                title="Change Platform Language"
              >
                <span>{currentLangObj.flag}</span>
                <span className="font-medium">{currentLangObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 rounded-xl bg-[#10131a] border border-slate-800 shadow-xl shadow-black/80 p-1.5 z-50 animate-in fade-in slide-in-from-top-2"
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
                          ? 'bg-[#d4af37]/15 text-[#eedda5] font-semibold'
                          : 'text-slate-300 hover:bg-[#161b26] hover:text-white'
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
              href="/admin/login"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#d4af37]/40 bg-[#161b26] text-xs font-medium text-[#eedda5] hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t.nav.admin}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile quick language toggle */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg bg-[#10131a] border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5"
              >
                <span>{currentLangObj.flag}</span>
                <span className="uppercase text-[11px] font-bold">{currentLangObj.code}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl bg-[#10131a] border border-slate-800 shadow-xl p-1 z-50">
                  {languageOptions.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-left rounded-lg hover:bg-[#161b26] text-slate-200"
                    >
                      <span>{item.flag}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#10131a] border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14] border-b border-slate-800/90 px-5 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-[#10131a] text-xs font-medium text-slate-300 hover:text-[#d4af37]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#d4af37]/40 bg-[#161b26] text-xs font-semibold text-[#eedda5]"
            >
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>{t.nav.admin}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
