import { ArrowRight, Eye, Sparkles, TrendingUp, Radio } from "lucide-react";

export default function CaseStudies() {
  const cases = [
    {
      industry: "D2C Fashion Brand",
      label: "CASE STUDY 01",
      metric: "+240% GMV Growth",
      challenge: "An offline fashion retailer had zero local search presence and no reliable ecommerce funnel to capture online demand beyond foot traffic.",
      solution: "Engineered a headless, sub-second Next.js storefront, executed localized category SEO for high-intent keywords, and rolled out high-converting Meta retargeting funnels.",
      result: "Achieved ₹18.5L in new online revenue within 90 days, scaled Google Map pack rankings to #1 across 14 target pin codes, and unlocked a national D2C sales channel.",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      industry: "B2B Precision Manufacturing",
      label: "CASE STUDY 02",
      metric: "4.8× Qualified RFQs",
      challenge: "A high-precision industrial manufacturer was relying purely on word-of-mouth with an outdated 2012 static site, losing multi-crore contracts to digital-first competitors.",
      solution: "Deployed a modern technical showcase website with interactive capability matrices, backed by high-intent B2B search engine optimization and targeted Google Ads.",
      result: "Tripled monthly RFQs within 4 months, ranked top 3 nationwide for 28 high-value commercial search queries, and closed two major enterprise export agreements.",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <section className="bg-muted/40 py-24 md:py-32 relative overflow-hidden border-y border-border transition-colors duration-500" id="results">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[var(--color-ember-orange)]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--color-brass)]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        <div className="mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
            <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
              Proof &amp; Performance — Case Logs
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-polysans)] text-[34px] sm:text-[44px] md:text-[54px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground mb-4 uppercase">
            Real Brands. <br className="hidden sm:block" />
            <span className="relative inline-block mt-2 text-foreground">
              Measurable Compound Scale.
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-ember-orange)] opacity-80" />
            </span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every engagement starts with hard diagnostics, precise unit economics, and scalable digital execution designed for tangible revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {cases.map((cs, i) => (
            <div
              key={i}
              className="bg-card/95 backdrop-blur-md border border-border/80 rounded-[22px] p-6 md:p-8 flex flex-col justify-between shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)] hover:shadow-2xl hover:border-[var(--color-ember-orange)]/50 transition-all duration-300 motion-safe:hover:-translate-y-1 relative overflow-hidden group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[var(--color-ember-orange)] bg-[var(--color-ember-orange)]/10 border border-[var(--color-ember-orange)]/20 px-3 py-1 rounded-full uppercase">
                    {cs.label}
                  </span>
                  <div className="inline-flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full border border-border text-[11px] font-mono font-bold text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{cs.metric}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-[var(--color-ember-orange)] group-hover:scale-110 group-hover:bg-[var(--color-ember-orange)]/10 transition-all">
                    {cs.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-polysans)] text-xl md:text-2xl font-bold text-foreground tracking-wide uppercase">
                    {cs.industry}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="border-l-2 border-border pl-3.5">
                    <h4 className="text-[11px] font-mono font-semibold tracking-wider text-[var(--color-brass)] uppercase mb-1">Challenge</h4>
                    <p className="font-[family-name:var(--font-inter)] text-xs md:text-sm text-muted-foreground leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div className="border-l-2 border-[var(--color-ember-orange)]/40 pl-3.5">
                    <h4 className="text-[11px] font-mono font-semibold tracking-wider text-[var(--color-ember-orange)] uppercase mb-1">Architecture &amp; Strategy</h4>
                    <p className="font-[family-name:var(--font-inter)] text-xs md:text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
                  </div>
                  <div className="bg-muted/60 p-4 rounded-xl border border-border/70">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <h4 className="text-[11px] font-mono font-bold tracking-wider text-foreground uppercase">Verified Outcome</h4>
                    </div>
                    <p className="font-[family-name:var(--font-inter)] text-xs md:text-sm text-foreground/90 font-medium leading-relaxed">
                      {cs.result}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-mono flex items-center gap-1.5 text-[11px]">
                  <Eye size={13} className="text-[var(--color-ember-orange)]" /> Growth Audit Certified
                </span>
                <a href="#cta" className="inline-flex items-center gap-1 font-[family-name:var(--font-polysans)] text-[12px] font-bold uppercase tracking-wider text-[var(--color-ember-orange)] hover:underline">
                  Engineer Yours <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
