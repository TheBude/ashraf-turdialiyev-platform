'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUp, Instagram, Send, Linkedin, Youtube, Twitter, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#17243A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#B99A5B]/50 flex items-center justify-center font-serif text-lg font-bold text-[#eedda5]">
                AT
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight block">
                  Ashraf Turdialiyev
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[#B99A5B]">
                  International Explorer &bull; Scholar
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#B99A5B] hover:text-[#B99A5B] flex items-center justify-center transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#B99A5B] hover:text-[#B99A5B] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#B99A5B] hover:text-[#B99A5B] flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#B99A5B] hover:text-[#B99A5B] flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#B99A5B] hover:text-[#B99A5B] flex items-center justify-center transition-colors"
                title="X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Independent Pages Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B99A5B]">
              {t.footer.pages}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${lang}/about`} className="hover:text-white transition-colors">{t.nav.about}</Link>
              </li>
              <li>
                <Link href={`/${lang}/travels`} className="hover:text-white transition-colors">{t.nav.travels}</Link>
              </li>
              <li>
                <Link href={`/${lang}/globe`} className="hover:text-white transition-colors">{t.nav.globe}</Link>
              </li>
              <li>
                <Link href={`/${lang}/journey`} className="hover:text-white transition-colors">{t.nav.journey}</Link>
              </li>
              <li>
                <Link href={`/${lang}/research`} className="hover:text-white transition-colors">{t.nav.research}</Link>
              </li>
              <li>
                <Link href={`/${lang}/certificates`} className="hover:text-white transition-colors">{t.nav.certificates}</Link>
              </li>
              <li>
                <Link href={`/${lang}/experience`} className="hover:text-white transition-colors">{t.nav.experience}</Link>
              </li>
              <li>
                <Link href={`/${lang}/audience`} className="hover:text-white transition-colors">{t.nav.audience}</Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-white transition-colors">{t.nav.contact}</Link>
              </li>
            </ul>
          </div>

          {/* Administrative Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B99A5B]">
              Portal & Security
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin/login" className="hover:text-[#eedda5] flex items-center gap-1.5 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>Executive CMS Portal</span>
                </Link>
              </li>
              <li className="text-slate-400">
                JWT SameSite Secure Guard
              </li>
              <li className="text-slate-400">
                Next.js 15 App Router
              </li>
              <li className="text-slate-400">
                Three.js 3D WebGL Canvas
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Ashraf Turdialiyev. {t.footer.rights}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#B99A5B] transition-colors"
          >
            <span>Top of Page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
