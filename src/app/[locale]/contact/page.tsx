import React from 'react';
import ContactSection from '@/components/ContactSection';

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
    <div className="bg-[#F8F8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-navy/10 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>{isUz ? 'Rasmiy Aloqa' : isRu ? 'Связь' : isTr ? 'İletişim' : 'Official Reach'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-navy font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Contact Component with Form and Direct Info */}
        <div className="bg-white rounded-3xl border border-navy/5 p-6 sm:p-12 shadow-sm">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
