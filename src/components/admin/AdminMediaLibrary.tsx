'use client';

import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import {
  UploadCloud,
  Search,
  Filter,
  Copy,
  Trash2,
  ExternalLink,
  Check,
  Image as ImageIcon,
  FileText,
  Eye,
} from 'lucide-react';

export interface MediaAssetItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  category: string;
  createdAt: string | Date;
}

interface AdminMediaLibraryProps {
  initialAssets: MediaAssetItem[];
}

export default function AdminMediaLibrary({ initialAssets }: AdminMediaLibraryProps) {
  const [assets, setAssets] = useState<MediaAssetItem[]>(initialAssets);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<MediaAssetItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'ALL',
    'GENERAL',
    'GLOBE',
    'DESTINATION',
    'CERTIFICATE',
    'PUBLICATION',
    'AVATAR',
  ];

  const filteredAssets = assets.filter((asset) => {
    const matchCategory = selectedCategory === 'ALL' || asset.category === selectedCategory;
    const matchSearch =
      !search ||
      asset.filename.toLowerCase().includes(search.toLowerCase()) ||
      (asset.alt && asset.alt.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', selectedCategory === 'ALL' ? 'GENERAL' : selectedCategory);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || `Failed to upload ${file.name}`);
        }

        const newAsset: MediaAssetItem = {
          id: data.assetId || `temp-${Date.now()}`,
          filename: data.filename || file.name,
          url: data.url,
          mimeType: data.type || file.type,
          size: data.size || file.size,
          category: selectedCategory === 'ALL' ? 'GENERAL' : selectedCategory,
          createdAt: new Date().toISOString(),
        };

        setAssets((prev) => [newAsset, ...prev]);
        toast.success(`Uploaded: ${file.name}`);
      }
    } catch (err: any) {
      toast.error(err.message || 'Upload error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (asset: MediaAssetItem) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    toast.success('Asset URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete asset');
      }

      setAssets((prev) => prev.filter((a) => a.id !== id));
      if (selectedAsset?.id === id) setSelectedAsset(null);
      toast.success('Asset removed successfully');
    } catch (err: any) {
      toast.error(err.message || 'Deletion error');
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B99A5B] mb-1">
            <ImageIcon className="w-4 h-4" />
            <span>Centralized Media Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243A]">
            Media Assets & Library
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload, organize, and copy high-resolution imagery, credentials, and expedition records.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(e) => handleUploadFiles(e.target.files)}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17243A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2B4D76] transition shadow-sm disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4 text-[#eedda5]" />
            <span>{isUploading ? 'Uploading...' : 'Upload Media'}</span>
          </button>
        </div>
      </div>

      {/* Drag & Drop Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUploadFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#B99A5B] bg-white hover:bg-[#F8F8F5] transition text-center cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#EAF1F8] text-[#17243A] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-6 h-6 text-[#B99A5B]" />
        </div>
        <p className="text-sm font-bold text-[#17243A]">
          Drag and drop media assets here, or <span className="text-[#B99A5B] underline">browse files</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Supports JPG, PNG, WebP, and PDF up to 15MB each
        </p>
      </div>

      {/* Controls: Search + Categories */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#17243A] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filename or alt..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-[#17243A] focus:outline-none focus:border-[#B99A5B]"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAssets.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-sm">
            No media assets found in this category.
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-md transition group flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setSelectedAsset(asset)}
                className="relative aspect-square bg-[#F8F8F5] cursor-pointer flex items-center justify-center overflow-hidden"
              >
                {asset.mimeType.startsWith('image/') ? (
                  <img
                    src={asset.url}
                    alt={asset.alt || asset.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <FileText className="w-12 h-12 text-slate-400" />
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-[#17243A]/80 text-white backdrop-blur-md">
                  {asset.category}
                </span>
              </div>

              {/* Info & Actions */}
              <div className="p-3">
                <p className="text-xs font-semibold text-[#17243A] truncate mb-1" title={asset.filename}>
                  {asset.filename}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
                  <span>{formatSize(asset.size)}</span>
                  <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleCopyUrl(asset)}
                    title="Copy URL"
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-[#EAF1F8] text-slate-600 hover:text-[#17243A] transition"
                  >
                    {copiedId === asset.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Full Image"
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-[#EAF1F8] text-slate-600 hover:text-[#17243A] transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleDelete(asset.id, asset.filename)}
                    title="Delete Asset"
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#17243A] truncate">
                {selectedAsset.filename}
              </h3>
              <button
                onClick={() => setSelectedAsset(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="max-h-96 w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center mb-4">
              {selectedAsset.mimeType.startsWith('image/') ? (
                <img
                  src={selectedAsset.url}
                  alt={selectedAsset.filename}
                  className="max-h-96 max-w-full object-contain"
                />
              ) : (
                <FileText className="w-20 h-20 text-slate-400" />
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Category</span>
                <span className="font-bold text-[#17243A]">{selectedAsset.category}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Size</span>
                <span className="font-bold text-[#17243A]">{formatSize(selectedAsset.size)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Type</span>
                <span className="font-bold text-[#17243A]">{selectedAsset.mimeType}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Uploaded</span>
                <span className="font-bold text-[#17243A]">
                  {new Date(selectedAsset.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                value={selectedAsset.url}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-[#17243A]"
              />
              <button
                onClick={() => handleCopyUrl(selectedAsset)}
                className="px-5 py-2.5 rounded-xl bg-[#17243A] text-white text-xs font-bold hover:bg-[#2B4D76] transition shadow-sm"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
