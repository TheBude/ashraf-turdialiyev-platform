import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { getSession } from '@/lib/auth';
import { destinationUpdateSchema } from '@/lib/validations';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    const destination = await prisma.destination.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    if (!session && destination.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Error fetching destination:', error);
    return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 });
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
    const parsed = destinationUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const existing = await prisma.destination.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    const updated = await prisma.destination.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.titleUz !== undefined && { titleUz: data.titleUz }),
        ...(data.titleRu !== undefined && { titleRu: data.titleRu }),
        ...(data.titleTr !== undefined && { titleTr: data.titleTr }),
        ...(data.country !== undefined && { country: data.country }),
        ...(data.countryCode !== undefined && { countryCode: data.countryCode.toUpperCase() }),
        ...(data.city !== undefined && { city: data.city }),
        ...(data.coordinates !== undefined && { coordinates: data.coordinates }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.descriptionUz !== undefined && { descriptionUz: data.descriptionUz }),
        ...(data.descriptionRu !== undefined && { descriptionRu: data.descriptionRu }),
        ...(data.descriptionTr !== undefined && { descriptionTr: data.descriptionTr }),
        ...(data.story !== undefined && { story: data.story }),
        ...(data.storyUz !== undefined && { storyUz: data.storyUz }),
        ...(data.storyRu !== undefined && { storyRu: data.storyRu }),
        ...(data.storyTr !== undefined && { storyTr: data.storyTr }),
        ...(data.photos !== undefined && {
          photos: typeof data.photos === 'string' ? data.photos : JSON.stringify(data.photos),
        }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.visitedAt !== undefined && { visitedAt: data.visitedAt ? new Date(data.visitedAt) : undefined }),
        ...(data.slug ? { slug: data.slug } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating destination:', error);
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
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
    await prisma.destination.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}
