'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Globe } from 'lucide-react';
import { useAdminLanguage } from '@/context/AdminLanguageContext';
import AdminLogoutButton from './AdminLogoutButton';

interface AdminHeaderClientProps {
  admin: {
    name: string;
    email: string;
  } | null;
}

export default function AdminHeaderClient({ admin }: AdminHeaderClientProps) {
  const { adminLang, setAdminLang, adminT } = useAdminLanguage();

  if (!admin) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#B99A5B]/50 bg-[#17243A] flex items-center justify-center font-serif text-sm font-bold text-[#eedda5] shadow-sm">
            <img
              src="/images/ashraf-turdialiyev-avatar.jpg"
              alt="Ashraf Turdialiyev"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <span className="font-bold text-[#17243A] text-sm block leading-tight">
              {adminT.header.title}
            </span>
            <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
              {adminT.header.subtitle}
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 text-xs">
        {/* Dual Language Switcher: Uz & Eng */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setAdminLang('uz')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              adminLang === 'uz'
                ? 'bg-white text-[#17243A] shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="O'zbek tiliga o'tish"
          >
            <span>🇺🇿</span>
            <span>O‘zbek</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminLang('en')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              adminLang === 'en'
                ? 'bg-white text-[#17243A] shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to English"
          >
            <span>🇬🇧</span>
            <span>English</span>
          </button>
        </div>

        {/* Live Site Link */}
        <Link
          href={`/${adminLang}`}
          target="_blank"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#17243A] font-semibold transition"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#B99A5B]" />
          <span>{adminT.header.liveSite}</span>
        </Link>

        {/* Admin Identifier */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="truncate max-w-[120px]">{admin.name}</span>
        </div>

        <AdminLogoutButton />
      </div>
    </header>
  );
}
