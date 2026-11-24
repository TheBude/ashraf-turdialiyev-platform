import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
  Globe,
  Compass,
  Calendar,
  Award,
  BookOpen,
  Activity,
  Inbox,
  Settings,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const [
    globeCount,
    destinationsCount,
    mediaCount,
    timelineCount,
    publicationsCount,
    certificatesCount,
    unreadMessagesCount,
    recentMessages,
    recentGlobe,
  ] = await Promise.all([
    prisma.globeLocation.count(),
    prisma.destination.count(),
    prisma.mediaAsset.count(),
    prisma.timelineEvent.count(),
    prisma.publication.count(),
    prisma.certificate.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.globeLocation.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const cards = [
    {
      title: '3D Globe Locations',
      count: globeCount,
      desc: 'Interactive Earth pins',
      href: '/admin/globe',
      icon: Globe,
      color: 'text-[#B99A5B]',
      badge: '3D Raycaster',
    },
    {
      title: 'Media Assets',
      count: mediaCount,
      desc: 'Indexed imagery & files',
      href: '/admin/media',
      icon: ImageIcon,
      color: 'text-blue-600',
      badge: 'Dropzone',
    },
    {
      title: 'Curated Expeditions',
      count: destinationsCount,
      desc: 'Published travel stories',
      href: '/admin/travels',
      icon: Compass,
      color: 'text-emerald-600',
    },
    {
      title: 'Timeline Milestones',
      count: timelineCount,
      desc: 'Chronological events',
      href: '/admin/timeline',
      icon: Calendar,
      color: 'text-purple-600',
    },
    {
      title: 'Scientific Papers',
      count: publicationsCount,
      desc: 'Peer-reviewed articles',
      href: '/admin/research',
      icon: BookOpen,
      color: 'text-amber-600',
    },
    {
      title: 'Certificates Vault',
      count: certificatesCount,
      desc: 'Accreditations & diplomas',
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
            <span>Executive Operating System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {admin.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Manage 3D Earth geographical coordinates, centralized media assets, international travel chronicles, and scientific publications.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/admin/globe"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#eedda5] text-[#17243A] font-bold text-xs tracking-wide hover:bg-white transition shadow-sm"
            >
              <Globe className="w-4 h-4 text-[#17243A]" />
              <span>Launch 3D Globe Manager</span>
            </Link>

            <Link
              href="/admin/media"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wide transition border border-white/10"
            >
              <ImageIcon className="w-4 h-4 text-[#eedda5]" />
              <span>Upload Media</span>
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
                <span className="font-semibold">Manage records</span>
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
                Recent Inbound Messages
              </h3>
            </div>
            {unreadMessagesCount > 0 ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                {unreadMessagesCount} Unread
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                Inbox Cleared
              </span>
            )}
          </div>

          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No messages received yet.</p>
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
              <span>View all messages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Latest 3D Globe Pins */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#B99A5B]" />
              <h3 className="font-bold text-base text-[#17243A]">
                Latest Globe Locations
              </h3>
            </div>
            <Link
              href="/admin/globe"
              className="text-xs font-bold text-[#17243A] hover:text-[#B99A5B]"
            >
              Open 3D Editor →
            </Link>
          </div>

          <div className="space-y-3">
            {recentGlobe.map((loc) => (
              <div
                key={loc.id}
                className="p-3 rounded-2xl bg-[#F8F8F5] border border-slate-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  {loc.coverImage ? (
                    <img
                      src={loc.coverImage}
                      alt={loc.title}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                      📍
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-[#17243A] truncate max-w-[160px]">
                      {loc.title}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {loc.country} • <span className="font-mono">{loc.latitude.toFixed(1)}°, {loc.longitude.toFixed(1)}°</span>
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#EAF1F8] text-[#17243A]">
                  {loc.category}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <div>
              <span className="font-bold block">Prisma DB & API Guards Verified</span>
              <span className="text-[11px] text-emerald-700">Authenticated Admin Session Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
