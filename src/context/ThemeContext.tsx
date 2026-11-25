'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Read stored preference
    let stored: Theme | null = null;
    try {
      stored = (localStorage.getItem('ashraf_theme') as Theme) || null;
    } catch {
      stored = null;
    }

    const initial = stored || 'dark';
    setThemeState(initial);

    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved: ResolvedTheme = initial === 'system' ? (isSystemDark ? 'dark' : 'light') : initial;
    setResolvedTheme(resolved);

    // Apply to html class
    const root = document.documentElement;
    if (resolved === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('ashraf_theme', newTheme);
      document.cookie = `ashraf_theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}

    const isSystemDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved: ResolvedTheme = newTheme === 'system' ? (isSystemDark ? 'dark' : 'light') : newTheme;
    setResolvedTheme(resolved);

    const root = document.documentElement;
    if (resolved === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const next: Theme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  // Listen for OS theme changes when in 'system' mode
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const res: ResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(res);
      const root = document.documentElement;
      if (res === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mounted, theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
