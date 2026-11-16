'use client';

import { useState, useEffect } from 'react';
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
  BookOpen,
  Trash2,
  Edit2,
  ExternalLink,
  KanbanSquare
} from 'lucide-react';

const COLOR_OPTIONS = [
  'bg-blue-600',
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-purple-600',
  'bg-amber-600',
  'bg-rose-600'
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Create / Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectStatus, setProjectStatus] = useState('active');
  const [projectDeadline, setProjectDeadline] = useState('Next Month');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Fetch projects from live REST API
  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      const projectList = Array.isArray(data) ? data : (data.projects || []);
      setProjects(projectList);
    } catch (err) {
      console.error('Projects fetch error:', err);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Filter projects safely
  const projectList = Array.isArray(projects) ? projects : [];
  const filteredProjects = projectList.filter((project) => {
    const matchesSearch = (project.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (project.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingProject(null);
    setProjectName('');
    setProjectDesc('');
    setProjectStatus('active');
    setProjectDeadline('Next Month');
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setProjectName(proj.name);
    setProjectDesc(proj.description || '');
    setProjectStatus(proj.status || 'active');
    setProjectDeadline(proj.deadline || 'Ongoing');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingProject) {
        // Update existing project
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: projectName.trim(),
            description: projectDesc.trim(),
            status: projectStatus,
            deadline: projectDeadline,
          })
        });
        if (!res.ok) throw new Error('Failed to update project');
        const updatedData = await res.json();
        const updated = updatedData.project || updatedData;
        setProjects(prev => (Array.isArray(prev) ? prev : []).map(p => p.id === updated.id ? updated : p));
        showToast(`Project "${updated.name}" updated successfully!`);
      } else {
        // Create new project
        const randomColor = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)];
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: projectName.trim(),
            description: projectDesc.trim() || 'No description provided.',
            status: projectStatus,
            deadline: projectDeadline,
            color: randomColor,
          })
        });
        if (!res.ok) throw new Error('Failed to create project');
        const createdData = await res.json();
        const created = createdData.project || createdData;
        setProjects(prev => [created, ...(Array.isArray(prev) ? prev : [])]);
        showToast(`Project "${created.name}" created successfully!`);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast('Error saving project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (projId, projName) => {
    if (!confirm(`Are you sure you want to permanently delete "${projName}" and its tasks?`)) return;

    try {
      const res = await fetch(`/api/projects/${projId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      setProjects(prev => prev.filter(p => p.id !== projId));
      showToast(`Deleted "${projName}".`);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-card p-4 text-xs font-semibold text-foreground shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="h-4 w-4 text-primary" />
          {toastMsg}
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Projects
            </h1>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-500 font-mono">
              {filteredProjects.length} active
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your workspace initiatives, track sprint goals, and review progress.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Create New Project
        </button>
      </div>

      {/* Educational Banner connecting to Next.js App Router */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Production Architecture: Client React State + RESTful API + Relational Store
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              This page fetches from <code className="font-mono text-primary font-semibold">GET /api/projects</code> with full CRUD mutations persisting to the database. Each project features its own live 5-column Kanban board.
            </p>
          </div>
        </div>

        <Link
          href="/learn/react-fundamentals/react-hooks-deep-dive/use-state-primitive-deep-dive"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0 self-start md:self-auto"
        >
          Study State & Mutations in Book
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
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-56 rounded-2xl border border-border bg-card/50 p-6 space-y-4">
              <div className="h-6 w-1/3 bg-muted rounded-md" />
              <div className="h-4 w-2/3 bg-muted rounded-md" />
              <div className="h-12 w-full bg-muted/60 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
          <Briefcase className="h-8 w-8 text-muted-foreground mx-auto" />
          <h3 className="text-sm font-semibold text-foreground">No projects found</h3>
          <p className="text-xs text-muted-foreground">
            No projects matched your search criteria. Try a different query or create a new project.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
          {filteredProjects.map((project) => {
            const tasksCount = project.tasksCount || 0;
            const completedTasks = project.completedTasks || 0;
            const progressPct = tasksCount === 0 ? 0 : Math.round((completedTasks / tasksCount) * 100);

            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl ${project.color || 'bg-blue-600'} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                        {project.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <span className="inline-block mt-0.5 text-xs text-muted-foreground">
                          Target: {project.deadline || 'Ongoing'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        project.status === 'completed' 
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : project.status === 'active'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-purple-500/10 text-purple-500'
                      }`}>
                        {project.status}
                      </span>
                      
                      <button
                        onClick={() => openEditModal(project)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-70 group-hover:opacity-100"
                        title="Edit Project"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id, project.name)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-70 group-hover:opacity-100"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
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
                        <CheckSquare className="h-3.5 w-3.5 text-primary" />
                        {completedTasks}/{tasksCount} Tasks
                      </span>
                      <span className="font-semibold text-foreground">{progressPct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          progressPct === 100 ? 'bg-emerald-500' : 'bg-primary'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions: Overview & Kanban Board */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center -space-x-1.5">
                      {(project.members || ['AN', 'JD']).map((member, i) => (
                        <div
                          key={i}
                          className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-bold text-foreground uppercase"
                        >
                          {typeof member === 'string' ? member.slice(0, 2) : 'TM'}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/projects/${project.id}/board`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline bg-primary/10 px-2.5 py-1.5 rounded-lg"
                      >
                        <KanbanSquare className="h-3.5 w-3.5" />
                        Kanban Board
                      </Link>
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        Overview
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Creating / Editing Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-border bg-card p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold rounded-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Mobile App Redesign"
                  className="w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Briefly describe what this project will deliver..."
                  className="w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-foreground mb-1">
                    Status
                  </label>
                  <select
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card p-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="active">Active</option>
                    <option value="planning">Planning</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-foreground mb-1">
                    Target Deadline
                  </label>
                  <input
                    type="text"
                    value={projectDeadline}
                    onChange={(e) => setProjectDeadline(e.target.value)}
                    placeholder="e.g. Nov 30, 2026"
                    className="w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !projectName.trim()}
                  className="rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50 shadow-xs"
                >
                  {isSubmitting ? 'Saving...' : editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
