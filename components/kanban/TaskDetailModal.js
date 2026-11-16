'use client';

import { useState } from 'react';
import { 
  X, 
  Trash2, 
  Calendar, 
  User, 
  AlertCircle, 
  MessageSquare, 
  Send,
  Clock,
  CheckCircle2
} from 'lucide-react';

export function TaskDetailModal({ task, onClose, onUpdate, onDelete }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [comments, setComments] = useState(task.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDetails = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          status,
          priority,
          dueDate,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdate(data.task);
      }
    } catch (err) {
      console.error('Failed to save task:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments(prev => [...prev, data.comment]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
      onDelete(task.id);
      onClose();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="rounded-2xl border border-border bg-card max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between border-b border-border p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-blue-500">{task.id}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{task.projectName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg hover:bg-muted transition-colors"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Title input */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-border bg-background p-3 text-base font-bold text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          {/* Metadata Row: Status, Priority, Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground font-medium capitalize focus:border-primary focus:outline-none"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">In Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground font-medium capitalize focus:border-primary focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
                Due Date
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. 2026-11-25"
                className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground font-medium focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">
              Description &amp; Acceptance Criteria
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, architectural specifications, or checklist items..."
              className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed focus:border-primary focus:outline-none"
            />
          </div>

          {/* Save Button for Details */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveDetails}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60"
            >
              <CheckCircle2 className="h-4 w-4" />
              {isSaving ? 'Saving Changes...' : 'Save Task Details'}
            </button>
          </div>

          {/* Comments Discussion Section */}
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              Discussion Activity ({comments.length})
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No comments yet. Start the discussion below!</p>
              ) : (
                comments.map((comm) => (
                  <div key={comm.id} className="rounded-xl border border-border bg-background p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 font-semibold text-foreground">
                        <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                          {comm.user ? comm.user.avatar : 'AN'}
                        </div>
                        <span>{comm.user ? comm.user.name : 'Teammate'}</span>
                      </div>
                      <span className="text-muted-foreground text-[10px]">
                        {new Date(comm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-7 leading-relaxed">
                      {comm.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Leave a comment or mention a teammate..."
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSubmittingComment || !newComment.trim()}
                className="inline-flex items-center gap-1 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
