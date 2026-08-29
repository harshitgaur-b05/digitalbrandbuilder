import Link from "next/link";
import { ArrowRight, Clock, ImageIcon } from "lucide-react";
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
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-primary mb-4 uppercase inline-block bg-primary/10 px-3 py-1.5 rounded-full">OUR BLOG</span>
            <h2 className="font-sans text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight text-foreground max-w-2xl">
              Latest insights & strategies.
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline underline-offset-4 pb-2">
            View all posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block h-full group">
              <article className="bg-card border border-foreground/5 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                
                {/* Thumbnail */}
                <div className="w-full aspect-[16/9] bg-muted flex flex-col items-center justify-center gap-2 shrink-0 overflow-hidden relative">
                  {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <>
                      <ImageIcon size={24} className="text-primary/70" strokeWidth={1.5} />
                      <span className="text-[10px] font-semibold text-primary/70 tracking-widest uppercase">Cover Image</span>
                    </>
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground bg-foreground/5 px-2.5 py-1 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-snug tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t border-foreground/5 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                    <span className="text-xs text-primary font-semibold flex items-center gap-1">
                      Read article <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
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
