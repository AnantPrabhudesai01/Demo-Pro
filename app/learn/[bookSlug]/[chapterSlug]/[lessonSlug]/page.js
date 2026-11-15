import { notFound } from 'next/navigation';
import { CURRICULUM } from '@/content/learning-books/curriculum';
import { LESSON_1_1 } from '@/content/learning-books/book-1-javascript-foundations/chapter-1-variables-and-data-structures/lesson-1-variables-scope';
import { LessonContent } from '@/components/learn/LessonContent';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default async function LessonPage({ params }) {
  const resolvedParams = await params;
  const { bookSlug, chapterSlug, lessonSlug } = resolvedParams;

  const book = CURRICULUM.find(b => b.slug === bookSlug);
  if (!book) return notFound();

  const chapter = book.chapters.find(c => c.slug === chapterSlug);
  if (!chapter) return notFound();

  const lessonMeta = chapter.lessons.find(l => l.slug === lessonSlug);
  if (!lessonMeta) return notFound();

  // If this is lesson 1.1, return the complete 21-section lesson
  if (lessonSlug === 'variables-scope-primitives') {
    return (
      <LessonContent
        lesson={LESSON_1_1}
        prevLesson={null}
        nextLesson={{
          title: '1.2 Reference Equality & Immutability',
          href: `/learn/${bookSlug}/${chapterSlug}/immutability-in-practice`,
        }}
      />
    );
  }

  // Fallback for lessons planned in upcoming phases
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-12">
      <Link
        href={`/learn/${bookSlug}/${chapterSlug}/variables-scope-primitives`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lesson 1.1
      </Link>

      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mx-auto">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">{lessonMeta.title}</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {lessonMeta.objective}
        </p>
        <div className="pt-2">
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            Status: {lessonMeta.status.replace('_', ' ')}
          </span>
        </div>
        <p className="text-xs text-muted-foreground pt-4">
          This lesson is scheduled for the upcoming phase according to our master curriculum. Please complete Lesson 1.1 first!
        </p>
        <div className="pt-2">
          <Link
            href="/learn/javascript-foundations/variables-and-data-structures/variables-scope-primitives"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Study Active Lesson 1.1 Now
          </Link>
        </div>
      </div>
    </div>
  );
}
