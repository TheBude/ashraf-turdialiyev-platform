'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export default function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        className="relative w-9 h-9 rounded-xl flex items-center justify-center liquid-glass-subtle text-slate-700 dark:text-slate-200 hover:text-[#B99A5B] dark:hover:text-[#B99A5B] transition-all group"
        title={`Current: ${resolvedTheme === 'dark' ? 'Dark' : 'Light'} Mode`}
      >
        <span className="sr-only">Toggle theme</span>
        {resolvedTheme === 'dark' ? (
          <Sun className="w-4 h-4 text-[#eedda5] group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-[#2B4D76] group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#B99A5B]/50 transition-all"
        title="Theme Selector"
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-[#A78BFA]" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#B99A5B]" />
        )}
        <span className="capitalize hidden sm:inline">{theme}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl liquid-glass p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 shadow-2xl">
          <button
            onClick={() => {
              setTheme('light');
              setOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              theme === 'light'
                ? 'bg-[#B99A5B]/20 text-[#B99A5B] font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-white/5'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Light</span>
          </button>
          <button
            onClick={() => {
              setTheme('dark');
              setOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-[#B99A5B]/20 text-[#B99A5B] font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-white/5'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => {
              setTheme('system');
              setOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              theme === 'system'
                ? 'bg-[#B99A5B]/20 text-[#B99A5B] font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-white/5'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-slate-400" />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
}
