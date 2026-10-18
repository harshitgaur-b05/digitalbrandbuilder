import { Store, Globe, Search, ShieldCheck, TrendingUp, Radio } from "lucide-react";

export default function TransformationSection() {
  const stages = [
    {
      title: "Business",
      desc: "Your existing products, services, and local expertise become the core foundation for a targeted digital growth strategy.",
      icon: <Store className="w-6 h-6" />,
    },
    {
      title: "Website",
      desc: "A high-performance, mobile-optimized experience engineered to convert cold visitors into qualified enquiries and buyers.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Visibility",
      desc: "Dominate Google Search, Maps, and AI answer engines when high-intent prospects actively search for your solutions.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Trust",
      desc: "Reputation architecture, social proof, and seamless brand authority that turn skeptics into confident repeat buyers.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Growth",
      desc: "A closed-loop growth engine uniting SEO, performance ads, and CRM pipelines for compounding revenue.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <section className="bg-muted/40 py-24 md:py-32 relative overflow-hidden border-y border-border transition-colors duration-500">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[var(--color-ember-orange)]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[var(--color-brass)]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
            <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
              The Evolution — Blueprint
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-polysans)] text-[34px] sm:text-[44px] md:text-[54px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground mb-5">
            From local business <br className="hidden sm:block" />
            <span className="relative inline-block mt-2 pb-3 text-foreground">
              to dominant digital brand
              <span className="absolute bottom-0 left-0 right-0 h-[3.5px] rounded-full bg-[var(--color-ember-orange)]" />
            </span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Digital Brand Builder builds the complete digital infrastructure your business needs to move from simply existing online to becoming an authority in your market.
          </p>
        </div>

        <div className="relative w-full">
          {/* Desktop dynamic SVG path */}
          <div className="absolute top-[40px] left-0 w-full h-[120px] z-10 pointer-events-none hidden lg:block text-[var(--color-ember-orange)] opacity-50">
            <svg className="w-full h-full" viewBox="0 0 1000 120" fill="none" preserveAspectRatio="none">
              <path
                d="M 50,60 C 200,60 150,60 300,60 C 450,60 400,60 500,60 C 600,60 550,60 700,60 C 850,60 800,60 950,60"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative z-20">
            {stages.map((stage, i) => (
              <div
                key={i}
                className="bg-card/95 backdrop-blur-md border border-border/80 rounded-[22px] p-6 shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)] hover:shadow-2xl hover:border-[var(--color-ember-orange)]/50 transition-all duration-300 motion-safe:hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono font-bold text-[var(--color-ember-orange)] bg-[var(--color-ember-orange)]/10 border border-[var(--color-ember-orange)]/20 px-2.5 py-0.5 rounded-full shrink-0">
                      {`STAGE 0${i + 1}`}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-[var(--color-ember-orange)] group-hover:scale-110 group-hover:bg-[var(--color-ember-orange)]/10 transition-all">
                      {stage.icon}
                    </div>
                  </div>

                  <h3 className="font-[family-name:var(--font-polysans)] text-lg font-bold text-foreground mb-2 tracking-wide uppercase group-hover:text-[var(--color-ember-orange)] transition-colors">
                    {stage.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ember-orange)]"></span>
                  <span>Pipeline Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
