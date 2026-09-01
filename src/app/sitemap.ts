import { MetadataRoute } from 'next';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

const BASE = 'https://digitalbrandbuilder.in';

// Static pages with real dates — update these when you change a page
const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${BASE}`,                          lastModified: new Date('2025-01-01'), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/about`,                    lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/services`,                 lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/services/websites`,        lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/services/seo`,             lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/services/marketing`,       lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/services/social-media`,    lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/services/content-writing`, lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/services/brand-presence`,  lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/blog`,                     lastModified: new Date(),             changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE}/contact`,                  lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/free-audit`,               lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: MetadataRoute.Sitemap = [];

  try {
    await connectDB();
    const posts = await Blog.find({ isActive: true })
      .select('slug updatedAt createdAt')
      .lean();

    blogEntries = posts.map((post: any) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.createdAt ?? new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    // If DB is unavailable at build time, sitemap still works with static pages
  }

  return [...STATIC_PAGES, ...blogEntries];
}
