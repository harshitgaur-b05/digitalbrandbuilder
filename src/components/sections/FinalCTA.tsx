import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="cta">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-ember-orange)]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[var(--color-brass)]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="bg-card/95 backdrop-blur-md border border-border/80 rounded-[28px] p-8 sm:p-12 md:p-16 text-center shadow-[0_15px_45px_rgb(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.45)] relative overflow-hidden group">
          {/* Inner ambient glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-[var(--color-ember-orange)]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6 sm:mb-8">
            <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
            <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
              Launch Phase — Rapid Scale Activation
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-polysans)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground max-w-3xl mx-auto mb-5 sm:mb-7 uppercase">
            Your Business Has The Potential. <br className="hidden sm:block" />
            <span className="relative inline-block mt-2 text-foreground">
              Let&apos;s Build The Brand To Match.
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-ember-orange)] opacity-80" />
            </span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
            Whether you&apos;re dominating a local territory in Delhi or scaling a nationwide D2C brand, our full-stack growth team delivers predictable, measurable returns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-[family-name:var(--font-polysans)] bg-foreground text-background hover:bg-[var(--color-ember-orange)] hover:text-white px-8 py-4 rounded-md text-[13px] md:text-[15px] tracking-wider uppercase font-semibold shadow-xl active:scale-95 transition-all duration-200 group"
            >
              Build Your Digital Brand
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="#audit"
              className="font-[family-name:var(--font-polysans)] bg-transparent border border-foreground/30 hover:border-foreground text-foreground px-8 py-4 rounded-full text-[13px] md:text-[15px] tracking-wider hover:bg-muted transition-all duration-200 uppercase font-semibold active:scale-95"
            >
              Claim Free Brand Audit
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ember-orange)]"></span>
              Fast 2-Week Sprints
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brass)]"></span>
              Enterprise SLA &amp; Support
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Guaranteed Measurable KPI Growth
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
