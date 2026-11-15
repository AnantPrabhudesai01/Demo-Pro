'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { 
  CheckSquare, 
  Search, 
  BookOpen, 
  LayoutDashboard, 
  Briefcase, 
  Bell,
  Menu
} from 'lucide-react';

export function Navbar({ onMenuClick }) {
  const pathname = usePathname();

  const isLearn = pathname.startsWith('/learn');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile menu button & Brand */}
        <div className="flex items-center gap-3 sm:gap-6">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link href="/dashboard" className="flex items-center gap-2.5 font-bold tracking-tight text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <CheckSquare className="h-5 w-5" />
            </div>
            <span className="text-lg">WorkSpace</span>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
                pathname === '/dashboard' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/projects"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
                pathname.startsWith('/projects') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Projects
            </Link>
            <Link
              href="/learn"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
                isLearn ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="h-4 w-4 text-blue-500" />
              Learning Book
              <span className="ml-1 rounded-full bg-blue-500/10 px-1.5 py-0.2 text-[10px] font-bold text-blue-500">
                /learn
              </span>
            </Link>
          </nav>
        </div>

        {/* Center: Search input */}
        <div className="hidden sm:flex max-w-xs flex-1 px-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, tasks, or lessons..."
              className="w-full rounded-lg border border-border bg-background py-1.5 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/learn"
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-blue-500 hover:bg-muted"
            title="Open Learning Book"
          >
            <BookOpen className="h-4 w-4" />
          </Link>

          <button
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
          </button>

          <ThemeToggle />

          <div className="h-6 w-px bg-border mx-1" />

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              AN
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
