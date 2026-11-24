import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AudienceStatsSection from '@/components/AudienceStatsSection';
import DestinationsSection from '@/components/DestinationsSection';
import WorldMapSection from '@/components/WorldMapSection';
import TimelineSection from '@/components/TimelineSection';
import PublicationsSection from '@/components/PublicationsSection';
import CertificatesSection from '@/components/CertificatesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Force dynamic so changes made in admin are instantly visible
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [
    destinations,
    countries,
    timelineEvents,
    certificates,
    publications,
    stats,
    settings,
  ] = await Promise.all([
    prisma.destination.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { visitedAt: 'desc' },
    }),
    prisma.visitedCountry.findMany({
      orderBy: { visitedYear: 'desc' },
    }),
    prisma.timelineEvent.findMany({
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
    }),
    prisma.certificate.findMany({
      orderBy: [{ order: 'asc' }, { issueDate: 'desc' }],
    }),
    prisma.publication.findMany({
      orderBy: { year: 'desc' },
    }),
    prisma.audienceStat.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.siteSetting.findMany(),
  ]);

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 flex flex-col justify-between selection:bg-[#d4af37] selection:text-black">
      {/* Sticky Global Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Luxury Hero Banner */}
        <HeroSection settingsMap={settingsMap} />

        {/* Live Audience & Telemetry Counters */}
        <AudienceStatsSection initialStats={stats} />

        {/* Interactive Curated Expeditions */}
        <DestinationsSection destinations={destinations} />

        {/* Interactive Sovereign Territories World Map */}
        <WorldMapSection countries={countries} />

        {/* Interactive Milestones Journey Timeline */}
        <TimelineSection events={timelineEvents} />

        {/* Scientific Publications Archive */}
        <PublicationsSection publications={publications} />

        {/* Credentials & Diplomas Vault */}
        <CertificatesSection certificates={certificates} />

        {/* Inbound Global Dialogue Contact Form */}
        <ContactSection
          contactEmail={settingsMap['contact_email'] || 'contact@ashrafturdialiyev.com'}
        />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}
