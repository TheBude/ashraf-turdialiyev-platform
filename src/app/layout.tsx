import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import StructuredData from '@/components/seo/StructuredData';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ashrafturdialiyev.uz';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ashraf Turdialiyev | Official Personal Brand Platform',
    template: '%s | Ashraf Turdialiyev',
  },
  description:
    'Official personal brand platform of Ashraf Turdialiyev (Ashraf Turdiyaliev / Ашраф Турдиалиев): international explorer, academic researcher, and youth leadership advocate connecting civilizations, science, and the future.',
  keywords: [
    // Exact and single-word keywords
    'Ashraf Turdialiyev',
    'Ashraf',
    'Turdialiyev',
    'Ashrafjon Turdialiyev',
    'Ashrafjon',
    // Common alternative spellings and misspellings
    'Ashraf Turdiyaliev',
    'Ashraf Turdialiev',
    'Asraf Turdialiyev',
    'Asraf Turdiyaliev',
    'Ashraf Turdyaliev',
    // Cyrillic (Uzbek & Russian)
    'Ашраф Турдиалиев',
    'Ашрафжон Турдиалиев',
    'Ашраф Турдиялиев',
    'Ашраф',
    'Турдиалиев',
    // Topical & Professional Keywords
    'Ashraf Explorer',
    'Ashraf Researcher',
    'Silk Road Explorer',
    'Central Asia Geopolitics',
    '3D Earth Globe',
    'High Alpine Expeditions',
    'Pamir Tien Shan Alps',
    'Youth Leadership Envoy',
    'Ashraf Turdialiyev Portfolio',
    'Ashraf Turdialiyev Official Website',
  ],
  authors: [{ name: 'Ashraf Turdialiyev', url: siteUrl }],
  creator: 'Ashraf Turdialiyev',
  publisher: 'Ashraf Turdialiyev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'uz-UZ': `${siteUrl}/uz`,
      'en-US': `${siteUrl}/en`,
      'ru-RU': `${siteUrl}/ru`,
      'tr-TR': `${siteUrl}/tr`,
    },
  },
  openGraph: {
    title: 'Ashraf Turdialiyev | Official Personal Brand Platform',
    description:
      'Official personal brand platform of Ashraf Turdialiyev (Ashraf Turdiyaliev / Ашраф Турдиалиев): international explorer, academic researcher, and youth leadership advocate.',
    url: siteUrl,
    type: 'profile',
    firstName: 'Ashraf',
    lastName: 'Turdialiyev',
    gender: 'male',
    username: 'ashrafturdialiyev',
    locale: 'uz_UZ',
    alternateLocale: ['en_US', 'ru_RU', 'tr_TR'],
    siteName: 'Ashraf Turdialiyev',
    images: [
      {
        url: '/images/ashraf-turdialiyev-avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Ashraf Turdialiyev — Global Explorer & Academic Scholar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashraf Turdialiyev | Official Personal Brand Platform',
    description:
      'International explorer, academic researcher, and youth leadership advocate connecting civilizations, science, and the future.',
    images: ['/images/ashraf-turdialiyev-avatar.jpg'],
    creator: '@ashrafturdialiyev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '3180fe00f463381c',
  },
};

const themeScript = `
  (function() {
    try {
      var match = document.cookie.match(new RegExp('(^| )ashraf_theme=([^;]+)'));
      var cookieTheme = match ? match[2] : null;
      var storedTheme = localStorage.getItem('ashraf_theme');
      var theme = cookieTheme || storedTheme || 'dark';
      var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData />
      </head>
      <body className="min-h-screen bg-[#F4F5F7] dark:bg-[#0B0F19] text-[#101827] dark:text-[#F4F5F7] antialiased selection:bg-[#B99A5B] selection:text-black transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Toaster position="top-right" richColors />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
