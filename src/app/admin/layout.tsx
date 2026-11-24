import React from 'react';
import Link from 'next/link';
import { getCurrentAdmin } from '@/lib/auth';
import { Shield, ExternalLink, LogOut, LayoutDashboard, Globe, Compass, Calendar, Award, BookOpen, Activity, Inbox, Settings } from 'lucide-react';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 flex flex-col">
      {/* Top Admin Header Bar */}
      {admin && (
        <header className="sticky top-0 z-40 bg-[#0d1017]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#161b26] border border-[#d4af37]/40 flex items-center justify-center font-serif text-xs font-bold text-[#d4af37]">
                AT
              </div>
              <span className="font-bold text-white text-sm">
                Ashraf Turdialiyev CMS
              </span>
            </Link>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#161b26] border border-slate-700 text-[#eedda5]">
              Executive Mode
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141822] border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Live Site</span>
            </Link>

            <span className="text-slate-400 font-medium">
              {admin.name}
            </span>

            <AdminLogoutButton />
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
