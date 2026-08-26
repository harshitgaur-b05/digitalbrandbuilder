"use client";

import { useEffect, useRef } from "react";
import { Laptop, Search, Megaphone, Share2, ShoppingCart, Award, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const headline = headlineRef.current;
      const cards = gridRef.current?.children;

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
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const services = [
    {
      title: "Websites",
      desc: "Speed-optimized, high-converting digital storefronts. Fully customized design, highly polished transitions, and flawless mobile experience that locks in trust.",
      icon: <Laptop size={32} className="text-sage-deep" />,
      colSpan: "lg:col-span-2",
      tags: ["Responsive", "Custom Code", "Vite/Next.js"],
    },
    {
      title: "SEO",
      desc: "Local mapping and keyword authority that puts you where local buyers look. We optimize your citations, keywords, and code structure.",
      icon: <Search size={32} className="text-sage-deep" />,
      colSpan: "lg:col-span-1",
      tags: ["Google Maps", "Audit", "Ranking"],
    },
    {
      title: "Performance Marketing",
      desc: "Paid search and social campaigns that target buying intent, not vanity stats. Maximize acquisition through high-converting funnels.",
      icon: <Megaphone size={32} className="text-sage-deep" />,
      colSpan: "lg:col-span-1",
      tags: ["Google Ads", "Meta Ads", "Retargeting"],
    },
    {
      title: "Social Media",
      desc: "An organic content engine that elevates your brand character. We design templates, write editorial copy, and format videos to grow an authentic community.",
      icon: <Share2 size={32} className="text-sage-deep" />,
      colSpan: "lg:col-span-2",
      tags: ["Creative assets", "Strategy", "Reels"],
    },
    {
      title: "Ecommerce",
      desc: "Sophisticated shopify or custom storefront setups built to remove friction. Advanced product filtering, cart optimization, and checkout optimization.",
      icon: <ShoppingCart size={32} className="text-sage-deep" />,
      colSpan: "lg:col-span-2",
      tags: ["Shopify", "Inventory", "Payments"],
    },
    {
      title: "Brand Presence",
      desc: "Complete visual frameworks: logos, custom color palettes, and typographic guides. Ensuring your offline legacy looks expensive online.",
      icon: <Award size={32} className="text-sage-deep" />,
      colSpan: "lg:col-span-1",
      tags: ["Identity", "Typography", "Guidelines"],
    },
  ];

  return (
    <section className="bg-brand-bg py-24 md:py-32 relative overflow-hidden" id="solutions">
      {/* Background shape */}
      <div className="absolute pointer-events-none z-0 opacity-30 bottom-[-5%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_70%_30%/_50%_30%_70%_50%] bg-brand-secondary filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20 md:mb-28" ref={headlineRef}>
          <span className="text-xs font-semibold tracking-[0.15em] text-sage-deep mb-3 uppercase block">
            OUR PLATFORM
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-brand-text mb-4">
            Everything your business needs to grow online.
          </h2>
          <p className="text-base md:text-lg text-brand-muted max-w-xl mx-auto leading-relaxed">
            We combine design, development, and digital marketing into one single, powerful growth engine. No multiple agencies needed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" ref={gridRef}>
          {services.map((service, i) => (
            <div 
              key={i} 
              className={`bg-white border border-brand-text/5 rounded-2xl p-8 shadow-xs flex flex-col justify-between min-h-[380px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-md hover:border-sage-soft group ${service.colSpan}`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 bg-sage-soft/10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  {service.icon}
                </div>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {service.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-semibold text-sage-deep bg-sage-soft/10 px-2.5 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start mt-auto">
                <h3 className="text-xl md:text-2xl font-bold text-brand-text mb-3 tracking-tight">{service.title}</h3>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed mb-6">{service.desc}</p>
                <a href="#cta" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep hover:text-brand-text transition-colors duration-300">
                  Get Started <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
