import React from 'react';
import ContactSection from '@/components/ContactSection';
import { Mail, Sparkles } from 'lucide-react';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const title = isUz
    ? 'Bog‘lanish va Rasmiy Takliflar'
    : isRu
    ? 'Контакты и Сотрудничество'
    : isTr
    ? 'İletişim ve Resmi İş Birlikleri'
    : 'Direct Contact & Official Inquiries';

  const subtitle = isUz
    ? 'Akademik hamkorlik, xalqaro ma’ruzalar, media intervyular va ilmiy konsultatsiyalar uchun rasmiy aloqa shakli.'
    : isRu
    ? 'Форма для академического сотрудничества, приглашений на конференции, медиа-запросов и экспертных консультаций.'
    : isTr
    ? 'Akademik iş birlikleri, uluslararası konferans davetleri, medya röportajları ve danışmanlık talepleri için resmi iletişim kanalı.'
    : 'Direct channel for academic partnerships, keynote speaking invitations, press inquiries, and scientific advisory.';

  return (
    <div className="min-h-screen py-10 space-y-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Mail className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>{isUz ? 'Rasmiy Aloqa' : isRu ? 'Связь' : isTr ? 'İletişim' : 'Official Reach'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#101827] dark:text-[#F4F5F7] font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Contact Component with Form and Direct Info in Liquid Glass Card */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/60 dark:border-white/12">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
