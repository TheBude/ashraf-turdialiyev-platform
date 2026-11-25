'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

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
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EAF1F8]/80 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#B99A5B]/10 rounded-full blur-2xl" />
      </div>

      <div className="relative w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        {/* Top return link & language switcher */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#17243A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.back}</span>
          </Link>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-medium">
            <button
              type="button"
              onClick={() => setLang('uz')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'uz' ? 'bg-white text-[#17243A] font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🇺🇿 Uz
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'en' ? 'bg-white text-[#17243A] font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🇬🇧 En
            </button>
          </div>
        </div>

        {/* Brand Monogram */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#17243A] border border-[#B99A5B]/40 flex items-center justify-center mx-auto text-xl font-serif font-bold text-[#eedda5] shadow-md">
            AT
          </div>
          <h1 className="text-2xl font-bold text-[#17243A] tracking-tight font-editorial">
            {t.title}
          </h1>
          <p className="text-xs text-slate-500">
            {t.subtitle}
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F5F7] border border-slate-200 text-sm text-[#17243A] placeholder-slate-400 focus:outline-none focus:border-[#B99A5B] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
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
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#F4F5F7] border border-slate-200 text-sm text-[#17243A] placeholder-slate-400 focus:outline-none focus:border-[#B99A5B] focus:bg-white transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#17243A] text-white hover:bg-[#17243A]/90 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#B99A5B]" />
                <span>{t.loading}</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-[#B99A5B]" />
                <span>{t.submit}</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100">
          {t.footerNotice}
        </div>
      </div>
    </div>
  );
}
