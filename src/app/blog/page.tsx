import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogPosts } from "@/lib/source";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: { absolute: "Blog — Digital Growth Insights for Indian Businesses" },
  description:
    "Tactical guides, real frameworks, and honest perspectives on digital marketing, SEO, website design, and brand building for Indian businesses.",
  alternates: { canonical: "https://www.digitalbrandbuilder.in/blog" },
  openGraph: {
    title: "Blog — Digital Growth Insights | Digital Brand Builder",
    description:
      "In-depth guides on SEO, website design, performance marketing, and social media for Indian businesses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Brand Builder Blog",
      },
    ],
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute pointer-events-none top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-muted opacity-40 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <span className="text-xs font-semibold tracking-[0.18em] text-primary mb-4 uppercase block">
              INSIGHTS & GUIDES
            </span>
            <h1 className="font-sans text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-foreground mb-6 max-w-4xl">
              Growth knowledge for serious brands.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Tactical guides, real frameworks, and honest perspectives on digital growth for Indian businesses.
            </p>
          </div>
        </section>

        {/* Posts + filters */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <BlogClient posts={posts} />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

