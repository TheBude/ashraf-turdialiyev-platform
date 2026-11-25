import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Compass, BookOpen, Award, ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ABOUT_I18N = {
  uz: {
    badge: 'Keng Qamrovli Dosye va Tarjimai Hol',
    title: 'Ashraf Turdialiyev Haqida',
    role: 'Xalqaro Tadqiqotchi • Olim • Vakil',
    subheading: 'Ilmiy Diplomatiya va Baland Tog‘ Tadqiqotlari Strategiyasi',
    bioFallback: 'Ashraf Turdialiyev — xalqaro miqyosdagi tadqiqotchi, Yevroosiyo tranzit yo‘laklari bo‘yicha ekspert va intellektual yetakchi.',
    paragraph1: 'Yevroosiyo, Amerika va Shimoliy Afrika bo‘ylab 40 dan ortiq suveren davlatlarga sayohat qilgan Ashraf Turdialiyev empirik dala tadqiqotlariga alohida e’tibor qaratadi. Uning tadqiqotlari tarixiy savdo yo‘llari — xususan, qadimiy Buyuk Ipak yo‘lining zamonaviy multimodal logistika, qayta tiklanuvchi tranzit infratuzilmasi va baland tog‘ ekotizimlarida iqlim o‘zgarishiga moslashuvga ta’sirini chuqur tahlil qiladi.',
    paragraph2: 'Akademik ma’ruzalar, xalqaro forumlar va yoshlar mentorlik dasturlari orqali u Markaziy Osiyo hamda Yevropadagi yosh yetakchilarni dunyoning yetakchi ilmiy-tadqiqot institutlari bilan faol bog‘lab kelmoqda.',
    pillar1Title: 'Alp va Muzliklar Tadqiqoti',
    pillar1Desc: 'Alp, Pomir va Tyanshan tog‘ tizimlarida gidrologik o‘zgarishlar va muzliklarning erishi tahlillarini olib borish.',
    pillar2Title: 'Yevroosiyo Savdo Yo‘laklari',
    pillar2Desc: 'Multimodal tranzit, O‘rta Koridor infratuzilmasi va mintaqaviy logistika bo‘yicha xalqaro ilmiy tadqiqotlar chop etish.',
    pillar3Title: 'Yoshlar Mentorligi va Elchilik',
    pillar3Desc: '10 000 dan ortiq intiluvchan talabalarga xalqaro stipendiyalar, ilmiy maqolalar yozish va yetakchilik yo‘nalishida amaliy ko‘mak berish.',
    ctaTitle: 'Sayohat Ekspeditsiyalari va 3D Globus',
    ctaDesc: 'Qit’alar bo‘ylab geografik koordinatali dala qaydlarini kashf eting.',
    ctaButton: '3D Globusni Ochish',
  },
  en: {
    badge: 'Comprehensive Dossier & Biography',
    title: 'About Ashraf Turdialiyev',
    role: 'International Explorer • Scholar • Envoy',
    subheading: 'A Vision for Scientific Diplomacy & High-Altitude Inquiry',
    bioFallback: 'Ashraf Turdialiyev is an international explorer, scholar on Eurasian transport corridors, and academic leader.',
    paragraph1: 'Having traversed over 40 sovereign nations across Eurasia, the Americas, and North Africa, Ashraf Turdialiyev focuses on empirical fieldwork. His investigations analyze how historical trade corridors—most notably the ancient Silk Road—inform contemporary multimodal logistics, renewable transit infrastructure, and climate adaptation in high mountain ecosystems.',
    paragraph2: 'Through academic keynotes and international youth mentorship programs, he actively connects emerging leaders across Central Asia and Europe with world-class research institutions.',
    pillar1Title: 'Alpine & Glacier Fieldwork',
    pillar1Desc: 'Conducting hydrological and glacial recession assessments across the Alps, Pamir, and Tien Shan mountain systems.',
    pillar2Title: 'Eurasian Trade Corridors',
    pillar2Desc: 'Publishing peer-reviewed economic research on multimodal transit, Middle Corridor infrastructure, and regional logistics.',
    pillar3Title: 'Youth Mentorship & Envoy',
    pillar3Desc: 'Empowering more than 10,000 ambitious students with international fellowship guidance, academic writing, and leadership.',
    ctaTitle: 'Inspect Travel Expeditions & 3D Globe',
    ctaDesc: 'Discover all geo-located field notes across continents.',
    ctaButton: 'Launch 3D Globe',
  },
  ru: {
    badge: 'Полное Досье и Биография',
    title: 'Об Ашрафе Турдиалиеве',
    role: 'Международный Исследователь • Ученый • Дипломат',
    subheading: 'Видение научной дипломатии и высокогорных исследований',
    bioFallback: 'Ашраф Турдиалиев — международный исследователь, эксперт по евразийским транзитным коридорам и академический лидер.',
    paragraph1: 'Побывав в более чем 40 суверенных государствах Евразии, Америки и Северной Африки, Ашраф Турдиалиев уделяет особое внимание эмпирическим полевым исследованиям. Его работы анализируют влияние исторических торговых путей — прежде всего Великого Шелкового пути — на современную мультимодальную логистику, зеленую транзитную инфраструктуру и адаптацию к изменению климата в высокогорных экосистемах.',
    paragraph2: 'Выступая с ключевыми докладами и руководя молодежными программами наставничества, он соединяет молодых лидеров Центральной Азии и Европы с ведущими мировыми исследовательскими центрами.',
    pillar1Title: 'Альпийские и ледниковые исследования',
    pillar1Desc: 'Проведение гидрологических оценок и мониторинга отступления ледников в Альпах, на Памире и Тянь-Шане.',
    pillar2Title: 'Евразийские торговые коридоры',
    pillar2Desc: 'Публикация рецензируемых исследований по мультимодальному транзиту, инфраструктуре Срединного коридора и логистике.',
    pillar3Title: 'Наставничество молодежи и дипломатия',
    pillar3Desc: 'Поддержка более 10 000 амбициозных студентов в получении международных стипендий, написании научных статей и лидерстве.',
    ctaTitle: 'Экспедиции и 3D-глобус Земли',
    ctaDesc: 'Исследуйте геопривязанные полевые отчеты по всем континентам.',
    ctaButton: 'Запустить 3D-глобус',
  },
  tr: {
    badge: 'Kapsamlı Dosya ve Biyografi',
    title: 'Ashraf Turdialiyev Hakkında',
    role: 'Uluslararası Gezgin • Akademisyen • Elçi',
    subheading: 'Bilimsel Diplomasi ve Yüksek İrtifa Araştırmaları Vizyonu',
    bioFallback: 'Ashraf Turdialiyev, uluslararası araştırmacı, Avrasya transit koridorları uzmanı ve akademik liderdir.',
    paragraph1: 'Avrasya, Amerika ve Kuzey Afrika genelinde 40\'tan fazla egemen devleti gezen Ashraf Turdialiyev, ampirik saha çalışmalarına odaklanmaktadır. İncelemeleri, tarihi ticaret yollarının — özellikle antik İpek Yolu\'nun — çağdaş çok modlu lojistik, yenilenebilir transit altyapısı ve yüksek dağ ekosistemlerinde iklim uyumu üzerindeki etkisini analiz etmektedir.',
    paragraph2: 'Akademik açılış konuşmaları ve uluslararası gençlik mentorluk programları aracılığıyla, Orta Asya ve Avrupa\'daki geleceğin liderlerini dünya standartlarında araştırma kurumlarıyla buluşturmaktadır.',
    pillar1Title: 'Alp ve Buzul Saha Çalışmaları',
    pillar1Desc: 'Alpler, Pamir ve Tanrı Dağları sistemlerinde hidrolojik ve buzul çekilme değerlendirmeleri yürütmek.',
    pillar2Title: 'Avrasya Ticaret Koridorları',
    pillar2Desc: 'Çok modlu transit, Orta Koridor altyapısı ve bölgesel lojistik üzerine hakemli ekonomik araştırmalar yayınlamak.',
    pillar3Title: 'Gençlik Mentorluğu ve Elçilik',
    pillar3Desc: '10.000den fazla iddialı öğrenciye uluslararası burs rehberliği, akademik yazım ve liderlik desteği sağlamak.',
    ctaTitle: 'Keşif Seferleri ve 3D Dünya Küresi',
    ctaDesc: 'Kıtalar genelinde coğrafi konumlu saha notlarını keşfedin.',
    ctaButton: '3D Küreyi Başlat',
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = ABOUT_I18N[locale as keyof typeof ABOUT_I18N] || ABOUT_I18N.uz;

  const settings = await prisma.siteSetting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => { settingsMap[s.key] = s.value; });

  const bio = settingsMap[`bio_${locale}`] || settingsMap['bio_en'] || t.bioFallback;
  const headline = settingsMap[`hero_headline_${locale}`] || settingsMap['hero_headline_en'] || t.subheading;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-[#B99A5B]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#101827] dark:text-[#F4F5F7] font-editorial tracking-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 font-editorial">
          {headline}
        </p>
      </div>

      {/* Full Portrait & Narrative in Liquid Glass Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 rounded-3xl overflow-hidden liquid-glass p-3 sm:p-4 group shadow-glass">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#101827] via-[#182A42] to-[#0B0F19] relative">
            <img
              src="/images/ashraf-turdialiyev.jpg"
              alt="Ashraf Turdialiyev"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#eedda5] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5B] animate-pulse" />
                Geneva &bull; Tashkent &bull; Global
              </span>
              <div className="text-xl font-bold font-editorial">Ashraf Turdialiyev</div>
              <div className="text-xs text-slate-300 font-normal">
                {t.role}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base liquid-glass p-8 sm:p-10 shadow-glass">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101827] dark:text-white font-editorial border-b border-black/5 dark:border-white/10 pb-4">
            {t.subheading}
          </h2>
          <p className="text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{bio}</p>
          <p>{t.paragraph1}</p>
          <p>{t.paragraph2}</p>
        </div>
      </div>

      {/* Core Pillars in Liquid Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-7 rounded-3xl liquid-glass-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#B99A5B]/15 border border-[#B99A5B]/30 flex items-center justify-center text-[#B99A5B]">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-[#101827] dark:text-white text-xl font-editorial">{t.pillar1Title}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.pillar1Desc}
          </p>
        </div>

        <div className="p-7 rounded-3xl liquid-glass-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#8D9FC5]/20 border border-[#8D9FC5]/40 flex items-center justify-center text-[#8D9FC5]">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-[#101827] dark:text-white text-xl font-editorial">{t.pillar2Title}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.pillar2Desc}
          </p>
        </div>

        <div className="p-7 rounded-3xl liquid-glass-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#A78BFA]/20 border border-[#A78BFA]/40 flex items-center justify-center text-[#A78BFA]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-[#101827] dark:text-white text-xl font-editorial">{t.pillar3Title}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.pillar3Desc}
          </p>
        </div>
      </div>

      {/* Navigation Call to Action in Liquid Glass */}
      <div className="p-8 sm:p-10 rounded-3xl liquid-glass border border-white/60 dark:border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <h4 className="font-bold text-[#101827] dark:text-white text-xl font-editorial">{t.ctaTitle}</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">{t.ctaDesc}</p>
        </div>
        <Link
          href={`/${locale}/globe`}
          className="px-8 py-3.5 rounded-2xl gold-glow-button text-[#101827] font-bold text-xs tracking-wider uppercase flex items-center gap-2 shrink-0"
        >
          <span>{t.ctaButton}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
