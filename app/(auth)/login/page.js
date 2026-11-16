'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { CheckSquare, ArrowRight, Lock, Mail, AlertCircle, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('anant@workspace.dev');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold tracking-tight text-foreground text-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <CheckSquare className="h-6 w-6" />
            </div>
            <span>WorkSpace</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your credentials or use a pre-configured demo account below.
          </p>
        </div>

        {/* Demo Accounts Quick-Fill Box */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-500">
            <Sparkles className="h-3.5 w-3.5" />
            Instant Demo Credentials (Click to fill)
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleFillDemo('anant@workspace.dev')}
              className="rounded-lg border border-border bg-card p-2 text-left hover:border-blue-500 transition-colors"
            >
              <div className="font-semibold text-foreground">Anant (Owner)</div>
              <div className="text-[10px] text-muted-foreground truncate">anant@workspace.dev</div>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('jane@workspace.dev')}
              className="rounded-lg border border-border bg-card p-2 text-left hover:border-blue-500 transition-colors"
            >
              <div className="font-semibold text-foreground">Jane (Admin)</div>
              <div className="text-[10px] text-muted-foreground truncate">jane@workspace.dev</div>
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground">Password for all accounts: <code className="font-mono text-foreground font-semibold">password123</code></p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-foreground mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-semibold text-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-medium text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in to WorkSpace'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="font-semibold text-blue-500 hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
