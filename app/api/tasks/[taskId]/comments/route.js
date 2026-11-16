import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET(request, { params }) {
  try {
    const { taskId } = await params;
    const comments = await db.getComments(taskId);
    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { taskId } = await params;
    const { content } = await request.json();
    const comment = await db.addComment(taskId, content);
    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
