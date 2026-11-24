import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { getSession } from '@/lib/auth';
import { destinationCreateSchema, destinationUpdateSchema } from '@/lib/validations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');

    const session = await getSession();

    const where: Record<string, unknown> = {};
    if (status) {
      where.status = status;
    } else if (!session) {
      where.status = 'PUBLISHED';
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
    const parsed = destinationCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const generatedSlug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') +
        '-' +
        Date.now().toString().slice(-4);

    const destination = await prisma.destination.create({
      data: {
        title: data.title,
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        titleTr: data.titleTr,
        country: data.country,
        countryCode: data.countryCode.toUpperCase(),
        city: data.city,
        coordinates: data.coordinates,
        description: data.description,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        descriptionTr: data.descriptionTr,
        story: data.story,
        storyUz: data.storyUz,
        storyRu: data.storyRu,
        storyTr: data.storyTr,
        photos: typeof data.photos === 'string' ? data.photos : JSON.stringify(data.photos || []),
        status: data.status,
        featured: data.featured,
        visitedAt: data.visitedAt ? new Date(data.visitedAt) : new Date(),
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
