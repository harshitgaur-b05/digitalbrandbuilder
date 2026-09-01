import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main search crawlers + AI search crawlers (cite sources — welcome)
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-Video',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'PerplexityBot',
          'YouBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot',
        ],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // GPTBot (OpenAI) — allow for ChatGPT search & citations
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // AI training crawlers — block to protect content
      {
        userAgent: [
          'CCBot',
          'ChatGPT-User',
          'omgili',
          'omgilibot',
          'FacebookBot',
          'Bytespider',
          'PetalBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://digitalbrandbuilder.in/sitemap.xml',
  };
}
