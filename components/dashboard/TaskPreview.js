'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, RefreshCw } from 'lucide-react';

export function TaskPreview() {
  // Lesson 1.1 Concept: Declaring reactive state via an object reference
  const [task, setTask] = useState({
    id: 'task-1',
    title: 'Initialize Next.js App Router and Tailwind Shell',
    priority: 'high',
    status: 'in_progress',
    updatedAt: new Date().toLocaleTimeString(),
  });

  // Immutability in action: returning a new object reference triggers React reconciliation
  const handleToggleStatus = () => {
    setTask((prevTask) => {
      const nextStatus = prevTask.status === 'completed' ? 'in_progress' : 'completed';
      return {
        ...prevTask,
        status: nextStatus,
        updatedAt: new Date().toLocaleTimeString(),
      };
    });
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-blue-500/40">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleStatus}
            className="mt-0.5 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            title="Click to toggle status"
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h4 className={`font-medium text-sm text-foreground transition-all ${isCompleted ? 'line-through opacity-60' : ''}`}>
                {task.title}
              </h4>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded bg-accent px-2 py-0.5 font-medium text-accent-foreground uppercase tracking-wider text-[10px]">
                <AlertCircle className="h-3 w-3" />
                {task.priority}
              </span>
              <span>Updated: {task.updatedAt}</span>
              <span className={`font-medium capitalize ${isCompleted ? 'text-emerald-500' : 'text-blue-500'}`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleToggleStatus}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-hover transition-colors shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {isCompleted ? 'Reopen Task' : 'Complete Task'}
          </button>
        </div>
      </div>
    </div>
  );
}
