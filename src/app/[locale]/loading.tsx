import React from 'react';

export default function LocaleLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#F8F8F5]">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#B99A5B]/30 flex items-center justify-center shadow-subtle">
          <span className="font-serif text-xl font-bold text-[#17243A]">AT</span>
        </div>
        <div className="absolute inset-0 border-2 border-t-[#B99A5B] border-r-transparent border-b-[#B99A5B]/30 border-l-transparent rounded-2xl animate-spin" />
      </div>
      <p className="font-editorial text-lg text-[#17243A] font-semibold tracking-wide animate-pulse">
        Loading Ashraf Turdialiyev Platform...
      </p>
      <p className="text-xs text-slate-400 mt-1">
        Synchronizing geopolitical intelligence & chronicles
      </p>
    </div>
  );
}
