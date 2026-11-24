import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-guard';
import { contactMessageSchema } from '@/lib/validations';

export async function GET() {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        subject: data.subject,
        message: data.message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been dispatched successfully.',
        id: newMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Unable to deliver message at this time' },
      { status: 500 }
    );
  }
}
