import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { experienceUpdateSchema } from '@/lib/validations';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({ where: { id } });
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
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
    const parsed = experienceUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        ...(data.period !== undefined && { period: data.period }),
        ...(data.role !== undefined && { role: data.role }),
        ...(data.roleUz !== undefined && { roleUz: data.roleUz }),
        ...(data.roleRu !== undefined && { roleRu: data.roleRu }),
        ...(data.roleTr !== undefined && { roleTr: data.roleTr }),
        ...(data.organization !== undefined && { organization: data.organization }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.descriptionUz !== undefined && { descriptionUz: data.descriptionUz }),
        ...(data.descriptionRu !== undefined && { descriptionRu: data.descriptionRu }),
        ...(data.descriptionTr !== undefined && { descriptionTr: data.descriptionTr }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.order !== undefined && { order: data.order }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
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
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
