import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { getSession } from '@/lib/auth';
import { globeLocationCreateSchema, globeLocationUpdateSchema } from '@/lib/validations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    // Check if request is authenticated
    const session = await getSession();

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    } else if (!session) {
      // Public visitors only see PUBLISHED content
      where.status = 'PUBLISHED';
    }

    if (category && category !== 'ALL') where.category = category.toUpperCase();
    if (featured === 'true') where.featured = true;

    const locations = await prisma.globeLocation.findMany({
      where,
      orderBy: [{ order: 'asc' }, { visitDate: 'desc' }],
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching globe locations:', error);
    return NextResponse.json({ error: 'Failed to fetch globe locations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parsed = globeLocationCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const location = await prisma.globeLocation.create({
      data: {
        title: data.title,
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        titleTr: data.titleTr,
        country: data.country,
        countryCode: data.countryCode.toUpperCase(),
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        visitDate: data.visitDate ? new Date(data.visitDate) : new Date(),
        description: data.description,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        descriptionTr: data.descriptionTr,
        story: data.story,
        storyUz: data.storyUz,
        storyRu: data.storyRu,
        storyTr: data.storyTr,
        category: data.category,
        coverImage: data.coverImage,
        photos: typeof data.photos === 'string' ? data.photos : JSON.stringify(data.photos || []),
        status: data.status,
        featured: data.featured,
        order: data.order,
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    console.error('Error creating globe location:', error);
    return NextResponse.json({ error: 'Failed to create globe location' }, { status: 500 });
  }
}
