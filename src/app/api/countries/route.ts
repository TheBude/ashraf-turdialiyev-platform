import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { countryCreateSchema, countryUpdateSchema } from '@/lib/validations';

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
    const parsed = countryCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const country = await prisma.visitedCountry.create({
      data: {
        isoCode: data.isoCode.toUpperCase().trim(),
        countryName: data.countryName,
        countryNameUz: data.countryNameUz,
        countryNameRu: data.countryNameRu,
        countryNameTr: data.countryNameTr,
        visitedYear: data.visitedYear,
        notes: data.notes,
        flag: data.flag,
        coordinates: data.coordinates,
        highlightColor: data.highlightColor,
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
