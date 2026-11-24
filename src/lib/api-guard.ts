import { NextResponse } from 'next/server';
import { getCurrentAdmin } from './auth';

export async function requireAuth() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { error: 'Unauthorized: Administrative access required' },
        { status: 401 }
      ),
    };
  }
  return {
    authorized: true as const,
    user: admin,
  };
}
