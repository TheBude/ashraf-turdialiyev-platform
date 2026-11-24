import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  const [
    destinations,
    countries,
    timelineEvents,
    certificates,
    publications,
    audienceStats,
    messages,
    settings,
  ] = await Promise.all([
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AdminDashboardClient
        initialDestinations={destinations}
        initialCountries={countries}
        initialTimeline={timelineEvents}
        initialCertificates={certificates}
        initialPublications={publications}
        initialStats={audienceStats}
        initialMessages={messages}
        initialSettings={settingsMap}
      />
    </main>
  );
}
