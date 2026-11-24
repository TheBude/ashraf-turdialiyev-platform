import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminMediaLibrary, { MediaAssetItem } from '@/components/admin/AdminMediaLibrary';

export const dynamic = 'force-dynamic';

export default async function AdminMediaPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const rawAssets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const assets: MediaAssetItem[] = rawAssets.map((a) => ({
    id: a.id,
    filename: a.filename,
    url: a.url,
    mimeType: a.mimeType,
    size: a.size,
    alt: a.alt,
    width: a.width,
    height: a.height,
    category: a.category,
    createdAt: a.createdAt.toISOString(),
  }));

  return <AdminMediaLibrary initialAssets={assets} />;
}
