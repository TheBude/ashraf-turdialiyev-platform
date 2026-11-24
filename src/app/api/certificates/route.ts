import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { certificateCreateSchema, certificateUpdateSchema } from '@/lib/validations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};
    if (category && category !== 'ALL') where.category = category.toUpperCase();
    if (featured === 'true') where.featured = true;

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
    const parsed = certificateCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const certificate = await prisma.certificate.create({
      data: {
        title: data.title,
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        titleTr: data.titleTr,
        issuer: data.issuer,
        issueDate: data.issueDate ? new Date(data.issueDate) : new Date(),
        credentialUrl: data.credentialUrl,
        credentialId: data.credentialId,
        imageUrl: data.imageUrl,
        category: data.category,
        featured: data.featured,
        order: data.order,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}
