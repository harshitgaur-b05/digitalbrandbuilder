"use client";

import { AlertCircle, EyeOff, Shuffle, TrendingDown, Radio } from "lucide-react";

interface ProblemItem {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function ProblemSection() {
  const problems: ProblemItem[] = [
    {
      num: "01",
      title: "Outdated Website",
      desc: "A slow, outdated, or poorly designed website can make visitors leave before they understand what your business offers. We create fast, responsive, user-friendly websites designed around your customers and business goals.",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      num: "02",
      title: "Low Search Visibility",
      desc: "If your business isn't visible when potential customers search for your products or services, you're missing valuable opportunities. Our SEO strategies improve your visibility across Google Search, Google Maps, and relevant search results.",
      icon: <EyeOff className="w-5 h-5" />,
    },
    {
      num: "03",
      title: "Inconsistent Online Presence",
      desc: "Your website, Google Business Profile, social media, and other digital channels should communicate one consistent brand. We align your messaging, visuals, and information to create a professional and trustworthy online presence.",
      icon: <Shuffle className="w-5 h-5" />,
    },
    {
      num: "04",
      title: "Marketing Without a Clear System",
      desc: "Running ads or posting on social media without a clear strategy can waste time and budget. We connect SEO, paid advertising, content, social media, and conversion-focused experiences into one measurable digital growth strategy.",
      icon: <TrendingDown className="w-5 h-5" />,
    },
  ];

  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="solutions">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-[var(--color-ember-orange)]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--color-brass)]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6">
              <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
              <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
                The Critical Gap — Market Reality
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-polysans)] text-[34px] sm:text-[44px] md:text-[52px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground mb-6 uppercase">
              Your Customers Are Searching. <br />
              <span className="relative inline-block mt-2 text-foreground">
                Can They Find You?
                <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-ember-orange)] opacity-80" />
              </span>
            </h2>

            <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-muted-foreground max-w-md leading-[1.6] mb-8">
              Your customers are searching on Google, checking reviews, visiting websites, and comparing businesses before making a decision. If your digital channels are disconnected, high-value opportunities slip straight to competitors.
            </p>

            <div className="flex items-center gap-3">
              <div className="w-16 h-[2px] bg-[var(--color-ember-orange)]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-ember-orange)]"></div>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Growth Diagnostics</span>
            </div>
          </div>

          {/* Right Column — Mobile Scrollable Cards / Desktop Vertical List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-col gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {problems.map((prob, i) => (
                <div
                  key={i}
                  className={`flex-none w-[88vw] sm:w-[350px] lg:w-auto snap-center bg-card/95 backdrop-blur-md border border-border/80 rounded-[22px] p-6 md:p-8 shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)] hover:shadow-2xl hover:border-[var(--color-ember-orange)]/50 transition-all duration-300 motion-safe:hover:-translate-y-1 relative overflow-hidden group ${
                    i % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                  }`}
                >
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-mono text-2xl font-bold text-[var(--color-ember-orange)]">{prob.num}</span>
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 text-[var(--color-ember-orange)] group-hover:scale-110 transition-transform">
                      {prob.icon}
                    </div>
                  </div>
                  <h3 className="font-[family-name:var(--font-polysans)] text-lg md:text-xl font-bold text-foreground mb-2 tracking-wide uppercase group-hover:text-[var(--color-ember-orange)] transition-colors">
                    {prob.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-muted-foreground leading-relaxed">{prob.desc}</p>
                </div>
              ))}
            </div>

            {/* Mobile swipe hint / pagination indicators */}
            <div className="flex lg:hidden items-center justify-center gap-1.5 pt-2">
              {problems.map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-[var(--color-ember-orange)]/30 active:bg-[var(--color-ember-orange)] transition-colors" />
              ))}
              <span className="text-[10px] font-semibold text-muted-foreground ml-2">Swipe for details →</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
