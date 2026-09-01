import Link from "next/link";
import { ArrowRight, Home, Search, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — 404",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const quickLinks = [
    {
      href: "/services",
      label: "Our Services",
      desc: "Websites, SEO, marketing, and more",
      icon: <Search size={18} className="text-primary" />,
    },
    {
      href: "/blog",
      label: "Read the Blog",
      desc: "Digital growth guides for businesses",
      icon: <MessageSquare size={18} className="text-primary" />,
    },
    {
      href: "/free-audit",
      label: "Free Digital Audit",
      desc: "Get a free review of your online presence",
      icon: <ArrowRight size={18} className="text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 antialiased">
      <div className="max-w-2xl w-full text-center">
        {/* Error code */}
        <p className="text-[clamp(6rem,20vw,12rem)] font-bold leading-none text-foreground/5 select-none mb-[-1rem]">
          404
        </p>

        <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
          Page Not Found
        </span>

        <h1 className="font-sans text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-4 leading-tight">
          This page doesn&apos;t exist.
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          The URL may be wrong, the page may have moved, or it may never have existed.
          Let&apos;s get you back on track.
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-card border border-border rounded-2xl p-5 text-left hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                {link.icon}
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">{link.label}</p>
              <p className="text-xs text-muted-foreground leading-snug">{link.desc}</p>
            </Link>
          ))}
        </div>

        {/* Home CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors duration-300 group"
        >
          <Home size={16} />
          Back to Homepage
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
