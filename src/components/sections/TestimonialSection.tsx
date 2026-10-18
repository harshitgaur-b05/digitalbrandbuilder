import { Star, Quote, Radio } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      company: "Elite Fitness Delhi",
      role: "Managing Director",
      text: "Since partnering with Digital Brand Builder, our local search traffic has skyrocketed. We've seen a 40% increase in walk-ins and memberships within just three months.",
    },
    {
      name: "Priya Patel",
      company: "Patel & Co. Consultants",
      role: "Founder & Principal",
      text: "They redesigned our outdated website and created a brand identity that actually reflects our expertise. The professional look has helped us close higher-ticket clients.",
    },
    {
      name: "Amit Desai",
      company: "Desai Auto Care",
      role: "Operations Head",
      text: "I was skeptical about SEO, but the results speak for themselves. We are now ranking #1 for 'car repair near me' and our phones haven't stopped ringing.",
    },
  ];

  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-[var(--color-ember-orange)]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-5 w-96 h-96 bg-[var(--color-brass)]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
            <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
              Client Intelligence — Verified Feedback
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-polysans)] text-[34px] sm:text-[44px] md:text-[54px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground max-w-2xl mx-auto uppercase">
            Don&apos;t Just Take <br className="hidden sm:block" />
            <span className="relative inline-block mt-2 text-foreground">
              Our Word For It.
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-ember-orange)] opacity-80" />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card/95 backdrop-blur-md border border-border/80 rounded-[22px] p-6 md:p-8 flex flex-col justify-between shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)] hover:shadow-2xl hover:border-[var(--color-ember-orange)]/50 transition-all duration-300 motion-safe:hover:-translate-y-1 relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex text-[var(--color-ember-orange)] gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded border border-border/60">
                    VERIFIED // 5.0
                  </span>
                </div>

                <p className="font-[family-name:var(--font-inter)] text-foreground/90 leading-relaxed text-sm md:text-[15px] italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-border/60 flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-polysans)] font-bold text-foreground text-sm uppercase tracking-wide">
                    {t.name}
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
                <Quote className="text-[var(--color-ember-orange)]/15 w-8 h-8 rotate-180 shrink-0 group-hover:scale-110 group-hover:text-[var(--color-ember-orange)]/30 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
