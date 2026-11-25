'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Activity, Globe, Users, BookOpen, Compass, Sparkles } from 'lucide-react';

interface AudienceStatItem {
  id: string;
  key: string;
  label: string;
  labelUz?: string | null;
  labelRu?: string | null;
  labelTr?: string | null;
  value: number;
  prefix?: string | null;
  suffix?: string | null;
  isSimulated: boolean;
  incrementRate: number;
}

interface StatsProps {
  initialStats: AudienceStatItem[];
}

export default function AudienceStatsSection({ initialStats }: StatsProps) {
  const { lang, t, getLocalized } = useLanguage();
  const [stats, setStats] = useState<AudienceStatItem[]>(initialStats);

  // Live gentle simulation ticks on the client side
  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prev) =>
        prev.map((item) => {
          if (!item.isSimulated || item.incrementRate <= 0) return item;

          const shouldTick = Math.random() < item.incrementRate;
          if (shouldTick) {
            const added = Math.floor(Math.random() * 3) + 1;
            return {
              ...item,
              value: item.value + added,
            };
          }
          return item;
        })
      );
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const getIcon = (key: string) => {
    switch (key) {
      case 'countries_visited':
        return <Globe className="w-5 h-5 text-[#B99A5B]" />;
      case 'global_audience':
        return <Users className="w-5 h-5 text-[#8D9FC5]" />;
      case 'academic_citations':
        return <BookOpen className="w-5 h-5 text-[#A78BFA]" />;
      case 'expedition_distance':
        return <Compass className="w-5 h-5 text-[#B99A5B]" />;
      default:
        return <Activity className="w-5 h-5 text-[#B99A5B]" />;
    }
  };

  return (
    <section className="p-8 sm:p-12 rounded-3xl liquid-glass shadow-glass space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/5 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B99A5B] mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{t.stats.liveSimulated}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#101827] dark:text-white">
            {t.stats.title}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">
          {t.stats.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="p-6 rounded-2xl liquid-glass-subtle hover:border-[#B99A5B]/60 hover:shadow-glass hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl liquid-glass-badge group-hover:scale-110 transition-transform">
                {getIcon(stat.key)}
              </span>
              {stat.isSimulated && (
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  Telemetry
                </span>
              )}
            </div>

            <div className="text-2xl sm:text-4xl font-extrabold text-[#101827] dark:text-white tracking-tight font-editorial group-hover:text-[#B99A5B] transition-colors">
              {stat.prefix}
              {stat.value.toLocaleString()}
              {stat.suffix}
            </div>

            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 block">
              {getLocalized(stat, 'label')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
