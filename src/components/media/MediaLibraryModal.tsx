'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Image as ImageIcon, Search, Loader2 } from 'lucide-react';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  category?: string;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
  category,
}: MediaLibraryModalProps) {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchAssets();
    }
  }, [isOpen]);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const url = search ? `/api/media?q=${encodeURIComponent(search)}` : '/api/media';
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setAssets(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Media Library</h3>
            <p className="text-xs text-slate-500">Select an existing asset from the repository</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchAssets()}
            placeholder="Search assets by filename..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#B99A5B]"
          />
        </div>

        {/* Assets Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-3 p-1">
          {loading ? (
            <div className="col-span-4 py-12 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#B99A5B]" />
              <span>Loading media assets...</span>
            </div>
          ) : assets.length > 0 ? (
            assets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => {
                  onSelect(asset.url);
                  onClose();
                }}
                className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 hover:border-[#B99A5B] bg-slate-50 cursor-pointer transition-all shadow-sm"
              >
                <img
                  src={asset.url}
                  alt={asset.alt || asset.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-[#17243A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 rounded-lg bg-white text-xs font-semibold text-slate-900 shadow">
                    Select
                  </span>
                </div>
                <span className="absolute bottom-1 left-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] truncate block">
                  {asset.filename}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-4 py-12 text-center text-slate-400 text-xs">
              No media assets found in library.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
