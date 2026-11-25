import React from 'react';

interface StructuredDataProps {
  siteUrl?: string;
}

export default function StructuredData({
  siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ashrafturdialiyev.uz',
}: StructuredDataProps) {
  const cleanUrl = siteUrl.replace(/\/$/, '');

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${cleanUrl}/#person`,
    name: 'Ashraf Turdialiyev',
    givenName: 'Ashraf',
    familyName: 'Turdialiyev',
    additionalName: 'Ashrafjon',
    alternateName: [
      'Ashraf',
      'Turdialiyev',
      'Ashraf Turdialiev',
      'Ashraf Turdiyaliev',
      'Ashrafjon Turdialiyev',
      'Ashrafjon Turdiyaliev',
      'Asraf Turdialiyev',
      'Asraf Turdiyaliev',
      'Ашраф Турдиалиев',
      'Ашрафжон Турдиалиев',
      'Ашраф',
      'Турдиалиев',
    ],
    description:
      'Ashraf Turdialiyev — international explorer, academic researcher, and youth leadership advocate specializing in geopolitics, high alpine expeditions, cartography, and Silk Road civilizations.',
    url: cleanUrl,
    image: `${cleanUrl}/images/ashraf-turdialiyev-avatar.jpg`,
    gender: 'https://schema.org/Male',
    nationality: {
      '@type': 'Country',
      name: 'Uzbekistan',
    },
    jobTitle: [
      'Academic Researcher',
      'International Explorer',
      'Youth Leadership Advocate',
      'Global Thinker',
      'Public Envoy',
    ],
    knowsLanguage: ['uz', 'en', 'ru', 'tr'],
    knowsAbout: [
      'Geopolitics',
      'Central Asian Studies',
      'Silk Road History',
      'High Alpine Expeditions',
      'Youth Diplomacy & Leadership',
      'Academic Research & Publications',
      '3D Cartography & Planetary Visualization',
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': cleanUrl,
    },
    sameAs: [
      'https://www.linkedin.com/in/ashrafturdialiyev',
      'https://instagram.com/ashrafturdialiyev',
      'https://t.me/ashrafturdialiyev',
      'https://github.com/TheBude',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${cleanUrl}/#website`,
    url: cleanUrl,
    name: 'Ashraf Turdialiyev Official Platform',
    alternateName: [
      'Ashraf Turdialiyev',
      'Ashraf Turdiyaliev',
      'Ashraf',
      'Turdialiyev',
      'Ашраф Турдиалиев',
      'Ashraf Turdialiyev Platform',
    ],
    description:
      'Official personal brand platform of Ashraf Turdialiyev: interactive 3D Earth globe, field expeditions chronicle, peer-reviewed research papers, and verified credentials vault.',
    publisher: {
      '@id': `${cleanUrl}/#person`,
    },
    inLanguage: ['uz', 'en', 'ru', 'tr'],
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${cleanUrl}/#profilepage`,
    url: cleanUrl,
    name: 'Ashraf Turdialiyev — Official Digital Identity, Research & Expeditions',
    description:
      'The verified primary web entity and comprehensive dossier of Ashraf Turdialiyev.',
    mainEntity: {
      '@id': `${cleanUrl}/#person`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
