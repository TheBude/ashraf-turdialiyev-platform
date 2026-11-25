'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe,
  Compass,
  Calendar,
  Award,
  BookOpen,
  Inbox,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { useAdminLanguage } from '@/context/AdminLanguageContext';

interface OverviewClientProps {
  admin: { name: string; email: string };
  globeCount: number;
  destinationsCount: number;
  mediaCount: number;
  timelineCount: number;
  publicationsCount: number;
  certificatesCount: number;
  unreadMessagesCount: number;
  recentMessages: any[];
  recentGlobe: any[];
}

export default function AdminOverviewClient({
  admin,
  globeCount,
  destinationsCount,
  mediaCount,
  timelineCount,
  publicationsCount,
  certificatesCount,
  unreadMessagesCount,
  recentMessages,
  recentGlobe,
}: OverviewClientProps) {
  const { adminT, adminLang } = useAdminLanguage();

  const isUz = adminLang === 'uz';

  const cards = [
    {
      title: adminT.overview.cards.globe.title,
      count: globeCount,
      desc: adminT.overview.cards.globe.desc,
      href: '/admin/globe',
      icon: Globe,
      color: 'text-[#B99A5B]',
      badge: '3D WebGL',
    },
    {
      title: adminT.overview.cards.media.title,
      count: mediaCount,
      desc: adminT.overview.cards.media.desc,
      href: '/admin/media',
      icon: ImageIcon,
      color: 'text-blue-600',
      badge: 'Assets',
    },
    {
      title: adminT.overview.cards.travels.title,
      count: destinationsCount,
      desc: adminT.overview.cards.travels.desc,
      href: '/admin/travels',
      icon: Compass,
      color: 'text-emerald-600',
    },
    {
      title: adminT.overview.cards.timeline.title,
      count: timelineCount,
      desc: adminT.overview.cards.timeline.desc,
      href: '/admin/timeline',
      icon: Calendar,
      color: 'text-purple-600',
    },
    {
      title: adminT.overview.cards.research.title,
      count: publicationsCount,
      desc: adminT.overview.cards.research.desc,
      href: '/admin/research',
      icon: BookOpen,
      color: 'text-amber-600',
    },
    {
      title: adminT.overview.cards.certificates.title,
      count: certificatesCount,
      desc: adminT.overview.cards.certificates.desc,
      href: '/admin/certificates',
      icon: Award,
      color: 'text-indigo-600',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#101827] via-[#182A42] to-[#101827] rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-white/10">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#8D9FC5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-60 h-60 bg-[#B99A5B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-semibold uppercase tracking-wider text-[#eedda5] border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>{isUz ? 'Ijroiya Boshqaruvi Tizimi' : 'Executive Operating System'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isUz ? `Xush kelibsiz, ${admin.name}` : `Welcome back, ${admin.name}`}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            {isUz
              ? '3D Yer Shari koordinatalari, markazlashtirilgan media fayllar, xalqaro sayohat xronikalari va ilmiy nashrlarni boshqaring.'
              : 'Manage 3D Earth geographical coordinates, centralized media assets, international travel chronicles, and scientific publications.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/admin/globe"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B99A5B] to-[#cfb478] text-[#101827] font-bold text-xs tracking-wide hover:shadow-lg hover:shadow-[#B99A5B]/30 transition shadow-sm"
            >
              <Globe className="w-4 h-4 text-[#101827]" />
              <span>{isUz ? '3D Yer Sharini Boshqarish' : 'Launch 3D Globe Manager'}</span>
            </Link>

            <Link
              href="/admin/media"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wide transition border border-white/15 backdrop-blur-md"
            >
              <ImageIcon className="w-4 h-4 text-[#eedda5]" />
              <span>{isUz ? 'Media Yuklash' : 'Upload Media'}</span>
            </Link>
          </div>
        </div>

        {/* Ambient watermark */}
        <div className="absolute right-4 bottom-0 opacity-10 text-[180px] font-serif font-bold select-none pointer-events-none text-white">
          AT
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              href={c.href}
              className="p-6 rounded-3xl bg-white/70 dark:bg-[#182A42]/40 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-[#B99A5B]/60 shadow-xs hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-white/10 ${c.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                {c.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#B99A5B]/20 text-[#B99A5B] dark:text-[#eedda5]">
                    {c.badge}
                  </span>
                )}
              </div>

              <div>
                <span className="block text-3xl font-extrabold text-[#101827] dark:text-white mb-1">
                  {c.count}
                </span>
                <h3 className="font-bold text-sm text-[#101827] dark:text-white group-hover:text-[#B99A5B] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {c.desc}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 group-hover:text-[#101827] dark:group-hover:text-white">
                <span className="font-semibold">{isUz ? 'Boshqarish' : 'Manage records'}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Inbound Messages */}
        <div className="lg:col-span-7 bg-white/70 dark:bg-[#182A42]/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#B99A5B]" />
              <h3 className="font-bold text-base text-[#101827] dark:text-white">
                {adminT.overview.recentMessages}
              </h3>
            </div>
            {unreadMessagesCount > 0 ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {unreadMessagesCount} {isUz ? 'Yangi' : 'Unread'}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {isUz ? 'Barchasi o‘qilgan' : 'Inbox Cleared'}
              </span>
            )}
          </div>

          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-6 text-center">{adminT.overview.noMessages}</p>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-slate-50/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#101827] dark:text-white">{msg.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({msg.email})</span>
                    </div>
                    <p className="text-xs font-semibold text-[#B99A5B]">{msg.subject}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 text-right">
            <Link
              href="/admin/messages"
              className="text-xs font-bold text-[#101827] dark:text-white hover:text-[#B99A5B] dark:hover:text-[#B99A5B] inline-flex items-center gap-1 transition-colors"
            >
              <span>{adminT.overview.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Recent Globe Additions */}
        <div className="lg:col-span-5 bg-white/70 dark:bg-[#182A42]/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#B99A5B]" />
              <h3 className="font-bold text-base text-[#101827] dark:text-white">
                {adminT.overview.recentGlobe}
              </h3>
            </div>
            <Link
              href="/admin/globe"
              className="text-xs font-bold text-[#101827] dark:text-white hover:text-[#B99A5B] dark:hover:text-[#B99A5B] inline-flex items-center gap-1 transition-colors"
            >
              <span>{adminT.overview.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentGlobe.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-6 text-center">
                {isUz ? 'Nuqtalar kiritilmagan' : 'No globe locations found.'}
              </p>
            ) : (
              recentGlobe.map((loc) => (
                <div
                  key={loc.id}
                  className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-[#101827] dark:text-white block">
                      {isUz && loc.titleUz ? loc.titleUz : loc.title}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B99A5B]" />
                      <span>{loc.city ? `${loc.city}, ` : ''}{loc.country}</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(loc.visitDate).getFullYear()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
