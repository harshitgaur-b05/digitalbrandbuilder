import { Store, Globe, Search, ShieldCheck, TrendingUp } from "lucide-react";

export default function TransformationSection() {
  const stages = [
    {
      title: "Business",
      desc: "A local, offline operation with a limited reach and untapped potential.",
      icon: <Store className="text-primary w-7 h-7" />,
    },
    {
      title: "Website",
      desc: "Your digital flagship store. Fast, premium, and designed to convert visitors.",
      icon: <Globe className="text-primary w-7 h-7" />,
    },
    {
      title: "Visibility",
      desc: "Ranked high on Google and Maps. Getting found when local buyers search.",
      icon: <Search className="text-primary w-7 h-7" />,
    },
    {
      title: "Trust",
      desc: "Social proof, consistent brand design, and stellar reviews. Chosen over others.",
      icon: <ShieldCheck className="text-primary w-7 h-7" />,
    },
    {
      title: "Growth",
      desc: "A scalable digital brand with a recurring flow of customers and sales.",
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
            We build the complete bridge that takes your physical business online and transforms
            it into a premium, recognizable market leader.
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

          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-start relative z-20 gap-12 lg:gap-6">
            {stages.map((stage, i) => (
              <div key={i} className="flex-1 flex flex-col lg:items-center lg:text-center relative group">
                <div className="w-[68px] h-[68px] md:w-[80px] md:h-[80px] rounded-full bg-card border border-border shadow-sm flex items-center justify-center relative mb-6 lg:mb-8 z-30 transition-[border-color,box-shadow] duration-500 group-hover:border-primary/50 group-hover:shadow-md shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:scale-[1.2] group-hover:opacity-0 transition-[transform,opacity] duration-700" />
                  <div className="flex items-center justify-center z-40">
                    {stage.icon}
                  </div>
                </div>
                <div className="pl-4 lg:pl-0 flex-grow">
                  <div className="flex items-center lg:justify-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary/70">0{i + 1}</span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">{stage.title}</h3>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm lg:mx-auto">{stage.desc}</p>
                </div>
                {i < stages.length - 1 && (
                  <div className="absolute left-[34px] md:left-[40px] top-[74px] md:top-[86px] w-[1px] h-[72px] bg-primary/30 lg:hidden" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
