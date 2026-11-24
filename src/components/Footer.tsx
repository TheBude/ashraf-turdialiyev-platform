'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUp, Instagram, Send, Linkedin, Youtube, Twitter, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#161b26] to-[#1e2433] border border-[#d4af37]/50 flex items-center justify-center font-serif text-base font-bold text-[#d4af37]">
                AT
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                Ashraf Turdialiyev
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#10131a] border border-slate-800 hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#10131a] border border-slate-800 hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#10131a] border border-slate-800 hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#10131a] border border-slate-800 hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/ashrafturdialiyev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#10131a] border border-slate-800 hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center transition-colors"
                title="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">{t.nav.destinations}</a>
              </li>
              <li>
                <a href="#world-map" className="hover:text-white transition-colors">{t.nav.map}</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-white transition-colors">{t.nav.timeline}</a>
              </li>
              <li>
                <a href="#research" className="hover:text-white transition-colors">{t.nav.publications}</a>
              </li>
              <li>
                <a href="#credentials" className="hover:text-white transition-colors">{t.nav.certificates}</a>
              </li>
            </ul>
          </div>

          {/* Portal & System */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Administrative
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin/login" className="hover:text-[#eedda5] flex items-center gap-1.5 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{t.nav.admin}</span>
                </Link>
              </li>
              <li className="text-slate-500">
                Secure Session Guard
              </li>
              <li className="text-slate-500">
                SQLite Engine v6.19
              </li>
              <li className="text-slate-500">
                Next.js App Router 15
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Ashraf Turdialiyev. {t.footer.rights}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
