import prisma from '@/lib/prisma';

export async function getAdminDashboardData() {
  const [
    destinations,
    countries,
    timeline,
    certificates,
    publications,
    stats,
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

  return {
    destinations,
    countries,
    timeline,
    certificates,
    publications,
    stats,
    messages,
    settings: settingsMap,
  };
}
