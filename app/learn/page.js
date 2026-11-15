import Link from 'next/link';
import { CURRICULUM } from '@/content/learning-books/curriculum';
import { 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Code2,
  FileCode2,
  Atom,
  Layers,
  Compass,
  Server,
  Database
} from 'lucide-react';

const ICONS = {
  FileCode2,
  Atom,
  Layers,
  Compass,
  Server,
  Database,
  CheckCircle2,
};

export default function LearnOverviewPage() {
  const firstBook = CURRICULUM[0];
  const firstChapter = firstBook.chapters[0];
  const firstLesson = firstChapter.lessons[0];

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Hero Welcome */}
      <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent p-8 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-500 mb-4">
          <Sparkles className="h-4 w-4" />
          The WorkSpace Educational Curriculum
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Learn React.js &amp; Next.js by Building a Production SaaS
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          Welcome to your interactive in-app programming textbook. We do not simply generate code for you — every architectural pattern, hook, component, and server boundary is taught here with execution flows, mental models, analogies, and coding challenges.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href={`/learn/${firstBook.slug}/${firstChapter.slug}/${firstLesson.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
          >
            Start Lesson 1.1: Variables &amp; Scope
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Open WorkSpace Dashboard
          </Link>
        </div>
      </div>

      {/* Curriculum Summary Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <span className="text-xs font-medium text-muted-foreground">Total Books</span>
          <p className="mt-1 text-2xl font-bold text-foreground">7</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <span className="text-xs font-medium text-muted-foreground">Planned Chapters</span>
          <p className="mt-1 text-2xl font-bold text-foreground">35</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <span className="text-xs font-medium text-muted-foreground">Planned Lessons</span>
          <p className="mt-1 text-2xl font-bold text-foreground">120+</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <span className="text-xs font-medium text-muted-foreground">Current Status</span>
          <p className="mt-1 text-2xl font-bold text-emerald-500">Phase 0 Active</p>
        </div>
      </div>

      {/* All Books Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Curriculum Bookshelf</h2>
          <span className="text-xs text-muted-foreground">Structured learning roadmap</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {CURRICULUM.map((book, index) => {
            const Icon = ICONS[book.icon] || BookOpen;
            const targetLesson = book.chapters[0]?.lessons[0];
            const targetHref = targetLesson
              ? `/learn/${book.slug}/${book.chapters[0].slug}/${targetLesson.slug}`
              : '#';

            return (
              <div
                key={book.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 font-bold border border-blue-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      Book {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-foreground group-hover:text-blue-500 transition-colors">
                    {book.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{book.chapters.length} Chapters</span>
                    <span>•</span>
                    <span>
                      {book.chapters.reduce((acc, c) => acc + c.lessons.length, 0)} Lessons
                    </span>
                  </div>
                </div>

                <Link
                  href={targetHref}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600"
                >
                  Explore Book Lessons
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
