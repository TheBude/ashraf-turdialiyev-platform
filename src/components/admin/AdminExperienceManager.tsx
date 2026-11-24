'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Trash2, Edit2, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  roleUz?: string | null;
  roleRu?: string | null;
  roleTr?: string | null;
  organization: string;
  location?: string | null;
  description: string;
  descriptionUz?: string | null;
  descriptionRu?: string | null;
  descriptionTr?: string | null;
  type: string;
  order: number;
}

export default function AdminExperienceManager() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyForm = {
    period: '',
    role: '',
    roleUz: '',
    roleRu: '',
    roleTr: '',
    organization: '',
    location: '',
    description: '',
    descriptionUz: '',
    descriptionRu: '',
    descriptionTr: '',
    type: 'ACADEMIC',
    order: 0,
  };

  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/experience');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
      toast.error('Failed to load experience records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item: ExperienceItem) => {
    setEditingId(item.id);
    setForm({
      period: item.period,
      role: item.role,
      roleUz: item.roleUz || '',
      roleRu: item.roleRu || '',
      roleTr: item.roleTr || '',
      organization: item.organization,
      location: item.location || '',
      description: item.description,
      descriptionUz: item.descriptionUz || '',
      descriptionRu: item.descriptionRu || '',
      descriptionTr: item.descriptionTr || '',
      type: item.type,
      order: item.order,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingId ? `/api/experience/${editingId}` : '/api/experience';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save experience record');
      }

      toast.success(editingId ? 'Experience updated' : 'New appointment created');
      handleCancel();
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience appointment?')) return;

    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Record removed');
      fetchItems();
    } catch {
      toast.error('Failed to delete experience');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#17243A] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#B99A5B]" />
            <span>Professional Experience & Appointments</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage academic leadership, governmental advisories, and scientific directorates.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17243A] text-white hover:bg-[#17243A]/90 text-xs font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-[#B99A5B]" />
            <span>Add Appointment</span>
          </button>
        )}
      </div>

      {/* Form Drawer / Box */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-[#17243A]">
              {editingId ? 'Edit Appointment' : 'Create New Appointment'}
            </h2>
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Period / Tenure *
              </label>
              <input
                type="text"
                required
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                placeholder="e.g. 2022 — Present"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Role / Title (English) *
              </label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Chief Scientific Advisor"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Organization *
              </label>
              <input
                type="text"
                required
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                placeholder="Institute or Ministry"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Tashkent, Uzbekistan"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Appointment Category
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              >
                <option value="ACADEMIC">ACADEMIC</option>
                <option value="POLICY">POLICY</option>
                <option value="EXPEDITION">EXPEDITION</option>
                <option value="ADVISORY">ADVISORY</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
          </div>

          {/* Multilingual Roles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Role (Uzbek)
              </label>
              <input
                type="text"
                value={form.roleUz}
                onChange={(e) => setForm({ ...form, roleUz: e.target.value })}
                placeholder="Bosh Ilmiy Maslahatchi"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Role (Russian)
              </label>
              <input
                type="text"
                value={form.roleRu}
                onChange={(e) => setForm({ ...form, roleRu: e.target.value })}
                placeholder="Главный научный советник"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Role (Turkish)
              </label>
              <input
                type="text"
                value={form.roleTr}
                onChange={(e) => setForm({ ...form, roleTr: e.target.value })}
                placeholder="Baş Bilimsel Danışman"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Description (English) *
              </label>
              <textarea
                required
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Detailed dossier of achievements and initiatives..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Description (Uzbek)
                </label>
                <textarea
                  rows={2}
                  value={form.descriptionUz}
                  onChange={(e) => setForm({ ...form, descriptionUz: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Description (Russian)
                </label>
                <textarea
                  rows={2}
                  value={form.descriptionRu}
                  onChange={(e) => setForm({ ...form, descriptionRu: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Description (Turkish)
                </label>
                <textarea
                  rows={2}
                  value={form.descriptionTr}
                  onChange={(e) => setForm({ ...form, descriptionTr: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#B99A5B]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-xs rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 text-xs rounded-xl bg-[#17243A] text-white hover:bg-[#17243A]/90 font-semibold shadow-sm disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-[#B99A5B]" />}
              <span>{editingId ? 'Update Appointment' : 'Save Record'}</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#B99A5B]" />
            <span>Loading appointments...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            <AlertCircle className="w-6 h-6 mx-auto mb-2 text-slate-300" />
            <p>No appointments registered yet. Click &quot;Add Appointment&quot; to begin.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#B99A5B]">
                      {item.period}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#EAF1F8] text-[#17243A]">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#17243A]">{item.role}</h3>
                  <p className="text-xs text-slate-500">
                    {item.organization} {item.location ? `• ${item.location}` : ''}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-1 max-w-2xl">{item.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#17243A] hover:bg-slate-100 transition"
                    title="Edit Appointment"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Delete Appointment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
