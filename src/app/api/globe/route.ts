import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (status) where.status = status;
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
    const {
      title,
      titleUz,
      titleRu,
      titleTr,
      country,
      countryCode,
      city,
      latitude,
      longitude,
      visitDate,
      description,
      descriptionUz,
      descriptionRu,
      descriptionTr,
      story,
      storyUz,
      storyRu,
      storyTr,
      category,
      coverImage,
      photos,
      status,
      featured,
      order,
    } = body;

    // Validate required fields
    if (!title || !country || latitude === undefined || longitude === undefined || !description) {
      return NextResponse.json(
        { error: 'Title, country, latitude, longitude, and description are required' },
        { status: 400 }
      );
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    // Validate coordinate ranges
    if (isNaN(lat) || lat < -90 || lat > 90) {
      return NextResponse.json(
        { error: 'Latitude must be a valid number between -90 and 90' },
        { status: 400 }
      );
    }

    if (isNaN(lng) || lng < -180 || lng > 180) {
      return NextResponse.json(
        { error: 'Longitude must be a valid number between -180 and 180' },
        { status: 400 }
      );
    }

    const location = await prisma.globeLocation.create({
      data: {
        title,
        titleUz,
        titleRu,
        titleTr,
        country,
        countryCode: (countryCode || 'XX').toUpperCase(),
        city,
        latitude: lat,
        longitude: lng,
        visitDate: visitDate ? new Date(visitDate) : new Date(),
        description,
        descriptionUz,
        descriptionRu,
        descriptionTr,
        story,
        storyUz,
        storyRu,
        storyTr,
        category: category || 'EXPEDITION',
        coverImage,
        photos: typeof photos === 'string' ? photos : JSON.stringify(photos || []),
        status: status || 'PUBLISHED',
        featured: Boolean(featured),
        order: order ? Number(order) : 0,
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    console.error('Error creating globe location:', error);
    return NextResponse.json({ error: 'Failed to create globe location' }, { status: 500 });
  }
}
