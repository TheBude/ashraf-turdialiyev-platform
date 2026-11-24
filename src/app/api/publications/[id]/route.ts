import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { publicationUpdateSchema } from '@/lib/validations';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const publication = await prisma.publication.findUnique({ where: { id } });
    if (!publication) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json(publication);
  } catch (error) {
    console.error('Error fetching publication:', error);
    return NextResponse.json({ error: 'Failed to fetch publication' }, { status: 500 });
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
    const parsed = publicationUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updated = await prisma.publication.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.titleUz !== undefined && { titleUz: data.titleUz }),
        ...(data.titleRu !== undefined && { titleRu: data.titleRu }),
        ...(data.titleTr !== undefined && { titleTr: data.titleTr }),
        ...(data.authors !== undefined && { authors: data.authors }),
        ...(data.journal !== undefined && { journal: data.journal }),
        ...(data.year !== undefined && { year: data.year }),
        ...(data.doi !== undefined && { doi: data.doi }),
        ...(data.link !== undefined && { link: data.link }),
        ...(data.pdfUrl !== undefined && { pdfUrl: data.pdfUrl }),
        ...(data.abstract !== undefined && { abstract: data.abstract }),
        ...(data.abstractUz !== undefined && { abstractUz: data.abstractUz }),
        ...(data.abstractRu !== undefined && { abstractRu: data.abstractRu }),
        ...(data.abstractTr !== undefined && { abstractTr: data.abstractTr }),
        ...(data.tags !== undefined && {
          tags: typeof data.tags === 'string' ? data.tags : JSON.stringify(data.tags),
        }),
        ...(data.citations !== undefined && { citations: data.citations }),
        ...(data.featured !== undefined && { featured: data.featured }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating publication:', error);
    return NextResponse.json({ error: 'Failed to update publication' }, { status: 500 });
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
    await prisma.publication.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json({ error: 'Failed to delete publication' }, { status: 500 });
  }
}
