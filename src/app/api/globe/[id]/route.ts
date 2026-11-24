import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { getSession } from '@/lib/auth';
import { globeLocationUpdateSchema } from '@/lib/validations';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    const location = await prisma.globeLocation.findUnique({ where: { id } });
    if (!location) {
      return NextResponse.json({ error: 'Globe location not found' }, { status: 404 });
    }

    // Non-authenticated users cannot view DRAFT content
    if (!session && location.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Globe location not found' }, { status: 404 });
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error('Error fetching globe location:', error);
    return NextResponse.json({ error: 'Failed to fetch globe location' }, { status: 500 });
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
    const parsed = globeLocationUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updated = await prisma.globeLocation.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.titleUz !== undefined && { titleUz: data.titleUz }),
        ...(data.titleRu !== undefined && { titleRu: data.titleRu }),
        ...(data.titleTr !== undefined && { titleTr: data.titleTr }),
        ...(data.country !== undefined && { country: data.country }),
        ...(data.countryCode !== undefined && { countryCode: data.countryCode.toUpperCase() }),
        ...(data.city !== undefined && { city: data.city }),
        ...(data.latitude !== undefined && { latitude: data.latitude }),
        ...(data.longitude !== undefined && { longitude: data.longitude }),
        ...(data.visitDate !== undefined && { visitDate: data.visitDate ? new Date(data.visitDate) : undefined }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.descriptionUz !== undefined && { descriptionUz: data.descriptionUz }),
        ...(data.descriptionRu !== undefined && { descriptionRu: data.descriptionRu }),
        ...(data.descriptionTr !== undefined && { descriptionTr: data.descriptionTr }),
        ...(data.story !== undefined && { story: data.story }),
        ...(data.storyUz !== undefined && { storyUz: data.storyUz }),
        ...(data.storyRu !== undefined && { storyRu: data.storyRu }),
        ...(data.storyTr !== undefined && { storyTr: data.storyTr }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
        ...(data.photos !== undefined && { photos: typeof data.photos === 'string' ? data.photos : JSON.stringify(data.photos) }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.order !== undefined && { order: data.order }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating globe location:', error);
    return NextResponse.json({ error: 'Failed to update globe location' }, { status: 500 });
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
    await prisma.globeLocation.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Globe location removed' });
  } catch (error) {
    console.error('Error deleting globe location:', error);
    return NextResponse.json({ error: 'Failed to delete globe location' }, { status: 500 });
  }
}
