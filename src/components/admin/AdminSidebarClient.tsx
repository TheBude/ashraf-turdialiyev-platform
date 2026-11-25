'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  Compass,
  Calendar,
  Award,
  BookOpen,
  Activity,
  Inbox,
  Settings,
  Image as ImageIcon,
  Briefcase,
} from 'lucide-react';
import { useAdminLanguage } from '@/context/AdminLanguageContext';

export default function AdminSidebarClient() {
  const pathname = usePathname();
  const { adminT } = useAdminLanguage();

  const navItems = [
    { href: '/admin', label: adminT.sidebar.overview, icon: LayoutDashboard },
    { href: '/admin/globe', label: adminT.sidebar.globe, icon: Globe, badge: '3D' },
    { href: '/admin/media', label: adminT.sidebar.media, icon: ImageIcon },
    { href: '/admin/travels', label: adminT.sidebar.travels, icon: Compass },
    { href: '/admin/experience', label: adminT.sidebar.experience, icon: Briefcase },
    { href: '/admin/timeline', label: adminT.sidebar.timeline, icon: Calendar },
    { href: '/admin/research', label: adminT.sidebar.research, icon: BookOpen },
    { href: '/admin/certificates', label: adminT.sidebar.certificates, icon: Award },
    { href: '/admin/audience', label: adminT.sidebar.audience, icon: Activity },
    { href: '/admin/messages', label: adminT.sidebar.messages, icon: Inbox },
    { href: '/admin/settings', label: adminT.sidebar.settings, icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname?.startsWith(href);
  };

  return (
    <aside className="w-full md:w-64 bg-white/70 dark:bg-[#101827]/70 backdrop-blur-xl border-r border-slate-200/80 dark:border-white/10 p-4 space-y-1.5 flex-shrink-0 transition-colors duration-300">
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 py-2">
        {adminT.sidebar.modulesHeading}
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition group ${
                active
                  ? 'bg-slate-100 dark:bg-white/10 text-[#101827] dark:text-white font-bold border border-[#B99A5B]/40 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#101827] dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    active ? 'text-[#B99A5B]' : 'text-slate-400 group-hover:text-[#B99A5B]'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#B99A5B]/20 dark:bg-[#B99A5B]/30 text-[#B99A5B] dark:text-[#eedda5]">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
