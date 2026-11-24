import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const category = (data.get('category') as string) || 'GENERAL';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Strict binary whitelist (disallow raw SVGs to prevent Stored XSS)
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, PDF' },
        { status: 400 }
      );
    }

    // Limit to 15MB
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be under 15MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(file.name).toLowerCase() || '.jpg';
    const cleanName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .slice(0, 30);
    const filename = `${cleanName}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    const url = `/uploads/${filename}`;

    // Index into MediaAsset
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        filename: file.name,
        url,
        mimeType: file.type,
        size: file.size,
        category,
        alt: cleanName.replace(/-/g, ' '),
      },
    });

    return NextResponse.json({
      success: true,
      url,
      assetId: mediaAsset.id,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
