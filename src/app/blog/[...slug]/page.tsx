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

// ── Page ────────────────────────────────────────────────────────────────────

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params;
  const post = await getBlogPost(slug.join('/'));

  if (!post || !post.published) notFound();

  // Build TOC items for the client component
  const tocItems = (post.body ?? [])
    .filter((s) => s.type === 'heading' || s.type === 'subheading')
    .map((s) => ({
      id: slugify(s.content),
      label: s.content,
      type: s.type as "heading" | "subheading",
    }));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
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
                {post.content ? (
                  <div
                    className="prose prose-neutral dark:prose-invert max-w-none
                      prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                      prose-p:text-muted-foreground prose-p:leading-relaxed
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                      prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                      prose-code:text-primary prose-strong:text-foreground
                      prose-img:rounded-xl prose-img:border prose-img:border-foreground/8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                ) : (
                  post.body?.map((section, i) => renderSection(section, i))
                )}
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 bg-card border border-foreground/5 rounded-2xl p-8">
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
                  className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary transition-colors duration-200"
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

              {/* TOC — client component with IntersectionObserver */}
              <TableOfContents items={tocItems} />

              {/* CTA Card */}
              <div className="bg-foreground rounded-2xl p-6 text-background">
                <p className="text-[10px] font-bold tracking-widest text-primary/70 uppercase mb-3">
                  Work with us
                </p>
                <p className="text-base font-semibold leading-snug mb-3">
                  Ready to build a brand that grows?
                </p>
                <p className="text-primary/70 text-xs leading-relaxed mb-5">
                  We help Indian businesses get more visibility, more trust, and more customers online.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary/20 text-foreground text-xs font-bold px-4 py-2.5 rounded-full hover:bg-background transition-colors duration-200 w-full justify-center"
                >
                  Get in Touch <ArrowRight size={13} />
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
