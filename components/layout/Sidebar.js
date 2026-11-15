'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Settings, 
  BookOpen, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: Briefcase, badge: '3' },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare, badge: '12' },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Workspace Switcher */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-md bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-500/20">
              WS
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-foreground">Acme Engineering</p>
              <p className="text-[10px] text-muted-foreground">Free Tier</p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Workspace
            </p>
            <nav className="mt-2 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onClose && onClose()}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Interactive Learning Book Card */}
          <div className="rounded-xl border border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-transparent p-3.5">
            <div className="flex items-center gap-2 text-blue-500">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold">Active Learning</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Study the concepts behind this UI in the built-in course textbook.
            </p>
            <Link
              href="/learn"
              onClick={() => onClose && onClose()}
              className="mt-3 flex items-center justify-between rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                Open /learn
              </span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-border p-3 text-center text-[11px] text-muted-foreground">
          WorkSpace v0.1.0 • React 19 / Next.js 15
        </div>
      </aside>
    </>
  );
}
