import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// ─── Public-facing blog post type (used by /blog page & card components) ─────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tag: string;
  author?: string;
  featured?: boolean;
  published: boolean;
  image?: string;
  body?: BlogSection[];
  // Rich HTML content from the Tiptap editor (used on individual post pages)
  content?: string;
}

export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'quote' | 'list';
  content: string;
  items?: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Estimate read time from HTML or plain-text content */
function estimateReadTime(content?: string): string {
  if (!content) return '5 min read';
  const plainText = content.replace(/<[^>]*>/g, ' ');
  const words = plainText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/** Map a raw MongoDB blog document to the public BlogPost shape */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBlog(doc: any): BlogPost {
  return {
    id: doc._id?.toString() ?? doc.id,
    slug: doc.slug,
    title: doc.title,
    description: doc.excerpt || doc.intro || '',
    date: doc.date || (doc.createdAt
      ? new Date(doc.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : ''),
    readTime: estimateReadTime(doc.content),
    category: doc.category || 'General',
    tag: (doc.tags && doc.tags[0]) || 'Article',
    author: doc.author,
    featured: doc.priority != null && doc.priority > 0,
    published: doc.isActive === true,
    image: doc.heroImage?.url,
    content: doc.content, // rich HTML from Tiptap
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns all ACTIVE (published) blog posts from MongoDB, sorted newest first.
 * Called from the /blog Server Component — runs at request time on Vercel.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();
    const docs = await Blog.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();
    return docs.map(mapBlog);
  } catch (err) {
    console.error('[getBlogPosts] Failed to fetch blogs:', err);
    return [];
  }
}

/**
 * Returns a single active blog post by slug.
 * Returns null if not found or if the post is a draft.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    await connectDB();
    const doc = await Blog.findOne({ slug, isActive: true }).lean();
    if (!doc) return null;
    return mapBlog(doc);
  } catch (err) {
    console.error('[getBlogPost] Failed to fetch blog:', err);
    return null;
  }
}
