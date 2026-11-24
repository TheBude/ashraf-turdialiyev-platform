'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Award, ShieldCheck, ExternalLink, X, Calendar, CheckCircle2 } from 'lucide-react';

export interface CertificateItem {
  id: string;
  title: string;
  titleUz?: string | null;
  titleRu?: string | null;
  titleTr?: string | null;
  issuer: string;
  issueDate: string | Date;
  credentialUrl?: string | null;
  credentialId?: string | null;
  imageUrl: string;
  category: string;
  featured: boolean;
  order: number;
}

interface CertificatesProps {
  certificates: CertificateItem[];
}

export default function CertificatesSection({ certificates }: CertificatesProps) {
  const { lang, t, getLocalized } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : lang === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <section id="credentials" className="py-24 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            <Award className="w-3.5 h-3.5" />
            <span>{t.certificates.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Academic & Field Accreditations
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.certificates.subtitle}
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="cursor-pointer group rounded-2xl bg-[#111520] border border-slate-800/90 hover:border-[#d4af37]/60 overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media Preview */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={cert.imageUrl}
                  alt={getLocalized(cert, 'title')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111520] via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-slate-700 text-[10px] uppercase font-bold text-[#eedda5]">
                  {cert.category}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold block">
                    {cert.issuer}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#eedda5] transition-colors leading-snug line-clamp-2">
                    {getLocalized(cert, 'title')}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>{formatDate(cert.issueDate)}</span>
                  <span className="text-[#d4af37] font-semibold text-[11px] group-hover:underline">
                    {t.certificates.verify} &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#10141e] border border-[#d4af37]/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Preview Image */}
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-700 bg-black">
              <img
                src={selectedCert.imageUrl}
                alt={getLocalized(selectedCert, 'title')}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-[#1c2230] text-[#eedda5]">
                  {selectedCert.category}
                </span>
                <span className="text-xs text-slate-400">
                  {formatDate(selectedCert.issueDate)}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {getLocalized(selectedCert, 'title')}
              </h3>
              <p className="text-sm text-slate-300">
                <span className="text-slate-500">{t.certificates.issuedBy}:</span> {selectedCert.issuer}
              </p>
              {selectedCert.credentialId && (
                <div className="p-3 rounded-lg bg-[#151a26] border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between">
                  <span>Credential ID:</span>
                  <span className="text-[#eedda5]">{selectedCert.credentialId}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Issuer Authenticity Validated</span>
              </div>
              {selectedCert.credentialUrl && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#eedda5] transition-colors"
                >
                  <span>{t.certificates.viewCredential}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
