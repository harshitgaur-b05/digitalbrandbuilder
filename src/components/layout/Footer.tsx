"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, Copy, Check, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const primaryEmail = "hello.digitalbrandbuilder@gmail.com";

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-muted/70 border-t border-border py-16 md:py-20 relative overflow-hidden z-20 transition-colors duration-500">
      {/* Background Subtle Radial Glow */}
      <div className="absolute pointer-events-none top-0 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary/5 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">



        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-border">

          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5 min-h-[44px]">
              <Image
                src="/logo.png"
                alt="Digital Brand Builder Logo"
                width={36}
                height={36}
                className="rounded-xl"
              />
              <span className="font-sans text-xl font-bold tracking-tight text-foreground lowercase">
                digital
                <span className="font-normal text-primary">brand</span>
                <span className="font-light text-muted-foreground">builder</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              We turn Indian local businesses and growing D2C brands into digital leaders
              that get found, trusted, and chosen online through high-converting websites,
              SEO &amp; performance marketing.
            </p>

            {/* Direct Contact Pills & Details — Neumorphic Soft UI Box */}
            <div className="w-full bg-card border border-border/40 rounded-2xl p-5 shadow-[6px_6px_16px_rgba(0,0,0,0.06),_-6px_-6px_16px_rgba(255,255,255,0.9)] dark:shadow-[6px_6px_16px_rgba(0,0,0,0.4),_-6px_-6px_16px_rgba(255,255,255,0.03)] flex flex-col gap-4 text-xs text-muted-foreground transition-all duration-300">
              {/* Primary Email with Click-to-Copy */}
              <div className="flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-card border border-border/30 shadow-[3px_3px_8px_rgba(0,0,0,0.06),_-3px_-3px_8px_rgba(255,255,255,0.9)] dark:shadow-[3px_3px_8px_rgba(0,0,0,0.4),_-3px_-3px_8px_rgba(255,255,255,0.03)] flex items-center justify-center shrink-0 text-primary">
                    <Mail size={15} />
                  </div>
                  <div className="truncate">
                    <span className="block text-[10px] text-muted-foreground/70 uppercase font-semibold">Email Us</span>
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="font-medium text-foreground hover:text-primary transition-colors truncate block"
                    >
                      {primaryEmail}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyEmail(primaryEmail)}
                  title="Copy email address"
                  className="min-h-[40px] min-w-[40px] p-2.5 rounded-xl bg-card border border-border/30 shadow-[3px_3px_8px_rgba(0,0,0,0.06),_-3px_-3px_8px_rgba(255,255,255,0.9)] dark:shadow-[3px_3px_8px_rgba(0,0,0,0.4),_-3px_-3px_8px_rgba(255,255,255,0.03)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),_inset_-2px_-2px_5px_rgba(255,255,255,0.7)] text-muted-foreground hover:text-primary transition-all shrink-0 flex items-center justify-center"
                >
                  {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                <div className="w-9 h-9 rounded-xl bg-card border border-border/30 shadow-[3px_3px_8px_rgba(0,0,0,0.06),_-3px_-3px_8px_rgba(255,255,255,0.9)] dark:shadow-[3px_3px_8px_rgba(0,0,0,0.4),_-3px_-3px_8px_rgba(255,255,255,0.03)] flex items-center justify-center shrink-0 text-primary">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground/70 uppercase font-semibold">Phone / Call Us</span>
                  <a
                    href="tel:+919211074113"
                    className="font-mono text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    +91 92110 74113
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                <div className="w-9 h-9 rounded-xl bg-card border border-border/30 shadow-[3px_3px_8px_rgba(0,0,0,0.06),_-3px_-3px_8px_rgba(255,255,255,0.9)] dark:shadow-[3px_3px_8px_rgba(0,0,0,0.4),_-3px_-3px_8px_rgba(255,255,255,0.03)] flex items-center justify-center shrink-0 text-primary">
                  <MapPin size={15} />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground/70 uppercase font-semibold">Location</span>
                  <span className="font-medium text-foreground">New Delhi, India 🇮🇳</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-foreground uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground w-full">
              <li>
                <Link
                  href="/services/websites"
                  className="hover:text-foreground transition-colors inline-flex items-center justify-between w-full py-1 min-h-[44px] group"
                >
                  <span>Web Design &amp; Development</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/seo"
                  className="hover:text-foreground transition-colors inline-flex items-center justify-between w-full py-1 min-h-[44px] group"
                >
                  <span>SEO &amp; AI Search (GEO/AEO)</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/marketing"
                  className="hover:text-foreground transition-colors inline-flex items-center justify-between w-full py-1 min-h-[44px] group"
                >
                  <span>Performance Marketing</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/social-media"
                  className="hover:text-foreground transition-colors inline-flex items-center justify-between w-full py-1 min-h-[44px] group"
                >
                  <span>Social Media Management</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/content-writing"
                  className="hover:text-foreground transition-colors inline-flex items-center justify-between w-full py-1 min-h-[44px] group"
                >
                  <span>Content Writing</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/brand-presence"
                  className="hover:text-foreground transition-colors inline-flex items-center justify-between w-full py-1 min-h-[44px] group"
                >
                  <span>Brand Presence &amp; PR</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-foreground uppercase mb-5">
              Company &amp; Tools
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground w-full">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors inline-block py-1 min-h-[44px] flex items-center"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors inline-block py-1 min-h-[44px] flex items-center"
                >
                  Blog &amp; Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors inline-block py-1 min-h-[44px] flex items-center"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/free-audit"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 py-1 min-h-[44px] text-primary font-medium"
                >
                  Free SEO &amp; Brand Audit
                  <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold">FREE</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright/legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} Digital Brand Builder. All rights reserved. Built for growing businesses in India.
          </span>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors py-2 min-h-[44px] flex items-center">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors py-2 min-h-[44px] flex items-center">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

