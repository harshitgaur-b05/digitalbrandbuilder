import type { Metadata } from "next";
import {
  Laptop,
  Search,
  Megaphone,
  Share2,
  PenLine,
  Award,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Marketing Services in Delhi — Websites, SEO, Ads & More",
  description:
    "Explore Digital Brand Builder's full suite of digital marketing services: website design, SEO, performance marketing, social media, content writing, and brand identity for Indian businesses.",
  alternates: { canonical: "https://digitalbrandbuilder.in/services" },
  openGraph: {
    title: "Digital Marketing Services in Delhi | Digital Brand Builder",
    description:
      "One integrated growth engine — websites, SEO, marketing, social, and brand — built and run for Indian businesses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Marketing Services — Digital Brand Builder",
      },
    ],
  },
};

const services = [
  {
    number: "01",
    Icon: Laptop,
    name: "Websites",
    description:
      "Speed-optimized, high-converting digital storefronts with flawless mobile experience and polished transitions that lock in trust from the first visit.",
    href: "/services/websites",
    span: "lg:col-span-2",
    accent: true,
  },
  {
    number: "02",
    Icon: Search,
    name: "SEO + AEO + GEO",
    description:
      "Local mapping and keyword authority that puts you where local buyers look — traditional rankings, voice search, and AI-powered discovery.",
    href: "/services/seo",
    span: "lg:col-span-1",
    accent: false,
  },
  {
    number: "03",
    Icon: Megaphone,
    name: "Performance Marketing",
    description:
      "Paid search and social campaigns targeting buying intent. Google Ads, Meta Ads, retargeting — maximizing acquisition through proven funnels.",
    href: "/services/marketing",
    span: "lg:col-span-1",
    accent: false,
  },
  {
    number: "04",
    Icon: Share2,
    name: "Social Media",
    description:
      "An organic content engine elevating your brand character. Design templates, editorial copy, and reels to build a loyal community.",
    href: "/services/social-media",
    span: "lg:col-span-2",
    accent: true,
  },
  {
    number: "05",
    Icon: PenLine,
    name: "Content Writing",
    description:
      "SEO-driven blogs, landing pages, and brand copy that attract, educate, and convert — written by humans who understand your industry and your audience.",
    href: "/services/content-writing",
    span: "lg:col-span-2",
    accent: false,
  },
  {
    number: "06",
    Icon: Award,
    name: "Brand Presence",
    description:
      "Complete visual frameworks — logos, color palettes, and typographic guides so your offline legacy looks premium online.",
    href: "/services/brand-presence",
    span: "lg:col-span-1",
    accent: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Navbar />

      {/* ── Background ambient orbs — matches Hero.tsx language ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[55vw] h-[55vw] rounded-[42%_58%_30%_70%/_60%_30%_68%_40%] bg-[rgba(255,165,0,0.10)] dark:bg-[rgba(255,165,0,0.07)] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[40vw] h-[40vw] rounded-[50%_30%_60%_40%/_40%_60%_30%_50%] bg-[rgba(43,158,220,0.12)] dark:bg-[rgba(43,158,220,0.08)] blur-3xl" />
      </div>

      <main className="flex-grow relative z-10">

        {/* ─── HERO ──────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-8 max-w-7xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] text-primary mb-5 uppercase block">
            OUR SERVICES
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
                Every tool your business needs to{" "}
                <span className="italic font-normal text-primary">win online.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-base text-muted-foreground leading-relaxed border-l border-primary/40 pl-4">
                One integrated growth engine — websites, SEO, marketing, social, and brand — built and run for you.
              </p>
            </div>
          </div>

          {/* Stat strip — uses site card pattern */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
            {[
              { label: "Services", value: "6" },
              { label: "Industries served", value: "12+" },
              { label: "Clients grown", value: "40+" },
            ].map((s) => (
              <div key={s.label} className="px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SERVICE CARDS ─────────────────────────────────────── */}
        <section className="pb-24 md:pb-32 px-6 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.name}
                className={[
                  "group relative flex flex-col bg-card border border-border rounded-2xl",
                  "shadow-sm hover:shadow-[0_8px_30px_rgba(43,158,220,0.12)] dark:hover:shadow-[0_8px_30px_rgba(43,158,220,0.18)]",
                  "hover:border-primary/40 motion-safe:hover:-translate-y-1",
                  "transition-[transform,box-shadow,border-color] duration-500",
                  service.span,
                ].join(" ")}
              >
                {/* Subtle top accent line */}
                <div className={`h-px w-full ${service.accent ? "bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" : "bg-border"}`} />

                <div className="p-7 md:p-8 flex flex-col gap-5 flex-1">
                  {/* Header row: icon + number */}
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <service.Icon size={20} className="text-primary" strokeWidth={1.8} />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground/60 tracking-widest pt-1">
                      {service.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h2 className="font-sans text-xl font-semibold text-foreground tracking-tight mb-2 leading-snug">
                      {service.name}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all duration-300 mt-auto pt-2 border-t border-border"
                  >
                    Explore service
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-32">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase block mb-4">
                  Ready to start?
                </span>
                <h2 className="font-sans text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-tight">
                  Let's grow your{" "}
                  <span className="italic font-normal text-primary">digital presence.</span>
                </h2>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-medium shadow-sm hover:shadow-[0_0_20px_rgba(255,165,0,0.4)] dark:hover:shadow-[0_0_20px_rgba(255,165,0,0.6)] motion-safe:hover:-translate-y-1 transition-[transform,box-shadow] duration-500 group shrink-0"
              >
                Build Your Digital Brand
                <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
