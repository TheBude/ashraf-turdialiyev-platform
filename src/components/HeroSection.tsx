'use client';

import React from 'react';
import ModernHeroSection from './ModernHeroSection';

interface HeroProps {
  settingsMap: Record<string, string>;
  globeLocationsCount?: number;
  locale?: string;
}

export default function HeroSection({ settingsMap, globeLocationsCount = 40, locale = 'en' }: HeroProps) {
  return (
    <ModernHeroSection
      settingsMap={settingsMap}
      globeLocationsCount={globeLocationsCount}
      locale={locale}
    />
  );
}
