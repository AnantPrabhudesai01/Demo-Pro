'use client';

import { useTheme } from '@/components/shared/ThemeProvider';
import { Settings, Moon, Sun, User, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal profile, notification preferences, and workspace appearance.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
            <Palette className="h-4 w-4 text-blue-500" />
            Appearance &amp; Theme
          </div>
          <p className="text-xs text-muted-foreground">
            Switch between light and dark visual themes. Your preference is persisted in browser storage.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                  : 'border-border bg-background text-foreground hover:bg-muted'
              }`}
            >
              <Moon className="h-4 w-4" />
              Dark Mode {theme === 'dark' ? '(Active)' : ''}
            </button>

            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                  : 'border-border bg-background text-foreground hover:bg-muted'
              }`}
            >
              <Sun className="h-4 w-4" />
              Light Mode {theme === 'light' ? '(Active)' : ''}
            </button>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
            <User className="h-4 w-4 text-emerald-500" />
            User Profile
          </div>
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="block text-muted-foreground font-medium mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Anant"
                className="w-full rounded-xl border border-border bg-background p-2.5 text-foreground font-medium"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-medium mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="anant@workspace.dev"
                disabled
                className="w-full rounded-xl border border-border bg-muted p-2.5 text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
