import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { timelineEventUpdateSchema } from '@/lib/validations';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ error: 'Timeline event not found' }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching timeline event:', error);
    return NextResponse.json({ error: 'Failed to fetch timeline event' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = timelineEventUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updated = await prisma.timelineEvent.update({
      where: { id },
      data: {
        ...(data.year !== undefined && { year: data.year }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.title !== undefined && { title: data.title }),
        ...(data.titleUz !== undefined && { titleUz: data.titleUz }),
        ...(data.titleRu !== undefined && { titleRu: data.titleRu }),
        ...(data.titleTr !== undefined && { titleTr: data.titleTr }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.descriptionUz !== undefined && { descriptionUz: data.descriptionUz }),
        ...(data.descriptionRu !== undefined && { descriptionRu: data.descriptionRu }),
        ...(data.descriptionTr !== undefined && { descriptionTr: data.descriptionTr }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.mediaUrl !== undefined && { mediaUrl: data.mediaUrl }),
        ...(data.order !== undefined && { order: data.order }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating timeline event:', error);
    return NextResponse.json({ error: 'Failed to update timeline event' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    await prisma.timelineEvent.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Timeline event deleted successfully' });
  } catch (error) {
    console.error('Error deleting timeline event:', error);
    return NextResponse.json({ error: 'Failed to delete timeline event' }, { status: 500 });
  }
}
