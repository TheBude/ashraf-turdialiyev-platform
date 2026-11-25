import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://ashrafturdialiyev.uz').replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
      // Search Engines
      {
        userAgent: ['Googlebot', 'Yandex', 'Bingbot', 'Mail.Ru'],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // AI Crawlers & LLM Engines
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot',
          'cohere-ai',
          'Omgilibot',
          'CCBot',
        ],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
