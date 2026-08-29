import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, type BlogSection } from '@/lib/source';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TableOfContents from "../TableOfContents";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock, User, ChevronRight, ImageIcon } from 'lucide-react';

// ── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "heading":
      return (
        <h2
          key={index}
          id={slugify(section.content)}
          className="text-2xl md:text-[1.65rem] font-bold text-foreground mt-14 mb-5 tracking-tight leading-snug scroll-mt-28"
        >
          {section.content}
        </h2>
      );
    case "subheading":
      return (
        <h3
          key={index}
          id={slugify(section.content)}
          className="text-lg md:text-xl font-semibold text-foreground mt-9 mb-3 tracking-tight scroll-mt-28"
        >
          {section.content}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="text-muted-foreground text-base md:text-[1.05rem] leading-[1.85] mb-5">
          {section.content}
        </p>
      );
    case "quote":
      return (
        <blockquote key={index} className="my-9 pl-6 border-l-4 border-primary/20 bg-primary/20/5 py-4 pr-4 rounded-r-lg">
          <p className="text-foreground text-lg italic font-medium leading-relaxed">
            {section.content}
          </p>
        </blockquote>
      );
    case "list":
      return (
        <ul key={index} className="my-5 space-y-3 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground text-base md:text-[1.05rem] leading-[1.8]">
              <span className="mt-[0.6rem] shrink-0 w-1.5 h-1.5 rounded-full bg-primary/20" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

// ── Metadata + JSON-LD ───────────────────────────────────────────────────────

export async function generateMetadata(
  props: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPost(slug.join('/'));
  if (!post) return {};

  return {
    title: `${post.title} | digitalbrandbuilder`,
    description: post.description,
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
  const post = await getBlogPost(slug.join('/'));

  if (!post || !post.published) notFound();

  // Build TOC items and parse content for IDs if needed
  let parsedContent = post.content || '';
  let tocItems: { id: string, label: string, type: "heading" | "subheading" }[] = [];

  if (post.body && post.body.length > 0) {
    tocItems = post.body
      .filter((s) => s.type === 'heading' || s.type === 'subheading')
      .map((s) => ({
        id: slugify(s.content),
        label: s.content,
        type: s.type as "heading" | "subheading",
      }));
  } else if (post.content) {
    // Inject IDs into the HTML headings and build TOC items
    const headingRegex = /<(h[23])([^>]*)>(.*?)<\/\1>/gi;
    parsedContent = post.content.replace(headingRegex, (match, tag, attrs, content) => {
      const label = content.replace(/<[^>]*>/g, '').trim();
      const id = slugify(label);
      tocItems.push({
        id,
        label,
        type: tag.toLowerCase() === 'h2' ? 'heading' : 'subheading',
      });
      // Add id attribute to the tag if it doesn't have one
      if (!attrs.includes('id=')) {
        return `<${tag}${attrs} id="${id}">${content}</${tag}>`;
      }
      return match;
    });
  }

  // ── FAQ JSON-LD (FAQPage schema) ──────────────────────────────────────────
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  // ── Article JSON-LD ───────────────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: post.author ?? 'digitalbrandbuilder' },
    datePublished: post.date,
    image: post.image ?? undefined,
    url: `https://digitalbrandbuilder.in/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          {/* ── Breadcrumbs ── */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={13} className="text-primary/70 shrink-0" />
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight size={13} className="text-primary/70 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-xs">{post.title}</span>
          </nav>

          {/* ── Two-column layout ── */}
          <div className="flex gap-12 items-start">

            {/* ── Main Article ── */}
            <article className="flex-1 min-w-0">

              {/* Badges */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold tracking-widest text-primary bg-primary/20/15 px-3 py-1.5 rounded-full uppercase">
                  {post.category}
                </span>
                <span className="text-[10px] font-semibold text-primary/70 bg-primary/20/10 px-3 py-1.5 rounded-full">
                  {post.tag}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-sans text-3xl md:text-[2.6rem] font-bold leading-[1.1] tracking-tight text-foreground mb-6">
                {post.title}
              </h1>

              {/* Lead */}
              <p className="text-lg md:text-xl text-primary leading-relaxed mb-8 font-medium">
                {post.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-5 pb-8 mb-10 border-b border-foreground/8">
                {post.author && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-7 h-7 rounded-full bg-primary/20/20 flex items-center justify-center">
                      <User size={13} className="text-primary" />
                    </span>
                    <span className="font-semibold text-foreground">{post.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock size={13} />
                  <span>{post.readTime}</span>
                </div>
                <span className="text-sm text-muted-foreground">{post.date}</span>
              </div>

              {/* Cover Image */}
              <div className="mb-10 w-full aspect-[16/7] rounded-2xl overflow-hidden border border-foreground/6">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-3">
                    <ImageIcon size={36} className="text-primary/70" strokeWidth={1.5} />
                    <p className="text-xs font-semibold text-primary/70 tracking-widest uppercase">
                      Cover Image
                    </p>
                  </div>
                )}
              </div>

              {/* Body — rich HTML from Tiptap editor, or legacy sections */}
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
                      scroll-mt-28 prose-headings:scroll-mt-28"
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
                            <span className="shrink-0 mt-0.5 text-[10px] font-bold text-primary bg-primary/20/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {faq.tag || `Q${i + 1}`}
                            </span>
                            <span className="font-semibold text-foreground text-base leading-snug">
                              {faq.question}
                            </span>
                          </div>
                          {/* Chevron — rotates on open */}
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

              {/* Bottom CTA */}
              <div className="mt-16 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-8">
                <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">
                  Want results like these?
                </p>
                <p className="text-foreground text-xl font-semibold mb-2 leading-snug">
                  Let&apos;s build your digital presence the right way.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  No templates, no guesswork — just a focused strategy built around your business and your customers.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors duration-200"
                >
                  Get in Touch <ArrowRight size={14} />
                </Link>
              </div>

              {/* Back link */}
              <Link
                href="/blog"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors"
              >
                <ArrowLeft size={15} /> Back to all articles
              </Link>

            </article>

            {/* ── Right Sidebar ── */}
            <aside className="hidden lg:flex flex-col gap-5 w-60 xl:w-64 shrink-0 sticky top-28 self-start">

              {/* CTA Card (Moved to top so it is never hidden) */}
              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-6 text-foreground">
                <p className="text-[10px] font-bold tracking-widest text-primary uppercase mb-3">
                  Work with us
                </p>
                <p className="text-base font-semibold leading-snug mb-3">
                  Ready to build a brand that grows?
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-5">
                  We help Indian businesses get more visibility, more trust, and more customers online.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors duration-200 w-full justify-center"
                >
                  Get in Touch <ArrowRight size={13} />
                </Link>
              </div>

              {/* TOC — client component with IntersectionObserver */}
              <div className="max-h-[calc(100vh-28rem)] overflow-y-auto pr-2 custom-scrollbar">
                <TableOfContents items={tocItems} />
              </div>

            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
