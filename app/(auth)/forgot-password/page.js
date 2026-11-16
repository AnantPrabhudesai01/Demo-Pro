'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckSquare, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold tracking-tight text-foreground text-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <CheckSquare className="h-6 w-6" />
            </div>
            <span>WorkSpace</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Reset your password
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your email and we will send password reset instructions.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="space-y-4 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">Check your email</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If an account exists for <strong className="text-foreground">{email}</strong>, we have dispatched a password reset link.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-blue-500 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to Sign in
              </Link>
            </div>
          ) : (
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

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Send Reset Link
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
