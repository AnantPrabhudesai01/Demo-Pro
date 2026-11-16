'use client';

import { useState } from 'react';
import { useTheme } from '@/components/shared/ThemeProvider';
import { useAuth } from '@/context/AuthContext';
import { Settings, Moon, Sun, User, Bell, Shield, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user, login } = useAuth();

  const [fullName, setFullName] = useState(user?.name || 'Anant');
  const [jobTitle, setJobTitle] = useState(user?.title || 'Lead Architect & Founder');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [sprintDigest, setSprintDigest] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Profile and preferences updated!');
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-card p-4 text-xs font-semibold text-foreground shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="h-4 w-4 text-primary" />
          {toastMessage}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Workspace Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal profile, notification preferences, and workspace appearance.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
            <Palette className="h-4 w-4 text-primary" />
            Appearance &amp; Theme
          </div>
          <p className="text-xs text-muted-foreground">
            Switch between light and dark visual themes. Your preference is persisted across browser sessions.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                theme === 'dark'
                  ? 'border-primary bg-primary/10 text-primary shadow-xs'
                  : 'border-border bg-background text-foreground hover:bg-muted'
              }`}
            >
              <Moon className="h-4 w-4" />
              Dark Theme {theme === 'dark' ? '(Active)' : ''}
            </button>

            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                theme === 'light'
                  ? 'border-primary bg-primary/10 text-primary shadow-xs'
                  : 'border-border bg-background text-foreground hover:bg-muted'
              }`}
            >
              <Sun className="h-4 w-4" />
              Light Theme {theme === 'light' ? '(Active)' : ''}
            </button>
          </div>
        </div>

        {/* Profile Info Form */}
        <form onSubmit={handleSaveProfile} className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
            <User className="h-4 w-4 text-emerald-500" />
            User Profile
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="block text-foreground font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/40 p-2.5 text-foreground font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={user?.email || 'anant@workspace.dev'}
                disabled
                className="w-full rounded-xl border border-border bg-muted p-2.5 text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-foreground font-semibold mb-1">Professional Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/40 p-2.5 text-foreground font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Notifications Toggles */}
          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-xs font-bold text-foreground">Notification Preferences</h4>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-xs text-foreground font-medium">
                Email alerts when tasks are assigned to me or commented on
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={sprintDigest}
                onChange={(e) => setSprintDigest(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-xs text-foreground font-medium">
                Weekly velocity digest and sprint milestone alerts
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-border">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-xs"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
