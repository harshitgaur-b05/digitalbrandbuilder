import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog | digitalbrandbuilder",
  description: "Insights, guides, and growth strategies for Indian businesses building their digital presence.",
};

const posts = [
  {
    category: "SEO",
    title: "Why 70% of Local Businesses Are Invisible on Google (And How to Fix It)",
    excerpt: "Most small businesses have a Google Business Profile that's incomplete, outdated, or simply never optimized. Here's the exact checklist we use for every client.",
    date: "Coming soon",
    readTime: "8 min read",
    tag: "Guide",
  },
  {
    category: "Websites",
    title: "What Makes a Website Premium? The 5 Design Signals That Build Trust Instantly",
    excerpt: "Speed, typography, whitespace, contrast, and consistency — the five invisible forces that decide whether a customer stays or bounces within 3 seconds.",
    date: "Coming soon",
    readTime: "6 min read",
    tag: "Design",
  },
  {
    category: "Marketing",
    title: "Stop Boosting Posts. Here's How Performance Marketing Actually Works for D2C Brands",
    excerpt: "Boosting a post is not advertising. Here's the real architecture of a campaign that generates consistent, trackable revenue for growing product brands.",
    date: "Coming soon",
    readTime: "10 min read",
    tag: "Strategy",
  },
  {
    category: "Brand",
    title: "The 3-Layer Brand Framework: How Local Businesses Build Recognition That Scales",
    excerpt: "Brand identity is not your logo. It's the sum of how your business looks, sounds, and behaves across every touchpoint your customer encounters.",
    date: "Coming soon",
    readTime: "7 min read",
    tag: "Branding",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F1EB] text-[#20211D] antialiased">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden bg-[#F3F1EB]">
          <div className="absolute pointer-events-none top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-[#E8E5DD] opacity-40 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <span className="text-xs font-semibold tracking-[0.18em] text-[#7E8E71] mb-4 uppercase block">INSIGHTS & GUIDES</span>
            <h1 className="font-sans text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-[#20211D] mb-6 max-w-4xl">
              Growth knowledge for serious brands.
            </h1>
            <p className="text-lg md:text-xl text-[#5A5D55] max-w-2xl leading-relaxed">
              Tactical guides, real frameworks, and honest perspectives on digital growth for Indian businesses.
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, i) => (
                <article
                  key={i}
                  className="bg-white border border-[#20211D]/5 rounded-2xl p-8 shadow-xs hover:shadow-md hover:border-[#A0AD91] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                >
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
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5 border-t border-[#20211D]/5">
                    <div className="flex items-center gap-1.5 text-xs text-[#5A5D55]">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                    <span className="text-xs text-[#A0AD91] italic">{post.date}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-block bg-[#E8E5DD] border border-[#A0AD91]/20 rounded-2xl px-10 py-8 max-w-lg">
                <p className="text-sm font-semibold text-[#7E8E71] mb-2 uppercase tracking-widest">Coming Soon</p>
                <p className="text-[#5A5D55] text-sm leading-relaxed">
                  We&apos;re writing in-depth, honest content for business owners — no fluff, no AI padding. Subscribe to be notified.
                </p>
                <a href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7E8E71] hover:text-[#20211D] transition-colors">
                  Notify Me <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
