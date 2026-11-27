import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/page-seo';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Award, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface CertificatesPageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, 'certificates');
}

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
    <div className="min-h-screen py-10 space-y-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-badge text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Award className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>{isUz ? 'Rasmiy Guvohnomalar' : isRu ? 'Верификация' : isTr ? 'Doğrulanmış Belgeler' : 'Verified Credentials'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#101827] dark:text-[#F4F5F7] font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Certificates Grid in Liquid Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => {
            const certTitle = (isUz && cert.titleUz) || (isRu && cert.titleRu) || (isTr && cert.titleTr) || cert.title;

            return (
              <div
                key={cert.id}
                className="liquid-glass rounded-3xl overflow-hidden shadow-glass hover:shadow-2xl hover:border-[#B99A5B]/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Certificate Image Canvas */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-black/5 dark:border-white/10 flex items-center justify-center p-4">
                    <img
                      src={cert.imageUrl}
                      alt={certTitle}
                      className="max-h-full max-w-full object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase liquid-glass-badge text-[#101827] dark:text-white">
                      {cert.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span>{cert.issuer}</span>
                      <span>{new Date(cert.issueDate).getFullYear()}</span>
                    </div>

                    <h2 className="font-editorial text-xl font-bold text-[#101827] dark:text-white group-hover:text-[#B99A5B] transition-colors leading-snug">
                      {certTitle}
                    </h2>

                    {cert.credentialId && (
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
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
                      className="block w-full text-center py-2.5 rounded-xl liquid-glass-subtle hover:border-[#B99A5B] text-[#101827] dark:text-white font-bold text-xs tracking-wider transition"
                    >
                      {isUz ? "Haqiqiyligini tekshirish ↗" : isRu ? "Проверить подлинность ↗" : isTr ? "Doğrula ↗" : "Verify Credential ↗"}
                    </a>
                  ) : (
                    <div className="py-2.5 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B99A5B]" />
                      <span>Verified & Archived</span>
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
