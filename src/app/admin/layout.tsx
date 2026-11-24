import React from 'react';
import Link from 'next/link';
import { getCurrentAdmin } from '@/lib/auth';
import {
  ExternalLink,
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
} from 'lucide-react';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  const navItems = [
    { href: '/admin', label: 'Executive Overview', icon: LayoutDashboard },
    { href: '/admin/globe', label: '3D Earth Globe', icon: Globe, badge: '3D' },
    { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
    { href: '/admin/travels', label: 'Expeditions', icon: Compass },
    { href: '/admin/timeline', label: 'Milestones', icon: Calendar },
    { href: '/admin/research', label: 'Publications', icon: BookOpen },
    { href: '/admin/certificates', label: 'Certificates', icon: Award },
    { href: '/admin/audience', label: 'Telemetry', icon: Activity },
    { href: '/admin/messages', label: 'Inbound Inbox', icon: Inbox },
    { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#17243A] flex flex-col font-sans">
      {/* Top Header */}
      {admin && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#17243A] flex items-center justify-center font-serif text-sm font-bold text-[#eedda5] shadow-sm">
                AT
              </div>
              <div>
                <span className="font-bold text-[#17243A] text-sm block leading-none">
                  Ashraf Turdialiyev CMS
                </span>
                <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                  Executive Operations
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#17243A] font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>Live Site</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{admin.name}</span>
            </div>

            <AdminLogoutButton />
          </div>
        </header>
      )}

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        {admin && (
          <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1.5 flex-shrink-0 shadow-subtle">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 py-2">
              Management Modules
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#17243A] hover:bg-[#EAF1F8] transition group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#B99A5B] transition-colors" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#eedda5]/60 text-[#17243A]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Dynamic Content Pane */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
