'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Calendar, 
  CheckSquare, 
  Users, 
  ArrowUpRight, 
  Filter,
  Sparkles,
  BookOpen
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'WorkSpace Core SaaS Engine',
    description: 'Next.js 15 full-stack infrastructure, App Router layouts, and theme switching.',
    status: 'active',
    deadline: 'Tomorrow',
    tasksCount: 12,
    completedTasks: 8,
    members: ['AN', 'JD', 'SK'],
    color: 'bg-blue-600',
  },
  {
    id: 'proj-2',
    name: 'Design System & UI Primitives',
    description: 'Tailwind CSS component library with accessible buttons, cards, modals, and badges.',
    status: 'completed',
    deadline: 'Nov 20, 2026',
    tasksCount: 6,
    completedTasks: 6,
    members: ['AN', 'EM'],
    color: 'bg-emerald-600',
  },
  {
    id: 'proj-3',
    name: 'Auth & PostgreSQL Integration',
    description: 'Supabase authentication, session cookies, database migrations, and Row-Level Security.',
    status: 'planning',
    deadline: 'Nov 25, 2026',
    tasksCount: 9,
    completedTasks: 2,
    members: ['AN', 'JD'],
    color: 'bg-purple-600',
  },
  {
    id: 'proj-4',
    name: 'Interactive Kanban Workflow',
    description: 'Drag-and-drop task boards using dnd-kit with optimistic UI updates and server reconciliation.',
    status: 'active',
    deadline: 'Dec 02, 2026',
    tasksCount: 15,
    completedTasks: 5,
    members: ['AN', 'SK', 'EM'],
    color: 'bg-amber-600',
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  // Declarative filtering using JavaScript array filter() and includes()
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    // Immutability in action: append brand-new project reference to array state
    const newProject = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || 'No description provided.',
      status: 'active',
      deadline: 'Next Week',
      tasksCount: 0,
      completedTasks: 0,
      members: ['AN'],
      color: 'bg-indigo-600',
    };

    setProjects((prev) => [newProject, ...prev]);
    setNewProjectName('');
    setNewProjectDesc('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Projects
            </h1>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-500">
              {filteredProjects.length} total
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your workspace initiatives, track sprint goals, and review progress.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Create New Project
        </button>
      </div>

      {/* Educational Banner connecting to Next.js App Router */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Next.js Routing Architecture: Why this page is rendered
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              When you navigate to <code className="font-mono text-blue-500 font-semibold">/projects</code>, Next.js matches the file <code className="font-mono text-foreground font-semibold">app/(dashboard)/projects/page.js</code> inside the <code className="font-mono text-foreground font-semibold">(dashboard)</code> route group.
            </p>
          </div>
        </div>

        <Link
          href="/learn/nextjs-fundamentals/app-router-navigation/dynamic-routes-and-layouts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600 shrink-0 self-start md:self-auto"
        >
          Study App Router Book
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title or description..."
            className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card p-1 text-xs">
          {['all', 'active', 'planning', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 font-medium capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
          <Briefcase className="h-8 w-8 text-muted-foreground mx-auto" />
          <h3 className="text-sm font-semibold text-foreground">No projects found</h3>
          <p className="text-xs text-muted-foreground">
            No projects matched your search criteria. Try a different query or reset filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
          {filteredProjects.map((project) => {
            const progressPct = project.tasksCount === 0 ? 0 : Math.round((project.completedTasks / project.tasksCount) * 100);
            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl ${project.color} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
                        {project.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base text-foreground group-hover:text-blue-500 transition-colors">
                          {project.name}
                        </h3>
                        <span className="inline-block mt-0.5 text-xs text-muted-foreground">
                          Due {project.deadline}
                        </span>
                      </div>
                    </div>

                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      project.status === 'completed' 
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : project.status === 'active'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-purple-500/10 text-purple-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="mt-3.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border space-y-3">
                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                      <span className="flex items-center gap-1.5 font-medium">
                        <CheckSquare className="h-3.5 w-3.5 text-blue-500" />
                        {project.completedTasks}/{project.tasksCount} Tasks
                      </span>
                      <span className="font-semibold text-foreground">{progressPct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          progressPct === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer with members and dynamic link */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center -space-x-1.5">
                      {project.members.map((member, i) => (
                        <div
                          key={i}
                          className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-bold text-foreground"
                        >
                          {member}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600"
                    >
                      Open Project
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Creating Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="rounded-2xl border border-border bg-card p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Create New Project</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Mobile App Redesign"
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Briefly describe what this project will deliver..."
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 font-medium text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 shadow-sm"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
