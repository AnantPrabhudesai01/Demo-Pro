'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log runtime errors for telemetry / debugging
    console.error('WorkSpace App Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="rounded-3xl border border-destructive/20 bg-card p-8 sm:p-12 max-w-md w-full shadow-lg space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-mono font-semibold text-destructive">
            Runtime Error
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Something went wrong!
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {error?.message || 'An unexpected error occurred during rendering.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
