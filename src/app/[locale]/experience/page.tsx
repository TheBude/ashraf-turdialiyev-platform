import React from 'react';
import prisma from '@/lib/prisma';

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

  // Fetch experiences from DB, fallback to default roles if DB is empty
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
    <div className="bg-[#F8F8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-navy/10 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>{isUz ? 'Professional Tajriba' : isRu ? 'Карьера' : isTr ? 'Kariyer' : 'Track Record'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-navy font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Roles List */}
        <div className="space-y-8">
          {roles.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-navy/5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-soft-blue/40 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-gold tracking-widest uppercase">
                  {item.period}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-soft-blue text-navy border border-navy/10">
                  {item.type}
                </span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-navy mb-2">
                {item.role}
              </h2>

              <p className="text-sm font-semibold text-charcoal/70 mb-4">
                {item.organization} {item.location ? `• ${item.location}` : ''}
              </p>

              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
