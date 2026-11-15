'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('WorkSpace Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center space-y-4 shadow-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 font-bold text-lg">
            !
          </div>
          <h2 className="text-xl font-bold text-white">System Error Encountered</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {error?.message || 'A root-level layout error occurred.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Reload WorkSpace
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
