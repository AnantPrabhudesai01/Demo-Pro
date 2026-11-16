import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/store';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import { ArrowLeft, Sparkles, Layers, CheckSquare, Calendar, Users, LayoutDashboard } from 'lucide-react';

export default async function ProjectBoardPage({ params }) {
  const { projectId } = await params;
  const project = db.getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const tasks = db.getTasks({ projectId });
  const allProjects = db.getProjects();
  const members = db.getUsers();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link 
              href="/projects" 
              className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Projects
            </Link>
            <span>/</span>
            <Link 
              href={`/projects/${project.id}`}
              className="hover:text-foreground transition-colors"
            >
              {project.name}
            </Link>
            <span>/</span>
            <span className="font-semibold text-primary">Kanban Board</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {project.name}
            </h1>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 capitalize">
              {project.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            Overview
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-xs">
            <CheckSquare className="h-3.5 w-3.5" />
            Board View
          </div>
        </div>
      </div>

      {/* Project Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/60 p-3.5 text-xs">
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-foreground" />
            <span>Target Deadline: <strong className="text-foreground">{project.deadline}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-3.5 w-3.5 text-foreground" />
            <span>Tasks: <strong className="text-foreground">{tasks.length} total</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-foreground" />
            <span>Assigned Team: <strong className="text-foreground">{project.members?.length || 3} members</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-muted-foreground">Senior Dev Note:</span>
          <span className="text-[11px] text-primary">Drag cards between columns or tap arrows for instant optimistic sync.</span>
        </div>
      </div>

      {/* 5-Column Interactive Kanban Board */}
      <KanbanBoard
        initialTasks={tasks}
        projectId={project.id}
        projects={allProjects}
        members={members}
      />
    </div>
  );
}
