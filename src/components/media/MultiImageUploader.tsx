'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Plus, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface MultiImageUploaderProps {
  value: string[]; // array of image URLs
  onChange: (urls: string[]) => void;
  category?: string;
  label?: string;
  maxFiles?: number;
}

export default function MultiImageUploader({
  value = [],
  onChange,
  category = 'DESTINATION',
  label = 'Photo Gallery',
  maxFiles = 10,
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    if (value.length + fileArray.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} photos allowed in this gallery`);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    fileArray.forEach((f) => formData.append('files', f));
    formData.append('category', category);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload images');

      const newUrls = data.assets.map((a: any) => a.url);
      onChange([...value, ...newUrls]);
      toast.success(`${newUrls.length} image(s) uploaded to gallery`);
    } catch (err: any) {
      toast.error(err.message || 'Gallery upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (indexToRemove: number) => {
    onChange(value.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
            {label}
          </label>
          <span className="text-[11px] text-slate-400">
            {value.length} / {maxFiles} images
          </span>
        </div>
      )}

      {/* Grid of photos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {value.map((url, idx) => (
          <div
            key={idx}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-sm"
          >
            <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(idx)}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700"
              title="Remove photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="absolute bottom-2 left-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white">
              #{idx + 1}
            </span>
          </div>
        ))}

        {/* Add photo card button */}
        {value.length < maxFiles && (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              if (e.dataTransfer.files) handleUploadFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-[#B99A5B] bg-[#B99A5B]/5'
                : 'border-slate-300 hover:border-[#B99A5B]/60 bg-slate-50 hover:bg-white'
            }`}
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#B99A5B]" />
            ) : (
              <>
                <Plus className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-[11px] font-semibold text-slate-600">Add Photos</span>
                <span className="text-[10px] text-slate-400">Drag or click</span>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => e.target.files && handleUploadFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
