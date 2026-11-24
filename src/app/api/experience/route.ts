import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { experienceCreateSchema } from '@/lib/validations';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parsed = experienceCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const experience = await prisma.experience.create({
      data: {
        period: data.period,
        role: data.role,
        roleUz: data.roleUz,
        roleRu: data.roleRu,
        roleTr: data.roleTr,
        organization: data.organization,
        location: data.location,
        description: data.description,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        descriptionTr: data.descriptionTr,
        type: data.type,
        order: data.order,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
