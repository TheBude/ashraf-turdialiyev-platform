import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ArrowRight, Compass, Globe, BookOpen, Award, Shield, Sparkles, MapPin, Calendar, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [
    featuredDestinations,
    globeLocationsCount,
    timelinePreview,
    featuredPub,
    audienceStats,
    settings,
  ] = await Promise.all([
    prisma.destination.findMany({
      where: { status: 'PUBLISHED' },
      take: 3,
      orderBy: { visitedAt: 'desc' },
    }),
    prisma.globeLocation.count({ where: { status: 'PUBLISHED' } }),
    prisma.timelineEvent.findMany({
      take: 4,
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
    }),
    prisma.publication.findFirst({
      where: { featured: true },
      orderBy: { year: 'desc' },
    }),
    prisma.audienceStat.findMany({ orderBy: { order: 'asc' } }),
    prisma.siteSetting.findMany(),
  ]);

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  const headline = settingsMap[`hero_headline_${locale}`] || settingsMap['hero_headline_en'] || 'Explorer. Scholar. Global Thinker.';
  const bio = settingsMap[`bio_${locale}`] || settingsMap['bio_en'] || 'Connecting historical scientific heritage with cutting-edge global innovation.';

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1F8] border border-[#ACC7E1] text-xs font-bold text-[#17243A]">
              <span className="w-2 h-2 rounded-full bg-[#B99A5B] animate-pulse"></span>
              <span>Official Personal Brand Platform</span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-[#2B4D76]">{globeLocationsCount}+ Expeditions Mapped</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#17243A] leading-[1.08]">
                Ashraf <span className="font-serif italic font-normal text-[#B99A5B]">Turdialiyev</span>
              </h1>
              <p className="text-lg sm:text-2xl font-serif text-[#252B35] leading-relaxed">
                {headline}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`/${locale}/globe`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#17243A] text-white font-semibold text-xs tracking-wide shadow-card hover:bg-[#2B4D76] hover:shadow-card-hover transition-all"
              >
                <Globe className="w-4 h-4 text-[#eedda5]" />
                <span>Explore 3D Earth Globe</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#eedda5]" />
              </Link>

              <Link
                href={`/${locale}/travels`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-[#17243A] font-semibold text-xs tracking-wide shadow-subtle hover:border-[#B99A5B] transition-all"
              >
                <Compass className="w-4 h-4 text-[#B99A5B]" />
                <span>Curated Expeditions</span>
              </Link>
            </div>
          </div>

          {/* Right Editorial Portrait & Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-card p-3 sm:p-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200"
                  alt="Ashraf Turdialiyev"
                  className="w-full h-full object-cover grayscale-[15%] contrast-105 hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17243A]/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#eedda5] block">
                    Geneva &bull; Tashkent &bull; Global
                  </span>
                  <div className="text-xl font-bold font-serif">Ashraf Turdialiyev</div>
                  <div className="text-xs text-slate-200 font-normal">
                    International Researcher, Alpinist & Keynote Speaker
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE AUDIENCE & IMPACT TELEMETRY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B] block mb-1">
                Verified Global Reach
              </span>
              <h2 className="text-2xl font-bold text-[#17243A]">Empirical Telemetry & Metrics</h2>
            </div>
            <Link
              href={`/${locale}/audience`}
              className="text-xs font-bold text-[#17243A] hover:text-[#B99A5B] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Detailed Audience Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {audienceStats.map((stat) => (
              <div key={stat.id} className="space-y-1 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <span className="text-xs font-medium text-slate-500 block truncate">
                  {stat.label}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#17243A] tracking-tight">
                  {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                </div>
                {stat.isSimulated && (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Live telemetry active
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 3D GLOBE CALLOUT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#17243A] text-white p-8 sm:p-14 shadow-card-hover overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#eedda5] block">
                Interactive Cartography
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif">
                Explore the Planet in Real 3D Space
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Step into a photorealistic, rotating 3D Earth globe. Inspect high-altitude research expeditions, ancient Silk Road waypoints, and diplomatic summits across Eurasia and the Americas.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href={`/${locale}/globe`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#B99A5B] text-black font-bold text-sm shadow-card hover:bg-[#eedda5] transition-all"
              >
                <Globe className="w-5 h-5 text-black" />
                <span>Launch 3D Globe</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED EXPEDITIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B] block mb-1">
              Field Chronicles
            </span>
            <h2 className="text-3xl font-extrabold text-[#17243A]">Curated Travel Expeditions</h2>
          </div>
          <Link
            href={`/${locale}/travels`}
            className="text-xs font-bold text-[#17243A] hover:text-[#B99A5B] flex items-center gap-1.5"
          >
            <span>View All Expeditions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => {
            let photos = [];
            try { photos = JSON.parse(dest.photos); } catch { photos = []; }
            const cover = photos[0] || 'https://images.unsplash.com/photo-1596484552829-9e8c07c29377?q=80&w=1200';

            return (
              <Link
                key={dest.id}
                href={`/${locale}/travels/${dest.slug}`}
                className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={cover}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#17243A] shadow-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B99A5B]" />
                    <span>{dest.city ? `${dest.city}, ` : ''}{dest.country}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#17243A] group-hover:text-[#B99A5B] transition-colors line-clamp-2">
                      {dest.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#17243A]">
                    <span className="text-slate-400 font-normal">
                      {new Date(dest.visitedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-[#B99A5B] group-hover:underline">
                      Read Chronicle &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURED RESEARCH TEASER */}
      {featuredPub && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#EAF1F8] border border-[#ACC7E1]/50 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2B4D76] block">
                Featured Scholarly Treatise
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] font-serif">
                {featuredPub.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {featuredPub.authors} &bull; <span className="italic">{featuredPub.journal}</span> ({featuredPub.year})
              </p>
              <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                {featuredPub.abstract}
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href={`/${locale}/research`}
                className="px-6 py-3 rounded-xl bg-[#17243A] text-white font-bold text-xs shadow-card hover:bg-[#2B4D76] transition-colors text-center"
              >
                Access Research Papers
              </Link>
              {featuredPub.link && (
                <a
                  href={featuredPub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-[#17243A] font-bold text-xs hover:border-[#B99A5B] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Direct DOI Link</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#B99A5B]" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
