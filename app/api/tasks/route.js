import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId') || null;
    const status = searchParams.get('status') || 'all';
    const priority = searchParams.get('priority') || 'all';
    const search = searchParams.get('search') || '';

    const tasks = await db.getTasks({ projectId, status, priority, search });
    return NextResponse.json({ tasks, count: tasks.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newTask = await db.createTask(body);
    return NextResponse.json({ success: true, task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
