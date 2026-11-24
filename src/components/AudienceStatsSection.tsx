'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Activity, Globe, Users, BookOpen, Compass } from 'lucide-react';

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

          // Occasionally tick up based on increment rate
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
        return <Globe className="w-5 h-5 text-[#d4af37]" />;
      case 'global_audience':
        return <Users className="w-5 h-5 text-sky-400" />;
      case 'academic_citations':
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 'expedition_distance':
        return <Compass className="w-5 h-5 text-amber-400" />;
      default:
        return <Activity className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <section className="py-12 bg-[#0b0e14] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {t.stats.liveSimulated}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t.stats.title}
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            {t.stats.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 rounded-2xl bg-[#121620] border border-slate-800/80 hover:border-[#d4af37]/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-[#181e2b] border border-slate-700/50 group-hover:scale-110 transition-transform">
                  {getIcon(stat.key)}
                </span>
                {stat.isSimulated && (
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Telemetry
                  </span>
                )}
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {stat.prefix}
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>

              <span className="text-xs font-medium text-slate-400 mt-1 block">
                {getLocalized(stat, 'label')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
