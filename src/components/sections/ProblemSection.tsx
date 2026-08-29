"use client";

import { AlertCircle, EyeOff, Shuffle, TrendingDown } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      num: "01",
      title: "Outdated Website",
      desc: "A slow, outdated, or poorly designed website can make visitors leave before they understand what your business offers. We create fast, responsive, user-friendly websites designed around your customers and business goals.",
      icon: <AlertCircle className="text-primary w-6 h-6" />,
    },
    {
      num: "02",
      title: "Low Search Visibility",
      desc: "If your business isn't visible when potential customers search for your products or services, you're missing valuable opportunities. Our SEO strategies improve your visibility across Google Search, Google Maps, and relevant search results.",
      icon: <EyeOff className="text-primary w-6 h-6" />,
    },
    {
      num: "03",
      title: "Inconsistent Online Presence",
      desc: "Your website, Google Business Profile, social media, and other digital channels should communicate one consistent brand. We align your messaging, visuals, and information to create a professional and trustworthy online presence.",
      icon: <Shuffle className="text-primary w-6 h-6" />,
    },
    {
      num: "04",
      title: "Marketing Without a Clear System",
      desc: "Running ads or posting on social media without a clear strategy can waste time and budget. We connect SEO, paid advertising, content, social media, and conversion-focused experiences into one measurable digital growth strategy.",
      icon: <TrendingDown className="text-primary w-6 h-6" />,
    },
  ];

  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <span className="text-xs font-semibold tracking-[0.15em] text-primary mb-3 uppercase block">
              THE CRITICAL GAP
            </span>
            <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground mb-6">
              Your customers are already searching. <br />
              <span className="text-primary italic font-normal">Can they find you?</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
              Your customers are searching on Google, checking reviews, visiting websites, and comparing businesses before making a decision. If your website, SEO, social media, and advertising are not working together, valuable opportunities can easily go to your competitors.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="w-16 h-[1px] bg-primary/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-8 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-col gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {problems.map((prob, i) => (
              <div
                key={i}
                className={`flex-none w-[85vw] sm:w-[350px] lg:w-auto snap-center bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md dark:shadow-[0_4px_20px_rgba(43,158,220,0.08)] hover:border-primary/50 transition-[transform,box-shadow,border-color] duration-500 motion-safe:hover:-translate-y-1 ${
                  i % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-3xl font-light text-primary/60">{prob.num}</span>
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    {prob.icon}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 tracking-tight">{prob.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
