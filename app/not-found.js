import Link from 'next/link';
import { FileQuestion, LayoutDashboard, BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 max-w-md w-full shadow-lg space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
          <FileQuestion className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-mono font-semibold text-muted-foreground">
            Error 404
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Page Not Found
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The route you are trying to visit does not have a matching <code className="font-mono text-blue-500 font-semibold">page.js</code> in the Next.js App Router tree.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <LayoutDashboard className="h-4 w-4" />
            Return to WorkSpace Dashboard
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4 text-blue-500" />
            Visit Learning Book (/learn)
          </Link>
        </div>
      </div>
    </div>
  );
}
