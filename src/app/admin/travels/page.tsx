import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminTravelsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/admin/login');

  const [destinations, countries, timeline, certificates, publications, stats, messages, settings] =
    await Promise.all([
      prisma.destination.findMany({ orderBy: { visitedAt: 'desc' } }),
      prisma.visitedCountry.findMany({ orderBy: { visitedYear: 'desc' } }),
      prisma.timelineEvent.findMany({ orderBy: [{ year: 'desc' }, { order: 'asc' }] }),
      prisma.certificate.findMany({ orderBy: [{ order: 'asc' }, { issueDate: 'desc' }] }),
      prisma.publication.findMany({ orderBy: { year: 'desc' } }),
      prisma.audienceStat.findMany({ orderBy: { order: 'asc' } }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.siteSetting.findMany(),
    ]);

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <AdminDashboardClient
      initialDestinations={destinations}
      initialCountries={countries}
      initialTimeline={timeline}
      initialCertificates={certificates}
      initialPublications={publications}
      initialStats={stats}
      initialMessages={messages}
      initialSettings={settingsMap}
      initialTab="destinations"
    />
  );
}
