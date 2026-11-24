import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Ashraf Turdialiyev | Official Personal Brand Platform',
  description: 'International explorer, academic researcher, and youth leadership advocate connecting civilizations, science, and the future.',
  keywords: ['Ashraf Turdialiyev', 'Explorer', 'Silk Road', 'Academic Researcher', 'Geopolitics', 'Global Thinker'],
  authors: [{ name: 'Ashraf Turdialiyev' }],
  openGraph: {
    title: 'Ashraf Turdialiyev | Official Personal Brand Platform',
    description: 'International explorer, academic researcher, and youth leadership advocate.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ashraf Turdialiyev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#08090c] text-slate-100 antialiased selection:bg-[#d4af37] selection:text-black">
        <LanguageProvider>
          {children}
          <Toaster position="top-right" theme="dark" richColors />
        </LanguageProvider>
      </body>
    </html>
  );
}
