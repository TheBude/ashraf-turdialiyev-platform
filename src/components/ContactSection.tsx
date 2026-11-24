'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Send, Mail, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContactProps {
  contactEmail?: string;
}

export default function ContactSection({ contactEmail = 'contact@ashrafturdialiyev.com' }: ContactProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Keynote & Speaking Invitation',
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
        subject: 'Keynote & Speaking Invitation',
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
              Initiate a Global Dialogue
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
                  Official Inquiries
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
                  Academic & Liaison Office
                </span>
                <span className="text-sm sm:text-base font-bold text-navy">
                  Tashkent, Uzbekistan
                </span>
                <span className="text-xs text-charcoal/60 block mt-0.5">
                  Available for global conferences and scientific summits
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
                  Message Transmitted
                </h3>
                <p className="text-sm text-charcoal/80 max-w-md mx-auto">
                  {t.contact.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-navy text-white text-xs font-semibold tracking-wider hover:bg-navy/90 transition shadow-sm"
                >
                  Send Another Inquiry
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
                      placeholder="e.g. Dr. Alexander Wright"
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
                      placeholder="alexander@institute.org"
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
                    <option value="Keynote & Speaking Invitation">Keynote & Speaking Invitation</option>
                    <option value="Academic Collaboration">Academic & Research Collaboration</option>
                    <option value="High-Altitude Expedition Inquiry">High-Altitude Expedition Inquiry</option>
                    <option value="Media & Press Interview">Media & Press Interview</option>
                    <option value="General Correspondence">General Correspondence</option>
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
                    placeholder="Brief outline of the proposal, dates, or objectives..."
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
