import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';

interface CertificatesPageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export default async function CertificatesPage({ params }: CertificatesPageProps) {
  const { locale } = await params;

  let certificates: any[] = [];
  try {
    certificates = await prisma.certificate.findMany({
      orderBy: [{ order: 'asc' }, { issueDate: 'desc' }],
    });
  } catch (error) {
    console.error('Failed to load certificates:', error);
  }

  const isUz = locale === 'uz';
  const isRu = locale === 'ru';
  const isTr = locale === 'tr';

  const title = isUz
    ? 'Sertifikatlar va Malaka Hujjatlari'
    : isRu
    ? 'Сертификаты и Квалификации'
    : isTr
    ? 'Sertifikalar ve Yeterlilikler'
    : 'Certificates & Professional Credentials';

  const subtitle = isUz
    ? 'Xalqaro ilmiy institutlar, xorijiy universitetlar va davlat tashkilotlari tomonidan berilgan rasmiy guvohnomalar.'
    : isRu
    ? 'Официальные свидетельства, дипломы и верифицированные квалификации от ведущих мировых институтов.'
    : isTr
    ? 'Önde gelen küresel enstitüler, üniversiteler ve devlet kurumları tarafından verilen resmi belgeler.'
    : 'Authenticated credentials, government honors, scientific fellowships, and mountaineering accreditations.';

  return (
    <div className="bg-[#F8F8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-navy/10 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>{isUz ? 'Rasmiy Guvohnomalar' : isRu ? 'Верификация' : isTr ? 'Doğrulanmış Belgeler' : 'Verified Credentials'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-navy font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => {
            const certTitle = (isUz && cert.titleUz) || (isRu && cert.titleRu) || (isTr && cert.titleTr) || cert.title;

            return (
              <div
                key={cert.id}
                className="bg-white rounded-3xl overflow-hidden border border-navy/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Certificate Image Canvas */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#EAF1F8] border-b border-navy/5 flex items-center justify-center p-4">
                    <img
                      src={cert.imageUrl}
                      alt={certTitle}
                      className="max-h-full max-w-full object-contain rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-navy/80 text-white backdrop-blur-md">
                      {cert.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-charcoal/60 font-mono mb-2">
                      <span>{cert.issuer}</span>
                      <span>{new Date(cert.issueDate).getFullYear()}</span>
                    </div>

                    <h2 className="font-editorial text-xl font-bold text-navy group-hover:text-gold transition-colors mb-2">
                      {certTitle}
                    </h2>

                    {cert.credentialId && (
                      <p className="text-xs text-charcoal/50 font-mono truncate">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2.5 rounded-xl bg-soft-blue hover:bg-soft-blue/80 text-navy font-semibold text-xs tracking-wider border border-navy/10 transition"
                    >
                      {isUz ? "Haqiqiyligini tekshirish ↗" : isRu ? "Проверить подлинность ↗" : isTr ? "Doğrula ↗" : "Verify Credential ↗"}
                    </a>
                  ) : (
                    <div className="py-2.5 text-center text-xs text-charcoal/40 font-mono">
                      Verified & Archived
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
