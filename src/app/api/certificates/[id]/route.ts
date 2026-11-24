import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { certificateUpdateSchema } from '@/lib/validations';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const certificate = await prisma.certificate.findUnique({ where: { id } });
    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 });
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
    const parsed = certificateUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updated = await prisma.certificate.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.titleUz !== undefined && { titleUz: data.titleUz }),
        ...(data.titleRu !== undefined && { titleRu: data.titleRu }),
        ...(data.titleTr !== undefined && { titleTr: data.titleTr }),
        ...(data.issuer !== undefined && { issuer: data.issuer }),
        ...(data.issueDate !== undefined && { issueDate: data.issueDate ? new Date(data.issueDate) : undefined }),
        ...(data.credentialUrl !== undefined && { credentialUrl: data.credentialUrl }),
        ...(data.credentialId !== undefined && { credentialId: data.credentialId }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.order !== undefined && { order: data.order }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating certificate:', error);
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
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
    await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
