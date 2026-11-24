import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });

    if (!asset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    // Try deleting physical file if stored locally in public/uploads
    if (asset.url.startsWith('/uploads/')) {
      const filename = asset.url.replace('/uploads/', '');
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
      try {
        await unlink(filePath);
      } catch (err) {
        console.warn(`File unlink failed or already removed: ${filePath}`);
      }
    }

    await prisma.mediaAsset.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Media asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting media asset:', error);
    return NextResponse.json({ error: 'Failed to delete media asset' }, { status: 500 });
  }
}
