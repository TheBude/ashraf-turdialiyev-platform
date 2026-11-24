'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@ashrafturdialiyev.com');
  const [password, setPassword] = useState('AshrafAdmin2026!Secure');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      toast.success('Authenticated successfully. Entering CMS Portal...');
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#d4af37]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md bg-[#10141e] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Top return link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Platform</span>
        </Link>

        {/* Brand Monogram */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#161b26] border border-[#d4af37]/40 flex items-center justify-center mx-auto text-lg font-serif font-bold text-[#d4af37] shadow-gold">
            AT
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            CMS Portal Authentication
          </h1>
          <p className="text-xs text-slate-400">
            Restricted access for Ashraf Turdialiyev platform administration
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ashrafturdialiyev.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161b26] border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Passphrase
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#161b26] border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89028] text-black font-bold text-sm shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-black" />
                <span>Authenticate & Enter</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-slate-800">
          Default seed credentials are pre-populated for swift review.
        </div>
      </div>
    </div>
  );
}
