import React from 'react';
import prisma from '@/lib/prisma';
import AudienceStatsSection from '@/components/AudienceStatsSection';
import { Activity, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen py-10 space-y-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>{isUz ? 'Jonli Telemetriya' : isRu ? 'Телеметрия' : isTr ? 'Canlı Telemetri' : 'Live Telemetry'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#101827] dark:text-[#F4F5F7] font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Interactive Stats Component in Liquid Glass */}
        <div className="mb-14">
          <AudienceStatsSection initialStats={stats} />
        </div>

        {/* Global Demographics Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl liquid-glass-card space-y-3">
            <span className="text-xs font-mono font-bold text-[#B99A5B] uppercase tracking-wider block">
              {card1Tag}
            </span>
            <h3 className="font-editorial text-2xl font-bold text-[#101827] dark:text-white">
              {card1Title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {card1Desc}
            </p>
          </div>

          <div className="p-8 rounded-3xl liquid-glass-card space-y-3">
            <span className="text-xs font-mono font-bold text-[#8D9FC5] uppercase tracking-wider block">
              {card2Tag}
            </span>
            <h3 className="font-editorial text-2xl font-bold text-[#101827] dark:text-white">
              {card2Title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {card2Desc}
            </p>
          </div>

          <div className="p-8 rounded-3xl liquid-glass-card space-y-3">
            <span className="text-xs font-mono font-bold text-[#A78BFA] uppercase tracking-wider block">
              {card3Tag}
            </span>
            <h3 className="font-editorial text-2xl font-bold text-[#101827] dark:text-white">
              {card3Title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {card3Desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
