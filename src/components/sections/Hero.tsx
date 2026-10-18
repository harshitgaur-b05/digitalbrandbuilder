"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Activity, MousePointerClick, Search, TrendingUp, Radio, Megaphone, BarChart3 } from "lucide-react";

export interface ActionProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "ghost";
}

// Monthly organic traffic data points for micro-interaction tracking
interface DataPoint {
  month: string;
  x: number;
  y: number;
  traffic: string;
  growth: string;
  conversionBarHeight: number;
}

const DATA_POINTS: DataPoint[] = [
  { month: "Jan", x: 30,  y: 90, traffic: "12.4K",  growth: "+8.2%",  conversionBarHeight: 30 },
  { month: "Feb", x: 90,  y: 78, traffic: "18.2K",  growth: "+12.1%", conversionBarHeight: 45 },
  { month: "Mar", x: 150, y: 65, traffic: "24.7K",  growth: "+17.6%", conversionBarHeight: 55 },
  { month: "Apr", x: 210, y: 45, traffic: "38.9K",  growth: "+24.8%", conversionBarHeight: 70 },
  { month: "May", x: 270, y: 32, traffic: "52.1K",  growth: "+31.4%", conversionBarHeight: 80 },
  { month: "Jun", x: 330, y: 18, traffic: "74.3K",  growth: "+38.6%", conversionBarHeight: 90 },
  { month: "Jul", x: 390, y: 8,  traffic: "96.8K",  growth: "+45.2%", conversionBarHeight: 100 },
];

function DashboardCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={cn(
        "bg-card/95 backdrop-blur-md text-card-foreground rounded-[22px] shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)] border border-border/80 p-5 md:p-6 transition-all hover:shadow-2xl overflow-hidden relative",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const [activePointIndex, setActivePointIndex] = useState(5);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActivePointIndex((prev) => (prev + 1) % DATA_POINTS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isHovered]);

  const activePoint = DATA_POINTS[activePointIndex];

  const actions: ActionProps[] = [
    {
      text: "CLAIM FREE BRAND AUDIT",
      variant: "primary",
      onClick: () => {
        const auditEl = document.getElementById("audit");
        if (auditEl) auditEl.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      text: "EXPLORE OUR SERVICES",
      variant: "ghost",
      onClick: () => {
        const servicesEl = document.getElementById("services");
        if (servicesEl) servicesEl.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[var(--color-ember-orange)]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[var(--color-brass)]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col items-start text-left max-w-[620px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6"
            >
              <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
              <span className="font-[family-name:var(--font-polysans)] text-[12px] md:text-[13px] tracking-wide uppercase font-semibold text-foreground/80">
                Digital Brand Builder — Growth Engine
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[family-name:var(--font-polysans)] text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground mb-6 uppercase"
            >
              We Build Digital Brands <br className="hidden sm:block" />
              <span className="relative inline-block mt-2 text-foreground">
                That Dominate & Scale
                <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-ember-orange)] opacity-80" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-[family-name:var(--font-inter)] max-w-[520px] text-[16px] md:text-[18px] leading-[1.6] text-muted-foreground mb-10"
            >
              Digital Brand Builder helps ambitious local businesses and D2C brands dominate search, launch high-converting web experiences, and scale revenue with precision performance marketing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              {actions.map((action, index) =>
                action.variant === "primary" ? (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="font-[family-name:var(--font-polysans)] bg-foreground text-background px-6 py-3.5 rounded-md text-[13px] md:text-[15px] tracking-wider hover:opacity-90 transition-all duration-200 uppercase font-semibold shadow-md active:scale-95"
                  >
                    {action.text}
                  </button>
                ) : (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="font-[family-name:var(--font-polysans)] bg-transparent border border-foreground/30 hover:border-foreground text-foreground px-6 py-3.5 rounded-full text-[13px] md:text-[15px] tracking-wider hover:bg-muted transition-all duration-200 uppercase font-semibold active:scale-95"
                  >
                    {action.text}
                  </button>
                )
              )}
            </motion.div>
          </div>

          {/* ── Right: Digital Marketing Dashboard ── */}
          <div className="flex flex-col gap-5 w-full max-w-[540px] mx-auto lg:mx-0">

            {/* Card 1: Organic Traffic Growth — Full Width with Curve Tracker */}
            <DashboardCard delay={0.2} className="w-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-[var(--color-brass)] border border-border">
                    <Search size={18} />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-polysans)] text-[15px] font-semibold text-foreground tracking-tight">
                      Organic Traffic Growth
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-muted-foreground">
                      SEO & search visibility · live
                    </p>
                  </div>
                </div>
                {/* Live Traffic Counter Badge */}
                <div className="flex items-center gap-2 bg-[var(--color-ember-orange)]/10 text-[var(--color-ember-orange)] border border-[var(--color-ember-orange)]/20 px-3 py-1 rounded-full text-[12px] font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-ember-orange)] animate-ping" />
                  {activePoint.traffic} visits
                </div>
              </div>

              {/* Interactive SVG Curve Tracker */}
              <div
                className="relative h-[150px] w-full mt-2 cursor-pointer select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <svg viewBox="0 0 420 120" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="trafficFillGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-ember-orange)" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="var(--color-ember-orange)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid */}
                  <line x1="0" y1="20"  x2="420" y2="20"  stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="60"  x2="420" y2="60"  stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="100" x2="420" y2="100" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Fill */}
                  <path
                    d="M30,90 C80,85 120,75 150,65 C180,55 200,45 210,45 C230,45 250,32 270,32 C310,20 330,18 390,8 L390,110 L30,110 Z"
                    fill="url(#trafficFillGrad)"
                  />

                  {/* Industry average baseline (Brass dashed) */}
                  <path
                    d="M30,100 Q120,90 210,78 T390,55"
                    fill="none"
                    stroke="var(--color-brass)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeOpacity="0.65"
                  />

                  {/* Primary Growth Curve */}
                  <path
                    d="M30,90 C80,85 120,75 150,65 C180,55 200,45 210,45 C230,45 250,32 270,32 C310,20 330,18 390,8"
                    fill="none"
                    stroke="var(--color-ember-orange)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Vertical Tracker Line */}
                  <motion.line
                    initial={{ x1: activePoint.x, x2: activePoint.x }}
                    animate={{ x1: activePoint.x, x2: activePoint.x }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    x1={activePoint.x}
                    x2={activePoint.x}
                    y1="5"
                    y2="110"
                    stroke="var(--color-ember-orange)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    strokeOpacity="0.55"
                  />

                  {/* Month Data Nodes */}
                  {DATA_POINTS.map((pt, idx) => (
                    <g key={pt.month} onClick={() => setActivePointIndex(idx)} className="cursor-pointer">
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={idx === activePointIndex ? "6" : "3.5"}
                        fill={idx === activePointIndex ? "var(--color-ember-orange)" : "currentColor"}
                        className={idx === activePointIndex ? "" : "text-muted-foreground/55 hover:text-foreground"}
                        stroke={idx === activePointIndex ? "var(--background)" : "none"}
                        strokeWidth="2"
                      />
                    </g>
                  ))}

                  {/* Spring-physics Tracking Dot */}
                  <motion.circle
                    initial={{ cx: activePoint.x, cy: activePoint.y }}
                    animate={{ cx: activePoint.x, cy: activePoint.y }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r="8"
                    fill="var(--color-ember-orange)"
                    stroke="var(--background)"
                    strokeWidth="3"
                  />
                </svg>

                {/* Floating Tooltip Badge (glides with dot) */}
                <motion.div
                  initial={{
                    left: `${(activePoint.x / 420) * 100}%`,
                    top: `${(activePoint.y / 120) * 100}%`,
                  }}
                  animate={{
                    left: `${(activePoint.x / 420) * 100}%`,
                    top: `${(activePoint.y / 120) * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="absolute -translate-x-1/2 -translate-y-[145%] pointer-events-none z-30"
                >
                  <div className="bg-popover/95 backdrop-blur-md text-popover-foreground border border-border shadow-xl px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-bold text-[var(--color-ember-orange)]">{activePoint.month}</span>
                    <span>·</span>
                    <span className="font-semibold">{activePoint.traffic} visits</span>
                    <span className="text-[10px] text-emerald-500 font-bold">{activePoint.growth}</span>
                  </div>
                </motion.div>

                {/* X-axis Labels */}
                <div className="flex justify-between px-3 mt-1 text-[11px] font-mono text-muted-foreground">
                  {DATA_POINTS.map((pt, idx) => (
                    <button
                      key={pt.month}
                      onClick={() => setActivePointIndex(idx)}
                      className={cn(
                        "transition-colors hover:text-foreground",
                        idx === activePointIndex && "text-[var(--color-ember-orange)] font-bold"
                      )}
                    >
                      {pt.month}
                    </button>
                  ))}
                </div>
              </div>
            </DashboardCard>

            {/* Bottom Row: Campaign Performance + Conversion Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">

              {/* Card 2: Campaign Performance (synced bars) */}
              <DashboardCard delay={0.35} className="w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-[family-name:var(--font-polysans)] text-[13px] font-bold text-[var(--color-ember-orange)] tracking-wide uppercase">
                    Campaigns
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[var(--color-brass)] border border-border">
                    <Megaphone size={14} />
                  </div>
                </div>

                {/* Key metric */}
                <div className="mb-3">
                  <p className="font-[family-name:var(--font-polysans)] text-[22px] font-bold text-foreground tracking-tight leading-none">
                    4.8× ROAS
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground">
                    <TrendingUp size={12} className="text-emerald-500" />
                    <span>Return on Ad Spend</span>
                  </div>
                </div>

                {/* Bars synced to traffic tracker */}
                <div className="h-[45px] w-full flex items-end gap-1.5 pt-2">
                  {DATA_POINTS.map((pt, idx) => (
                    <button
                      key={pt.month}
                      onClick={() => setActivePointIndex(idx)}
                      className="flex-1 h-full flex items-end"
                    >
                      <motion.div
                        initial={{ height: `${pt.conversionBarHeight}%` }}
                        animate={{
                          height: `${pt.conversionBarHeight}%`,
                          backgroundColor:
                            idx === activePointIndex
                              ? "var(--color-ember-orange)"
                              : "rgba(129, 103, 41, 0.38)",
                        }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "w-full rounded-t-sm",
                          idx === activePointIndex && "shadow-[0_0_8px_#ff682c]"
                        )}
                      />
                    </button>
                  ))}
                </div>

                {/* Inline stats */}
                <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <p className="text-muted-foreground">CTR</p>
                    <p className="font-semibold text-foreground font-mono">6.4%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CPC</p>
                    <p className="font-semibold text-foreground font-mono">₹18.50</p>
                  </div>
                </div>
              </DashboardCard>

              {/* Card 3: SEO Rank & Conversion Rate */}
              <DashboardCard delay={0.45} className="w-full">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-polysans)] text-[13px] font-bold text-[var(--color-ember-orange)] tracking-wide uppercase">
                      SEO Rank
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[11px] text-muted-foreground">
                      Avg. position & CVR
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[var(--color-ember-orange)]/15 flex items-center justify-center text-[var(--color-ember-orange)]">
                    <BarChart3 size={14} />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mt-1">
                  {/* Conversion Rate Ring */}
                  <div className="relative w-[70px] h-[70px] shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle
                        cx="50" cy="50" r="38"
                        fill="none"
                        stroke="currentColor"
                        className="text-muted/60"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="var(--color-ember-orange)"
                        strokeWidth="8"
                        strokeDasharray="238.7"
                        strokeDashoffset={238.7}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 238.7 }}
                        animate={{ strokeDashoffset: 238.7 * (1 - 0.37) }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="font-[family-name:var(--font-polysans)] text-[15px] font-bold text-foreground leading-none">
                        3.7%
                      </span>
                      <span className="font-[family-name:var(--font-inter)] text-[8px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        CVR
                      </span>
                    </div>
                  </div>

                  {/* SEO KPIs */}
                  <div className="flex flex-col gap-2 text-[10px] text-muted-foreground">
                    <div>
                      <p className="mb-0.5">Avg. Position</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-ember-orange)]" />
                        <span className="font-semibold text-foreground font-mono text-[11px]">#2.4</span>
                      </div>
                    </div>
                    <div>
                      <p className="mb-0.5">Backlinks</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-brass)]" />
                        <span className="font-semibold text-foreground font-mono text-[11px]">1,842</span>
                      </div>
                    </div>
                    <div>
                      <p className="mb-0.5">DA Score</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                        <span className="font-semibold text-foreground font-mono text-[11px]">52/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>

            </div>
          </div>
        </div>
      </div>

      {/* Partner Strip */}
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 mt-20 md:mt-28">
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-[family-name:var(--font-polysans)] text-[12px] md:text-[13px] text-muted-foreground uppercase tracking-wider">
            <span className="font-semibold text-[var(--color-ember-orange)]">Trusted</span> by 80+ ambitious brands
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-[family-name:var(--font-polysans)] font-extrabold text-[18px] text-foreground tracking-tighter">ABB</span>
            <span className="font-[family-name:var(--font-polysans)] font-extrabold text-[18px] text-foreground tracking-tighter">OLYMEL</span>
            <span className="font-[family-name:var(--font-polysans)] font-extrabold text-[18px] text-foreground tracking-tighter">CASCADES</span>
            <span className="font-[family-name:var(--font-polysans)] font-extrabold text-[18px] text-foreground tracking-tighter">ANGELCARE</span>
          </div>
        </div>
      </div>
    </section>
  );
}