'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookSidebar } from '@/components/learn/BookSidebar';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { BookOpen, Menu, LayoutDashboard, CheckSquare } from 'lucide-react';

export default function LearnLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Learning Header */}
      <header className="sticky top-0 z-30 w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
              aria-label="Open syllabus"
            >
              <Menu className="h-4 w-4" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-foreground text-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <CheckSquare className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline">WorkSpace</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-500">
              <BookOpen className="h-4 w-4" />
              <span>Interactive Programming Book</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to SaaS Dashboard</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex flex-1">
        <BookSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 overflow-y-auto px-4 py-8 sm:px-8 lg:px-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
