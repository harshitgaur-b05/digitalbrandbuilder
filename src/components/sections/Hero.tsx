"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Globe, Search, Target, Share2 } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const supportLineRef = useRef<HTMLDivElement>(null);

  const centerCardRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set([headlineRef.current, textRef.current, ctaGroupRef.current, supportLineRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set([centerCardRef.current, card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
        opacity: 0,
        scale: 0.85,
      });

      tl.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.15,
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, "-=0.95")
      .to(ctaGroupRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.85")
      .to(supportLineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.75");

      const cards = [centerCardRef.current, card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
      tl.to(cards, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "back.out(1.1)",
      }, "-=0.95");
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-brand-bg">
      {/* Background Subtle Editorial Tonal Shapes */}
      <div className="absolute pointer-events-none z-0 opacity-40 top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-brand-secondary filter blur-2xl"></div>
      <div className="absolute pointer-events-none z-0 opacity-45 bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-[50%_30%_60%_40%/_40%_60%_30%_50%] bg-sage-soft/10 filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="text-xs font-semibold tracking-[0.18em] text-sage-deep mb-4 uppercase inline-block" ref={supportLineRef}>
            DIGITAL GROWTH FOR MODERN BUSINESSES
          </span>
          <h1 
            className="font-sans text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] tracking-tight text-brand-text mb-6" 
            ref={headlineRef}
          >
            Turn your business into a brand people find, trust & choose.
          </h1>
          <p 
            className="text-lg md:text-xl leading-relaxed text-brand-muted max-w-2xl mb-8" 
            ref={textRef}
          >
            We bring your digital presence together—from high-performing websites and SEO to performance marketing and social media—so your business doesn&apos;t just exist online. It grows there.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12" ref={ctaGroupRef}>
            <a href="#cta" className="inline-flex items-center justify-center gap-3 bg-brand-text text-brand-bg px-8 py-4 rounded-full text-base font-medium shadow-sm hover:bg-sage-deep hover:-translate-y-px transition-all duration-500 w-full sm:w-auto group">
              Build Your Digital Brand
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-medium border border-sage-soft text-brand-text hover:border-brand-text hover:bg-brand-secondary hover:-translate-y-px transition-all duration-500 w-full sm:w-auto">
              See How It Works
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-brand-muted">
            <span>Websites</span>
            <span className="text-sage-soft font-bold">·</span>
            <span>SEO</span>
            <span className="text-sage-soft font-bold">·</span>
            <span>Marketing</span>
            <span className="text-sage-soft font-bold">·</span>
            <span>Social</span>
          </div>
        </div>

        {/* Right Column: Visual Brand Engine */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[360px] md:h-[480px]">
          <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center">
            
            {/* SVG connections underneath */}
            <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none hidden md:block" viewBox="0 0 400 400" fill="none">
              <path d="M 200,200 L 70,80" stroke="rgba(126, 142, 113, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 200,200 L 330,80" stroke="rgba(126, 142, 113, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 200,200 L 70,320" stroke="rgba(126, 142, 113, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 200,200 L 330,320" stroke="rgba(126, 142, 113, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            {/* Central Business Card */}
            <div className="w-[190px] md:w-[220px] bg-white border border-brand-text/5 rounded-2xl p-5 md:p-6 shadow-xl text-center z-20 relative transition-transform duration-300 hover:scale-[1.02]" ref={centerCardRef}>
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-sage-soft/15 text-sage-deep px-3 py-1 rounded-full mb-3">
                Digital Profile
              </span>
              <h3 className="text-base md:text-lg font-bold text-brand-text tracking-tight">YOUR BUSINESS</h3>
              <p className="text-xs md:text-sm text-brand-muted mt-1 mb-4">Local Fashion Brand</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-deep">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-soft animate-ping"></span> Active Growth
              </div>
            </div>

            {/* Floating Module 1: Website */}
            <div 
              className="absolute bg-white border border-sage-soft/10 shadow-lg rounded-xl p-3 md:p-4 flex items-center gap-3 z-30 w-[140px] md:w-[175px] top-[10px] md:top-0 left-[5%] md:left-[-20px] transition-all duration-300 hover:scale-105 hover:border-sage-soft hover:shadow-xl animate-float-slow" 
              ref={card1Ref}
            >
              <div className="w-9 h-9 rounded-lg bg-sage-soft/10 flex items-center justify-center shrink-0">
                <Globe size={18} className="text-sage-deep" />
              </div>
              <div className="text-left">
                <h4 className="text-xs md:text-sm font-semibold text-brand-text">Website</h4>
                <p className="text-[10px] md:text-xs text-brand-muted leading-none mt-0.5">Professional website</p>
              </div>
            </div>

            {/* Floating Module 2: SEO */}
            <div 
              className="absolute bg-white border border-sage-soft/10 shadow-lg rounded-xl p-3 md:p-4 flex items-center gap-3 z-30 w-[140px] md:w-[175px] bottom-[10px] md:top-0 right-[5%] md:right-[-20px] transition-all duration-300 hover:scale-105 hover:border-sage-soft hover:shadow-xl animate-float-medium" 
              ref={card2Ref}
            >
              <div className="w-9 h-9 rounded-lg bg-sage-soft/10 flex items-center justify-center shrink-0">
                <Search size={18} className="text-sage-deep" />
              </div>
              <div className="text-left">
                <h4 className="text-xs md:text-sm font-semibold text-brand-text">SEO</h4>
                <p className="text-[10px] md:text-xs text-brand-muted leading-none mt-0.5">Search visibility</p>
              </div>
            </div>

            {/* Floating Module 3: Marketing (Hidden on mobile) */}
            <div 
              className="hidden md:flex absolute bg-white border border-sage-soft/10 shadow-lg rounded-xl p-4 items-center gap-3 z-30 w-[175px] bottom-0 left-[-20px] transition-all duration-300 hover:scale-105 hover:border-sage-soft hover:shadow-xl animate-float-fast" 
              ref={card3Ref}
            >
              <div className="w-9 h-9 rounded-lg bg-sage-soft/10 flex items-center justify-center shrink-0">
                <Target size={18} className="text-sage-deep" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-brand-text">Marketing</h4>
                <p className="text-xs text-brand-muted leading-none mt-0.5">Customer acquisition</p>
              </div>
            </div>

            {/* Floating Module 4: Social (Hidden on mobile) */}
            <div 
              className="hidden md:flex absolute bg-white border border-sage-soft/10 shadow-lg rounded-xl p-4 items-center gap-3 z-30 w-[175px] bottom-0 right-[-20px] transition-all duration-300 hover:scale-105 hover:border-sage-soft hover:shadow-xl animate-float-slow" 
              ref={card4Ref}
            >
              <div className="w-9 h-9 rounded-lg bg-sage-soft/10 flex items-center justify-center shrink-0">
                <Share2 size={18} className="text-sage-deep" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-brand-text">Social</h4>
                <p className="text-xs text-brand-muted leading-none mt-0.5">Brand presence</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
