import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';

export async function GET() {
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
      const saved = await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
      updated.push(saved);
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
