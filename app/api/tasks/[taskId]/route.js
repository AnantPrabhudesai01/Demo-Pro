import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET(request, { params }) {
  try {
    const { taskId } = await params;
    const task = await db.getTaskById(taskId);

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ task });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { taskId } = await params;
    const updates = await request.json();
    const updated = await db.updateTask(taskId, updates);
    return NextResponse.json({ success: true, task: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { taskId } = await params;
    const result = await db.deleteTask(taskId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
