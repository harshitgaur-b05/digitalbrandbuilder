"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Globe, Search, Target, Share2, ShoppingCart, Award } from "lucide-react";
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
        "flex flex-col items-center justify-center gap-1.5 bg-card border border-border rounded-2xl px-4 py-3 shadow-md text-center w-28 h-20 select-none transition-[transform,opacity,border-color,box-shadow] duration-500 hover:shadow-[0_8px_30px_rgb(255,165,0,0.2)] dark:hover:shadow-[0_8px_30px_rgb(43,158,220,0.2)] hover:border-primary/50 motion-safe:hover:-translate-y-1.5",
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
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start">
          <span
            ref={eyebrowRef}
            className="text-[11px] font-bold tracking-[0.2em] text-primary mb-5 uppercase"
          >
            DIGITAL GROWTH FOR MODERN BUSINESSES
          </span>

          <h1
            ref={headlineRef}
            className="font-sans text-[2.8rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground mb-5"
          >
            Turn your business into a brand people{" "}
            <span className="italic font-normal text-primary">find, trust & choose.</span>
          </h1>

          <p
            ref={textRef}
            className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl mb-8"
          >
            We bring your digital presence together—from high-performing websites and SEO to
            performance marketing and social media—so your business doesn&apos;t just exist online.
            It grows there.
          </p>

          <div ref={ctaGroupRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-medium shadow-sm hover:shadow-[0_0_20px_rgba(255,165,0,0.4)] dark:hover:shadow-[0_0_20px_rgba(255,165,0,0.6)] motion-safe:hover:-translate-y-1 transition-[transform,box-shadow,background-color] duration-500 group"
            >
              Build Your Digital Brand
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium border border-border text-foreground hover:border-primary hover:bg-primary/5 transition-[border-color,background-color] duration-300"
            >
              See How It Works
            </a>
          </div>

          <div ref={tagsRef} className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
            {["Websites", "SEO", "Marketing", "Social", "Ecommerce"].map((t, i, arr) => (
              <span key={t} className="inline-flex items-center gap-3 hover:text-primary transition-colors cursor-default">
                {t}
                {i < arr.length - 1 && <span className="text-primary font-black">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ──────── RIGHT COLUMN — Animated Beam Visual ──────── */}
        <div className="lg:col-span-6 xl:col-span-5 flex justify-center items-center">
          {/* Beam container — MUST be `relative` and a measurable element */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center w-full"
            style={{ minHeight: 440 }}
          >
            {/* ── Grid Layout: 3 cols × 3 rows centred ── */}
            {/*
              Layout (desktop):
              [Website]   [SEO]       [Marketing]
                          [HUB]
              [Ecom]   [Brand]    [Social]
            */}
            <div className="grid grid-cols-3 gap-y-10 gap-x-6 items-center justify-items-center">
              {/* Row 1 */}
              <ServiceNode nodeRef={websiteRef} icon={<Globe size={16} className="text-primary" />} label="Website" />
              <ServiceNode nodeRef={seoRef} icon={<Search size={16} className="text-primary" />} label="SEO" />
              <ServiceNode nodeRef={marketingRef} icon={<Target size={16} className="text-primary" />} label="Marketing" />

              {/* Row 2 — Hub takes full width of middle col */}
              <div /> {/* spacer */}
              <CenterHub hubRef={hubRef} />
              <div /> {/* spacer */}

              {/* Row 3 */}
              <ServiceNode nodeRef={ecomRef} icon={<ShoppingCart size={16} className="text-primary" />} label="Ecommerce" />
              <ServiceNode nodeRef={brandRef} icon={<Award size={16} className="text-primary" />} label="Brand" />
              <ServiceNode nodeRef={socialRef} icon={<Share2 size={16} className="text-primary" />} label="Social" />
            </div>

            {/* ── Beams: all nodes → hub ── */}
            <AnimatedBeam containerRef={containerRef} fromRef={websiteRef} toRef={hubRef} curvature={30}  delay={0}   duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} />
            <AnimatedBeam containerRef={containerRef} fromRef={seoRef}     toRef={hubRef} curvature={0}   delay={0.6} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} />
            <AnimatedBeam containerRef={containerRef} fromRef={marketingRef} toRef={hubRef} curvature={-30} delay={1.2} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} />
            <AnimatedBeam containerRef={containerRef} fromRef={ecomRef}    toRef={hubRef} curvature={-30} delay={0.3} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={brandRef}   toRef={hubRef} curvature={0}   delay={0.9} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={socialRef}  toRef={hubRef} curvature={30}  delay={1.5} duration={4} pathColor={beamColor} gradientStartColor={beamGradStart} gradientStopColor={beamGradStop} pathOpacity={0.25} reverse />
          </div>
        </div>

      </div>
    </section>
  );
}
