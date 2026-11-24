import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const location = await prisma.globeLocation.findUnique({ where: { id } });
    if (!location) {
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

    if (body.latitude !== undefined) {
      const lat = Number(body.latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        return NextResponse.json({ error: 'Latitude must be between -90 and 90' }, { status: 400 });
      }
      body.latitude = lat;
    }

    if (body.longitude !== undefined) {
      const lng = Number(body.longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        return NextResponse.json({ error: 'Longitude must be between -180 and 180' }, { status: 400 });
      }
      body.longitude = lng;
    }

    const updated = await prisma.globeLocation.update({
      where: { id },
      data: {
        ...body,
        photos: body.photos !== undefined
          ? typeof body.photos === 'string'
            ? body.photos
            : JSON.stringify(body.photos)
          : undefined,
        visitDate: body.visitDate ? new Date(body.visitDate) : undefined,
        order: body.order !== undefined ? Number(body.order) : undefined,
        featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
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
