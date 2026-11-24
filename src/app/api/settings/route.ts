import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

// Settings GET requires authentication — prevents leaking internal configuration
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const settings = await prisma.siteSetting.findMany();
    const formatted: Record<string, string> = {};
    settings.forEach((s) => {
      formatted[s.key] = s.value;
    });
    return NextResponse.json({ raw: settings, map: formatted });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Settings object required' },
        { status: 400 }
      );
    }

    const updated = [];
    for (const [key, value] of Object.entries(settings)) {
      if (typeof key !== 'string' || key.length > 100) continue;
      const saved = await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value).slice(0, 10000) },
        create: { key, value: String(value).slice(0, 10000) },
      });
      updated.push(saved);
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
