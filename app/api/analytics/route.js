import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET() {
  try {
    const analytics = await db.getAnalytics();
    return NextResponse.json({ analytics });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
