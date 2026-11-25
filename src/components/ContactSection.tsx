'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Send, Mail, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContactProps {
  contactEmail?: string;
}

const SUBJECT_OPTIONS = {
  uz: [
    { value: 'Keynote & Speaking Invitation', label: 'Yalpi Majlis & Ma’ruza Taklifi' },
    { value: 'Academic Collaboration', label: 'Ilmiy va Akademik Hamkorlik' },
    { value: 'High-Altitude Expedition Inquiry', label: 'Baland Tog‘ Ekspeditsiyasi Bo‘yicha Taklif' },
    { value: 'Media & Press Interview', label: 'OAV va Matbuot Intervyusi' },
    { value: 'General Correspondence', label: 'Umumiy Rasmiy Murojaat' },
  ],
  en: [
    { value: 'Keynote & Speaking Invitation', label: 'Keynote & Speaking Invitation' },
    { value: 'Academic Collaboration', label: 'Academic & Research Collaboration' },
    { value: 'High-Altitude Expedition Inquiry', label: 'High-Altitude Expedition Inquiry' },
    { value: 'Media & Press Interview', label: 'Media & Press Interview' },
    { value: 'General Correspondence', label: 'General Correspondence' },
  ],
  ru: [
    { value: 'Keynote & Speaking Invitation', label: 'Приглашение с докладом / На конференцию' },
    { value: 'Academic Collaboration', label: 'Научно-академическое сотрудничество' },
    { value: 'High-Altitude Expedition Inquiry', label: 'Запрос по высокогорным экспедициям' },
    { value: 'Media & Press Interview', label: 'Интервью для СМИ и прессы' },
    { value: 'General Correspondence', label: 'Общая официальная переписка' },
  ],
  tr: [
    { value: 'Keynote & Speaking Invitation', label: 'Açılış Konuşması & Konferans Daveti' },
    { value: 'Academic Collaboration', label: 'Akademik ve Araştırma İş Birliği' },
    { value: 'High-Altitude Expedition Inquiry', label: 'Yüksek İrtifa Keşif Talebi' },
    { value: 'Media & Press Interview', label: 'Medya ve Basın Röportajı' },
    { value: 'General Correspondence', label: 'Genel Resmi Yazışma' },
  ],
};

const CONTACT_LOCALIZED = {
  uz: {
    dialogue: 'Xalqaro Muloqot Boshlash',
    officialInquiries: 'Rasmiy Murojaatlar',
    officeTitle: 'Akademik & Aloqa Ofisi',
    officeCity: 'Toshkent, O‘zbekiston',
    officeDesc: 'Global ilmiy konferensiyalar, xalqaro sammitlar va ma’ruzalar uchun ochiq',
    messageTransmitted: 'Xabaringiz Qabul Qilindi',
    sendAnother: 'Yana bir murojaat yuborish',
    namePlaceholder: 'Masalan: Prof. Jasur Aliyev',
    emailPlaceholder: 'jasur@institut.uz',
    messagePlaceholder: 'Taklif mazmuni, rejalashtirilgan sanalar yoki hamkorlik maqsadlari haqida qisqacha ma’lumot...',
  },
  en: {
    dialogue: 'Initiate a Global Dialogue',
    officialInquiries: 'Official Inquiries',
    officeTitle: 'Academic & Liaison Office',
    officeCity: 'Tashkent, Uzbekistan',
    officeDesc: 'Available for global conferences and scientific summits',
    messageTransmitted: 'Message Transmitted',
    sendAnother: 'Send Another Inquiry',
    namePlaceholder: 'e.g. Dr. Alexander Wright',
    emailPlaceholder: 'alexander@institute.org',
    messagePlaceholder: 'Brief outline of the proposal, dates, or objectives...',
  },
  ru: {
    dialogue: 'Начать Международный Диалог',
    officialInquiries: 'Официальные Запросы',
    officeTitle: 'Академический Офис Связи',
    officeCity: 'Ташкент, Узбекистан',
    officeDesc: 'Открыт для участия в глобальных конференциях и научных саммитах',
    messageTransmitted: 'Сообщение Передано',
    sendAnother: 'Отправить еще одно сообщение',
    namePlaceholder: 'Например: Д-р Александр Смирнов',
    emailPlaceholder: 'alexander@institute.org',
    messagePlaceholder: 'Краткое описание предложения, дат или целей сотрудничества...',
  },
  tr: {
    dialogue: 'Küresel Bir Diyalog Başlatın',
    officialInquiries: 'Resmi Başvurular',
    officeTitle: 'Akademik ve İrtibat Ofisi',
    officeCity: 'Taşkent, Özbekistan',
    officeDesc: 'Küresel konferanslar ve bilimsel zirveler için müsait',
    messageTransmitted: 'Mesaj İletildi',
    sendAnother: 'Yeni Bir Başvuru Gönder',
    namePlaceholder: 'Örn: Dr. Ahmet Yılmaz',
    emailPlaceholder: 'ahmet@enstitu.org',
    messagePlaceholder: 'Teklifin özeti, tarihler veya iş birliği hedefleri...',
  },
};

export default function ContactSection({ contactEmail = 'contact@ashrafturdialiyev.com' }: ContactProps) {
  const { lang, t } = useLanguage();
  const cLang = (lang as keyof typeof CONTACT_LOCALIZED) || 'uz';
  const loc = CONTACT_LOCALIZED[cLang] || CONTACT_LOCALIZED.uz;
  const subjectList = SUBJECT_OPTIONS[cLang] || SUBJECT_OPTIONS.uz;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subjectList[0].value,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t.contact.errorMessage);
      }

      setSubmitted(true);
      toast.success(t.contact.successMessage);
      setFormData({
        name: '',
        email: '',
        subject: subjectList[0].value,
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || t.contact.errorMessage);
      toast.error(err.message || t.contact.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Coordinates */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Mail className="w-3.5 h-3.5" />
              <span>{t.contact.title}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-navy">
              {loc.dialogue}
            </h2>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#F8F8F5] border border-navy/5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white text-navy shadow-sm border border-navy/5">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold block">
                  {loc.officialInquiries}
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-sm sm:text-base font-bold text-navy hover:text-gold transition-colors font-mono"
                >
                  {contactEmail}
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F8F5] border border-navy/5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white text-navy shadow-sm border border-navy/5">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold block">
                  {loc.officeTitle}
                </span>
                <span className="text-sm sm:text-base font-bold text-navy">
                  {loc.officeCity}
                </span>
                <span className="text-xs text-charcoal/60 block mt-0.5">
                  {loc.officeDesc}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F8F8F5] border border-navy/5 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-navy">
                  {loc.messageTransmitted}
                </h3>
                <p className="text-sm text-charcoal/80 max-w-md mx-auto">
                  {t.contact.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-navy text-white text-xs font-semibold tracking-wider hover:bg-navy/90 transition shadow-sm"
                >
                  {loc.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                      {t.contact.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={loc.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder:text-charcoal/40 text-sm focus:outline-none focus:border-gold transition shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={loc.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder:text-charcoal/40 text-sm focus:outline-none focus:border-gold transition shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    {t.contact.subject}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy text-sm focus:outline-none focus:border-gold transition shadow-sm"
                  >
                    {subjectList.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    {t.contact.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={loc.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder:text-charcoal/40 text-sm focus:outline-none focus:border-gold transition shadow-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-navy transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.contact.send}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
