'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

type AdminLang = 'uz' | 'en';

const LOGIN_T = {
  uz: {
    back: 'Asosiy platformaga qaytish',
    title: 'CMS Portaliga Kirish',
    subtitle: 'Ashraf Turdialiyev boshqaruv paneli uchun himoyalangan tizim',
    emailLabel: 'Admin elektron pochtasi',
    passwordLabel: 'Xavfsizlik kaliti (Parol)',
    submit: 'Tasdiqlash va Kirish',
    loading: 'Ma’lumotlar tekshirilmoqda...',
    footerNotice: 'Cheklangan kirish huquqi. Administrator login ma’lumotlarini kiriting.',
    successToast: 'Muvaffaqiyatli autentifikatsiya qilindi. Boshqaruv paneliga yo‘naltirilmoqda...',
  },
  en: {
    back: 'Back to Public Platform',
    title: 'CMS Portal Authentication',
    subtitle: 'Restricted access for Ashraf Turdialiyev platform administration',
    emailLabel: 'Admin Email',
    passwordLabel: 'Passphrase',
    submit: 'Authenticate & Enter',
    loading: 'Verifying Credentials...',
    footerNotice: 'Restricted access. Enter your administrator credentials.',
    successToast: 'Authenticated successfully. Entering CMS Portal...',
  },
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState<AdminLang>('uz');
  const t = LOGIN_T[lang];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

      toast.success(t.successToast);
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
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#0B0F19] text-[#101827] dark:text-[#F4F5F7] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Aurora Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#8D9FC5]/20 dark:bg-[#182A42]/80 rounded-full blur-3xl animate-aurora-slow" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#A78BFA]/15 dark:bg-[#A78BFA]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-[#B99A5B]/15 dark:bg-[#B99A5B]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-white/75 dark:bg-[#101827]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 transition-all">
        {/* Top return link & controls */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#101827] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.back}</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeSwitcher compact />

            <div className="flex items-center p-1 bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setLang('uz')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'uz'
                    ? 'bg-white dark:bg-[#182A42] text-[#101827] dark:text-white font-bold shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🇺🇿 Uz
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-white dark:bg-[#182A42] text-[#101827] dark:text-white font-bold shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🇬🇧 En
              </button>
            </div>
          </div>
        </div>

        {/* Brand Monogram */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#101827] border border-[#B99A5B]/50 flex items-center justify-center mx-auto text-xl font-serif font-bold text-[#eedda5] shadow-lg">
            AT
          </div>
          <h1 className="text-2xl font-bold text-[#101827] dark:text-white tracking-tight font-editorial">
            {t.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
              {t.emailLabel}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ashrafturdialiyev.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[#101827] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#B99A5B] focus:bg-white dark:focus:bg-[#182A42]/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[#101827] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#B99A5B] focus:bg-white dark:focus:bg-[#182A42]/50 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B99A5B] to-[#cfb478] text-[#101827] hover:shadow-lg hover:shadow-[#B99A5B]/30 font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#101827]" />
                <span>{t.loading}</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-[#101827]" />
                <span>{t.submit}</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/10">
          {t.footerNotice}
        </div>
      </div>
    </div>
  );
}
