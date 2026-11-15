'use client';

import { useState } from 'react';
import { CheckSquare, Search, Filter, Plus, Calendar, AlertCircle } from 'lucide-react';
import { TaskPreview } from '@/components/dashboard/TaskPreview';

const INITIAL_TASKS = [
  { id: 'task-1', title: 'Initialize Next.js App Router and Tailwind Shell', priority: 'high', status: 'in_progress', project: 'WorkSpace Core' },
  { id: 'task-2', title: 'Configure ThemeProvider for Light and Dark modes', priority: 'medium', status: 'completed', project: 'Design System' },
  { id: 'task-3', title: 'Design PostgreSQL schema for Users, Workspaces, and Tasks', priority: 'urgent', status: 'in_progress', project: 'Auth & DB' },
  { id: 'task-4', title: 'Implement interactive Book 1: JavaScript Foundations in /learn', priority: 'high', status: 'completed', project: 'Learning Book' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filterPriority, setFilterPriority] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Cross-project task management, priority tracking, and execution workflow.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Create Task
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card p-1 text-xs">
          {['all', 'urgent', 'high', 'medium'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`rounded-lg px-3 py-1.5 font-medium capitalize transition-colors ${
                filterPriority === p
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <TaskPreview />
        {filteredTasks.slice(1).map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-blue-500/40 flex items-center justify-between gap-4"
          >
            <div>
              <h4 className="font-medium text-sm text-foreground">{t.title}</h4>
              <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-mono text-blue-500 font-semibold">{t.project}</span>
                <span>•</span>
                <span className="capitalize">{t.priority} priority</span>
                <span>•</span>
                <span className="capitalize">{t.status.replace('_', ' ')}</span>
              </div>
            </div>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">
              {t.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
