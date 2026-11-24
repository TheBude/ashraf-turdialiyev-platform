import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { audienceStatSchema } from '@/lib/validations';
import { z } from 'zod';

const audienceBatchSchema = z.object({
  stats: z.array(audienceStatSchema),
});

export async function GET() {
  try {
    const stats = await prisma.audienceStat.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching audience stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parsed = audienceBatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map(e => e.message).join(', ') },
        { status: 400 }
      );
    }

    const { stats } = parsed.data;

    const updatedStats = [];
    for (const item of stats) {
      if (!item.key) continue;

      const updated = await prisma.audienceStat.upsert({
        where: { key: item.key },
        update: {
          value: item.value !== undefined ? Number(item.value) : undefined,
          label: item.label,
          labelUz: item.labelUz,
          labelRu: item.labelRu,
          labelTr: item.labelTr,
          prefix: item.prefix,
          suffix: item.suffix,
          isSimulated: item.isSimulated !== undefined ? Boolean(item.isSimulated) : undefined,
          incrementRate: item.incrementRate !== undefined ? Number(item.incrementRate) : undefined,
          order: item.order !== undefined ? Number(item.order) : undefined,
        },
        create: {
          key: item.key,
          label: item.label || item.key,
          labelUz: item.labelUz,
          labelRu: item.labelRu,
          labelTr: item.labelTr,
          value: Number(item.value || 0),
          prefix: item.prefix || '',
          suffix: item.suffix || '',
          isSimulated: Boolean(item.isSimulated),
          incrementRate: Number(item.incrementRate || 0.1),
          order: Number(item.order || 0),
        },
      });
      updatedStats.push(updated);
    }

    return NextResponse.json(updatedStats);
  } catch (error) {
    console.error('Error updating audience stats:', error);
    return NextResponse.json({ error: 'Failed to update audience stats' }, { status: 500 });
  }
}
