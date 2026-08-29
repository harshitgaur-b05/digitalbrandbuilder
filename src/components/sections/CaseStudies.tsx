import { ArrowRight, Eye, Sparkles, TrendingUp } from "lucide-react";

export default function CaseStudies() {
  const cases = [
    {
      industry: "D2C Fashion Brand",
      label: "CASE STUDY 01",
      challenge: "An offline fashion business had limited local visibility and no strong ecommerce channel to reach customers beyond its physical location.",
      solution: "We developed a conversion-focused ecommerce website, optimized category and product pages for relevant search intent, and created a localized social media and content strategy to strengthen brand visibility.",
      result: "The new digital storefront created a stronger online buying journey, improved the brand's presence across search and social channels, and provided a scalable platform to reach customers beyond the local market.",
      icon: <Sparkles className="w-5 h-5 text-primary" />,
    },
    {
      industry: "Local Manufacturing & Engineering",
      label: "CASE STUDY 02",
      challenge: "A traditional B2B manufacturing business had limited online visibility and was losing potential opportunities to competitors with stronger digital presentations.",
      solution: "We created a professional website showcasing products, machinery, capabilities, certifications, and projects, supported by SEO focused on relevant commercial and local search terms.",
      result: "The new website established a stronger professional digital presence, improved the brand's visibility for relevant B2B searches, and created a more effective channel for generating qualified business enquiries.",
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <section className="bg-muted py-24 md:py-32 relative overflow-hidden border-y border-border transition-colors duration-500" id="results">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="mb-20 text-center">
          <span className="text-xs font-semibold tracking-[0.15em] text-primary mb-3 uppercase block">
            PROOF & PERFORMANCE
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground mb-4">
            How we partner with brands.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            At Digital Brand Builder, we believe digital marketing should be built on strategy, transparency, and measurable outcomes. Every project starts with understanding the business, identifying opportunities, building the right digital foundation, and continuously improving what works.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {cases.map((cs, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col justify-between hover:shadow-md dark:shadow-[0_4px_20px_rgba(43,158,220,0.08)] hover:border-primary/50 transition-[box-shadow,border-color,transform] duration-300 motion-safe:hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                    {cs.label}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    {cs.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-8 tracking-tight">{cs.industry}</h3>

                <div className="space-y-6">
                  <div className="border-l-2 border-primary/20 pl-4">
                    <h4 className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">Challenge</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div className="border-l-2 border-primary/20 pl-4">
                    <h4 className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-4">
                    <h4 className="text-xs font-bold tracking-wider text-foreground uppercase mb-1">Result</h4>
                    <p className="text-sm text-foreground font-medium leading-relaxed italic bg-muted/50 p-3 rounded-lg border border-border">
                      {cs.result}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Eye size={14} /> Future Audit Ready
                </span>
                <a href="#cta" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-foreground transition-colors">
                  Plan Yours <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
