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
      <div className="relative overflow-hidden bg-gradient-to-r from-[#17243A] via-[#1E304E] to-[#17243A] rounded-3xl p-8 sm:p-10 text-white shadow-card">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-semibold uppercase tracking-wider text-[#eedda5]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUz ? 'Ijroiya Boshqaruvi Tizimi' : 'Executive Operating System'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isUz ? `Xush kelibsiz, ${admin.name}` : `Welcome back, ${admin.name}`}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isUz
              ? '3D Yer Shari koordinatalari, markazlashtirilgan media fayllar, xalqaro sayohat xronikalari va ilmiy nashrlarni boshqaring.'
              : 'Manage 3D Earth geographical coordinates, centralized media assets, international travel chronicles, and scientific publications.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/admin/globe"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#eedda5] text-[#17243A] font-bold text-xs tracking-wide hover:bg-white transition shadow-sm"
            >
              <Globe className="w-4 h-4 text-[#17243A]" />
              <span>{isUz ? '3D Yer Sharini Boshqarish' : 'Launch 3D Globe Manager'}</span>
            </Link>

            <Link
              href="/admin/media"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wide transition border border-white/10"
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
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#B99A5B] shadow-subtle hover:shadow-card transition-all group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-[#F8F8F5] ${c.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                {c.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#eedda5]/60 text-[#17243A]">
                    {c.badge}
                  </span>
                )}
              </div>

              <div>
                <span className="block text-3xl font-extrabold text-[#17243A] mb-1">
                  {c.count}
                </span>
                <h3 className="font-bold text-sm text-[#17243A] group-hover:text-[#B99A5B] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {c.desc}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-[#17243A]">
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
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#B99A5B]" />
              <h3 className="font-bold text-base text-[#17243A]">
                {adminT.overview.recentMessages}
              </h3>
            </div>
            {unreadMessagesCount > 0 ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                {unreadMessagesCount} {isUz ? 'Yangi' : 'Unread'}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                {isUz ? 'Barchasi o‘qilgan' : 'Inbox Cleared'}
              </span>
            )}
          </div>

          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">{adminT.overview.noMessages}</p>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-[#F8F8F5] border border-slate-200 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#17243A]">{msg.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({msg.email})</span>
                    </div>
                    <p className="text-xs font-semibold text-[#B99A5B]">{msg.subject}</p>
                    <p className="text-xs text-slate-600 line-clamp-1">{msg.message}</p>
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
              className="text-xs font-bold text-[#17243A] hover:text-[#B99A5B] inline-flex items-center gap-1"
            >
              <span>{adminT.overview.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Recent Globe Additions */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#B99A5B]" />
              <h3 className="font-bold text-base text-[#17243A]">
                {adminT.overview.recentGlobe}
              </h3>
            </div>
            <Link
              href="/admin/globe"
              className="text-xs font-bold text-[#17243A] hover:text-[#B99A5B] inline-flex items-center gap-1"
            >
              <span>{adminT.overview.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentGlobe.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                {isUz ? 'Nuqtalar kiritilmagan' : 'No globe locations found.'}
              </p>
            ) : (
              recentGlobe.map((loc) => (
                <div
                  key={loc.id}
                  className="p-3.5 rounded-2xl bg-[#F8F8F5] border border-slate-200 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-[#17243A] block">
                      {isUz && loc.titleUz ? loc.titleUz : loc.title}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
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
