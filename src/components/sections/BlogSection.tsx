import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ImageIcon, Radio } from "lucide-react";
import { getBlogPosts } from "@/lib/source";

export default async function BlogSection() {
  const allPosts = await getBlogPosts();
  const recentPosts = allPosts
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (recentPosts.length === 0) return null;

  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-[var(--color-ember-orange)]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-5 w-96 h-96 bg-[var(--color-brass)]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6">
              <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
              <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
                Editorial &amp; Strategy — Growth Insights
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-polysans)] text-[34px] sm:text-[44px] md:text-[54px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground uppercase">
              Growth Insights <br className="hidden sm:block" />
              <span className="relative inline-block mt-2 text-foreground">
                &amp; Field Playbooks.
                <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-ember-orange)] opacity-80" />
              </span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-polysans)] uppercase tracking-wider text-xs md:text-sm font-bold text-[var(--color-ember-orange)] hover:underline underline-offset-4 pb-2"
          >
            Explore Library <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {recentPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block h-full group">
              <article className="bg-card/95 backdrop-blur-md border border-border/80 rounded-[22px] overflow-hidden shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)] hover:shadow-2xl hover:border-[var(--color-ember-orange)]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                
                {/* Thumbnail */}
                <div className="w-full aspect-[16/9] bg-muted flex flex-col items-center justify-center gap-2 shrink-0 overflow-hidden relative border-b border-border/60">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <ImageIcon size={24} className="text-[var(--color-ember-orange)]/70" strokeWidth={1.5} />
                      <span className="text-[10px] font-mono font-semibold text-[var(--color-ember-orange)]/70 tracking-widest uppercase">Intel Dossier</span>
                    </>
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[var(--color-ember-orange)] bg-[var(--color-ember-orange)]/10 border border-[var(--color-ember-orange)]/20 px-3 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border/60">
                      {post.tag}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-polysans)] text-lg md:text-xl font-bold text-foreground mb-3 leading-snug tracking-wide uppercase group-hover:text-[var(--color-ember-orange)] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-border/60 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                    <span className="font-[family-name:var(--font-polysans)] text-xs uppercase tracking-wider text-[var(--color-ember-orange)] font-bold flex items-center gap-1">
                      Read Blueprint <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
