import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const user = await db.register({ name, email, password });

    const response = NextResponse.json({
      success: true,
      user,
      message: 'Account created successfully.',
    });

    response.cookies.set({
      name: 'workspace_session',
      value: JSON.stringify({ userId: user.id, email: user.email }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Registration failed.' },
      { status: 400 }
    );
  }
}
