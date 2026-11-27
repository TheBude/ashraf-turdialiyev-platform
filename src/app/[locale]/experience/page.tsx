import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/page-seo';
import prisma from '@/lib/prisma';
import { Briefcase, Building, MapPin, Sparkles } from 'lucide-react';

interface ExperiencePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

const DEFAULT_ROLES = [
  {
    period: '2022 — Present',
    role: 'Chief Scientific Advisor & Associate Professor',
    roleUz: 'Bosh Ilmiy Maslahatchi va Dotsent',
    roleRu: 'Главный научный советник и доцент',
    roleTr: 'Baş Bilimsel Danışman ve Doçent',
    organization: 'Central Asian Institute of Advanced Technologies',
    location: 'Tashkent, Uzbekistan',
    description: 'Coordinating strategic innovations, digital transformation, and cross-border research frameworks. Mentoring over 40 graduate scholars and doctoral researchers.',
    descriptionUz: 'Strategik innovatsiyalar, raqamli transformatsiya va xalqaro tadqiqot dasturlarini muvofiqlashtirish. 40 dan ortiq yosh olimlar va magistrantlarga ilmiy rahbarlik.',
    descriptionRu: 'Координация стратегических инноваций, цифровой трансформации и международных исследовательских программ. Научное руководство более чем 40 молодыми исследователями.',
    descriptionTr: 'Stratejik inovasyon, dijital dönüşüm ve uluslararası araştırma programlarının koordinasyonu. 40tan fazla genç araştırmacıya akademik danışmanlık.',
    type: 'ACADEMIC',
  },
  {
    period: '2020 — 2022',
    role: 'Senior Policy & Innovation Advisor',
    roleUz: 'Innovatsion Rivojlanish Bo‘yicha Ekspert',
    roleRu: 'Эксперт по инновационному развитию',
    roleTr: 'İnovasyon Geliştirme Uzmanı',
    organization: 'Ministry of Higher Education, Science and Innovations',
    location: 'Tashkent, Uzbekistan',
    description: 'Formulating evaluation frameworks for scientific research institutes and steering bilateral technological grant agreements.',
    descriptionUz: "Ilmiy-tadqiqot institutlari faoliyatini baholash mezonlarini ishlab chiqish va xalqaro grantlarni jalb qilish komissiyasi a'zosi.",
    descriptionRu: 'Разработка критериев оценки эффективности научно-исследовательских институтов и привлечение грантов мировых фондов.',
    descriptionTr: 'Araştırma enstitülerinin değerlendirme kriterlerinin geliştirilmesi ve uluslararası fonların yönetimi komisyonu üyeliği.',
    type: 'POLICY',
  },
  {
    period: '2017 — 2020',
    role: 'Senior Research Fellow & Project Lead',
    roleUz: 'Katta Tadqiqotchi va Loyiha Rahbari',
    roleRu: 'Старший исследователь и руководитель проектов',
    roleTr: 'Kıdemli Araştırmacı ve Proje Yöneticisi',
    organization: 'Eurasian Applied Physics & Geoscience Laboratories',
    location: 'Almaty & International Consortiums',
    description: 'Heading high-altitude geodynamics, climate monitoring frameworks, and satellite telemetry integrations for alpine corridors.',
    descriptionUz: "Tog'li hududlar geodinamikasi, iqlim monitoringi va tabiiy resurslarni sun'iy yo'ldosh orqali tahlil qilish tizimlari loyihasi.",
    descriptionRu: 'Геодинамика горных регионов, климатический мониторинг и спутниковый анализ природных ресурсов.',
    descriptionTr: 'Dağlık bölgelerin jeodinamiği, iklim izleme ve doğal kaynakların uydu analizi projesi liderliği.',
    type: 'EXPEDITION',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, 'experience');
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { locale } = await params;

  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const title = isUz
    ? 'Tajriba va Lavozimlar'
    : isRu
    ? 'Опыт и Назначения'
    : isTr
    ? 'Deneyim ve Görevler'
    : 'Professional Experience & Appointments';

  const subtitle = isUz
    ? 'Akademik kafedra rahbarligi, xalqaro maslahatchilik, davlat komissiyalari va yetakchilik faoliyati.'
    : isRu
    ? 'Академическое руководство, международный консалтинг, государственные экспертные советы и дипломатические миссии.'
    : isTr
    ? 'Akademik liderlik, uluslararası danışmanlık, devlet kurulları ve diplomatik görevler.'
    : 'Executive leadership appointments, academic deanships, governmental advisory boards, and scientific commissions.';

  let roles: Array<{
    period: string;
    role: string;
    organization: string;
    location: string | null;
    description: string;
    type: string;
  }> = [];

  try {
    const dbRoles = await prisma.experience.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    if (dbRoles.length > 0) {
      roles = dbRoles.map((item) => ({
        period: item.period,
        role: isUz && item.roleUz ? item.roleUz : isRu && item.roleRu ? item.roleRu : isTr && item.roleTr ? item.roleTr : item.role,
        organization: item.organization,
        location: item.location,
        description: isUz && item.descriptionUz ? item.descriptionUz : isRu && item.descriptionRu ? item.descriptionRu : isTr && item.descriptionTr ? item.descriptionTr : item.description,
        type: item.type,
      }));
    }
  } catch (err) {
    console.warn('Could not query Experience table, falling back to defaults:', err);
  }

  if (roles.length === 0) {
    roles = DEFAULT_ROLES.map((item) => ({
      period: item.period,
      role: isUz ? item.roleUz : isRu ? item.roleRu : isTr ? item.roleTr : item.role,
      organization: item.organization,
      location: item.location,
      description: isUz ? item.descriptionUz : isRu ? item.descriptionRu : isTr ? item.descriptionTr : item.description,
      type: item.type,
    }));
  }

  return (
    <div className="min-h-screen py-10 space-y-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Briefcase className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>{isUz ? 'Professional Tajriba' : isRu ? 'Карьера' : isTr ? 'Kariyer' : 'Track Record'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#101827] dark:text-[#F4F5F7] font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Roles List in Liquid Glass Cards */}
        <div className="space-y-8">
          {roles.map((item, idx) => (
            <div
              key={idx}
              className="liquid-glass rounded-3xl p-8 sm:p-10 shadow-glass hover:shadow-2xl hover:border-[#B99A5B]/60 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-[#B99A5B] tracking-widest uppercase">
                  {item.period}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase liquid-glass-badge text-[#101827] dark:text-white">
                  {item.type}
                </span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#101827] dark:text-white mb-2">
                {item.role}
              </h2>

              <p className="text-sm font-semibold text-[#B99A5B] mb-4 flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{item.organization}</span>
                {item.location && (
                  <>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-normal text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </>
                )}
              </p>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
