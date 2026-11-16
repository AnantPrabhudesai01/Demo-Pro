'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CURRICULUM } from '@/content/learning-books/curriculum';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Circle,
  FileCode2,
  Atom,
  Layers,
  Compass,
  Server,
  Database
} from 'lucide-react';

const ICON_MAP = {
  FileCode2,
  Atom,
  Layers,
  Compass,
  Server,
  Database,
  CheckCircle2,
};

export function BookSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  // Find which book is currently active based on pathname
  const activeBook = CURRICULUM.find(b => pathname.includes(`/learn/${b.slug}`)) || CURRICULUM[0];
  
  // Track open chapters
  const [openChapters, setOpenChapters] = useState({
    [activeBook.chapters[0]?.id]: true
  });

  const toggleChapter = (chapterId) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 lg:w-80 shrink-0 flex-col border-r border-border bg-card transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Book Header & Switcher */}
        <div className="border-b border-border p-4">
          <Link href="/learn" className="flex items-center gap-2 text-xs font-semibold text-blue-500 hover:underline mb-2">
            ← All Books Overview
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 font-bold border border-blue-500/20">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground leading-tight">
                {activeBook.title}
              </h2>
              <p className="text-[11px] text-muted-foreground">Interactive Textbook</p>
            </div>
          </div>

          {/* Book progress */}
          <div className="mt-3.5 space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Book Progress</span>
              <span className="font-semibold text-foreground">1 / 11 Lessons</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-blue-600" style={{ width: '9%' }} />
            </div>
          </div>
        </div>

        {/* Chapters & Lessons Tree */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {activeBook.chapters.map((chapter) => {
            const isChapterOpen = openChapters[chapter.id] ?? false;
            return (
              <div key={chapter.id} className="rounded-xl border border-border/60 bg-background/50 overflow-hidden">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="flex w-full items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="text-xs font-semibold text-foreground leading-tight">
                    {chapter.title}
                  </span>
                  {isChapterOpen ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {isChapterOpen && (
                  <div className="border-t border-border/40 p-1.5 space-y-0.5">
                    {chapter.lessons.map((lesson) => {
                      const lessonHref = `/learn/${activeBook.slug}/${chapter.slug}/${lesson.slug}`;
                      const isActive = pathname === lessonHref;

                      return (
                        <Link
                          key={lesson.id}
                          href={lessonHref}
                          onClick={() => onClose && onClose()}
                          className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-colors ${
                            isActive
                              ? 'bg-blue-600 text-white font-medium shadow-sm'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {lesson.status === 'COMPLETED' ? (
                              <CheckCircle2 className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                            ) : lesson.status === 'IN_PROGRESS' ? (
                              <Clock className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-amber-500'}`} />
                            ) : (
                              <Circle className={`h-3.5 w-3.5 ${isActive ? 'text-white/60' : 'text-muted-foreground/60'}`} />
                            )}
                          </div>
                          <div className="flex-1 leading-tight">
                            <span>{lesson.title}</span>
                            <span className={`block text-[10px] mt-0.5 ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                              {lesson.duration}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Switch Book Dropdown / Bottom Links */}
        <div className="border-t border-border p-3">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Switch Curriculum Book
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {CURRICULUM.slice(0, 4).map((b) => (
              <Link
                key={b.id}
                href={`/learn/${b.slug}/${b.chapters[0]?.slug}/${b.chapters[0]?.lessons[0]?.slug}`}
                className={`truncate rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                  b.slug === activeBook.slug ? 'bg-accent text-accent-foreground font-semibold' : 'hover:bg-muted text-muted-foreground'
                }`}
                title={b.title}
              >
                {b.title.split(':')[0]}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
