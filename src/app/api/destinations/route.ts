import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const destinations = await prisma.destination.findMany({
      where,
      orderBy: { visitedAt: 'desc' },
    });

    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const {
      title,
      titleUz,
      titleRu,
      titleTr,
      country,
      countryCode,
      city,
      coordinates,
      description,
      descriptionUz,
      descriptionRu,
      descriptionTr,
      story,
      storyUz,
      storyRu,
      storyTr,
      photos,
      status,
      featured,
      visitedAt,
      slug,
    } = body;

    if (!title || !country || !countryCode || !description) {
      return NextResponse.json(
        { error: 'Title, country, country code, and description are required' },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') +
        '-' +
        Date.now().toString().slice(-4);

    const destination = await prisma.destination.create({
      data: {
        title,
        titleUz,
        titleRu,
        titleTr,
        country,
        countryCode: countryCode.toUpperCase(),
        city,
        coordinates,
        description,
        descriptionUz,
        descriptionRu,
        descriptionTr,
        story,
        storyUz,
        storyRu,
        storyTr,
        photos: typeof photos === 'string' ? photos : JSON.stringify(photos || []),
        status: status || 'PUBLISHED',
        featured: Boolean(featured),
        visitedAt: visitedAt ? new Date(visitedAt) : new Date(),
        slug: generatedSlug,
      },
    });

    return NextResponse.json(destination, { status: 201 });
  } catch (error: any) {
    console.error('Error creating destination:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A destination with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}
