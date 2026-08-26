"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Eye, Sparkles, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudies() {
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const title = titleRef.current;
      const cards = containerRef.current?.children;

      if (!title || !cards) return;

      gsap.fromTo(
        title,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const cases = [
    {
      industry: "D2C Fashion Brand",
      label: "CASE STUDY 01",
      challenge: "Offline retail store struggling with flat local foot traffic and no direct digital sales channel to reach buyers outside the city.",
      solution: "Developed an editorial ecommerce platform, optimized keyword relevance for regional search intent, and ran localized creative social campaigns.",
      result: "[Placeholder: Pending live validation. Real metrics and traffic increases will populate here post launch.]",
      icon: <Sparkles className="w-5 h-5 text-sage-deep" />,
    },
    {
      industry: "Local Manufacturing & Engineering",
      label: "CASE STUDY 02",
      challenge: "A legacy B2B operation with a zero online presence, losing contract bidding opportunities to competitors with polished sites.",
      solution: "Designed a clean, modern digital presence displaying machines, credentials, and projects, coupled with localized search-optimization for corporate buyers.",
      result: "[Placeholder: Pending client authorization. Verified contract inquiry rates will be published here.]",
      icon: <TrendingUp className="w-5 h-5 text-sage-deep" />,
    },
  ];

  return (
    <section className="bg-brand-secondary py-24 md:py-32 relative overflow-hidden border-y border-sage-soft/10" id="results">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Title */}
        <div className="mb-20 text-center" ref={titleRef}>
          <span className="text-xs font-semibold tracking-[0.15em] text-sage-deep mb-3 uppercase block">
            PROOF & PERFORMANCE
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-brand-text mb-4">
            How we partner with brands.
          </h2>
          <p className="text-base md:text-lg text-brand-muted max-w-xl mx-auto leading-relaxed">
            We hold ourselves to a strict standard of truth. Here is the framework of our results, waiting for your data to tell the story.
          </p>
        </div>

        {/* Case Studies grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" ref={containerRef}>
          {cases.map((cs, i) => (
            <div 
              key={i} 
              className="bg-white border border-brand-text/5 rounded-2xl p-8 flex flex-col justify-between hover:shadow-xs hover:border-sage-soft transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold tracking-widest text-sage-deep bg-sage-soft/10 px-3 py-1 rounded-full uppercase">
                    {cs.label}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-sage-soft/10 flex items-center justify-center">
                    {cs.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-brand-text mb-8 tracking-tight">{cs.industry}</h3>

                {/* Structure: Challenge -> Solution -> Result */}
                <div className="space-y-6">
                  <div className="border-l-2 border-sage-soft/20 pl-4">
                    <h4 className="text-xs font-semibold tracking-wider text-sage-deep uppercase mb-1">Challenge</h4>
                    <p className="text-sm text-brand-muted leading-relaxed">{cs.challenge}</p>
                  </div>
                  
                  <div className="border-l-2 border-sage-soft/20 pl-4">
                    <h4 className="text-xs font-semibold tracking-wider text-sage-deep uppercase mb-1">Solution</h4>
                    <p className="text-sm text-brand-muted leading-relaxed">{cs.solution}</p>
                  </div>

                  <div className="border-l-2 border-sage-soft/40 pl-4">
                    <h4 className="text-xs font-bold tracking-wider text-brand-text uppercase mb-1">Result</h4>
                    <p className="text-sm text-brand-text font-medium leading-relaxed italic bg-brand-secondary/30 p-3 rounded-lg border border-brand-text/5">
                      {cs.result}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-text/5 flex items-center justify-between">
                <span className="text-xs font-medium text-brand-muted flex items-center gap-1.5">
                  <Eye size={14} /> Future Audit Ready
                </span>
                <a href="#cta" className="inline-flex items-center gap-1 text-sm font-semibold text-sage-deep hover:text-brand-text transition-colors">
                  Plan Yours <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
