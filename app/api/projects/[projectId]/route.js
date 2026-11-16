import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET(request, { params }) {
  try {
    const { projectId } = await params;
    const project = await db.getProjectById(projectId);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { projectId } = await params;
    const updates = await request.json();
    const updated = await db.updateProject(projectId, updates);
    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { projectId } = await params;
    const result = await db.deleteProject(projectId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
