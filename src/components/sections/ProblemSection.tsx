"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, EyeOff, Shuffle, TrendingDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const headline = headlineRef.current;
      const cards = cardsRef.current?.children;

      if (!headline || !cards) return;

      gsap.fromTo(
        headline,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headline,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const problems = [
    {
      num: "01",
      title: "Outdated website",
      desc: "Slow loading speeds and poor mobile design frustrate visitors, causing them to leave before exploring what you offer.",
      icon: <AlertCircle className="text-sage-deep w-6 h-6" />,
    },
    {
      num: "02",
      title: "Low search visibility",
      desc: "If your business doesn't appear on the first page of Google searches, local customers will go straight to your competitors.",
      icon: <EyeOff className="text-sage-deep w-6 h-6" />,
    },
    {
      num: "03",
      title: "Inconsistent online presence",
      desc: "Mismatched branding across social media, maps, and directories destroys professional credibility and trust.",
      icon: <Shuffle className="text-sage-deep w-6 h-6" />,
    },
    {
      num: "04",
      title: "Marketing without a clear system",
      desc: "Spending money on ads and posts without a unified strategy leads to high costs and unpredictable results.",
      icon: <TrendingDown className="text-sage-deep w-6 h-6" />,
    },
  ];

  return (
    <section className="bg-brand-bg py-24 md:py-32 relative overflow-hidden" ref={sectionRef} id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 lg:sticky lg:top-36" ref={headlineRef}>
            <span className="text-xs font-semibold tracking-[0.15em] text-sage-deep mb-3 uppercase block">
              THE CRITICAL GAP
            </span>
            <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-brand-text mb-6">
              Your customers are already searching. <br />
              <span className="text-sage-deep italic font-normal">Can they find you?</span>
            </h2>
            <p className="text-base md:text-lg text-brand-muted max-w-md leading-relaxed mb-8">
              Most local businesses lose up to 70% of potential leads simply because their digital elements don&apos;t work together. We fix that misalignment.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="w-16 h-[1px] bg-sage-soft"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-sage-deep"></div>
            </div>
          </div>

          {/* Right Column: Staggered list */}
          <div className="lg:col-span-7 flex flex-col gap-6" ref={cardsRef}>
            {problems.map((prob, i) => (
              <div
                key={i}
                className={`bg-white border border-brand-text/5 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md hover:border-sage-soft hover:-translate-y-1 transition-all duration-500 ${
                  i % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-3xl font-light text-sage-soft">{prob.num}</span>
                  <div className="w-11 h-11 rounded-full bg-sage-soft/10 flex items-center justify-center">
                    {prob.icon}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-brand-text mb-2 tracking-tight">{prob.title}</h3>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
