'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Circle, 
  Clock, 
  MessageSquare,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Trash2,
  Edit2
} from 'lucide-react';
import TaskDetailModal from '@/components/kanban/TaskDetailModal';

const PRIORITY_BADGES = {
  urgent: 'text-red-400 bg-red-500/10 border-red-500/20',
  high: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  medium: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  low: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
};

const STATUS_BADGES = {
  backlog: 'bg-slate-500/10 text-slate-400',
  todo: 'bg-blue-500/10 text-blue-400',
  in_progress: 'bg-amber-500/10 text-amber-400',
  in_review: 'bg-purple-500/10 text-purple-400',
  completed: 'bg-emerald-500/10 text-emerald-400',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Create Task Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newStatus, setNewStatus] = useState('todo');
  const [newProjectId, setNewProjectId] = useState('');
  const [newDueDate, setNewDueDate] = useState('Tomorrow');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    try {
      const [tasksRes, projsRes] = await Promise.all([
        fetch('/api/tasks'),
        fetch('/api/projects')
      ]);
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        setTasks(tasksData);
      }
      if (projsRes.ok) {
        const projsData = await projsRes.json();
        setProjects(projsData);
        if (projsData.length > 0) setNewProjectId(projsData[0].id);
      }
    } catch (err) {
      console.error('Error fetching tasks data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleTaskCompletion = async (e, task) => {
    e.stopPropagation();
    const nextStatus = task.status === 'completed' ? 'in_progress' : 'completed';
    
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: nextStatus } : t));

    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (!res.ok) throw new Error('Status update failed');
      showToast(`Marked "${task.title.slice(0, 20)}..." as ${nextStatus.replace('_', ' ')}`);
    } catch (err) {
      console.error(err);
      // Revert
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: task.status } : t));
      showToast('Error syncing status.');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          description: newDescription.trim() || 'Created from Tasks table.',
          status: newStatus,
          priority: newPriority,
          projectId: newProjectId || projects[0]?.id || 'proj-1',
          dueDate: newDueDate,
        })
      });
      if (!res.ok) throw new Error('Failed to create task');
      const created = await res.json();
      setTasks(prev => [created, ...prev]);
      setCreateModalOpen(false);
      setNewTitle('');
      setNewDescription('');
      showToast(`Task created!`);
    } catch (err) {
      console.error(err);
      showToast('Error creating task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = (t.title || '').toLowerCase().includes(search.toLowerCase()) ||
                          (t.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-card p-4 text-xs font-semibold text-foreground shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="h-4 w-4 text-primary" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Cross-Project Tasks
            </h1>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-blue-500">
              {filteredTasks.length} items
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Unified task backlog, priority matrix, status workflows, and discussion threads.
          </p>
        </div>

        <button 
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Create Task
        </button>
      </div>

      {/* Senior Dev Learning Banner */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Mastering Complex State & Filter Pipelines: <code className="font-mono text-blue-500">useMemo</code> + <code className="font-mono text-blue-500">filter()</code>
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Every card below supports instant inline completion toggling, modal drawer inspection with real-time comments, and bidirectional sync.
            </p>
          </div>
        </div>

        <Link
          href="/learn/react-fundamentals/react-hooks-deep-dive/use-state-primitive-deep-dive"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600 shrink-0 self-start md:self-auto"
        >
          Explore Hooks in Book
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks by title or keyword..."
            className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1 text-xs">
            {['all', 'backlog', 'todo', 'in_progress', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                  filterStatus === st
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1 text-xs">
            {['all', 'urgent', 'high', 'medium'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                  filterPriority === p
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-20 rounded-xl border border-border bg-card/60 animate-pulse p-4" />
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
          <CheckSquare className="h-8 w-8 text-muted-foreground mx-auto" />
          <h3 className="text-sm font-semibold text-foreground">No tasks found</h3>
          <p className="text-xs text-muted-foreground">
            No tasks match your current query or filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((t) => {
            const isCompleted = t.status === 'completed';

            return (
              <div
                key={t.id}
                onClick={() => setSelectedTask(t)}
                className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={(e) => toggleTaskCompletion(e, t)}
                    className="mt-0.5 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                    title={isCompleted ? 'Mark incomplete' : 'Mark completed'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${PRIORITY_BADGES[t.priority] || PRIORITY_BADGES.medium}`}>
                        {t.priority}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_BADGES[t.status] || STATUS_BADGES.todo}`}>
                        {t.status.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {t.project?.name || 'WorkSpace Core'}
                      </span>
                    </div>

                    <h4 className={`text-sm font-semibold text-foreground group-hover:text-primary transition-colors ${
                      isCompleted ? 'line-through text-muted-foreground' : ''
                    }`}>
                      {t.title}
                    </h4>

                    {t.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {t.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0 self-end sm:self-center">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {t.dueDate || 'Tomorrow'}
                  </span>

                  {t.commentsCount > 0 && (
                    <span className="inline-flex items-center gap-1 font-mono">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {t.commentsCount}
                    </span>
                  )}

                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center uppercase">
                    {t.assignee?.name ? t.assignee.name.slice(0, 2) : 'AN'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onTaskUpdated={(updated) => {
            setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
            setSelectedTask(updated);
          }}
          onTaskDeleted={(taskId) => {
            setTasks(prev => prev.filter(t => t.id !== taskId));
            setSelectedTask(null);
            showToast('Task deleted');
          }}
        />
      )}

      {/* Create Task Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">
                Create New Task
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement optimistic task sync"
                  className="w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain requirements or technical checklist..."
                  className="w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-foreground mb-1">
                    Project
                  </label>
                  <select
                    value={newProjectId}
                    onChange={(e) => setNewProjectId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card p-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-foreground mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card p-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 font-medium text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newTitle.trim()}
                  className="rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
