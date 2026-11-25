import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';

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
