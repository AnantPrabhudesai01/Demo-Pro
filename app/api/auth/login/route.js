import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await db.authenticate(email, password);

    const response = NextResponse.json({
      success: true,
      user,
      message: 'Successfully authenticated.',
    });

    // Set HTTP-only session cookie
    response.cookies.set({
      name: 'workspace_session',
      value: JSON.stringify({ userId: user.id, email: user.email }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Authentication failed.' },
      { status: 401 }
    );
  }
}
