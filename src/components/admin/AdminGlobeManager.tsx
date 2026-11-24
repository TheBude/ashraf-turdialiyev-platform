'use client';

import React, { useState } from 'react';
import EarthGlobe3D, { GlobeLocationItem } from '@/components/globe/EarthGlobe3D';
import ImageUploader from '@/components/media/ImageUploader';
import MultiImageUploader from '@/components/media/MultiImageUploader';
import { toast } from 'sonner';
import { Globe, Plus, Trash2, Edit2, MapPin, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminGlobeManagerProps {
  initialLocations: GlobeLocationItem[];
}

export default function AdminGlobeManager({ initialLocations }: AdminGlobeManagerProps) {
  const [locations, setLocations] = useState<GlobeLocationItem[]>(initialLocations);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    titleUz: '',
    titleRu: '',
    titleTr: '',
    country: '',
    countryCode: '',
    city: '',
    latitude: 41.2995,
    longitude: 69.2401,
    visitDate: new Date().toISOString().split('T')[0],
    description: '',
    descriptionUz: '',
    descriptionRu: '',
    descriptionTr: '',
    story: '',
    category: 'EXPEDITION',
    coverImage: '',
    photos: [] as string[],
    status: 'PUBLISHED',
    featured: false,
  });

  const resetForm = () => {
    setIsEditing(false);
    setActiveId(null);
    setFormData({
      title: '',
      titleUz: '',
      titleRu: '',
      titleTr: '',
      country: '',
      countryCode: '',
      city: '',
      latitude: 41.2995,
      longitude: 69.2401,
      visitDate: new Date().toISOString().split('T')[0],
      description: '',
      descriptionUz: '',
      descriptionRu: '',
      descriptionTr: '',
      story: '',
      category: 'EXPEDITION',
      coverImage: '',
      photos: [],
      status: 'PUBLISHED',
      featured: false,
    });
  };

  const handlePickCoordinates = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    toast.info(`Coordinates picked: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`);
  };

  const handleEdit = (loc: GlobeLocationItem) => {
    setIsEditing(true);
    setActiveId(loc.id);
    let parsedPhotos: string[] = [];
    if (Array.isArray(loc.photos)) {
      parsedPhotos = loc.photos;
    } else if (typeof loc.photos === 'string') {
      try {
        parsedPhotos = JSON.parse(loc.photos);
      } catch {}
    }

    setFormData({
      title: loc.title,
      titleUz: loc.titleUz || '',
      titleRu: loc.titleRu || '',
      titleTr: loc.titleTr || '',
      country: loc.country,
      countryCode: loc.countryCode,
      city: loc.city || '',
      latitude: loc.latitude,
      longitude: loc.longitude,
      visitDate: new Date(loc.visitDate).toISOString().split('T')[0],
      description: loc.description,
      descriptionUz: loc.descriptionUz || '',
      descriptionRu: loc.descriptionRu || '',
      descriptionTr: loc.descriptionTr || '',
      story: loc.story || '',
      category: loc.category,
      coverImage: loc.coverImage || '',
      photos: parsedPhotos,
      status: (loc as any).status || 'PUBLISHED',
      featured: !!loc.featured,
    });

    setSelectedMarkerId(loc.id);
    window.scrollTo({ top: 700, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/globe/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete');
      }

      setLocations((prev) => prev.filter((l) => l.id !== id));
      toast.success('Globe location deleted successfully');
      if (activeId === id) resetForm();
    } catch (err: any) {
      toast.error(err.message || 'Deletion error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const lat = Number(formData.latitude);
      const lng = Number(formData.longitude);

      if (isNaN(lat) || lat < -90 || lat > 90) {
        throw new Error('Latitude must be between -90 and 90');
      }
      if (isNaN(lng) || lng < -180 || lng > 180) {
        throw new Error('Longitude must be between -180 and 180');
      }

      const payload = {
        ...formData,
        latitude: lat,
        longitude: lng,
        photos: formData.photos,
      };

      const url = isEditing && activeId ? `/api/globe/${activeId}` : '/api/globe';
      const method = isEditing && activeId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save location');
      }

      if (isEditing) {
        setLocations((prev) => prev.map((l) => (l.id === data.id ? data : l)));
        toast.success('Location updated successfully!');
      } else {
        setLocations((prev) => [data, ...prev]);
        toast.success('New location published to 3D Globe!');
      }

      setSelectedMarkerId(data.id);
      resetForm();
    } catch (err: any) {
      toast.error(err.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B99A5B] mb-1">
            <Globe className="w-4 h-4" />
            <span>Interactive 3D Visual Coordinates Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243A]">
            Global Earth Locations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Click on the 3D Earth sphere to automatically set exact geographical coordinates, then attach stories and media.
          </p>
        </div>

        <button
          onClick={resetForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17243A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2B4D76] transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Location</span>
        </button>
      </div>

      {/* STEP 1 & 2: Interactive 3D Earth Globe with Location Picker */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#17243A]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Visual Coordinate Raycaster: Click anywhere on Earth</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {locations.length} live pins
          </span>
        </div>

        <EarthGlobe3D
          locations={locations}
          interactivePicker={true}
          onPickCoordinates={handlePickCoordinates}
          selectedMarkerId={selectedMarkerId}
          height="h-[550px]"
          showControls={true}
          showSidebar={true}
        />
      </div>

      {/* STEP 3: Location Details & Multi-Photo Form */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-[#17243A]">
              {isEditing ? `Edit Location: ${formData.title}` : 'Add New Location to 3D Globe'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter multilingual information, categories, and upload photographs.
            </p>
          </div>
          {isEditing && (
            <button
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-red-600 font-semibold"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Coordinates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#F8F8F5] border border-slate-200">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Latitude (-90 to 90) *
              </label>
              <input
                type="number"
                step="any"
                required
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-mono text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Longitude (-180 to 180) *
              </label>
              <input
                type="number"
                step="any"
                required
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-mono text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Visit Date *
              </label>
              <input
                type="date"
                required
                value={formData.visitDate}
                onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-mono text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
          </div>

          {/* Geographical Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Country Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Uzbekistan, Switzerland, Nepal"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Country Code (ISO 2/3) *
              </label>
              <input
                type="text"
                required
                placeholder="UZ, CHE, NPL"
                value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-mono text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                City / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Tashkent, Zermatt, Khumbu"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
          </div>

          {/* Multilingual Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Title (EN - Default) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Matterhorn Alpine Ascent"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Title (UZ)
              </label>
              <input
                type="text"
                placeholder="e.g. Matterhorn cho'qqisi ekspeditsiyasi"
                value={formData.titleUz}
                onChange={(e) => setFormData({ ...formData, titleUz: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Title (RU)
              </label>
              <input
                type="text"
                placeholder="e.g. Альпийское восхождение на Маттерхорн"
                value={formData.titleRu}
                onChange={(e) => setFormData({ ...formData, titleRu: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Title (TR)
              </label>
              <input
                type="text"
                placeholder="e.g. Matterhorn Alpleri Tırmanışı"
                value={formData.titleTr}
                onChange={(e) => setFormData({ ...formData, titleTr: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              >
                <option value="EXPEDITION">Expedition</option>
                <option value="ALPINE">Alpine Summit</option>
                <option value="CULTURAL">Cultural Heritage</option>
                <option value="SCHOLARLY">Scholarly Summit</option>
                <option value="DIPLOMATIC">Diplomatic Mission</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
              >
                <option value="PUBLISHED">Published (Visible on Globe)</option>
                <option value="DRAFT">Draft (Hidden)</option>
              </select>
            </div>
            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-[#B99A5B] rounded border-slate-300 focus:ring-[#B99A5B]"
              />
              <label htmlFor="featured" className="text-xs font-bold uppercase tracking-wider text-[#17243A] cursor-pointer">
                Featured Gold Pin
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Description (EN) *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
            />
          </div>

          {/* Media Uploaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#F8F8F5] border border-slate-200">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Cover Photograph
              </label>
              <ImageUploader
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                category="GLOBE"
                label="Upload Cover Photo"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Expedition Photo Gallery
              </label>
              <MultiImageUploader
                value={formData.photos}
                onChange={(urls) => setFormData({ ...formData, photos: urls })}
                category="GLOBE"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-[#17243A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B99A5B] hover:text-[#17243A] transition shadow-md disabled:opacity-50"
            >
              {isSubmitting ? 'Saving to Database...' : isEditing ? 'Update Location' : 'Publish to 3D Globe'}
            </button>
          </div>
        </form>
      </div>

      {/* STEP 4: Table of All Existing Globe Locations */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-[#17243A] mb-4">
          All Registered Globe Coordinates ({locations.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F5] text-slate-500 uppercase tracking-wider font-mono border-b border-slate-200">
              <tr>
                <th className="p-3">Cover</th>
                <th className="p-3">Location Title</th>
                <th className="p-3">Country / City</th>
                <th className="p-3">Coordinates</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3">
                    {loc.coverImage ? (
                      <img
                        src={loc.coverImage}
                        alt={loc.title}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-[#17243A]">
                    {loc.title}
                    {loc.featured && (
                      <span className="ml-2 text-[10px] text-[#B99A5B] font-bold">★ Featured</span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600">
                    {loc.city ? `${loc.city}, ` : ''}{loc.country} ({loc.countryCode})
                  </td>
                  <td className="p-3 font-mono text-slate-500">
                    {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF1F8] text-[#17243A]">
                      {loc.category}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        (loc as any).status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {(loc as any).status || 'PUBLISHED'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setSelectedMarkerId(loc.id)}
                      title="Focus on 3D Globe"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#EAF1F8] text-slate-600 hover:text-[#17243A] transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEdit(loc)}
                      title="Edit location"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(loc.id, loc.title)}
                      title="Delete location"
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
