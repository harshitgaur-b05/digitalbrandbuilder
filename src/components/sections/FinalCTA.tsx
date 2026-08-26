"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const card = containerRef.current;
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section className="bg-brand-bg py-24 md:py-32 relative overflow-hidden" id="cta">
      {/* Background shape */}
      <div className="absolute pointer-events-none z-0 opacity-40 top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-[45%_55%_35%_65%/_55%_45%_65%_35%] bg-brand-secondary filter blur-2xl"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10" ref={containerRef}>
        <div className="bg-white border border-brand-text/5 rounded-3xl p-8 md:p-16 text-center shadow-lg relative overflow-hidden group">
          
          {/* Subtle Sage Border Tonal Highlight */}
          <div className="absolute inset-0 border border-sage-soft/10 rounded-3xl pointer-events-none"></div>

          {/* Decorative Sparkle */}
          <div className="w-12 h-12 rounded-full bg-sage-soft/10 flex items-center justify-center mx-auto mb-8 transition-transform duration-500 group-hover:scale-105">
            <Sparkles className="text-sage-deep w-6 h-6" />
          </div>

          <span className="text-xs font-semibold tracking-[0.2em] text-sage-deep mb-4 uppercase block">
            GET STARTED TODAY
          </span>
          
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-brand-text max-w-3xl mx-auto mb-6">
            Your business is ready for its digital next chapter.
          </h2>
          
          <p className="text-base md:text-lg text-brand-muted max-w-xl mx-auto leading-relaxed mb-10">
            Let&apos;s build a digital presence that reflects the true value of your work. Turn search visibility, professional web design, and digital brand authority into permanent growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 bg-brand-text text-brand-bg px-8 py-4 rounded-full text-base font-medium shadow-sm hover:bg-sage-deep hover:-translate-y-px transition-all duration-300 group"
            >
              Build Your Digital Brand
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Tiny supporting text */}
          <span className="text-xs text-brand-muted mt-8 block">
            Websites · SEO · Performance Marketing · Social Media
          </span>

        </div>
      </div>
    </section>
  );
}
