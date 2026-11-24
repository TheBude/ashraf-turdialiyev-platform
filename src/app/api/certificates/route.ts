import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category.toUpperCase();
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const certificates = await prisma.certificate.findMany({
      where,
      orderBy: [{ order: 'asc' }, { issueDate: 'desc' }],
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
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
      issuer,
      issueDate,
      credentialUrl,
      credentialId,
      imageUrl,
      category,
      featured,
      order,
    } = body;

    if (!title || !issuer || !imageUrl) {
      return NextResponse.json(
        { error: 'Title, issuer, and image URL are required' },
        { status: 400 }
      );
    }

    const certificate = await prisma.certificate.create({
      data: {
        title,
        titleUz,
        titleRu,
        titleTr,
        issuer,
        issueDate: issueDate ? new Date(issueDate) : new Date(),
        credentialUrl,
        credentialId,
        imageUrl,
        category: category || 'ACADEMIC',
        featured: featured !== undefined ? Boolean(featured) : true,
        order: order ? Number(order) : 0,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}
