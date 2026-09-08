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

          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-start relative z-20 gap-5 lg:gap-6">
            {stages.map((stage, i) => (
              <div key={i} className="flex-1 relative group">
                
                {/* Mobile Connected Line */}
                {i < stages.length - 1 && (
                  <div className="absolute top-12 left-8 w-0.5 h-[calc(100%+1.25rem)] bg-primary/20 lg:hidden z-0" />
                )}

                {/* Mobile Premium Card Shell */}
                <div className="absolute inset-0 bg-card border border-border/80 rounded-2xl shadow-xs lg:hidden pointer-events-none transition-all duration-300 group-hover:border-primary/40" />

                {/* Content */}
                <div className="relative z-10 flex flex-row lg:flex-col items-start lg:items-center lg:text-center p-5 lg:p-0 h-full gap-4 lg:gap-0">
                  <div className="w-12 h-12 lg:w-[80px] lg:h-[80px] rounded-2xl lg:rounded-full bg-background lg:bg-card border border-border shadow-xs flex items-center justify-center relative mb-0 lg:mb-8 transition-[border-color,box-shadow,transform] duration-500 group-hover:border-primary/50 group-hover:shadow-md group-hover:-translate-y-1 shrink-0">
                    <div className="absolute inset-0 rounded-2xl lg:rounded-full bg-primary/10 group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex items-center justify-center relative z-20">
                      {stage.icon}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center lg:justify-center gap-2.5 mb-2">
                      <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full shrink-0">
                        {`STAGE 0${i + 1}`}
                      </span>
                      <h3 className="text-lg lg:text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm lg:mx-auto">
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
