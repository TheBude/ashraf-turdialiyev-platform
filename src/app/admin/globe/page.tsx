import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminGlobeManager from '@/components/admin/AdminGlobeManager';

export const dynamic = 'force-dynamic';

export default async function AdminGlobePage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const rawLocations = await prisma.globeLocation.findMany({
    orderBy: [{ order: 'asc' }, { visitDate: 'desc' }],
  });

  const locations = rawLocations.map((l) => ({
    id: l.id,
    title: l.title,
    titleUz: l.titleUz,
    titleRu: l.titleRu,
    titleTr: l.titleTr,
    country: l.country,
    countryCode: l.countryCode,
    city: l.city,
    latitude: l.latitude,
    longitude: l.longitude,
    visitDate: l.visitDate.toISOString(),
    description: l.description,
    descriptionUz: l.descriptionUz,
    descriptionRu: l.descriptionRu,
    descriptionTr: l.descriptionTr,
    story: l.story,
    category: l.category,
    coverImage: l.coverImage,
    photos: l.photos,
    status: l.status,
    featured: l.featured,
  }));

  return <AdminGlobeManager initialLocations={locations} />;
}
