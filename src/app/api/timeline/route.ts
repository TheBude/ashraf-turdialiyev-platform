import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category.toUpperCase();
    }

    const events = await prisma.timelineEvent.findMany({
      where,
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching timeline events:', error);
    return NextResponse.json({ error: 'Failed to fetch timeline events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const {
      year,
      date,
      title,
      titleUz,
      titleRu,
      titleTr,
      category,
      description,
      descriptionUz,
      descriptionRu,
      descriptionTr,
      location,
      mediaUrl,
      order,
    } = body;

    if (!year || !date || !title || !description) {
      return NextResponse.json(
        { error: 'Year, date, title, and description are required' },
        { status: 400 }
      );
    }

    const event = await prisma.timelineEvent.create({
      data: {
        year: Number(year),
        date,
        title,
        titleUz,
        titleRu,
        titleTr,
        category: category || 'ACHIEVEMENT',
        description,
        descriptionUz,
        descriptionRu,
        descriptionTr,
        location,
        mediaUrl,
        order: order ? Number(order) : 0,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating timeline event:', error);
    return NextResponse.json({ error: 'Failed to create timeline event' }, { status: 500 });
  }
}
