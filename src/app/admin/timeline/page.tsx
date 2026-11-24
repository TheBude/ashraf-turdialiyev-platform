import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { getAdminDashboardData } from '@/lib/admin-data';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminTimelinePage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/admin/login');

  const data = await getAdminDashboardData();

  return (
    <AdminDashboardClient
      initialDestinations={data.destinations}
      initialCountries={data.countries}
      initialTimeline={data.timeline}
      initialCertificates={data.certificates}
      initialPublications={data.publications}
      initialStats={data.stats}
      initialMessages={data.messages}
      initialSettings={data.settings}
      initialTab="timeline"
    />
  );
}
