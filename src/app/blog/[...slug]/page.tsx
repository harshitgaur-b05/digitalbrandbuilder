import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts, type BlogSection } from '@/lib/source';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TableOfContents from "../TableOfContents";
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  ChevronRight,
  ChevronLeft,
  ImageIcon,
  BookOpen,
  Tag,
  Layers,
} from 'lucide-react';

// ── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2
          key={index}
          id={slugify(section.content)}
          className="text-2xl md:text-[1.65rem] font-bold text-foreground mt-14 mb-5 tracking-tight leading-snug scroll-mt-28"
        >
          {section.content}
        </h2>
      );
    case 'subheading':
      return (
        <h3
          key={index}
          id={slugify(section.content)}
          className="text-lg md:text-xl font-semibold text-foreground mt-9 mb-3 tracking-tight scroll-mt-28"
        >
          {section.content}
        </h3>
      );
    case 'paragraph':
      return (
        <p key={index} className="text-muted-foreground text-base md:text-[1.05rem] leading-[1.85] mb-5">
          {section.content}
        </p>
      );
    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-9 pl-6 border-l-4 border-primary/30 bg-primary/5 py-4 pr-4 rounded-r-lg"
        >
          <p className="text-foreground text-lg italic font-medium leading-relaxed">
            {section.content}
          </p>
        </blockquote>
      );
    case 'list':
      return (
        <ul key={index} className="my-5 space-y-3 pl-1">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-muted-foreground text-base md:text-[1.05rem] leading-[1.8]"
            >
              <span className="mt-[0.6rem] shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

// ── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata(
  props: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPost(slug.join('/'));
  if (!post) return {};

  return {
    title: { absolute: post.seoTitle || post.title },
    description: post.description,
    alternates: { canonical: `https://www.digitalbrandbuilder.in/blog/${slug.join('/')}` },
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params;

  // Fetch the current post and all posts in parallel
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug.join('/')),
    getBlogPosts(),
  ]);

  if (!post || !post.published) notFound();

  // ── Prev / Next ──────────────────────────────────────────────────────────
  const publishedPosts = allPosts.filter((p) => p.published);
  const currentIndex = publishedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < publishedPosts.length - 1
      ? publishedPosts[currentIndex + 1]
      : null;

  // ── Categories (unique, Title Case) ─────────────────────────────────────
  const toTitleCase = (s: string) =>
    s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

  const categoryMap = new Map<string, string>();
  publishedPosts.forEach((p) => {
    if (!p.category) return;
    const key = p.category.trim().toLowerCase();
    if (!categoryMap.has(key)) categoryMap.set(key, toTitleCase(p.category.trim()));
  });
  const categories = Array.from(categoryMap.values());

  // ── Latest posts (sidebar — exclude current) ─────────────────────────────
  const latestPosts = publishedPosts.filter((p) => p.slug !== post.slug).slice(0, 5);

  // ── TOC ──────────────────────────────────────────────────────────────────
  let parsedContent = post.content || '';
  const tocItems: { id: string; label: string; type: 'heading' | 'subheading' }[] = [];

  if (post.body && post.body.length > 0) {
    post.body
      .filter((s) => s.type === 'heading' || s.type === 'subheading')
      .forEach((s) => {
        tocItems.push({
          id: slugify(s.content),
          label: s.content,
          type: s.type as 'heading' | 'subheading',
        });
      });
  } else if (post.content) {
    const headingRegex = /<(h[23])([^>]*)>(.*?)<\/\1>/gi;
    parsedContent = post.content.replace(headingRegex, (match, tag, attrs, content) => {
      const label = content.replace(/<[^>]*>/g, '').trim();
      const id = slugify(label);
      tocItems.push({
        id,
        label,
        type: tag.toLowerCase() === 'h2' ? 'heading' : 'subheading',
      });
      if (!attrs.includes('id=')) {
        return `<${tag}${attrs} id="${id}">${content}</${tag}>`;
      }
      return match;
    });
  }

  // ── JSON-LD ───────────────────────────────────────────────────────────────
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://www.digitalbrandbuilder.in/blog/${post.slug}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.digitalbrandbuilder.in/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author ?? 'Digital Brand Builder',
      url: 'https://www.digitalbrandbuilder.in/about',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.digitalbrandbuilder.in/#organization',
      name: 'Digital Brand Builder',
      logo: { '@type': 'ImageObject', url: 'https://www.digitalbrandbuilder.in/logo.png' },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: post.image ? { '@type': 'ImageObject', url: post.image, description: post.title } : undefined,
    url: `https://www.digitalbrandbuilder.in/blog/${post.slug}`,
    inLanguage: 'en-IN',
    keywords: [post.category, post.tag].filter(Boolean).join(', '),
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://www.digitalbrandbuilder.in/blog',
      name: 'Digital Brand Builder Blog',
      publisher: { '@id': 'https://www.digitalbrandbuilder.in/#organization' },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.digitalbrandbuilder.in' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.digitalbrandbuilder.in/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.digitalbrandbuilder.in/blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      {/* ── Structured Data ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <Navbar />

      <main className="flex-grow">

        {/* ── Page Header ───────────────────────────────────────────────────── */}
        <header className="pt-36 pb-10 relative overflow-hidden border-b border-foreground/6">
          {/* Subtle radial glow behind header */}
          <div
            aria-hidden
            className="absolute pointer-events-none inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 0%, color-mix(in srgb, var(--color-primary) 8%, transparent) 0%, transparent 75%)',
            }}
          />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap"
            >
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight size={13} className="text-primary/70 shrink-0" />
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <ChevronRight size={13} className="text-primary/70 shrink-0" />
              <span className="text-foreground font-medium truncate max-w-xs">{post.title}</span>
            </nav>

            {/* Category + Tag badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase">
                <Layers size={10} />
                {post.category}
              </span>
              {post.tag && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary/70 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/15">
                  <Tag size={9} />
                  {post.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-sans text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-6 max-w-4xl">
              {post.title}
            </h1>

            {/* Lead / description */}
            <p className="text-lg md:text-xl text-primary leading-relaxed mb-8 font-medium max-w-3xl">
              {post.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              {post.author && (
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <User size={13} className="text-primary" />
                  </span>
                  <span className="font-semibold text-foreground">{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span>{post.readTime}</span>
              </div>
              <span>{post.date}</span>
            </div>
          </div>
        </header>

        {/* ── Two-column layout ──────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-16">
          <div className="flex gap-12 xl:gap-16 items-start">

            {/* ── Main Article ─────────────────────────────────────────────── */}
            <article className="flex-1 min-w-0">

              {/* Cover Image */}
              <div className="relative mb-10 w-full aspect-[16/7] rounded-2xl overflow-hidden border border-foreground/6">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 860px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-3">
                    <ImageIcon size={36} className="text-primary/60" strokeWidth={1.5} />
                    <p className="text-xs font-semibold text-primary/60 tracking-widest uppercase">Cover Image</p>
                  </div>
                )}
              </div>

              {/* Body */}
              <div>
                {parsedContent ? (
                  <div
                    className="prose prose-neutral dark:prose-invert max-w-none
                      prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                      prose-p:text-muted-foreground prose-p:leading-relaxed
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                      prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                      prose-code:text-primary prose-strong:text-foreground
                      prose-img:rounded-xl prose-img:border prose-img:border-foreground/8
                      prose-headings:scroll-mt-28"
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                  />
                ) : (
                  post.body?.map((section, i) => renderSection(section, i))
                )}
              </div>

              {/* ── FAQ Section ────────────────────────────────────────────── */}
              {post.faqs && post.faqs.length > 0 && (
                <section className="mt-16" aria-label="Frequently Asked Questions">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-foreground/8" />
                    <h2 className="text-xl font-bold text-foreground tracking-tight shrink-0">
                      Frequently Asked Questions
                    </h2>
                    <div className="h-px flex-1 bg-foreground/8" />
                  </div>

                  <div className="space-y-3">
                    {post.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group bg-card border border-foreground/6 rounded-2xl overflow-hidden transition-all duration-200 open:border-primary/20"
                      >
                        <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
                          <div className="flex items-start gap-3 min-w-0">
                            <span className="shrink-0 mt-0.5 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {faq.tag || `Q${i + 1}`}
                            </span>
                            <span className="font-semibold text-foreground text-base leading-snug">
                              {faq.question}
                            </span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 shrink-0 mt-1 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </summary>
                        <div className="px-6 pb-6 pt-1 border-t border-foreground/5">
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed pl-8">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* ── In-article Bottom CTA ─────────────────────────────────── */}
              <div className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8">
                <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">
                  Want results like these?
                </p>
                <p className="text-foreground text-xl font-semibold mb-2 leading-snug">
                  Let&apos;s build your digital presence the right way.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  No templates, no guesswork — just a focused strategy built around your business and your customers.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground border-2 border-foreground px-6 py-2.5 rounded-md text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_var(--foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all duration-200 group"
                >
                  Build My Brand
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* ── Divider ───────────────────────────────────────────────── */}
              <div className="w-full h-px my-10 bg-foreground/8" />

              {/* ── Prev / Next Navigation ───────────────────────────────── */}
              {(prevPost || nextPost) && (
                <nav aria-label="Post navigation">
                  <div
                    className={`grid gap-4 ${
                      prevPost && nextPost ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 max-w-sm'
                    }`}
                  >
                    {prevPost && (
                      <Link
                        href={`/blog/${prevPost.slug}`}
                        className="group flex items-center gap-4 p-5 rounded-2xl border border-foreground/8 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
                      >
                        <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary transition-colors duration-300">
                          <ChevronLeft size={18} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                            Previous
                          </p>
                          <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {prevPost.title}
                          </h4>
                        </div>
                      </Link>
                    )}

                    {nextPost && (
                      <Link
                        href={`/blog/${nextPost.slug}`}
                        className="group flex items-center gap-4 p-5 rounded-2xl border border-foreground/8 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                            Next
                          </p>
                          <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {nextPost.title}
                          </h4>
                        </div>
                        <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary transition-colors duration-300">
                          <ChevronRight size={18} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                      </Link>
                    )}
                  </div>
                </nav>
              )}

              {/* Back link */}
              <Link
                href="/blog"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors"
              >
                <ArrowLeft size={15} /> Back to all articles
              </Link>
            </article>

            {/* ── Right Sidebar ─────────────────────────────────────────────── */}
            <aside className="hidden lg:flex flex-col gap-5 w-64 xl:w-72 shrink-0 sticky top-28 self-start">

              {/* 1 — CTA Card */}
              <div className="bg-card border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
                {/* subtle background glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, transparent 80%)',
                  }}
                />
                <div className="relative z-10">
                  <p className="text-[10px] font-bold tracking-widest text-primary uppercase mb-3">
                    Work with us
                  </p>
                  <p className="text-base font-semibold text-foreground leading-snug mb-3">
                    Ready to build a brand that grows?
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-5">
                    We help Indian businesses get more visibility, more trust, and more customers online.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground border-2 border-foreground px-5 py-2 rounded-md text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_var(--foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all duration-200 w-full justify-center group"
                  >
                    Get in Touch
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <div className="mt-5 pt-5 border-t border-foreground/8 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Quick links</p>
                    {[
                      { label: 'Our Services', href: '/services' },
                      { label: 'About Us', href: '/about' },
                      { label: 'All Blogs', href: '/blog' },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors group"
                      >
                        <ArrowRight size={11} className="text-primary shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Or reach us directly</p>
                    <a
                      href="tel:+919211074113"
                      className="text-xs font-bold font-mono text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      +91 92110 74113
                    </a>
                  </div>
                </div>
              </div>

              {/* 2 — Categories Widget */}
              <div className="bg-card border border-foreground/6 rounded-2xl p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 rounded-full bg-primary shrink-0" />
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground">Categories</p>
                </div>
                <ul className="space-y-1.5">
                  {/* All */}
                  <li>
                    <Link
                      href="/blog"
                      className="group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border border-foreground/6 bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-primary/5 transition-all duration-200"
                    >
                      <span className="flex items-center gap-2">
                        <ArrowRight size={10} className="text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
                        All
                      </span>
                      <span className="text-[10px] font-bold bg-foreground/6 px-1.5 py-0.5 rounded-full text-muted-foreground">
                        {publishedPosts.length}
                      </span>
                    </Link>
                  </li>
                  {categories.map((cat) => {
                    const count = publishedPosts.filter(
                      (p) => p.category?.trim().toLowerCase() === cat.trim().toLowerCase()
                    ).length;
                    return (
                      <li key={cat}>
                        <Link
                          href={`/blog?category=${encodeURIComponent(cat)}`}
                          className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                            post.category?.trim().toLowerCase() === cat.trim().toLowerCase()
                              ? 'border-primary/40 bg-primary/10 text-foreground'
                              : 'border-foreground/6 bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-primary/5'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <ArrowRight size={10} className="text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
                            {cat}
                          </span>
                          <span className="text-[10px] font-bold bg-foreground/6 px-1.5 py-0.5 rounded-full text-muted-foreground">
                            {count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* 3 — Latest Posts Widget */}
              {latestPosts.length > 0 && (
                <div className="bg-card border border-foreground/6 rounded-2xl p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-1 h-5 rounded-full bg-primary shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground">Latest Posts</p>
                  </div>
                  <div className="space-y-4">
                    {latestPosts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="group flex items-start gap-3"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-foreground/6 bg-muted flex items-center justify-center">
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <BookOpen size={16} className="text-primary/60" strokeWidth={1.5} />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                            {p.title}
                          </h4>
                          <p className="text-[10px] text-muted-foreground">{p.date}</p>
                          <div className="mt-2 w-5 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-8" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 4 — Table of Contents */}
              {tocItems.length > 0 && (
                <div className="max-h-72 overflow-y-auto">
                  <TableOfContents items={tocItems} />
                </div>
              )}

            </aside>
          </div>
        </div>

        {/* ── Bottom "Read More" CTA section ──────────────────────────────────── */}
        <section className="py-20 md:py-28 relative overflow-hidden border-t border-foreground/6">
          <div
            aria-hidden
            className="absolute pointer-events-none inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 70% at 50% 100%, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, transparent 80%)',
            }}
          />
          <div className="max-w-3xl mx-auto px-6 md:px-8 text-center relative z-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary mb-4 uppercase block">
              Keep Reading
            </span>
            <h2 className="font-sans text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-5 leading-tight">
              More <span className="text-primary">articles</span> worth your time
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Explore more tactical guides and honest insights on digital growth for Indian businesses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground border-2 border-foreground px-8 py-3.5 rounded-md text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_var(--foreground)] transition-all duration-200 group"
              >
                View All Posts
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-transparent text-foreground border-2 border-foreground/20 px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-wider hover:border-foreground/50 transition-all duration-200"
              >
                Work with Us
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
