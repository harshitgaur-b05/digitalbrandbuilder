"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Globe, Search, Target, Share2, ShoppingCart, Award, FileText, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { AnimatedBeam } from "@/components/ui/AnimatedBeam";
import { cn } from "@/lib/utils";

// ─── Small icon node card ──────────────────────────────────────────────
function ServiceNode({
  nodeRef,
  icon,
  label,
  className,
}: {
  nodeRef: React.RefObject<HTMLDivElement | null>;
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      ref={nodeRef}
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 bg-card border border-border rounded-2xl px-4 py-3 shadow-md text-center w-28 h-20 select-none transition-[transform,opacity,border-color,box-shadow] duration-500 hover:shadow-[0_8px_30px_rgb(255,165,0,0.2)] dark:hover:shadow-[0_8px_30px_rgb(43,158,220,0.2)] hover:border-primary/50 motion-safe:hover:-translate-y-1.5 relative z-10",
        className
      )}
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[11px] font-semibold text-card-foreground tracking-tight leading-tight">{label}</span>
    </div>
  );
}

// ─── Signal chip (compact card for the mobile channel manifold) ────────
function SignalChip({
  chipRef,
  icon,
  label,
}: {
  chipRef?: React.RefObject<HTMLDivElement | null>;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      ref={chipRef}
      className="flex flex-col items-center gap-1.5 select-none"
    >
      <div className="w-11 h-11 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center transition-[border-color,box-shadow,transform] duration-300 active:scale-95 active:border-primary/50">
        {icon}
      </div>
      <span className="text-[10px] font-semibold text-muted-foreground tracking-tight leading-none whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

// ─── Center hub card ───────────────────────────────────────────────────
function CenterHub({ hubRef }: { hubRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={hubRef}
      className="relative flex flex-col items-center justify-center bg-card border border-border rounded-3xl px-6 py-5 shadow-[0_8px_40px_rgb(43,158,220,0.15)] dark:shadow-[0_8px_40px_rgb(255,165,0,0.15)] text-center w-44 h-36 z-20 transition-[transform,box-shadow] duration-500 motion-safe:hover:scale-105"
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-3xl animate-ping bg-primary/5 pointer-events-none duration-1000" />
      <span className="absolute inset-[-6px] rounded-[1.75rem] border border-primary/20 pointer-events-none" />

      <span className="inline-block text-[9px] font-bold tracking-widest uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-full mb-2">
        Digital Profile
      </span>
      <h3 className="text-sm font-bold text-card-foreground tracking-tight leading-tight">YOUR BUSINESS</h3>
      <p className="text-[11px] text-muted-foreground mt-0.5 mb-2">Local Brand</p>
      <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
        Active Growth
      </div>
    </div>
  );
}

// ─── Main Hero ─────────────────────────────────────────────────────────
export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  // Container and beam refs
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);

  // 6 service node refs
  const websiteRef = useRef<HTMLDivElement>(null);
  const seoRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const ecomRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Mobile "signal manifold" refs
  const mobileHubRef = useRef<HTMLDivElement>(null);
  const mobileTrunkRef = useRef<HTMLDivElement>(null);
  const mobileChipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const targets = [
      eyebrowRef.current,
      headlineRef.current,
      textRef.current,
      ctaGroupRef.current,
      tagsRef.current,
    ];

    gsap.set(targets, { opacity: 0, y: 30 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      delay: 0.1,
      ease: "power4.out",
    });
  }, []);

  // Mobile signal manifold — hub pulses in, trunk line draws down,
  // then the 8 channel chips light up left-to-right, row by row.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const chips = mobileChipsRef.current
      ? Array.from(mobileChipsRef.current.children)
      : [];

    const tl = gsap.timeline({ delay: 0.5 });

    if (mobileHubRef.current) {
      gsap.set(mobileHubRef.current, { opacity: 0, y: -10, scale: 0.9 });
      tl.to(mobileHubRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
    }
    if (mobileTrunkRef.current) {
      gsap.set(mobileTrunkRef.current, { scaleY: 0, transformOrigin: "top" });
      tl.to(mobileTrunkRef.current, { scaleY: 1, duration: 0.35, ease: "power2.out" }, "-=0.1");
    }
    if (chips.length) {
      gsap.set(chips, { opacity: 0, y: 8 });
      tl.to(
        chips,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" },
        "-=0.1"
      );
    }
  }, []);

  const beamColor = "#2b9edc"; // Light Blue
  const beamGradStart = "#2b9edc";
  const beamGradStop = "#ffa500"; // Orangish

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-background transition-colors duration-500">
      {/* ── Subtle editorial bg shapes ── */}
      <div className="absolute pointer-events-none z-0 opacity-35 top-[-8%] right-[-8%] w-[50vw] h-[50vw] rounded-[42%_58%_30%_70%/_60%_30%_68%_40%] bg-[rgba(255,165,0,0.15)] dark:bg-[rgba(255,165,0,0.1)] blur-3xl animate-float-slow" />
      <div className="absolute pointer-events-none z-0 opacity-30 bottom-[-12%] left-[-8%] w-[38vw] h-[38vw] rounded-[50%_30%_60%_40%/_40%_60%_30%_50%] bg-[rgba(43,158,220,0.15)] dark:bg-[rgba(43,158,220,0.1)] blur-3xl animate-float-medium" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center relative z-10">

        {/* ──────── LEFT COLUMN ──────── */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">


          <span
            ref={eyebrowRef}
            className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-primary mb-3 sm:mb-4 uppercase"
          >
            DIGITAL GROWTH FOR MODERN BUSINESSES
          </span>

          <h1
            ref={headlineRef}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-medium leading-[1.15] tracking-[-0.02em] text-foreground mb-4 sm:mb-5"
          >
            Turn your business into a brand people{" "}
            <span className="italic font-normal text-primary">find, trust &amp; choose.</span>
          </h1>

          <p
            ref={textRef}
            className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl mb-6 sm:mb-8"
          >
            Digital Brand Builder brings your digital presence together—from high-performing websites and SEO to Google Ads, social media, and ecommerce. We help businesses build a stronger online presence, reach the right customers, and turn digital visibility into sustainable growth.
          </p>

          <div ref={ctaGroupRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8 sm:mb-10">
            <a
              href="#cta"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-[0_0_20px_rgba(255,165,0,0.4)] dark:hover:shadow-[0_0_20px_rgba(255,165,0,0.6)] active:scale-95 transition-[transform,box-shadow,background-color] duration-300 group"
            >
              Build Your Digital Brand
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold border border-border text-foreground hover:border-primary hover:bg-primary/5 active:scale-95 transition-[border-color,background-color,transform] duration-300"
            >
              See How It Works
            </a>
          </div>

          <div ref={tagsRef} className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-muted-foreground">
            {["Websites", "SEO", "Marketing", "Social", "Ecommerce"].map((t, i, arr) => (
              <span key={t} className="inline-flex items-center gap-2.5 hover:text-primary transition-colors cursor-default">
                <span className="bg-muted px-2.5 py-1 rounded-md border border-border/60">{t}</span>
                {i < arr.length - 1 && <span className="text-primary/50 font-black">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ──────── RIGHT COLUMN — Animated Beam Visual (tablet & desktop only) ──────── */}
        <div className="hidden sm:flex lg:col-span-6 xl:col-span-5 justify-center items-center">
          {/* Beam container — MUST be `relative` and a measurable element */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center w-full max-w-[100vw] scale-100 origin-center"
            style={{ minHeight: 440 }}
          >
            {/* ── Grid Layout: 3 cols × 3 rows centred ── */}
            <div className="grid grid-cols-[auto_auto_auto] gap-y-10 gap-x-4 sm:gap-x-6 items-center justify-items-center w-max mx-auto">
              {/* Row 1 */}
              <ServiceNode nodeRef={websiteRef} icon={<Globe size={16} className="text-primary" />} label="Website" />
              <ServiceNode nodeRef={seoRef} icon={<Search size={16} className="text-primary" />} label="SEO" />
              <ServiceNode nodeRef={marketingRef} icon={<Target size={16} className="text-primary" />} label="Marketing" />

              {/* Row 2 — Hub takes full width of middle col */}
              <ServiceNode nodeRef={blogRef} icon={<FileText size={16} className="text-primary" />} label="Blog" />
              <CenterHub hubRef={hubRef} />
              <ServiceNode nodeRef={testimonialRef} icon={<MessageSquare size={16} className="text-primary" />} label="Reviews" />

              {/* Row 3 */}
              <ServiceNode nodeRef={ecomRef} icon={<ShoppingCart size={16} className="text-primary" />} label="Ecommerce" />
              <ServiceNode nodeRef={brandRef} icon={<Award size={16} className="text-primary" />} label="Brand" />
              <ServiceNode nodeRef={socialRef} icon={<Share2 size={16} className="text-primary" />} label="Social" />
            </div>

            {/* ── Beams: all nodes → hub ── */}
            <AnimatedBeam containerRef={containerRef} fromRef={websiteRef} toRef={hubRef} curvature={30} delay={0} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} />
            <AnimatedBeam containerRef={containerRef} fromRef={seoRef} toRef={hubRef} curvature={0} delay={0.6} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} />
            <AnimatedBeam containerRef={containerRef} fromRef={marketingRef} toRef={hubRef} curvature={-30} delay={1.2} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} />

            <AnimatedBeam containerRef={containerRef} fromRef={blogRef} toRef={hubRef} curvature={20} delay={0.4} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} />
            <AnimatedBeam containerRef={containerRef} fromRef={testimonialRef} toRef={hubRef} curvature={-20} delay={1.0} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} reverse />

            <AnimatedBeam containerRef={containerRef} fromRef={ecomRef} toRef={hubRef} curvature={-30} delay={0.3} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={brandRef} toRef={hubRef} curvature={0} delay={0.9} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={socialRef} toRef={hubRef} curvature={30} delay={1.5} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} reverse />
          </div>
        </div>

        {/* ──────── PHONE ONLY — Mobile Service Hub Card & Touch Matrix ──────── */}
        <div className="sm:hidden w-full flex flex-col items-center mt-8">
          {/* Mobile Center Hub */}
          <div
            ref={mobileHubRef}
            className="w-full bg-card border border-border/90 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <span className="inline-block text-[9px] font-bold tracking-widest uppercase bg-primary/10 text-primary px-3 py-1 rounded-full mb-2">
              DIGITAL SYSTEM
            </span>
            <h3 className="text-base font-bold text-card-foreground tracking-tight">YOUR BUSINESS BRAND</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-3">All digital channels connected for growth</p>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
              Active Growth Strategy
            </div>
          </div>

          {/* Connected Trunk Line */}
          <div ref={mobileTrunkRef} className="w-px h-5 bg-gradient-to-b from-primary/50 to-primary/20 my-1" />

          {/* 4-column Channel Touch Grid */}
          <div className="w-full">
            <div
              ref={mobileChipsRef}
              className="grid grid-cols-4 gap-2 w-full"
            >
              {[
                { icon: <Globe size={18} className="text-primary" />, label: "Website", href: "/services/websites" },
                { icon: <Search size={18} className="text-primary" />, label: "SEO", href: "/services/seo" },
                { icon: <Target size={18} className="text-primary" />, label: "Ads", href: "/services/marketing" },
                { icon: <FileText size={18} className="text-primary" />, label: "Blog", href: "/blog" },
                { icon: <ShoppingCart size={18} className="text-primary" />, label: "Ecom", href: "/services" },
                { icon: <Award size={18} className="text-primary" />, label: "Brand", href: "/services/brand-presence" },
                { icon: <Share2 size={18} className="text-primary" />, label: "Social", href: "/services/social-media" },
                { icon: <MessageSquare size={18} className="text-primary" />, label: "Reviews", href: "#results" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-card border border-border/80 shadow-xs hover:border-primary/50 active:scale-95 transition-all text-center min-h-[72px]"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-1">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-foreground tracking-tight leading-none">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}