import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { validateMagicBytes } from '@/lib/magic-bytes';
import { uploadCategorySchema } from '@/lib/validations';

export async function GET(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('q');

    const where: any = {};
    if (category && category !== 'ALL') where.category = category.toUpperCase();
    if (search) {
      where.OR = [
        { filename: { contains: search } },
        { alt: { contains: search } },
      ];
    }

    const assets = await prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching media assets:', error);
    return NextResponse.json({ error: 'Failed to fetch media assets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const rawCategory = (formData.get('category') as string) || 'GENERAL';
    const catParsed = uploadCategorySchema.safeParse(rawCategory);
    const category = catParsed.success ? catParsed.data : 'GENERAL';

    if (!files || files.length === 0) {
      // Check for single 'file' fallback
      const singleFile = formData.get('file') as File;
      if (singleFile) files.push(singleFile);
    }

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Safe binary MIME types whitelist (strictly reject raw SVGs or scripts)
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    const results = [];

    for (const file of files) {
      if (!validMimes.includes(file.type)) {
        continue; // skip unsafe files
      }

      if (file.size > 15 * 1024 * 1024) {
        continue; // skip files exceeding 15MB
      }

      const bytes = await file.arrayBuffer();

      // Magic byte validation to prevent MIME spoofing
      if (!validateMagicBytes(bytes, file.type)) {
        continue; // skip spoofed files
      }

      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name).toLowerCase() || '.jpg';
      const cleanBase = path
        .basename(file.name, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .slice(0, 30);
      const uniqueName = `${cleanBase}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}${ext}`;
      const filePath = path.join(uploadsDir, uniqueName);

      await writeFile(filePath, buffer);
      const url = `/uploads/${uniqueName}`;

      const asset = await prisma.mediaAsset.create({
        data: {
          filename: file.name,
          url,
          mimeType: file.type,
          size: file.size,
          category,
          alt: cleanBase.replace(/-/g, ' '),
        },
      });

      results.push(asset);
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      assets: results,
    }, { status: 201 });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Failed to upload media files' }, { status: 500 });
  }
}
