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
      <div className="min-h-screen bg-[#F4F5F7] text-[#17243A] flex flex-col font-sans">
        {/* Top Header with Dual Language Toggle (Uz / En) */}
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
