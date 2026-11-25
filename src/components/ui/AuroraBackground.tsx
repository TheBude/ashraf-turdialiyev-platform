'use client';

import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'normal' | 'vibrant';
  showGrid?: boolean;
}

export default function AuroraBackground({
  children,
  className = '',
  intensity = 'normal',
  showGrid = true,
}: AuroraBackgroundProps) {
  const intensityMap = {
    subtle: 'opacity-40',
    normal: 'opacity-70',
    vibrant: 'opacity-95',
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Dynamic Multi-layered Aurora Blooms */}
      <div className={`aurora-canvas ${intensityMap[intensity]}`} aria-hidden="true">
        {/* Glow Layer 1 - Aurora Violet / Deep Blue */}
        <div className="aurora-glow-1" />

        {/* Glow Layer 2 - Aurora Blue / Cyan */}
        <div className="aurora-glow-2" />

        {/* Glow Layer 3 - Champagne Gold / Warm Light */}
        <div className="aurora-glow-3" />

        {/* Subtle Luxury Vector Grid Texture */}
        {showGrid && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        )}
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
