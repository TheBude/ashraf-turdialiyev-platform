import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { validateMagicBytes } from '@/lib/magic-bytes';
import { uploadCategorySchema } from '@/lib/validations';

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const rawCategory = (data.get('category') as string) || 'GENERAL';

    // Validate category
    const catParsed = uploadCategorySchema.safeParse(rawCategory);
    const category = catParsed.success ? catParsed.data : 'GENERAL';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Strict MIME whitelist
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, PDF' },
        { status: 400 }
      );
    }

    // Size limit: 15MB
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be under 15MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    // Magic byte validation — prevents MIME spoofing
    if (!validateMagicBytes(bytes, file.type)) {
      return NextResponse.json(
        { error: 'File content does not match the declared type. Upload rejected.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Sanitize filename
    const ext = path.extname(file.name).toLowerCase() || '.jpg';
    const cleanName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 30);
    const filename = `${cleanName}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}${ext}`;

    // Prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

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
