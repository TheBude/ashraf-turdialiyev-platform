'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, MapPin, Calendar, Compass, Info, CheckCircle2, ChevronRight } from 'lucide-react';

export interface VisitedCountryData {
  id: string;
  isoCode: string;
  countryName: string;
  countryNameUz?: string | null;
  countryNameRu?: string | null;
  countryNameTr?: string | null;
  visitedYear: number;
  notes?: string | null;
  flag?: string | null;
  coordinates?: string | null;
  highlightColor?: string | null;
}

interface WorldMapProps {
  countries: VisitedCountryData[];
}

export default function WorldMapSection({ countries }: WorldMapProps) {
  const { lang, t, getLocalized } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<VisitedCountryData>(countries[0] || null);
  const [hoveredCountry, setHoveredCountry] = useState<VisitedCountryData | null>(null);

  // Geographic SVG Pin positions normalized to map coordinates (viewBox 0 0 1000 500)
  const pinCoordinates: Record<string, { x: number; y: number; region: string }> = {
    UZ: { x: 670, y: 195, region: 'Central Asia' },
    KZ: { x: 665, y: 160, region: 'Central Asia' },
    TR: { x: 585, y: 215, region: 'Eurasia' },
    CH: { x: 505, y: 195, region: 'Europe' },
    DE: { x: 515, y: 180, region: 'Europe' },
    GB: { x: 480, y: 175, region: 'Europe' },
    IT: { x: 520, y: 215, region: 'Europe' },
    EG: { x: 575, y: 260, region: 'North Africa' },
    AE: { x: 635, y: 255, region: 'Middle East' },
    JP: { x: 860, y: 220, region: 'East Asia' },
    KR: { x: 825, y: 215, region: 'East Asia' },
    US: { x: 230, y: 210, region: 'North America' },
    AZ: { x: 615, y: 205, region: 'Caucasus' },
  };

  return (
    <section id="world-map" className="py-20 bg-[#08090c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b26] border border-[#d4af37]/30 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.map.countriesVisitedCount}: {countries.length}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.map.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.map.subtitle}
          </p>
        </div>

        {/* Map Canvas and Info Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Interactive Vector Map Canvas */}
          <div className="lg:col-span-8 p-4 sm:p-6 rounded-2xl bg-[#0f131c] border border-slate-800/90 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"></span>
                <span>Documented Field Expeditions</span>
              </span>
              <span className="hidden sm:inline italic">
                {t.map.hint}
              </span>
            </div>

            {/* SVG World Map */}
            <div className="relative w-full aspect-[2/1] my-4 select-none">
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1f293d25" strokeWidth="0.5" />
                  </pattern>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="1000" height="500" fill="url(#grid)" />

                {/* Continental Vector Base Shapes (Stylized High-End Cartography) */}
                {/* North America */}
                <path
                  d="M120,80 Q170,60 260,80 Q320,110 300,180 Q260,240 230,280 Q210,240 180,210 Q140,160 120,80 Z"
                  fill="#181e2b"
                  stroke="#283247"
                  strokeWidth="1"
                />
                {/* South America */}
                <path
                  d="M260,300 Q320,330 330,380 Q310,460 280,480 Q250,420 250,350 Z"
                  fill="#181e2b"
                  stroke="#283247"
                  strokeWidth="1"
                />
                {/* Europe */}
                <path
                  d="M460,120 Q540,100 560,160 Q530,220 480,220 Q460,170 460,120 Z"
                  fill="#181e2b"
                  stroke="#283247"
                  strokeWidth="1"
                />
                {/* Africa */}
                <path
                  d="M480,230 Q580,230 600,310 Q580,420 530,440 Q470,360 480,230 Z"
                  fill="#181e2b"
                  stroke="#283247"
                  strokeWidth="1"
                />
                {/* Asia / Eurasia */}
                <path
                  d="M560,90 Q720,70 870,140 Q900,240 820,310 Q730,280 660,250 Q580,220 560,90 Z"
                  fill="#181e2b"
                  stroke="#283247"
                  strokeWidth="1"
                />
                {/* Australia / Oceania */}
                <path
                  d="M780,360 Q860,350 880,410 Q830,450 780,420 Z"
                  fill="#181e2b"
                  stroke="#283247"
                  strokeWidth="1"
                />

                {/* Visited Country Interactive Markers */}
                {countries.map((country) => {
                  const pos = pinCoordinates[country.isoCode] || { x: 500, y: 250 };
                  const isSelected = selectedCountry?.id === country.id;
                  const isHovered = hoveredCountry?.id === country.id;

                  return (
                    <g
                      key={country.id}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedCountry(country)}
                      onMouseEnter={() => setHoveredCountry(country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      {/* Pulse halo on selected */}
                      {isSelected && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="18"
                          fill="none"
                          stroke="#d4af37"
                          strokeWidth="1.5"
                          className="animate-ping opacity-60"
                        />
                      )}

                      {/* Main Glow Circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 10 : isHovered ? 8 : 6}
                        fill={isSelected ? '#d4af37' : '#eedda5'}
                        stroke="#08090c"
                        strokeWidth="2"
                        className="transition-all duration-200 shadow-gold"
                      />

                      {/* Inner Dot */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 4 : 2.5}
                        fill="#08090c"
                      />

                      {/* Floating Text Label */}
                      {(isSelected || isHovered) && (
                        <text
                          x={pos.x}
                          y={pos.y - 14}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                          className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                        >
                          {country.flag} {getLocalized(country, 'countryName')} ({country.visitedYear})
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Country Pills Bar */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {countries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountry(c)}
                  className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCountry?.id === c.id
                      ? 'bg-[#d4af37] text-black font-bold shadow-gold'
                      : 'bg-[#151a24] text-slate-300 hover:bg-[#1e2533] hover:text-white'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{getLocalized(c, 'countryName')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Country Dossier Panel */}
          <div className="lg:col-span-4 bg-[#0f131c] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                {t.map.selectedCountry}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1a202c] text-slate-300 font-mono">
                ISO: {selectedCountry?.isoCode}
              </span>
            </div>

            {selectedCountry ? (
              <div className="space-y-5 animate-in fade-in">
                {/* Country Name & Flag */}
                <div className="flex items-start gap-4">
                  <div className="text-4xl p-2 rounded-xl bg-[#161b26] border border-slate-700/60 flex items-center justify-center">
                    {selectedCountry.flag || '🌐'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {getLocalized(selectedCountry, 'countryName')}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#eedda5] mt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{t.map.visitedYear}: {selectedCountry.visitedYear}</span>
                    </div>
                  </div>
                </div>

                {/* Coordinates */}
                {selectedCountry.coordinates && (
                  <div className="p-3 rounded-xl bg-[#141822] border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Field Coordinates</span>
                      <span className="font-mono text-slate-200">{selectedCountry.coordinates}</span>
                    </div>
                  </div>
                )}

                {/* Expedition Notes */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    {t.map.notes}
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed bg-[#141822]/60 p-4 rounded-xl border border-slate-800/60">
                    {getLocalized(selectedCountry, 'notes') || selectedCountry.notes || 'Research and cultural documentation expedition.'}
                  </p>
                </div>

                {/* Status validation */}
                <div className="flex items-center gap-2 text-xs text-emerald-400 pt-2 border-t border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Field data verified & archived in platform</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm">
                Select a country on the world map to inspect records.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
