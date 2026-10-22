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
    <footer className="bg-[#0D0D0D] border-t border-white/[0.08] pt-16 md:pt-20 pb-0 relative overflow-hidden z-20 transition-colors duration-500">
      {/* Background Subtle Radial Glow */}
      <div className="absolute pointer-events-none top-0 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[var(--color-ember-orange)]/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute pointer-events-none bottom-0 left-10 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[var(--color-brass)]/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-white/[0.08]">

          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="mb-5 inline-flex items-center gap-3 min-h-[44px] group" aria-label="Digital Brand Builder homepage">
              <Image
                src="/newlogo/android-chrome-192x192.png"
                alt="Digital Brand Builder Logo"
                width={40}
                height={40}
                className="rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center leading-[0.9] select-none">
                <div className="font-[family-name:var(--font-polysans)] text-lg sm:text-xl font-black tracking-tight lowercase">
                  <span className="text-foreground">digital </span>
                  <span className="text-[var(--color-ember-orange)]">brand</span>
                </div>
                <span className="font-[family-name:var(--font-polysans)] text-lg sm:text-xl font-black tracking-tight text-foreground lowercase">
                  builder
                </span>
              </div>
            </Link>

            <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              We turn ambitious Indian local businesses and growing D2C brands into digital leaders
              that get found, trusted, and chosen online through high-converting web architectures,
              SEO &amp; performance marketing.
            </p>

            {/* Direct Contact Pills & Details — Hero Dashboard Box */}
            <div className="w-full bg-[#141414] border border-white/[0.08] rounded-[22px] p-5 shadow-[0_10px_35px_rgb(0,0,0,0.35)] flex flex-col gap-4 text-xs text-muted-foreground transition-all duration-300">
              {/* Primary Email with Click-to-Copy */}
              <div className="flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-[var(--color-ember-orange)]">
                    <Mail size={15} />
                  </div>
                  <div className="truncate">
                    <span className="block text-[10px] font-mono text-muted-foreground uppercase font-bold">Email Us</span>
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="font-medium text-foreground hover:text-[var(--color-ember-orange)] transition-colors truncate block"
                    >
                      {primaryEmail}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyEmail(primaryEmail)}
                  title="Copy email address"
                  aria-label="Copy email address"
                  className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-[var(--color-ember-orange)]/10 text-muted-foreground hover:text-[var(--color-ember-orange)] transition-all shrink-0 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-[var(--color-ember-orange)]">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted-foreground uppercase font-bold">Direct Line</span>
                  <a
                    href="tel:+919211074113"
                    className="font-mono text-sm font-semibold text-foreground hover:text-[var(--color-ember-orange)] transition-colors"
                  >
                    +91 92110 74113
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-[var(--color-ember-orange)]">
                  <MapPin size={15} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted-foreground uppercase font-bold">Headquarters</span>
                  <span className="font-medium text-foreground">New Delhi, India 🇮🇳</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h4 className="font-[family-name:var(--font-polysans)] text-xs font-bold tracking-widest text-foreground uppercase mb-5">
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

      {/* Oversized Decorative Brand Typography (Inspired by Reference) */}
      <div
        aria-hidden="true"
        className="relative w-full overflow-hidden select-none pointer-events-none mt-10 sm:mt-14 md:mt-16 flex justify-center items-end"
      >
        {/* Ambient Backlight / Radial Glow behind brand text */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-36 sm:h-52 md:h-72 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,104,44,0.18)_0%,_rgba(255,104,44,0.04)_45%,_transparent_70%)] blur-2xl md:blur-3xl pointer-events-none"
        />

        {/* Oversized Monolithic Brand Name */}
        <div className="w-full text-center px-2">
          <span
            className="inline-block font-[family-name:var(--font-polysans)] font-black tracking-tighter whitespace-nowrap text-[clamp(2.1rem,7.8vw,11.5rem)] leading-[0.74] translate-y-[18%] md:translate-y-[22%] select-none bg-gradient-to-b from-[#ff682c]/32 via-[#ff682c]/15 to-[#ff682c]/[0.03] bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 100px rgba(255, 104, 44, 0.08)",
            }}
          >
            Digital Brand Builder
          </span>
        </div>
      </div>
    </footer>
  );
}

