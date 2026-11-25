'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUp, Instagram, Send, Linkedin, Youtube, Twitter, ShieldCheck, Globe, Compass, Sparkles } from 'lucide-react';

export default function Footer() {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#0B0F19]/80 backdrop-blur-glass text-slate-600 dark:text-slate-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-black/5 dark:border-white/10">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[#B99A5B]/60 shadow-glass bg-[#101827]">
                <img
                  src="/images/ashraf-turdialiyev-avatar.jpg"
                  alt="Ashraf Turdialiyev"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-[#101827] dark:text-white tracking-tight block font-editorial">
                  Ashraf Turdialiyev
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[#B99A5B] font-semibold">
                  International Explorer &bull; Scholar
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
            {/* Social Coordinates */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { href: 'https://t.me/ashrafturdialiyev', icon: Send, label: 'Telegram' },
                { href: 'https://instagram.com/ashrafturdialiyev', icon: Instagram, label: 'Instagram' },
                { href: 'https://linkedin.com/in/ashrafturdialiyev', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://youtube.com/@ashrafturdialiyev', icon: Youtube, label: 'YouTube' },
                { href: 'https://x.com/ashrafturdialiyev', icon: Twitter, label: 'X' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl liquid-glass-subtle hover:border-[#B99A5B] hover:text-[#B99A5B] dark:hover:text-[#B99A5B] flex items-center justify-center transition-all hover:-translate-y-0.5"
                    title={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Directory Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B99A5B]">
              {t.footer.pages}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href={`/${lang}/about`} className="hover:text-[#B99A5B] transition-colors">{t.nav.about}</Link>
              <Link href={`/${lang}/experience`} className="hover:text-[#B99A5B] transition-colors">{t.nav.experience}</Link>
              <Link href={`/${lang}/travels`} className="hover:text-[#B99A5B] transition-colors">{t.nav.travels}</Link>
              <Link href={`/${lang}/globe`} className="hover:text-[#B99A5B] transition-colors flex items-center gap-1">
                <span>{t.nav.globe}</span>
                <span className="text-[9px] font-mono px-1 rounded bg-[#B99A5B]/20 text-[#B99A5B]">3D</span>
              </Link>
              <Link href={`/${lang}/research`} className="hover:text-[#B99A5B] transition-colors">{t.nav.research}</Link>
              <Link href={`/${lang}/certificates`} className="hover:text-[#B99A5B] transition-colors">{t.nav.certificates}</Link>
              <Link href={`/${lang}/journey`} className="hover:text-[#B99A5B] transition-colors">{t.nav.journey}</Link>
              <Link href={`/${lang}/audience`} className="hover:text-[#B99A5B] transition-colors">{t.nav.audience}</Link>
              <Link href={`/${lang}/contact`} className="hover:text-[#B99A5B] transition-colors col-span-2 font-bold text-[#B99A5B]">{t.nav.contact}</Link>
            </div>
          </div>

          {/* Architecture & Portal */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B99A5B]">
              Executive CMS
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-subtle text-[#101827] dark:text-white hover:text-[#B99A5B] hover:border-[#B99A5B]/60 font-semibold transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>Executive Portal</span>
                </Link>
              </li>
              <li>Next.js 15 App Router Architecture</li>
              <li>Liquid Glass & Aurora UI System</li>
              <li>WebGL Three.js 3D Cartography</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Ashraf Turdialiyev. {t.footer.rights}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#B99A5B] transition-colors group"
          >
            <span>Top of Page</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
