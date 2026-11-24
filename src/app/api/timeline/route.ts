import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { timelineEventCreateSchema, timelineEventUpdateSchema } from '@/lib/validations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: Record<string, unknown> = {};
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
    const parsed = timelineEventCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const event = await prisma.timelineEvent.create({
      data: {
        year: data.year,
        date: data.date,
        title: data.title,
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        titleTr: data.titleTr,
        category: data.category,
        description: data.description,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        descriptionTr: data.descriptionTr,
        location: data.location,
        mediaUrl: data.mediaUrl,
        order: data.order,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating timeline event:', error);
    return NextResponse.json({ error: 'Failed to create timeline event' }, { status: 500 });
  }
}
