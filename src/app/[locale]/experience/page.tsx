import React from 'react';
import Link from 'next/link';

interface ExperiencePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

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

  const roles = [
    {
      period: '2022 — Present',
      role: isUz ? 'Bosh Ilmiy Maslahatchi va Dotsent' : isRu ? 'Главный научный советник и доцент' : isTr ? 'Baş Bilimsel Danışman ve Doçent' : 'Chief Scientific Advisor & Associate Professor',
      organization: 'Central Asian Institute of Advanced Technologies',
      location: 'Tashkent, Uzbekistan',
      description: isUz
        ? "Strategik innovatsiyalar, raqamli transformatsiya va xalqaro tadqiqot dasturlarini muvofiqlashtirish. 40 dan ortiq yosh olimlar va magistrantlarga ilmiy rahbarlik."
        : isRu
        ? 'Координация стратегических инноваций, цифровой трансформации и международных исследовательских программ. Научное руководство более чем 40 молодыми исследователями.'
        : isTr
        ? 'Stratejik inovasyon, dijital dönüşüm ve uluslararası araştırma programlarının koordinasyonu. 40tan fazla genç araştırmacıya akademik danışmanlık.'
        : 'Coordinating strategic innovations, digital transformation, and cross-border research frameworks. Mentoring over 40 graduate scholars and doctoral researchers.',
      type: 'ACADEMIC',
    },
    {
      period: '2020 — 2022',
      role: isUz ? 'Innovatsion Rivojlanish Bo‘yicha Ekspert' : isRu ? 'Эксперт по инновационному развитию' : isTr ? 'İnovasyon Geliştirme Uzmanı' : 'Senior Policy & Innovation Advisor',
      organization: 'Ministry of Higher Education, Science and Innovations',
      location: 'Tashkent, Uzbekistan',
      description: isUz
        ? "Ilmiy-tadqiqot institutlari faoliyatini baholash mezonlarini ishlab chiqish va xalqaro grantlarni jalb qilish komissiyasi a'zosi."
        : isRu
        ? 'Разработка критериев оценки эффективности научно-исследовательских институтов и привлечение грантов мировых фондов.'
        : isTr
        ? 'Araştırma enstitülerinin değerlendirme kriterlerinin geliştirilmesi ve uluslararası fonların yönetimi komisyonu üyeliği.'
        : 'Formulating evaluation frameworks for scientific research institutes and steering bilateral technological grant agreements.',
      type: 'POLICY',
    },
    {
      period: '2017 — 2020',
      role: isUz ? 'Katta Tadqiqotchi va Loyiha Rahbari' : isRu ? 'Старший исследователь и руководитель проектов' : isTr ? 'Kıdemli Araştırmacı ve Proje Yöneticisi' : 'Senior Research Fellow & Project Lead',
      organization: 'Eurasian Applied Physics & Geoscience Laboratories',
      location: 'Almaty & International Consortiums',
      description: isUz
        ? "Tog'li hududlar geodinamikasi, iqlim monitoringi va tabiiy resurslarni sun'iy yo'ldosh orqali tahlil qilish tizimlari loyihasi."
        : isRu
        ? 'Геодинамика горных регионов, климатический мониторинг и спутниковый анализ природных ресурсов.'
        : isTr
        ? 'Dağlık bölgelerin jeodinamiği, iklim izleme ve doğal kaynakların uydu analizi projesi liderliği.'
        : 'Heading high-altitude geodynamics, climate monitoring frameworks, and satellite telemetry integrations for alpine corridors.',
      type: 'EXPEDITION',
    },
  ];

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
                {item.organization} • <span className="font-mono text-xs">{item.location}</span>
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
