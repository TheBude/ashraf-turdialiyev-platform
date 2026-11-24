'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page render error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#F8F8F5] text-[#17243A]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-500">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="font-editorial text-2xl font-bold text-[#17243A]">
          Unable to Load Section
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          An unexpected interruption occurred while fetching or rendering this dossier. You may attempt to refresh the component or return to the platform home.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17243A] text-white hover:bg-[#17243A]/90 text-xs font-semibold shadow-sm transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
