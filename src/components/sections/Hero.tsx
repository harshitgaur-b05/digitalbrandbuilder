"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { Globe, TrendingUp, Award } from "lucide-react";

export interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface ActionProps {
  text: string;
  onClick: () => void;
  variant?: ButtonProps["variant"];
  className?: string;
}

// Brutalist button — stays fixed in place with tactile click press-down feedback
function BrutalistButton({ children, onClick, className }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: 1 }}
      whileTap={{ y: 3, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Image card with hover tilt micro-interaction
function ImageCard({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);
  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      className={cn("rounded-2xl overflow-hidden shadow-2xl cursor-pointer group", className)}
      style={{ rotateX: springRotX, rotateY: springRotY, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </motion.div>
  );
}

// Playful interactive word wrapper for hero headline keywords
export function PlayfulWord({ children, badge }: { children: React.ReactNode; badge?: string }) {
  return (
    <motion.span
      className="inline-flex items-center cursor-pointer relative group px-1 mx-0.5 rounded-xs select-none"
      initial={{ y: 0 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* The Text — shifts to primary on hover */}
      <span className="relative z-10 text-foreground group-hover:text-primary transition-colors duration-200">
        {children}
      </span>

      {/* Persistent primary underline indicator that grows on hover */}
      <span className="absolute bottom-[1px] left-0 right-0 h-[2px] bg-primary/80 group-hover:h-[4px] group-hover:bg-primary rounded-full transition-all duration-200" />

      {/* Subtle interactive spark icon indicator */}
      <span className="absolute -top-2.5 -right-2 text-[10px] text-primary group-hover:scale-125 group-hover:rotate-12 transition-transform duration-200 pointer-events-none">
        ✦
      </span>

      {/* Hover Badge Pill */}
      {badge && (
        <span className="absolute -top-4 right-0 translate-x-1/2 text-[9px] font-sans font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none scale-75 group-hover:scale-100 z-20 whitespace-nowrap">
          {badge}
        </span>
      )}
    </motion.span>
  );
}

export default function Hero() {
  const title = (
    <>
      WE BUILD DIGITAL BRANDS <br />
      <span className="relative inline-block mt-2">
        <span className="relative z-10 bg-primary text-primary-foreground px-5 sm:px-7 py-1.5 rounded-lg font-black tracking-tight uppercase inline-block shadow-[4px_4px_0px_0px_var(--foreground)] border-2 border-foreground -rotate-1 transform font-sans text-[clamp(1.4rem,3vw,2.4rem)]">
          THAT DOMINATE &amp; SCALE
        </span>
      </span>
    </>
  );

  const subtitle = "Digital Brand Builder helps ambitious local businesses and D2C brands dominate search, launch high-converting web experiences, and scale revenue with performance marketing.";

  const actions: ActionProps[] = [
    {
      text: 'CLAIM FREE BRAND AUDIT',
      onClick: () => {
        const auditEl = document.getElementById('audit');
        if (auditEl) auditEl.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      text: 'EXPLORE OUR SERVICES',
      onClick: () => {
        const servicesEl = document.getElementById('services');
        if (servicesEl) servicesEl.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  const stats: StatProps[] = [
    {
      value: '100+',
      label: 'Brands Scaled',
      icon: <Globe className="h-5 w-5 text-primary" />,
    },
    {
      value: '5.2x',
      label: 'Average ROAS',
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
    },
    {
      value: '98%',
      label: 'Client Satisfaction',
      icon: <Award className="h-5 w-5 text-primary" />,
    },
  ];

  const images = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Brutalist accent line — top edge rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-foreground/20 dark:bg-white/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-12">

          {/* ── Left: Text content ── */}
          <div className="flex flex-col items-start text-left">

            {/* Headline — Abril Fatface serif, clean 2 lines */}
            <h1 className="font-serif text-[clamp(1.4rem,2.8vw,2.2rem)] lg:text-[2.4rem] font-normal leading-[1.12] tracking-wide text-foreground uppercase mb-6">
              {title}
            </h1>

            {/* Subtitle — Lato font-sans */}
            <p className="font-sans max-w-[44ch] text-base leading-relaxed text-muted-foreground mb-10">
              {subtitle}
            </p>

            {/* CTAs — brutalist high contrast with hard offset shadows & click press feedback */}
            <div className="flex flex-wrap items-center gap-6 mb-14">
              {actions.map((action, index) =>
                index === 0 ? (
                  <BrutalistButton
                    key={index}
                    onClick={action.onClick}
                    className={cn(
                      "font-sans relative inline-flex items-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-md cursor-pointer select-none",
                      "bg-foreground text-background border-2 border-foreground",
                      "shadow-[4px_4px_0px_0px_var(--primary)]",
                      "hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px]",
                      "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
                      "transition-all duration-150 group"
                    )}
                  >
                    {action.text}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </BrutalistButton>
                ) : (
                  <BrutalistButton
                    key={index}
                    onClick={action.onClick}
                    className={cn(
                      "font-sans relative inline-flex items-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-md cursor-pointer select-none",
                      "bg-transparent text-foreground border-2 border-foreground/60",
                      "shadow-[4px_4px_0px_0px_var(--border)]",
                      "hover:border-foreground hover:shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-foreground/5",
                      "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
                      "transition-all duration-150"
                    )}
                  >
                    {action.text}
                  </BrutalistButton>
                )
              )}
            </div>

            {/* Stats — Lato font-sans */}
            <div className="flex flex-wrap items-start gap-8 pt-8 border-t border-foreground/15 w-full">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="text-primary shrink-0">{stat.icon}</div>
                  <div>
                    <p className="font-sans text-xl font-black leading-none text-foreground tracking-tight">
                      {stat.value}
                    </p>
                    <p className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image collage with tilt micro-interactions ── */}
          <div className="relative h-[420px] sm:h-[520px] lg:h-[540px] w-full">
            {/* Top-center card — largest */}
            <ImageCard
              src={images[0]}
              alt="Digital marketing strategy"
              className="absolute left-1/2 -translate-x-1/2 top-0 w-52 h-52 sm:w-64 sm:h-64 bg-muted"
            />

            {/* Right card */}
            <ImageCard
              src={images[1]}
              alt="Agency team collaboration"
              className="absolute right-0 top-[28%] w-44 h-44 sm:w-56 sm:h-56 bg-muted"
            />

            {/* Bottom-left card */}
            <ImageCard
              src={images[2]}
              alt="Performance analytics"
              className="absolute bottom-0 left-0 w-36 h-36 sm:w-48 sm:h-48 bg-muted"
            />

            {/* Brutalist accent — corner bracket */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}