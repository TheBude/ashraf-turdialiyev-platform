import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminOverviewClient from '@/components/admin/AdminOverviewClient';

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

  return (
    <AdminOverviewClient
      admin={{ name: admin.name, email: admin.email }}
      globeCount={globeCount}
      destinationsCount={destinationsCount}
      mediaCount={mediaCount}
      timelineCount={timelineCount}
      publicationsCount={publicationsCount}
      certificatesCount={certificatesCount}
      unreadMessagesCount={unreadMessagesCount}
      recentMessages={recentMessages}
      recentGlobe={recentGlobe}
    />
  );
}
