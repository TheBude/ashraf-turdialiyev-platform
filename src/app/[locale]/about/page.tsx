import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Compass, BookOpen, Award, ArrowRight, ShieldCheck, CheckCircle2, GraduationCap, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const settings = await prisma.siteSetting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => { settingsMap[s.key] = s.value; });

  const bio = settingsMap[`bio_${locale}`] || settingsMap['bio_en'] || '';
  const headline = settingsMap[`hero_headline_${locale}`] || settingsMap['hero_headline_en'] || '';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B] block">
          Comprehensive Dossier & Biography
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#17243A] font-serif">
          About Ashraf Turdialiyev
        </h1>
        <p className="text-lg text-slate-600 font-serif">
          {headline}
        </p>
      </div>

      {/* Full Portrait & Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5 rounded-3xl overflow-hidden border border-slate-200 shadow-card bg-white p-3 sm:p-4 group">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#17243A] to-[#223B5A] relative">
            <img
              src="/images/ashraf-turdialiyev.jpg"
              alt="Ashraf Turdialiyev"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17243A]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#eedda5] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5B] animate-pulse" />
                Geneva &bull; Tashkent &bull; Global
              </span>
              <div className="text-xl font-bold font-serif">Ashraf Turdialiyev</div>
              <div className="text-xs text-slate-300 font-normal">
                International Explorer &bull; Scholar &bull; Envoy
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-6 text-slate-700 leading-relaxed text-base">
          <h2 className="text-2xl font-bold text-[#17243A] font-serif">
            A Vision for Scientific Diplomacy & High-Altitude Inquiry
          </h2>
          <p>{bio}</p>
          <p>
            Having traversed over 40 sovereign nations across Eurasia, the Americas, and North Africa, Ashraf Turdialiyev focuses on empirical fieldwork. His investigations analyze how historical trade corridors—most notably the ancient Silk Road—inform contemporary multimodal logistics, renewable transit infrastructure, and climate adaptation in high mountain ecosystems.
          </p>
          <p>
            Through academic keynotes and international youth mentorship programs, he actively connects emerging leaders across Central Asia and Europe with world-class research institutions.
          </p>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
          <Compass className="w-6 h-6 text-[#B99A5B]" />
          <h3 className="font-bold text-[#17243A] text-lg">Alpine & Glacier Fieldwork</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conducting hydrological and glacial recession assessments across the Alps, Pamir, and Tien Shan mountain systems.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
          <BookOpen className="w-6 h-6 text-[#2B4D76]" />
          <h3 className="font-bold text-[#17243A] text-lg">Eurasian Trade Corridors</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Publishing peer-reviewed economic research on multimodal transit, Middle Corridor infrastructure, and regional logistics.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
          <Award className="w-6 h-6 text-[#B99A5B]" />
          <h3 className="font-bold text-[#17243A] text-lg">Youth Mentorship & Envoy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Empowering more than 10,000 ambitious students with international fellowship guidance, academic writing, and leadership.
          </p>
        </div>
      </div>

      {/* Navigation Call to Action */}
      <div className="p-8 rounded-3xl bg-[#EAF1F8] border border-[#ACC7E1]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-[#17243A] text-lg">Inspect Travel Expeditions & 3D Globe</h4>
          <p className="text-xs text-slate-600">Discover all geo-located field notes across continents.</p>
        </div>
        <Link
          href={`/${locale}/globe`}
          className="px-6 py-3 rounded-xl bg-[#17243A] text-white font-bold text-xs shadow-card hover:bg-[#2B4D76] transition-colors flex items-center gap-2"
        >
          <span>Launch 3D Globe</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
