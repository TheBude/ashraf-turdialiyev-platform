import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (featured === 'true') {
      where.featured = true;
    }
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
    const {
      title,
      titleUz,
      titleRu,
      titleTr,
      authors,
      journal,
      year,
      doi,
      link,
      pdfUrl,
      abstract,
      abstractUz,
      abstractRu,
      abstractTr,
      tags,
      citations,
      featured,
    } = body;

    if (!title || !authors || !journal || !year || !abstract) {
      return NextResponse.json(
        { error: 'Title, authors, journal, year, and abstract are required' },
        { status: 400 }
      );
    }

    const publication = await prisma.publication.create({
      data: {
        title,
        titleUz,
        titleRu,
        titleTr,
        authors,
        journal,
        year: Number(year),
        doi,
        link,
        pdfUrl,
        abstract,
        abstractUz,
        abstractRu,
        abstractTr,
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        citations: citations ? Number(citations) : 0,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(publication, { status: 201 });
  } catch (error) {
    console.error('Error creating publication:', error);
    return NextResponse.json({ error: 'Failed to create publication' }, { status: 500 });
  }
}
