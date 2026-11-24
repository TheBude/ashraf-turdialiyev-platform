import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const country = await prisma.visitedCountry.findFirst({
      where: { OR: [{ id }, { isoCode: id.toUpperCase() }] },
    });

    if (!country) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    return NextResponse.json(country);
  } catch (error) {
    console.error('Error fetching country:', error);
    return NextResponse.json({ error: 'Failed to fetch country' }, { status: 500 });
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

    const updated = await prisma.visitedCountry.update({
      where: { id },
      data: {
        ...body,
        isoCode: body.isoCode ? body.isoCode.toUpperCase().trim() : undefined,
        visitedYear: body.visitedYear ? Number(body.visitedYear) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating country:', error);
    return NextResponse.json({ error: 'Failed to update country' }, { status: 500 });
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
    await prisma.visitedCountry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Country removed from map' });
  } catch (error) {
    console.error('Error deleting country:', error);
    return NextResponse.json({ error: 'Failed to delete country' }, { status: 500 });
  }
}
