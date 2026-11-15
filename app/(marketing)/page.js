import Link from 'next/link';
import { 
  CheckSquare, 
  ArrowRight, 
  BookOpen, 
  LayoutDashboard, 
  Sparkles, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Database,
  Terminal
} from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5 font-bold tracking-tight text-foreground text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <CheckSquare className="h-5 w-5" />
            </div>
            <span>WorkSpace</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600 px-3 py-1.5"
            >
              <BookOpen className="h-4 w-4" />
              Learning Book (/learn)
            </Link>
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              Launch App
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 sm:py-28 max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-500">
          <Sparkles className="h-3.5 w-3.5" />
          Production SaaS Platform + Full Interactive Textbook
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl max-w-4xl leading-tight">
          Manage Projects with Precision. <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Learn React &amp; Next.js by Building It.
          </span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          WorkSpace is an enterprise-grade project management application inspired by Linear, Trello, and Notion, integrated with an interactive, in-app curriculum that explains every component, hook, and server boundary from first principles.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
          >
            <LayoutDashboard className="h-4 w-4" />
            Enter WorkSpace Dashboard
          </Link>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-xs"
          >
            <BookOpen className="h-4 w-4 text-blue-500" />
            Open Interactive Textbook (/learn)
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 pt-16 w-full text-left">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-2.5">
            <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Linear-Style SaaS Engine</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fast, keyboard-friendly task management, Kanban boards, sprint analytics, and real-time activity streams.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-2.5">
            <div className="h-9 w-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-sm">The 7-Book Curriculum</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every single line of code is mapped to an interactive lesson with syntax explanations, diagrams, common pitfalls, and interview answers.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-2.5">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Full-Stack Next.js 15+</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              React Server Components, Server Actions, PostgreSQL integration, and zero fake production readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        WorkSpace • Built with React 19 &amp; Next.js 15 App Router
      </footer>
    </div>
  );
}
