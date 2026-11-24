'use client';

import React, { useState } from 'react';
import {
  Compass, Globe, Calendar, Award, BookOpen, Activity, Inbox, Settings,
  Plus, Trash2, Edit3, CheckCircle, Eye, EyeOff, Save, Loader2, ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardProps {
  initialDestinations: any[];
  initialCountries: any[];
  initialTimeline: any[];
  initialCertificates: any[];
  initialPublications: any[];
  initialStats: any[];
  initialMessages: any[];
  initialSettings: Record<string, string>;
}

export default function AdminDashboardClient({
  initialDestinations,
  initialCountries,
  initialTimeline,
  initialCertificates,
  initialPublications,
  initialStats,
  initialMessages,
  initialSettings,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'destinations' | 'map' | 'timeline' | 'certificates' | 'publications' | 'audience' | 'messages' | 'settings'>('destinations');

  // State
  const [destinations, setDestinations] = useState<any[]>(initialDestinations);
  const [countries, setCountries] = useState<any[]>(initialCountries);
  const [timeline, setTimeline] = useState<any[]>(initialTimeline);
  const [certificates, setCertificates] = useState<any[]>(initialCertificates);
  const [publications, setPublications] = useState<any[]>(initialPublications);
  const [stats, setStats] = useState<any[]>(initialStats);
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);

  const [loading, setLoading] = useState(false);

  // Modals & New Form States
  const [showDestModal, setShowDestModal] = useState(false);
  const [destForm, setDestForm] = useState({
    title: '',
    titleUz: '',
    titleRu: '',
    titleTr: '',
    country: '',
    countryCode: '',
    city: '',
    coordinates: '',
    description: '',
    descriptionUz: '',
    descriptionRu: '',
    descriptionTr: '',
    story: '',
    photos: '["https://images.unsplash.com/photo-1596484552829-9e8c07c29377"]',
    status: 'PUBLISHED',
  });

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryForm, setCountryForm] = useState({
    isoCode: '',
    countryName: '',
    countryNameUz: '',
    countryNameRu: '',
    countryNameTr: '',
    visitedYear: new Date().getFullYear(),
    notes: '',
    flag: '🌍',
    coordinates: '',
  });

  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [timelineForm, setTimelineForm] = useState({
    year: new Date().getFullYear(),
    date: 'Autumn ' + new Date().getFullYear(),
    title: '',
    titleUz: '',
    titleRu: '',
    titleTr: '',
    category: 'ACHIEVEMENT',
    description: '',
    descriptionUz: '',
    descriptionRu: '',
    descriptionTr: '',
    location: '',
  });

  const [showCertModal, setShowCertModal] = useState(false);
  const [certForm, setCertForm] = useState({
    title: '',
    titleUz: '',
    titleRu: '',
    titleTr: '',
    issuer: '',
    imageUrl: 'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b',
    credentialUrl: '',
    credentialId: '',
    category: 'ACADEMIC',
  });

  const [showPubModal, setShowPubModal] = useState(false);
  const [pubForm, setPubForm] = useState({
    title: '',
    titleUz: '',
    titleRu: '',
    titleTr: '',
    authors: 'Ashraf Turdialiyev',
    journal: '',
    year: new Date().getFullYear(),
    doi: '',
    link: '',
    abstract: '',
    tags: '["Research", "Silk Road", "Policy"]',
    citations: 0,
  });

  // 1. Destination Handlers
  const handleCreateDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(destForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDestinations([data, ...destinations]);
      setShowDestModal(false);
      toast.success('Destination created successfully');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (dest: any) => {
    const newStatus = dest.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await fetch(`/api/destinations/${dest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDestinations(destinations.map((d) => (d.id === dest.id ? data : d)));
      toast.success(`Destination set to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteDestination = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setDestinations(destinations.filter((d) => d.id !== id));
      toast.success('Destination deleted');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 2. World Map Handlers
  const handleAddCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(countryForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCountries([data, ...countries]);
      setShowCountryModal(false);
      toast.success(`Country ${data.countryName} added to interactive map!`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCountry = async (id: string) => {
    if (!confirm('Remove country from interactive map?')) return;
    try {
      const res = await fetch(`/api/countries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to remove');
      setCountries(countries.filter((c) => c.id !== id));
      toast.success('Country removed from map');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 3. Timeline Handlers
  const handleCreateTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timelineForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTimeline([data, ...timeline]);
      setShowTimelineModal(false);
      toast.success('Timeline event created');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTimeline = async (id: string) => {
    if (!confirm('Delete this timeline event?')) return;
    try {
      const res = await fetch(`/api/timeline/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setTimeline(timeline.filter((t) => t.id !== id));
      toast.success('Timeline event deleted');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 4. Certificate Handlers
  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCertificates([data, ...certificates]);
      setShowCertModal(false);
      toast.success('Certificate added to credentials vault');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm('Delete certificate?')) return;
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setCertificates(certificates.filter((c) => c.id !== id));
      toast.success('Certificate deleted');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 5. Publication Handlers
  const handleCreatePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pubForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPublications([data, ...publications]);
      setShowPubModal(false);
      toast.success('Scientific publication created');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePublication = async (id: string) => {
    if (!confirm('Delete publication?')) return;
    try {
      const res = await fetch(`/api/publications/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setPublications(publications.filter((p) => p.id !== id));
      toast.success('Publication deleted');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 6. Audience Stats Handlers
  const handleSaveStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audience', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStats(data);
      toast.success('Audience telemetry counters updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 7. Message Handlers
  const handleToggleReadMessage = async (msg: any) => {
    try {
      const res = await fetch(`/api/contact/${msg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !msg.isRead }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages(messages.map((m) => (m.id === msg.id ? data : m)));
      toast.success('Message status updated');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete message?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessages(messages.filter((m) => m.id !== id));
      toast.success('Message deleted');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 8. Settings Handlers
  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      toast.success('Platform settings & biographies saved');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3.5 rounded-xl bg-[#10141e] border border-slate-800 text-center">
          <Compass className="w-4 h-4 text-[#d4af37] mx-auto mb-1" />
          <span className="text-xl font-bold text-white block">{destinations.length}</span>
          <span className="text-[10px] text-slate-400">Destinations</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#10141e] border border-slate-800 text-center">
          <Globe className="w-4 h-4 text-sky-400 mx-auto mb-1" />
          <span className="text-xl font-bold text-white block">{countries.length}</span>
          <span className="text-[10px] text-slate-400">Map Territories</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#10141e] border border-slate-800 text-center">
          <Calendar className="w-4 h-4 text-violet-400 mx-auto mb-1" />
          <span className="text-xl font-bold text-white block">{timeline.length}</span>
          <span className="text-[10px] text-slate-400">Timeline Events</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#10141e] border border-slate-800 text-center">
          <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <span className="text-xl font-bold text-white block">{certificates.length}</span>
          <span className="text-[10px] text-slate-400">Certificates</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#10141e] border border-slate-800 text-center">
          <BookOpen className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <span className="text-xl font-bold text-white block">{publications.length}</span>
          <span className="text-[10px] text-slate-400">Publications</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#10141e] border border-slate-800 text-center">
          <Inbox className="w-4 h-4 text-rose-400 mx-auto mb-1" />
          <span className="text-xl font-bold text-white block">{messages.length}</span>
          <span className="text-[10px] text-slate-400">Inbound Messages</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#10141e] border border-slate-800 text-center col-span-2 sm:col-span-1">
          <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <span className="text-xl font-bold text-emerald-400 block">Active</span>
          <span className="text-[10px] text-slate-400">Telemetry</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { key: 'destinations', label: 'Destinations', icon: Compass },
          { key: 'map', label: 'World Map', icon: Globe },
          { key: 'timeline', label: 'Timeline Events', icon: Calendar },
          { key: 'certificates', label: 'Certificates Vault', icon: Award },
          { key: 'publications', label: 'Research Papers', icon: BookOpen },
          { key: 'audience', label: 'Audience Counters', icon: Activity },
          { key: 'messages', label: `Messages (${messages.filter(m => !m.isRead).length} new)`, icon: Inbox },
          { key: 'settings', label: 'Site Settings & Bio', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#d4af37] text-black shadow-gold font-bold'
                  : 'bg-[#10141e] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DESTINATIONS MANAGER */}
      {activeTab === 'destinations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Travel Destinations & Chronicles</h2>
              <p className="text-xs text-slate-400">Manage expedition narratives and publishing status</p>
            </div>
            <button
              onClick={() => setShowDestModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#eedda5] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Destination</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#10141e] border border-slate-800 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#141824] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Title / Location</th>
                  <th className="p-4">Coordinates</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {destinations.map((d) => (
                  <tr key={d.id} className="hover:bg-[#141824]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{d.title}</div>
                      <div className="text-slate-400">{d.city ? `${d.city}, ` : ''}{d.country} ({d.countryCode})</div>
                    </td>
                    <td className="p-4 font-mono text-slate-400">{d.coordinates || 'N/A'}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(d)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          d.status === 'PUBLISHED'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {d.status}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDeleteDestination(d.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: WORLD MAP MANAGER */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Interactive World Map Territories</h2>
              <p className="text-xs text-slate-400">Highlighted sovereign countries and research expedition field records</p>
            </div>
            <button
              onClick={() => setShowCountryModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#eedda5] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Country to Map</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#10141e] border border-slate-800 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#141824] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Country / Flag</th>
                  <th className="p-4">ISO Code</th>
                  <th className="p-4">Visited Year</th>
                  <th className="p-4">Expedition Summary</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {countries.map((c) => (
                  <tr key={c.id} className="hover:bg-[#141824]/50 transition-colors">
                    <td className="p-4 flex items-center gap-2 font-bold text-white">
                      <span className="text-lg">{c.flag}</span>
                      <span>{c.countryName}</span>
                    </td>
                    <td className="p-4 font-mono font-semibold text-[#eedda5]">{c.isoCode}</td>
                    <td className="p-4 font-mono">{c.visitedYear}</td>
                    <td className="p-4 max-w-xs truncate text-slate-400">{c.notes}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteCountry(c.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TIMELINE MANAGER */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Journey Timeline Milestones</h2>
              <p className="text-xs text-slate-400">Manage academic, mountaineering, and diplomatic career events</p>
            </div>
            <button
              onClick={() => setShowTimelineModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#eedda5] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Milestone</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#10141e] border border-slate-800 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#141824] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Period</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Title & Location</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {timeline.map((t) => (
                  <tr key={t.id} className="hover:bg-[#141824]/50 transition-colors">
                    <td className="p-4 font-mono text-[#eedda5] whitespace-nowrap">{t.year} ({t.date})</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#181e2b] text-slate-200">
                        {t.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white">{t.title}</div>
                      <div className="text-slate-400 text-[11px]">{t.location}</div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteTimeline(t.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CERTIFICATES VAULT */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Credentials & Accreditations Vault</h2>
              <p className="text-xs text-slate-400">Diplomas, high-altitude expedition certifications, and international honours</p>
            </div>
            <button
              onClick={() => setShowCertModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#eedda5] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Register Certificate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="p-4 rounded-xl bg-[#10141e] border border-slate-800 flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#d4af37] block">{cert.category}</span>
                  <div className="font-bold text-white text-sm">{cert.title}</div>
                  <div className="text-xs text-slate-400">{cert.issuer}</div>
                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-500">ID: {cert.credentialId}</div>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteCertificate(cert.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PUBLICATIONS MANAGER */}
      {activeTab === 'publications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Scientific Publications & Treatises</h2>
              <p className="text-xs text-slate-400">Peer-reviewed research and monograph archive</p>
            </div>
            <button
              onClick={() => setShowPubModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#eedda5] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Research</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#10141e] border border-slate-800 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#141824] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Title / Journal</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Citations</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {publications.map((p) => (
                  <tr key={p.id} className="hover:bg-[#141824]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{p.title}</div>
                      <div className="text-slate-400">{p.journal}</div>
                    </td>
                    <td className="p-4 font-mono">{p.year}</td>
                    <td className="p-4 font-mono text-emerald-400">{p.citations}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeletePublication(p.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: AUDIENCE COUNTER TELEMETRY */}
      {activeTab === 'audience' && (
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Simulated Telemetry & Audience Counters</h2>
              <p className="text-xs text-slate-400">Configure base metric values and simulated dynamic growth rates</p>
            </div>
            <button
              onClick={handleSaveStats}
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89028] text-black font-bold text-xs shadow-gold hover:shadow-gold-lg transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>

          <div className="space-y-4">
            {stats.map((s, idx) => (
              <div key={s.id} className="p-5 rounded-2xl bg-[#10141e] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{s.label} ({s.key})</span>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={s.isSimulated}
                      onChange={(e) => {
                        const copy = [...stats];
                        copy[idx].isSimulated = e.target.checked;
                        setStats(copy);
                      }}
                      className="rounded border-slate-700 bg-slate-900 text-[#d4af37]"
                    />
                    <span>Live Simulation Active</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block">Base Metric Value</label>
                    <input
                      type="number"
                      value={s.value}
                      onChange={(e) => {
                        const copy = [...stats];
                        copy[idx].value = Number(e.target.value);
                        setStats(copy);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block">Prefix & Suffix</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={s.prefix || ''}
                        placeholder="Prefix"
                        onChange={(e) => {
                          const copy = [...stats];
                          copy[idx].prefix = e.target.value;
                          setStats(copy);
                        }}
                        className="w-1/2 px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={s.suffix || ''}
                        placeholder="Suffix"
                        onChange={(e) => {
                          const copy = [...stats];
                          copy[idx].suffix = e.target.value;
                          setStats(copy);
                        }}
                        className="w-1/2 px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block">Increment Probability Rate</label>
                    <input
                      type="number"
                      step="0.05"
                      min="0"
                      max="1"
                      value={s.incrementRate}
                      onChange={(e) => {
                        const copy = [...stats];
                        copy[idx].incrementRate = Number(e.target.value);
                        setStats(copy);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: INBOUND MESSAGES INBOX */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white">Inbound Inquiries & Dispatches</h2>
            <p className="text-xs text-slate-400">All submissions from the public collaboration contact form</p>
          </div>

          <div className="rounded-2xl bg-[#10141e] border border-slate-800 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#141824] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Sender & Email</th>
                  <th className="p-4">Category / Subject</th>
                  <th className="p-4">Message Excerpt</th>
                  <th className="p-4">Received</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {messages.map((m) => (
                  <tr key={m.id} className={`hover:bg-[#141824]/50 transition-colors ${!m.isRead ? 'bg-[#181f2f]/30' : ''}`}>
                    <td className="p-4">
                      <div className="font-bold text-white">{m.name}</div>
                      <a href={`mailto:${m.email}`} className="text-slate-400 hover:text-[#d4af37]">{m.email}</a>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-[#eedda5]">{m.subject}</span>
                    </td>
                    <td className="p-4 max-w-sm truncate text-slate-300">{m.message}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleReadMessage(m)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          m.isRead ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {m.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No inbound contact messages received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: SITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Platform Settings & Localized Biographies</h2>
              <p className="text-xs text-slate-400">Content directly rendered on the landing page</p>
            </div>
            <button
              onClick={handleSaveSettings}
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89028] text-black font-bold text-xs shadow-gold hover:shadow-gold-lg transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#10141e] border border-slate-800 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                Official Contact Email
              </label>
              <input
                type="email"
                value={settings['contact_email'] || ''}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161b26] border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] block">
                Biography (Uzbek)
              </label>
              <textarea
                rows={3}
                value={settings['bio_uz'] || ''}
                onChange={(e) => setSettings({ ...settings, bio_uz: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161b26] border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] block">
                Biography (English)
              </label>
              <textarea
                rows={3}
                value={settings['bio_en'] || ''}
                onChange={(e) => setSettings({ ...settings, bio_en: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161b26] border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] block">
                Biography (Russian)
              </label>
              <textarea
                rows={3}
                value={settings['bio_ru'] || ''}
                onChange={(e) => setSettings({ ...settings, bio_ru: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161b26] border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] block">
                Biography (Turkish)
              </label>
              <textarea
                rows={3}
                value={settings['bio_tr'] || ''}
                onChange={(e) => setSettings({ ...settings, bio_tr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161b26] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD DESTINATION */}
      {showDestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#10141e] border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Create Travel Destination</h3>
            <form onSubmit={handleCreateDestination} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Title (English)"
                  value={destForm.title}
                  onChange={(e) => setDestForm({ ...destForm, title: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Sarlavha (O'zbek)"
                  value={destForm.titleUz}
                  onChange={(e) => setDestForm({ ...destForm, titleUz: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Country"
                  value={destForm.country}
                  onChange={(e) => setDestForm({ ...destForm, country: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Country Code (e.g. UZ)"
                  value={destForm.countryCode}
                  onChange={(e) => setDestForm({ ...destForm, countryCode: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white uppercase"
                />
                <input
                  type="text"
                  placeholder="Coordinates (lat,lng)"
                  value={destForm.coordinates}
                  onChange={(e) => setDestForm({ ...destForm, coordinates: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
              </div>

              <textarea
                required
                placeholder="Expedition description..."
                value={destForm.description}
                onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                rows={3}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDestModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs"
                >
                  Create & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD COUNTRY */}
      {showCountryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#10141e] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Add Territory to World Map</h3>
            <form onSubmit={handleAddCountry} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="ISO Code (e.g. CA)"
                  value={countryForm.isoCode}
                  onChange={(e) => setCountryForm({ ...countryForm, isoCode: e.target.value.toUpperCase() })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white uppercase"
                />
                <input
                  type="text"
                  placeholder="Flag Emoji (e.g. 🇨🇦)"
                  value={countryForm.flag}
                  onChange={(e) => setCountryForm({ ...countryForm, flag: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Country Name (English)"
                  value={countryForm.countryName}
                  onChange={(e) => setCountryForm({ ...countryForm, countryName: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
                <input
                  type="number"
                  required
                  placeholder="Visited Year"
                  value={countryForm.visitedYear}
                  onChange={(e) => setCountryForm({ ...countryForm, visitedYear: Number(e.target.value) })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
              </div>

              <textarea
                placeholder="Expedition summary / field notes..."
                value={countryForm.notes}
                onChange={(e) => setCountryForm({ ...countryForm, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                rows={3}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCountryModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs"
                >
                  Add to Map
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD TIMELINE */}
      {showTimelineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#10141e] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Create Journey Milestone</h3>
            <form onSubmit={handleCreateTimeline} className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  required
                  placeholder="Year"
                  value={timelineForm.year}
                  onChange={(e) => setTimelineForm({ ...timelineForm, year: Number(e.target.value) })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Date period"
                  value={timelineForm.date}
                  onChange={(e) => setTimelineForm({ ...timelineForm, date: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
                <select
                  value={timelineForm.category}
                  onChange={(e) => setTimelineForm({ ...timelineForm, category: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                >
                  <option value="EDUCATION">Education</option>
                  <option value="CAREER">Leadership</option>
                  <option value="TRAVEL">Expedition</option>
                  <option value="ACHIEVEMENT">Achievement</option>
                  <option value="SCIENTIFIC">Scientific</option>
                </select>
              </div>

              <input
                type="text"
                required
                placeholder="Title"
                value={timelineForm.title}
                onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
              />

              <textarea
                required
                placeholder="Milestone description..."
                value={timelineForm.description}
                onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                rows={3}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTimelineModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD CERTIFICATE */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#10141e] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Register Certificate</h3>
            <form onSubmit={handleCreateCertificate} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Certificate Title"
                value={certForm.title}
                onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Conferring Issuer"
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
                <select
                  value={certForm.category}
                  onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                >
                  <option value="ACADEMIC">Academic</option>
                  <option value="DIPLOMACY">Diplomacy</option>
                  <option value="LEADERSHIP">Leadership</option>
                  <option value="EXPEDITION">Expedition</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Credential ID / Verification Code"
                value={certForm.credentialId}
                onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
              />

              <input
                type="text"
                required
                placeholder="Image URL"
                value={certForm.imageUrl}
                onChange={(e) => setCertForm({ ...certForm, imageUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD PUBLICATION */}
      {showPubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#10141e] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Publish Scientific Research Paper</h3>
            <form onSubmit={handleCreatePublication} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Paper Title"
                value={pubForm.title}
                onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Journal / Proceedings"
                  value={pubForm.journal}
                  onChange={(e) => setPubForm({ ...pubForm, journal: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
                <input
                  type="number"
                  required
                  placeholder="Publication Year"
                  value={pubForm.year}
                  onChange={(e) => setPubForm({ ...pubForm, year: Number(e.target.value) })}
                  className="px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                />
              </div>

              <input
                type="text"
                placeholder="DOI (e.g. 10.1016/j.jeasiatrans.2025.101)"
                value={pubForm.doi}
                onChange={(e) => setPubForm({ ...pubForm, doi: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
              />

              <textarea
                required
                placeholder="Abstract..."
                value={pubForm.abstract}
                onChange={(e) => setPubForm({ ...pubForm, abstract: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#161b26] border border-slate-700 text-xs text-white"
                rows={3}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPubModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs"
                >
                  Publish Paper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
