'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  category?: string;
  label?: string;
  aspectRatio?: string;
}

export default function ImageUploader({
  value,
  onChange,
  category = 'GENERAL',
  label = 'Upload Image',
  aspectRatio = 'aspect-[16/9]',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, and WebP images are supported');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('Image file size must be under 15MB');
      return;
    }

    setUploading(true);
    setProgress(30);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      setProgress(60);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setProgress(100);
      onChange(data.url);
      toast.success('Image uploaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
          {label}
        </label>
      )}

      {value ? (
        <div className={`relative ${aspectRatio} w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-sm`}>
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white text-xs font-semibold text-slate-800 shadow-md hover:bg-slate-50 transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-lg bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative ${aspectRatio} w-full rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-4 text-center ${
            isDragOver
              ? 'border-[#B99A5B] bg-[#B99A5B]/5'
              : 'border-slate-300 hover:border-[#B99A5B]/60 bg-slate-50 hover:bg-white'
          }`}
        >
          {uploading ? (
            <div className="space-y-2 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#B99A5B] mx-auto" />
              <span className="text-xs font-medium text-slate-600 block">
                Uploading ({progress}%)...
              </span>
            </div>
          ) : (
            <div className="space-y-1">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <span className="text-xs font-semibold text-slate-700 block">
                Click to upload or drag & drop
              </span>
              <span className="text-[11px] text-slate-400 block">
                JPG, PNG, WebP up to 15MB
              </span>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
}
