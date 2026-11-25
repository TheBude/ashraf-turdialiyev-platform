import React from 'react';
import { getCurrentAdmin } from '@/lib/auth';
import { AdminLanguageProvider } from '@/context/AdminLanguageContext';
import AdminHeaderClient from '@/components/admin/AdminHeaderClient';
import AdminSidebarClient from '@/components/admin/AdminSidebarClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  return (
    <AdminLanguageProvider>
      <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#0B0F19] text-[#101827] dark:text-[#F4F5F7] flex flex-col font-sans transition-colors duration-300 relative">
        {/* Subtle Ambient Aurora Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-40 dark:opacity-20 transition-opacity">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8D9FC5]/30 dark:bg-[#182A42] rounded-full blur-3xl animate-aurora-slow" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#A78BFA]/20 dark:bg-[#A78BFA]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#B99A5B]/15 dark:bg-[#B99A5B]/10 rounded-full blur-3xl" />
        </div>

        {/* Top Header with Dual Language Toggle (Uz / En) & Theme Switcher */}
        {admin && <AdminHeaderClient admin={admin} />}

        {/* Main Container with Sidebar + Content */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Navigation Sidebar */}
          {admin && <AdminSidebarClient />}

          {/* Dynamic Content Pane */}
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminLanguageProvider>
  );
}
