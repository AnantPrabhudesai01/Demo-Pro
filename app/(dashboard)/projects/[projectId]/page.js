import Link from 'next/link';
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
  ArrowUpRight
} from 'lucide-react';
import { TaskPreview } from '@/components/dashboard/TaskPreview';

// Mock project lookup database
const MOCK_PROJECTS = {
  'proj-1': {
    id: 'proj-1',
    name: 'WorkSpace Core SaaS Engine',
    description: 'Next.js 15 full-stack infrastructure, App Router layouts, and theme switching.',
    status: 'active',
    deadline: 'Tomorrow',
    tasksCount: 12,
    completedTasks: 8,
    members: ['Anant (Lead)', 'Jane Doe', 'Sam K.'],
  },
  'proj-2': {
    id: 'proj-2',
    name: 'Design System & UI Primitives',
    description: 'Tailwind CSS component library with accessible buttons, cards, modals, and badges.',
    status: 'completed',
    deadline: 'Nov 20, 2026',
    tasksCount: 6,
    completedTasks: 6,
    members: ['Anant (Lead)', 'Emily M.'],
  },
  'proj-3': {
    id: 'proj-3',
    name: 'Auth & PostgreSQL Integration',
    description: 'Supabase authentication, session cookies, database migrations, and Row-Level Security.',
    status: 'planning',
    deadline: 'Nov 25, 2026',
    tasksCount: 9,
    completedTasks: 2,
    members: ['Anant (Lead)', 'Jane Doe'],
  },
  'proj-4': {
    id: 'proj-4',
    name: 'Interactive Kanban Workflow',
    description: 'Drag-and-drop task boards using dnd-kit with optimistic UI updates and server reconciliation.',
    status: 'active',
    deadline: 'Dec 02, 2026',
    tasksCount: 15,
    completedTasks: 5,
    members: ['Anant (Lead)', 'Sam K.', 'Emily M.'],
  },
};

export default async function ProjectDetailPage({ params }) {
  // In Next.js 15 App Router, params is an asynchronous promise!
  const resolvedParams = await params;
  const { projectId } = resolvedParams;

  const project = MOCK_PROJECTS[projectId] || {
    id: projectId,
    name: `Project ${projectId}`,
    description: 'Custom dynamically resolved project workspace.',
    status: 'active',
    deadline: 'Ongoing',
    tasksCount: 4,
    completedTasks: 1,
    members: ['Anant (Owner)'],
  };

  const progressPct = Math.round((project.completedTasks / project.tasksCount) * 100);

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

          <button className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* Educational Banner: How dynamic routes work */}
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-500 font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Dynamic Route Resolution: <code className="font-mono text-indigo-500">/projects/[projectId]</code>
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Next.js extracts the folder name <code className="font-mono text-foreground font-semibold">[projectId]</code> and injects it into <code className="font-mono text-foreground font-semibold">params.projectId = &quot;{projectId}&quot;</code>.
            </p>
          </div>
        </div>

        <Link
          href="/learn/nextjs-fundamentals/app-router-navigation/dynamic-routes-and-layouts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-600 shrink-0 self-start md:self-auto"
        >
          Read Lesson on Dynamic Routes
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
            {project.completedTasks} of {project.tasksCount} done
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-amber-500" />
            Target Date
          </span>
          <p className="mt-1 text-xl font-bold text-foreground">{project.deadline}</p>
          <span className="text-[11px] text-muted-foreground">Sprint Milestone</span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-emerald-500" />
            Team Members
          </span>
          <p className="mt-1 text-xl font-bold text-foreground">{project.members.length}</p>
          <span className="text-[11px] text-muted-foreground">Active assignees</span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-purple-500" />
            Identifier
          </span>
          <p className="mt-1 text-xs font-mono font-bold text-foreground truncate">{projectId}</p>
          <span className="text-[11px] text-muted-foreground">URL route parameter</span>
        </div>
      </div>

      {/* Project Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button className="text-blue-500 border-b-2 border-blue-500 pb-3 -mb-3">
              Sprint Tasks ({project.tasksCount})
            </button>
            <button className="text-muted-foreground hover:text-foreground pb-3 -mb-3">
              Kanban Board (Module 5)
            </button>
            <button className="text-muted-foreground hover:text-foreground pb-3 -mb-3">
              Settings
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Live Task Preview inside Project Details */}
          <TaskPreview />
        </div>
      </div>
    </div>
  );
}
