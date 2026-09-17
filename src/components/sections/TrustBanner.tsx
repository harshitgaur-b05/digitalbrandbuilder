"use client";

import { motion } from "framer-motion";

export default function TrustBanner() {
  const brandLogos = [
    { name: "ICICI BANK", font: "font-sans tracking-tight text-sm sm:text-base font-black" },
    { name: "TATA MOTORS", font: "font-sans tracking-widest text-xs sm:text-sm font-extrabold" },
    { name: "KIA", font: "font-sans italic font-black text-lg sm:text-2xl tracking-widest" },
    { name: "NYKAA", font: "font-sans italic font-black text-lg sm:text-2xl tracking-tighter" },
    { name: "ITC LIMITED", font: "font-sans tracking-tight text-xs sm:text-sm font-black uppercase" },
    { name: "SANSKRITI SAREES", font: "font-serif text-xs sm:text-sm font-bold uppercase tracking-widest" },
    { name: "JAGDESWARI", font: "font-mono text-xs sm:text-sm font-bold uppercase tracking-widest" },
    { name: "JAI SHREE JAGDAMBE", font: "font-serif text-xs sm:text-sm font-semibold uppercase tracking-widest" },
  ];

  // Quadruple logos array to ensure seamless infinite left-to-right marquee loop
  const marqueeItems = [...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section className="bg-card border-y border-border py-8 md:py-10 overflow-hidden relative z-20" id="trust">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center gap-6">
        {/* Eyebrow Header */}
        <span className="text-xs font-mono font-bold text-primary tracking-[0.25em] uppercase text-center">
          TRUSTED BY INDUSTRY LEADERS
        </span>

        {/* Brand Logos Infinite Marquee Container */}
        <div className="w-full overflow-hidden relative py-2">
          {/* Gradient Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

          {/* Continuous Left-to-Right Moving Track */}
          <motion.div
            className="flex items-center gap-12 sm:gap-16 w-max opacity-75 hover:opacity-100 transition-opacity duration-300"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((brand, index) => (
              <div
                key={index}
                className="shrink-0 flex items-center justify-center min-w-[120px] sm:min-w-[150px] py-2 text-muted-foreground hover:text-foreground transition-all duration-300 select-none cursor-default hover:scale-105"
              >
                <span className={brand.font}>{brand.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
