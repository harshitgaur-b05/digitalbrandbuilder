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
        "flex flex-col items-center justify-center gap-1.5 bg-white border border-brand-text/6 rounded-2xl px-4 py-3 shadow-md text-center w-28 h-20 select-none transition-all duration-300 hover:shadow-lg hover:border-sage-soft hover:-translate-y-1",
        className
      )}
    >
      <div className="w-8 h-8 rounded-lg bg-sage-soft/15 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[11px] font-semibold text-brand-text tracking-tight leading-tight">{label}</span>
    </div>
  );
}

// ─── Center hub card ───────────────────────────────────────────────────
function CenterHub({ hubRef }: { hubRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={hubRef}
      className="relative flex flex-col items-center justify-center bg-white border border-sage-soft/20 rounded-3xl px-6 py-5 shadow-2xl text-center w-44 h-36 z-20"
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-3xl animate-ping bg-sage-soft/5 pointer-events-none" />
      <span className="absolute inset-[-6px] rounded-[1.75rem] border border-sage-soft/15 pointer-events-none" />

      <span className="inline-block text-[9px] font-bold tracking-widest uppercase bg-sage-soft/15 text-sage-deep px-2.5 py-0.5 rounded-full mb-2">
        Digital Profile
      </span>
      <h3 className="text-sm font-bold text-brand-text tracking-tight leading-tight">YOUR BUSINESS</h3>
      <p className="text-[11px] text-brand-muted mt-0.5 mb-2">Local Brand</p>
      <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-sage-deep">
        <span className="w-1.5 h-1.5 rounded-full bg-sage-soft animate-pulse inline-block" />
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

  const beamColor = "#A0AD91";
  const beamGradStart = "#A0AD91";
  const beamGradStop = "#7E8E71";

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-brand-bg">
      {/* ── Subtle editorial bg shapes ── */}
      <div className="absolute pointer-events-none z-0 opacity-35 top-[-8%] right-[-8%] w-[50vw] h-[50vw] rounded-[42%_58%_30%_70%/_60%_30%_68%_40%] bg-brand-secondary blur-3xl" />
      <div className="absolute pointer-events-none z-0 opacity-30 bottom-[-12%] left-[-8%] w-[38vw] h-[38vw] rounded-[50%_30%_60%_40%/_40%_60%_30%_50%] bg-sage-soft/10 blur-3xl" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center relative z-10">

        {/* ──────── LEFT COLUMN ──────── */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start">
          <span
            ref={eyebrowRef}
            className="text-[11px] font-bold tracking-[0.2em] text-sage-deep mb-5 uppercase"
          >
            DIGITAL GROWTH FOR MODERN BUSINESSES
          </span>

          <h1
            ref={headlineRef}
            className="font-sans text-[2.8rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] tracking-[-0.03em] text-brand-text mb-5"
          >
            Turn your business into a brand people{" "}
            <span className="italic font-normal text-sage-deep">find, trust & choose.</span>
          </h1>

          <p
            ref={textRef}
            className="text-base md:text-lg leading-relaxed text-brand-muted max-w-xl mb-8"
          >
            We bring your digital presence together—from high-performing websites and SEO to
            performance marketing and social media—so your business doesn&apos;t just exist online.
            It grows there.
          </p>

          <div ref={ctaGroupRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-3 bg-brand-text text-brand-bg px-7 py-3.5 rounded-full text-sm font-medium shadow-sm hover:bg-sage-deep hover:-translate-y-px transition-all duration-500 group"
            >
              Build Your Digital Brand
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium border border-sage-soft text-brand-text hover:border-brand-text hover:bg-brand-secondary transition-all duration-300"
            >
              See How It Works
            </a>
          </div>

          <div ref={tagsRef} className="flex items-center gap-3 text-sm font-semibold text-brand-muted/70">
            {["Websites", "SEO", "Marketing", "Social", "Ecommerce"].map((t, i, arr) => (
              <span key={t} className="inline-flex items-center gap-3">
                {t}
                {i < arr.length - 1 && <span className="text-sage-soft font-black">·</span>}
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
              <ServiceNode nodeRef={websiteRef} icon={<Globe size={16} className="text-sage-deep" />} label="Website" />
              <ServiceNode nodeRef={seoRef} icon={<Search size={16} className="text-sage-deep" />} label="SEO" />
              <ServiceNode nodeRef={marketingRef} icon={<Target size={16} className="text-sage-deep" />} label="Marketing" />

              {/* Row 2 — Hub takes full width of middle col */}
              <div /> {/* spacer */}
              <CenterHub hubRef={hubRef} />
              <div /> {/* spacer */}

              {/* Row 3 */}
              <ServiceNode nodeRef={ecomRef} icon={<ShoppingCart size={16} className="text-sage-deep" />} label="Ecommerce" />
              <ServiceNode nodeRef={brandRef} icon={<Award size={16} className="text-sage-deep" />} label="Brand" />
              <ServiceNode nodeRef={socialRef} icon={<Share2 size={16} className="text-sage-deep" />} label="Social" />
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
