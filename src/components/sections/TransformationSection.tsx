import { Store, Globe, Search, ShieldCheck, TrendingUp } from "lucide-react";

export default function TransformationSection() {
  const stages = [
    {
      title: "Business",
      desc: "Your existing business, products, services, and expertise become the foundation for a focused digital growth strategy.",
      icon: <Store className="text-primary w-7 h-7" />,
    },
    {
      title: "Website",
      desc: "A fast, professional, mobile-friendly website that communicates your value and gives visitors a clear reason to take action.",
      icon: <Globe className="text-primary w-7 h-7" />,
    },
    {
      title: "Visibility",
      desc: "Strategic SEO helps your business appear in front of people actively searching for your products and services across Google Search and Maps.",
      icon: <Search className="text-primary w-7 h-7" />,
    },
    {
      title: "Trust",
      desc: "Consistent branding, useful content, customer reviews, and a professional online presence help turn visitors into confident customers.",
      icon: <ShieldCheck className="text-primary w-7 h-7" />,
    },
    {
      title: "Growth",
      desc: "A connected digital marketing system that continuously attracts, engages, and converts potential customers.",
      icon: <TrendingUp className="text-primary w-7 h-7" />,
    },
  ];

  return (
    <section className="bg-muted py-24 md:py-32 relative overflow-hidden border-y border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="text-center mb-20 md:mb-28">
          <span className="text-xs font-semibold tracking-[0.15em] text-primary mb-3 uppercase block">
            THE EVOLUTION
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground mb-4">
            From local business to digital brand.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Digital Brand Builder builds the complete digital foundation your business needs to move from simply being online to becoming a recognizable, trusted, and growth-focused brand.
          </p>
        </div>

        <div className="relative w-full">
          {/* Desktop static SVG path */}
          <div className="absolute top-[40px] left-0 w-full h-[120px] z-10 pointer-events-none hidden lg:block text-primary">
            <svg className="w-full h-full" viewBox="0 0 1000 120" fill="none" preserveAspectRatio="none">
              <path
                d="M 50,60 C 200,60 150,60 300,60 C 450,60 400,60 500,60 C 600,60 550,60 700,60 C 850,60 800,60 950,60"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeOpacity="0.4"
              />
            </svg>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-start relative z-20 gap-6 lg:gap-6">
            {stages.map((stage, i) => (
              <div key={i} className="flex-1 relative group">
                
                {/* Mobile Premium Card Shell (hidden on desktop) */}
                <div className="absolute inset-0 bg-card rounded-[2rem] ring-1 ring-black/5 dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] lg:hidden pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-primary/30" />

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:items-center lg:text-center p-6 lg:p-0 h-full">
                  <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] rounded-full bg-background lg:bg-card border border-border lg:border-border shadow-sm flex items-center justify-center relative mb-5 lg:mb-8 transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-primary/50 group-hover:shadow-md group-hover:-translate-y-1 shrink-0">
                    <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:scale-[1.25] group-hover:opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                    <div className="flex items-center justify-center relative z-20">
                      {stage.icon}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center lg:justify-center gap-3 mb-3">
                      <span className="text-[10px] font-bold text-primary/90 uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full shrink-0">
                        {`0${i + 1}`}
                      </span>
                      <h3 className="text-xl font-bold text-foreground tracking-tight transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-primary">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm lg:mx-auto">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
