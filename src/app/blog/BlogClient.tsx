"use client";
import { useState } from "react";
import type { BlogPost } from "@/lib/source";
import { Clock, BookOpen, ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";

const ALL = "All";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const categories = [ALL, ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
              active === cat
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-foreground/10 hover:border-primary/20 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((post) =>
          post.published ? (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block h-full">
              <article className="bg-card border border-foreground/5 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col group h-full cursor-pointer">

                {/* Thumbnail placeholder */}
                <div className="w-full aspect-[16/7] bg-muted flex flex-col items-center justify-center gap-2 shrink-0">
                  {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon size={24} className="text-primary/70" strokeWidth={1.5} />
                      <span className="text-[10px] font-semibold text-primary/70 tracking-widest uppercase">Cover Image</span>
                    </>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold tracking-widest text-primary bg-primary/20/10 px-3 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-semibold text-primary/70 bg-primary/20/8 px-2.5 py-1 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug tracking-tight group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t border-foreground/5 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                    <span className="text-xs text-primary font-semibold flex items-center gap-1">
                      Read article <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ) : (
            <article
              key={post.id}
              className="bg-card border border-foreground/5 rounded-2xl p-8 shadow-xs flex flex-col justify-between opacity-70"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-primary bg-primary/20/10 px-3 py-1 rounded-full uppercase">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-semibold text-primary/70/60 bg-primary/20/8 px-2.5 py-1 rounded-full">
                    {post.tag}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug tracking-tight">
                  {post.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  {post.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-foreground/5 mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BookOpen size={12} />
                  <span>{post.readTime}</span>
                </div>
                <span className="text-[10px] font-semibold text-primary bg-primary/20/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            </article>
          )
        )}
      </div>

      {/* Subscribe nudge */}
      <div className="mt-16 text-center">
        <div className="inline-block bg-muted border border-primary/20/20 rounded-2xl px-10 py-8 max-w-lg">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-widest">Be the first to know</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We&apos;re writing in-depth, honest content for business owners — no fluff. Reach out to be notified when new articles go live.
          </p>
          <a href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors">
            <span>Notify Me</span> <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
}

