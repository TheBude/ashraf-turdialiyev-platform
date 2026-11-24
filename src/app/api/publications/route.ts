import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { publicationCreateSchema, publicationUpdateSchema } from '@/lib/validations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};
    if (featured === 'true') where.featured = true;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { titleUz: { contains: search } },
        { titleRu: { contains: search } },
        { authors: { contains: search } },
        { journal: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const publications = await prisma.publication.findMany({
      where,
      orderBy: { year: 'desc' },
    });

    return NextResponse.json(publications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json({ error: 'Failed to fetch publications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parsed = publicationCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const publication = await prisma.publication.create({
      data: {
        title: data.title,
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        titleTr: data.titleTr,
        authors: data.authors,
        journal: data.journal,
        year: data.year,
        doi: data.doi,
        link: data.link,
        pdfUrl: data.pdfUrl,
        abstract: data.abstract,
        abstractUz: data.abstractUz,
        abstractRu: data.abstractRu,
        abstractTr: data.abstractTr,
        tags: typeof data.tags === 'string' ? data.tags : JSON.stringify(data.tags || []),
        citations: data.citations,
        featured: data.featured,
      },
    });

    return NextResponse.json(publication, { status: 201 });
  } catch (error) {
    console.error('Error creating publication:', error);
    return NextResponse.json({ error: 'Failed to create publication' }, { status: 500 });
  }
}
