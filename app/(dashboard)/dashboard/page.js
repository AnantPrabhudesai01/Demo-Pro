import Link from 'next/link';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Plus, 
  ArrowUpRight,
  BookOpen,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { TaskPreview } from '@/components/dashboard/TaskPreview';

const STATS = [
  { label: 'Total Projects', value: '4', change: '+1 this week', icon: Briefcase, color: 'text-blue-500' },
  { label: 'Active Tasks', value: '18', change: '4 high priority', icon: Clock, color: 'text-amber-500' },
  { label: 'Completed Tasks', value: '26', change: '+8 yesterday', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Sprint Velocity', value: '94%', change: '+3% vs avg', icon: TrendingUp, color: 'text-indigo-500' },
];

const RECENT_PROJECTS = [
  { id: 'proj-1', name: 'WorkSpace Core SaaS Engine', tasks: 12, completed: 8, deadline: 'Tomorrow', status: 'Active' },
  { id: 'proj-2', name: 'Design System & Primitives', tasks: 6, completed: 6, deadline: 'Nov 20', status: 'Completed' },
  { id: 'proj-3', name: 'Auth & PostgreSQL Integration', tasks: 9, completed: 2, deadline: 'Nov 25', status: 'Planning' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Workspace Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor projects, team velocity, and active sprint deliverables.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4 text-blue-500" />
            Study Concepts in /learn
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-[11px] font-medium text-emerald-500">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Educational Interactive Component */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-transparent p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-500 mb-2">
              <BookOpen className="h-3.5 w-3.5" />
              Lesson 1.1 Live Demonstration
            </div>
            <h3 className="text-base font-bold text-foreground">
              Interactive Task Card: Reactive State & Referential Identity
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click &quot;Complete Task&quot; below. Notice how the status toggles without page refresh because React receives a fresh object reference!
            </p>
          </div>
          <Link
            href="/learn/javascript-foundations/variables-and-data-structures/variables-scope-primitives"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 self-start md:self-auto"
          >
            Read Lesson 1.1 Code Walkthrough
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Live Component from Lesson 1.1 */}
        <TaskPreview />
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Active Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">Active Projects</h3>
            <Link href="/projects" className="text-xs font-medium text-blue-500 hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {RECENT_PROJECTS.map((project) => {
              const progressPct = Math.round((project.completed / project.tasks) * 100);
              return (
                <div
                  key={project.id}
                  className="rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                        {project.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{project.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {project.deadline}
                          </span>
                          <span>•</span>
                          <span>{project.completed}/{project.tasks} tasks</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-foreground">{progressPct}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Educational Sidebar & Recent Activity */}
        <div className="space-y-6">
          {/* Learning Progress Box */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              SaaS Learning Milestone
            </h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              You are currently on <strong>Phase 0: Project &amp; Book Foundation</strong>.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Curriculum Progress</span>
                <span className="font-semibold text-foreground">1 / 120 Lessons</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-blue-600" style={{ width: '1%' }} />
              </div>
            </div>
            <Link
              href="/learn"
              className="mt-4 block w-full text-center rounded-lg bg-muted py-2 text-xs font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Resume Course (/learn)
            </Link>
          </div>

          {/* Quick Concept Tip */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              Senior Developer Tip
            </div>
            <p className="mt-1 text-muted-foreground leading-relaxed">
              Never mutate arrays or objects directly in React state. Always produce a new copy via spread (<code className="font-mono text-foreground font-semibold">{"{ ...prev }"}</code>) or <code className="font-mono text-foreground font-semibold">map()</code> to trigger render reconciliation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
