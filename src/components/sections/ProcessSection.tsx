import { MessageSquare, Hammer, Search, Users, RotateCw, Radio } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      phase: "PHASE 01 // AUDIT",
      title: "Discovery & Opportunity Mapping",
      desc: "We analyze your market positioning, competitor blindspots, search intent gaps, and technical hurdles to design an aggressive digital attack plan.",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      num: "02",
      phase: "PHASE 02 // ARCHITECTURE",
      title: "Build Your Digital Growth Foundation",
      desc: "We deploy modern, lightning-fast web infrastructure, brand design systems, and conversion tracking to ensure every click is measured and monetized.",
      icon: <Hammer className="w-5 h-5" />,
    },
    {
      num: "03",
      phase: "PHASE 03 // VISIBILITY",
      title: "Rank #1 & Capture High-Intent Traffic",
      desc: "We execute programmatic technical SEO, dominate local map packs, optimize Google Business Profiles, and capture decision-ready search volume.",
      icon: <Search className="w-5 h-5" />,
    },
    {
      num: "04",
      phase: "PHASE 04 // ACQUISITION",
      title: "Performance Ads & Conversion Funnels",
      desc: "We orchestrate precision Google & Meta ad campaigns, retargeting mechanisms, and compelling copy that consistently converts visitors into revenue.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      num: "05",
      phase: "PHASE 05 // COMPOUND",
      title: "Optimization & Continuous Scale",
      desc: "We track user behavior, CVR analytics, and ROAS performance weekly, refining creatives and funnels to compound returns month over month.",
      icon: <RotateCw className="w-5 h-5" />,
    },
  ];

  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="how-it-works">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-5 w-80 h-80 bg-[var(--color-ember-orange)]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--color-brass)]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
            <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
              The Process — Growth Engine Protocol
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-polysans)] text-[34px] sm:text-[44px] md:text-[54px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground max-w-2xl mb-4 uppercase">
            From Raw Vision <br className="hidden sm:block" />
            <span className="relative inline-block mt-2 text-foreground">
              To Compounding Growth
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-ember-orange)] opacity-80" />
            </span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            A battle-tested 5-phase growth framework that removes guesswork and systematically turns local businesses into category leaders.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start gap-6 md:gap-10 bg-card/95 backdrop-blur-md border border-border/80 rounded-[22px] p-6 md:p-8 shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)] hover:shadow-2xl hover:border-[var(--color-ember-orange)]/50 transition-all duration-300 motion-safe:hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono text-3xl md:text-4xl font-bold text-[var(--color-ember-orange)] tracking-tight">
                  {step.num}
                </span>
                <div className="w-11 h-11 rounded-full bg-muted border border-border flex items-center justify-center text-[var(--color-ember-orange)] group-hover:scale-110 group-hover:bg-[var(--color-ember-orange)]/10 transition-all">
                  {step.icon}
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-[var(--color-brass)] uppercase tracking-wider">
                    {step.phase}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-polysans)] text-lg md:text-xl font-bold text-foreground mb-2 tracking-wide uppercase group-hover:text-[var(--color-ember-orange)] transition-colors">
                  {step.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {step.desc}
                </p>
              </div>

              <div className="hidden lg:flex items-center text-[11px] font-mono text-muted-foreground shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[var(--color-ember-orange)] font-bold">Standard SLA →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
