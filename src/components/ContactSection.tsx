'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Send, Mail, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContactProps {
  contactEmail: string;
}

export default function ContactSection({ contactEmail }: ContactProps) {
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
    <section id="contact" className="py-24 bg-[#0a0d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                <Mail className="w-3.5 h-3.5" />
                <span>{t.contact.title}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Initiate a Global Dialogue
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#111520] border border-slate-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#181e2b] text-[#d4af37]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                    Official Inquiries
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-[#eedda5] transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111520] border border-slate-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#181e2b] text-[#d4af37]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                    Primary Headquarters
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    Tashkent, Uzbekistan &bull; Geneva, Switzerland
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inbound Contact Form */}
          <div className="lg:col-span-7 bg-[#111520] border border-slate-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Transmitted</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  {t.contact.successMessage}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#161b26] border border-slate-700 text-xs text-white hover:bg-[#1f2535] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                      {t.contact.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Alex Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#161b26] border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@institution.org"
                      className="w-full px-4 py-3 rounded-xl bg-[#161b26] border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                    {t.contact.subject}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#161b26] border border-slate-700/80 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-all"
                  >
                    <option value="Keynote & Speaking Invitation">Keynote & Speaking Invitation</option>
                    <option value="Academic & Scientific Research Collaboration">Academic & Scientific Research Collaboration</option>
                    <option value="Alpine & Environmental Expedition">Alpine & Environmental Expedition</option>
                    <option value="Youth Mentorship & Public Initiatives">Youth Mentorship & Public Initiatives</option>
                    <option value="Media & Press Inquiry">Media & Press Inquiry</option>
                    <option value="General Correspondence">General Correspondence</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                    {t.contact.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on dates, scope, and objectives of the collaboration..."
                    className="w-full px-4 py-3 rounded-xl bg-[#161b26] border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] transition-all resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89028] text-black font-bold text-sm shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>{t.contact.send}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
