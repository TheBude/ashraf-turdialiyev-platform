import React from 'react';
import prisma from '@/lib/prisma';
import AudienceStatsSection from '@/components/AudienceStatsSection';

interface AudiencePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export default async function AudiencePage({ params }: AudiencePageProps) {
  const { locale } = await params;

  let stats: any[] = [];
  try {
    stats = await prisma.audienceStat.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Failed to load audience stats:', error);
  }

  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const title = isUz
    ? 'Auditoriya va Global Qamrov'
    : isRu
    ? 'Аудитория и Глобальный Охват'
    : isTr
    ? 'Hedef Kitle ve Küresel Erişim'
    : 'Audience Reach & Global Telemetry';

  const subtitle = isUz
    ? "O‘quvchilar, ilmiy izdoshlar, talabalar va xalqaro hamjamiyat qamrovi bo‘yicha dinamik telemetriya ko‘rsatkichlari."
    : isRu
    ? 'Динамические показатели телеметрии: читательская аудитория, исследователи, студенты и охват публикаций.'
    : isTr
    ? 'Okuyucular, bilim insanları, öğrenciler ve uluslararası topluluk erişimine dair dinamik telemetri göstergeleri.'
    : 'Real-time telemetry and simulated readership dynamics across academic lectures, digital platforms, and expedition followers.';

  const card1Tag = isUz ? '01 • Akademik Iqtiboslar' : isRu ? '01 • Академические Цитаты' : isTr ? '01 • Akademik Atıflar' : '01 • Academic Citations';
  const card1Title = isUz ? 'Xalqaro Ilmiy Qamrov' : isRu ? 'Рецензируемый Охват' : isTr ? 'Hakemli Erişim' : 'Peer-Reviewed Reach';
  const card1Desc = isUz 
    ? '28 dan ortiq davlat olimlari tomonidan o‘rganilgan va nufuzli xalqaro indekslangan ma’lumotlar bazalariga kiritilgan ilmiy nashrlar.' 
    : isRu 
    ? 'Научные публикации, индексируемые в международных базах данных, с исследователями из более чем 28 стран.' 
    : isTr 
    ? '28den fazla ülkeden araştırmacının eriştiği, uluslararası indeksli veri tabanlarında yer alan bilimsel yayınlar.' 
    : 'Research publications indexed in international indexing databases with researchers spanning 28+ countries.';

  const card2Tag = isUz ? '02 • Raqamli Mentorlik' : isRu ? '02 • Цифровое Наставничество' : isTr ? '02 • Dijital Mentorluk' : '02 • Digital Mentorship';
  const card2Title = isUz ? 'Kelajak Avlod Olimlari' : isRu ? 'Молодые Ученые' : isTr ? 'Gelecek Nesil Bilim İnsanları' : 'Next-Gen Scholars';
  const card2Desc = isUz 
    ? 'Markaziy Osiyo va xorijiy talabalar uchun o‘tkazilgan amaliy seminarlar, mahorat darslari va ta’limiy vebinarlar.' 
    : isRu 
    ? 'Семинары, мастер-классы и образовательные вебинары для молодых ученых Центральной Азии и зарубежных стран.' 
    : isTr 
    ? 'Orta Asya ve yabancı ülkelerdeki genç bilim insanları için düzenlenen seminerler, ustalık sınıfları ve eğitim web seminerleri.' 
    : 'Seminars, masterclasses, and educational webinars delivered to aspiring Central Asian tech and science fellows.';

  const card3Tag = isUz ? '03 • Ekspeditsiya Hamjamiyati' : isRu ? '03 • Сообщество Экспедиций' : isTr ? '03 • Keşif Topluluğu' : '03 • Expedition Community';
  const card3Title = isUz ? 'Alp va Sayohat Qaydnomalari' : isRu ? 'Альпийские и Путевые Заметки' : isTr ? 'Alp ve Seyahat Günlükleri' : 'Alpine & Travel Logs';
  const card3Desc = isUz 
    ? 'Geografik ocherklar, professional fotoxronikalar va baland tog‘ dala eslatmalari bilan muntazam tanishuvchi sayyohlar va ilmiy muxlislar.' 
    : isRu 
    ? 'Исследователи и любители гор, следящие за географическими публикациями, фотографиями и высокогорными отчетами.' 
    : isTr 
    ? 'Coğrafi yayınlar, fotoğrafçılık ve yüksek irtifa saha notlarıyla etkileşimde bulunan gezginler ve dağ severler.' 
    : 'Explorers and mountain enthusiasts engaging with geographical dispatches, photography, and high-altitude field notes.';

  return (
    <div className="bg-[#F8F8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-navy/10 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isUz ? 'Jonli Telemetriya' : isRu ? 'Телеметрия' : isTr ? 'Canlı Telemetri' : 'Live Telemetry'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-navy font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Interactive Stats Component */}
        <div className="mb-16">
          <AudienceStatsSection initialStats={stats} />
        </div>

        {/* Global Demographics / Channel Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-navy/5 shadow-sm">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">
              {card1Tag}
            </span>
            <h3 className="font-editorial text-2xl font-bold text-navy mb-2">
              {card1Title}
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              {card1Desc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-navy/5 shadow-sm">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">
              {card2Tag}
            </span>
            <h3 className="font-editorial text-2xl font-bold text-navy mb-2">
              {card2Title}
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              {card2Desc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-navy/5 shadow-sm">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block mb-2">
              {card3Tag}
            </span>
            <h3 className="font-editorial text-2xl font-bold text-navy mb-2">
              {card3Title}
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              {card3Desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
