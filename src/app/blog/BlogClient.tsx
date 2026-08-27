"use client";
import { useState } from "react";
import type { BlogPost } from "@/lib/source";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
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
                ? "bg-[#20211D] text-[#F3F1EB] border-[#20211D]"
                : "bg-white text-[#5A5D55] border-[#20211D]/10 hover:border-[#A0AD91] hover:text-[#20211D]"
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
              <article className="bg-white border border-[#20211D]/5 rounded-2xl p-8 shadow-xs hover:shadow-md hover:border-[#A0AD91] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group h-full cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold tracking-widest text-[#7E8E71] bg-[#A0AD91]/10 px-3 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-semibold text-[#A0AD91] bg-[#A0AD91]/8 px-2.5 py-1 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#20211D] mb-4 leading-snug tracking-tight group-hover:text-[#7E8E71] transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-sm md:text-base text-[#5A5D55] leading-relaxed mb-6">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-[#20211D]/5 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-[#5A5D55]">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                  <span className="text-xs text-[#7E8E71] font-semibold flex items-center gap-1">
                    Read article <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            </Link>
          ) : (
            <article
              key={post.id}
              className="bg-white border border-[#20211D]/5 rounded-2xl p-8 shadow-xs flex flex-col justify-between opacity-70"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-[#7E8E71] bg-[#A0AD91]/10 px-3 py-1 rounded-full uppercase">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-semibold text-[#A0AD91]/60 bg-[#A0AD91]/8 px-2.5 py-1 rounded-full">
                    {post.tag}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#20211D] mb-4 leading-snug tracking-tight">
                  {post.title}
                </h2>
                <p className="text-sm md:text-base text-[#5A5D55] leading-relaxed mb-6">
                  {post.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-[#20211D]/5 mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-[#5A5D55]">
                  <BookOpen size={12} />
                  <span>{post.readTime}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#7E8E71] bg-[#A0AD91]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            </article>
          )
        )}
      </div>

      {/* Subscribe nudge */}
      <div className="mt-16 text-center">
        <div className="inline-block bg-[#E8E5DD] border border-[#A0AD91]/20 rounded-2xl px-10 py-8 max-w-lg">
          <p className="text-sm font-semibold text-[#7E8E71] mb-2 uppercase tracking-widest">Be the first to know</p>
          <p className="text-[#5A5D55] text-sm leading-relaxed">
            We&apos;re writing in-depth, honest content for business owners — no fluff. Reach out to be notified when new articles go live.
          </p>
          <a href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7E8E71] hover:text-[#20211D] transition-colors">
            Notify Me <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
