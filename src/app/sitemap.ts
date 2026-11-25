import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://ashrafturdialiyev.uz').replace(/\/$/, '');
  const locales = ['uz', 'en', 'ru', 'tr'];

  const staticPaths = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: 'about', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'globe', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: 'travels', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'research', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'journey', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: 'experience', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: 'certificates', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: 'audience', priority: 0.75, changeFrequency: 'weekly' as const },
    { path: 'contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const now = new Date();

  // 1. Static Pages across all locales
  const staticEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const item of staticPaths) {
      const url = item.path ? `${baseUrl}/${locale}/${item.path}` : `${baseUrl}/${locale}`;
      staticEntries.push({
        url,
        lastModified: now,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
      });
    }
  }

  // 2. Dynamic Travel Destination Pages from Database
  let destinationEntries: MetadataRoute.Sitemap = [];
  try {
    const destinations = await prisma.destination.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    });

    for (const locale of locales) {
      for (const dest of destinations) {
        destinationEntries.push({
          url: `${baseUrl}/${locale}/travels/${dest.slug}`,
          lastModified: dest.updatedAt || now,
          changeFrequency: 'weekly',
          priority: 0.85,
        });
      }
    }
  } catch (err) {
    console.warn('Sitemap: Failed to query destinations from DB', err);
  }

  return [...staticEntries, ...destinationEntries];
}
