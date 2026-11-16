import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/store';
import { 
  ArrowLeft, 
  Calendar, 
  CheckSquare, 
  Clock, 
  Users, 
  Sparkles, 
  Plus,
  Layers,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TaskPreview } from '@/components/dashboard/TaskPreview';

const STATUS_BADGES = {
  backlog: 'bg-slate-500/10 text-slate-400',
  todo: 'bg-blue-500/10 text-blue-400',
  in_progress: 'bg-amber-500/10 text-amber-400',
  in_review: 'bg-purple-500/10 text-purple-400',
  completed: 'bg-emerald-500/10 text-emerald-400',
};

const PRIORITY_BADGES = {
  urgent: 'text-red-400 bg-red-500/10 border-red-500/20',
  high: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  medium: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  low: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
};

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;

  const project = await db.getProjectById(projectId);
  if (!project) {
    notFound();
  }

  const tasks = await db.getTasks({ projectId });
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progressPct = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all Projects
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {project.name}
              </h1>
              <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold uppercase text-blue-500">
                {project.status}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/projects/${project.id}/board`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-xs"
            >
              <CheckSquare className="h-4 w-4" />
              Open Kanban Board
            </Link>
          </div>
        </div>
      </div>

      {/* Senior Developer Architecture Note */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Dynamic Route Resolution: <code className="font-mono text-blue-500">/projects/[projectId]</code>
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Resolved in Next.js 15 Server Component via <code className="font-mono text-foreground font-semibold">await params</code>. Relational data linked to <code className="font-mono text-foreground font-semibold">db.getTasks(&#123; projectId: &quot;{project.id}&quot; &#125;)</code>.
            </p>
          </div>
        </div>

        <Link
          href={`/projects/${project.id}/board`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600 shrink-0 self-start md:self-auto"
        >
          View 5-Column Kanban Board
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Project Meta Metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <CheckSquare className="h-3.5 w-3.5 text-blue-500" />
            Task Progress
          </span>
          <p className="mt-1 text-xl font-bold text-foreground">{progressPct}%</p>
          <span className="text-[11px] text-muted-foreground">
            {completedTasks} of {tasks.length} completed
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-amber-500" />
            Target Date
          </span>
          <p className="mt-1 text-xl font-bold text-foreground">{project.deadline}</p>
          <span className="text-[11px] text-muted-foreground">Sprint Target</span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-emerald-500" />
            Team Members
          </span>
          <p className="mt-1 text-xl font-bold text-foreground">{project.members?.length || 3}</p>
          <span className="text-[11px] text-muted-foreground">Active collaborators</span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-purple-500" />
            Identifier
          </span>
          <p className="mt-1 text-xs font-mono font-bold text-foreground truncate">{project.id}</p>
          <span className="text-[11px] text-muted-foreground">Database Primary Key</span>
        </div>
      </div>

      {/* Project Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-primary border-b-2 border-primary pb-3 -mb-3">
              Sprint Tasks ({tasks.length})
            </span>
            <Link 
              href={`/projects/${project.id}/board`}
              className="text-muted-foreground hover:text-foreground pb-3 -mb-3 transition-colors flex items-center gap-1"
            >
              Interactive Kanban Board
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <Link
            href={`/projects/${project.id}/board`}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Switch to Drag-and-Drop View <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Real Task List for this Project */}
        <div className="space-y-3 pt-2">
          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
              No tasks created yet for this project.
            </div>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="rounded-xl border border-border bg-card p-4 shadow-xs hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.medium}`}>
                      {task.priority}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_BADGES[task.status] || STATUS_BADGES.todo}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground">
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {task.dueDate}
                  </span>
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">
                    {task.assignee?.name ? task.assignee.name.slice(0, 2) : 'AN'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
