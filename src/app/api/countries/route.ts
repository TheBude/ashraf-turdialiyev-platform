import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET() {
  try {
    const countries = await prisma.visitedCountry.findMany({
      orderBy: { visitedYear: 'desc' },
    });
    return NextResponse.json(countries);
  } catch (error) {
    console.error('Error fetching visited countries:', error);
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const {
      isoCode,
      countryName,
      countryNameUz,
      countryNameRu,
      countryNameTr,
      visitedYear,
      notes,
      flag,
      coordinates,
      highlightColor,
    } = body;

    if (!isoCode || !countryName || !visitedYear) {
      return NextResponse.json(
        { error: 'ISO code, country name, and visited year are required' },
        { status: 400 }
      );
    }

    const country = await prisma.visitedCountry.create({
      data: {
        isoCode: isoCode.toUpperCase().trim(),
        countryName,
        countryNameUz,
        countryNameRu,
        countryNameTr,
        visitedYear: Number(visitedYear),
        notes,
        flag,
        coordinates,
        highlightColor: highlightColor || '#d4af37',
      },
    });

    return NextResponse.json(country, { status: 201 });
  } catch (error: any) {
    console.error('Error adding country:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This country ISO code is already added to the map' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Failed to add country' }, { status: 500 });
  }
}
