'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Layers,
  Calendar,
  User,
  X
} from 'lucide-react';
import TaskDetailModal from '@/components/kanban/TaskDetailModal';

const COLUMNS = [
  { id: 'backlog', title: 'Backlog', color: 'border-slate-500/20 bg-slate-500/5', badge: 'bg-slate-500/10 text-slate-400' },
  { id: 'todo', title: 'To Do', color: 'border-blue-500/20 bg-blue-500/5', badge: 'bg-blue-500/10 text-blue-400' },
  { id: 'in_progress', title: 'In Progress', color: 'border-amber-500/20 bg-amber-500/5', badge: 'bg-amber-500/10 text-amber-400' },
  { id: 'in_review', title: 'In Review', color: 'border-purple-500/20 bg-purple-500/5', badge: 'bg-purple-500/10 text-purple-400' },
  { id: 'completed', title: 'Completed', color: 'border-emerald-500/20 bg-emerald-500/5', badge: 'bg-emerald-500/10 text-emerald-400' },
];

const COLUMN_ORDER = ['backlog', 'todo', 'in_progress', 'in_review', 'completed'];

const PRIORITY_STYLES = {
  urgent: 'bg-red-500/15 text-red-400 border-red-500/20',
  high: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  medium: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  low: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
};

export default function KanbanBoard({ 
  initialTasks = [], 
  projectId = null, 
  projects = [],
  members = [] 
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  
  // Quick Task Creation Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createColumn, setCreateColumn] = useState('todo');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newProjectId, setNewProjectId] = useState(projectId || (projects[0]?.id || 'proj-1'));
  const [newAssignee, setNewAssignee] = useState(members[0]?.id || 'usr-1');
  const [newDueDate, setNewDueDate] = useState('Tomorrow');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Move task to a target column status with optimistic update & API sync
  const moveTask = async (taskId, targetStatus) => {
    const originalTasks = [...tasks];
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const currentTask = tasks[taskIndex];
    if (currentTask.status === targetStatus) return;

    // Optimistic UI update
    const updatedTask = { ...currentTask, status: targetStatus, updatedAt: new Date().toISOString() };
    const nextTasks = [...tasks];
    nextTasks[taskIndex] = updatedTask;
    setTasks(nextTasks);

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus })
      });
      if (!res.ok) throw new Error('Failed to update task status');
      showToast(`Moved "${currentTask.title.slice(0, 24)}..." to ${targetStatus.replace('_', ' ')}`);
    } catch (err) {
      console.error('Task move error:', err);
      // Revert on error
      setTasks(originalTasks);
      showToast('Error syncing task position. Reverted.');
    }
  };

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colId) setDragOverCol(colId);
  };

  const handleDragLeave = (colId) => {
    if (dragOverCol === colId) setDragOverCol(null);
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    setDragOverCol(null);
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      moveTask(taskId, colId);
      setDraggedTaskId(null);
    }
  };

  const shiftTaskDirection = (task, direction) => {
    const currentIndex = COLUMN_ORDER.indexOf(task.status);
    if (currentIndex === -1) return;
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < COLUMN_ORDER.length) {
      moveTask(task.id, COLUMN_ORDER[nextIndex]);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    if (projectId && t.projectId !== projectId) return false;
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    if (search.trim()) {
      const query = search.toLowerCase();
      const matchTitle = t.title?.toLowerCase().includes(query);
      const matchDesc = t.description?.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  // Handle task detail updates from modal
  const handleModalTaskUpdated = (updated) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    setSelectedTask(updated);
  };

  const handleModalTaskDeleted = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setSelectedTask(null);
    showToast('Task permanently deleted');
  };

  // Quick Task Creation Submit
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
          description: newDescription.trim() || 'Created via Kanban board.',
          status: createColumn,
          priority: newPriority,
          projectId: newProjectId,
          assigneeId: newAssignee,
          dueDate: newDueDate,
        })
      });
      if (!res.ok) throw new Error('Failed to create task');
      const created = await res.json();
      setTasks(prev => [created, ...prev]);
      setCreateModalOpen(false);
      setNewTitle('');
      setNewDescription('');
      showToast(`Task "${created.title.slice(0, 20)}..." created!`);
    } catch (err) {
      console.error(err);
      showToast('Error creating task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-card p-4 text-xs font-semibold text-foreground shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="h-4 w-4 text-primary" />
          {toastMessage}
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 shadow-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter tasks by title or keyword..."
            className="w-full rounded-xl border border-border bg-muted/40 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Priority Filter */}
          <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/30 p-1 text-xs">
            {['all', 'urgent', 'high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                  priorityFilter === p
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setCreateColumn('todo');
              setCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-xs"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* 5-Column Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);
          const isOver = dragOverCol === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={() => handleDragLeave(col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex flex-col rounded-2xl border transition-all duration-200 min-h-[500px] p-3 ${
                isOver 
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                  : 'border-border/60 bg-card/60 hover:border-border'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    {col.title}
                  </h3>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-mono font-bold ${col.badge}`}>
                    {colTasks.length}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setCreateColumn(col.id);
                    setCreateModalOpen(true);
                  }}
                  className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title={`Add task to ${col.title}`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Tasks Column List */}
              <div className="flex-1 space-y-2.5">
                {colTasks.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-border/40 rounded-xl">
                    <p className="text-[11px] text-muted-foreground">No tasks in {col.title}</p>
                    <button
                      onClick={() => {
                        setCreateColumn(col.id);
                        setCreateModalOpen(true);
                      }}
                      className="mt-2 text-[11px] text-primary hover:underline font-medium"
                    >
                      + Add a task
                    </button>
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const colIndex = COLUMN_ORDER.indexOf(task.status);
                    const canMoveLeft = colIndex > 0;
                    const canMoveRight = colIndex < COLUMN_ORDER.length - 1;

                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onClick={() => setSelectedTask(task)}
                        className="group relative rounded-xl border border-border/70 bg-card p-3.5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer space-y-2.5"
                      >
                        {/* Priority Badge & Actions */}
                        <div className="flex items-center justify-between gap-2">
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium}`}>
                            {task.priority}
                          </span>

                          {/* Quick Column Shift Controls */}
                          <div 
                            className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {canMoveLeft && (
                              <button
                                onClick={() => shiftTaskDirection(task, 'prev')}
                                className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                title="Move left"
                              >
                                <ChevronLeft className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {canMoveRight && (
                              <button
                                onClick={() => shiftTaskDirection(task, 'next')}
                                className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                title="Move right"
                              >
                                <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                              {task.description}
                            </p>
                          )}
                        </div>

                        {/* Footer: Due date, comments, assignee */}
                        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {task.dueDate || 'No date'}
                            </span>
                            {task.commentsCount > 0 && (
                              <span className="inline-flex items-center gap-1 font-mono">
                                <MessageSquare className="h-3 w-3" />
                                {task.commentsCount}
                              </span>
                            )}
                          </div>

                          <div className="h-5 w-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center uppercase">
                            {task.assignee?.name ? task.assignee.name.slice(0, 2) : 'AN'}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onTaskUpdated={handleModalTaskUpdated}
          onTaskDeleted={handleModalTaskDeleted}
        />
      )}

      {/* Quick Add Task Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-foreground">
                Create New Task in <span className="text-primary uppercase">{createColumn.replace('_', ' ')}</span>
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement optimistic UI updates"
                  className="w-full rounded-xl border border-border bg-muted/40 py-2 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain requirements, acceptance criteria, or edge cases..."
                  className="w-full rounded-xl border border-border bg-muted/40 py-2 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Due Date
                  </label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="e.g. Tomorrow, Nov 25"
                    className="w-full rounded-xl border border-border bg-muted/40 py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newTitle.trim()}
                  className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50"
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
