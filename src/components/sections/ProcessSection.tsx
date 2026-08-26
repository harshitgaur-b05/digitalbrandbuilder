import { MessageSquare, Hammer, Search, Users, RotateCw } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Tell us about your business",
      desc: "Share your target customers, competitors, and products. We analyze what drives demand in your specific industry.",
      icon: <MessageSquare className="text-sage-deep w-6 h-6" />,
    },
    {
      num: "02",
      title: "Build your digital foundation",
      desc: "We build your premium, high-speed custom website and load the initial branding, layout, and visual presence.",
      icon: <Hammer className="text-sage-deep w-6 h-6" />,
    },
    {
      num: "03",
      title: "Get discovered",
      desc: "We configure structural SEO parameters, claim local citations, and set up Google Search Maps directories.",
      icon: <Search className="text-sage-deep w-6 h-6" />,
    },
    {
      num: "04",
      title: "Turn attention into customers",
      desc: "We deploy hyper-targeted ads and strategic organic content campaigns that turn searchers into buying customers.",
      icon: <Users className="text-sage-deep w-6 h-6" />,
    },
    {
      num: "05",
      title: "Keep improving",
      desc: "We optimize conversions, analyze analytics, and adapt content maps so your digital engine keeps driving client flow.",
      icon: <RotateCw className="text-sage-deep w-6 h-6" />,
    },
  ];

  return (
    <section className="bg-brand-bg py-24 md:py-32 relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="mb-20">
          <span className="text-xs font-semibold tracking-[0.15em] text-sage-deep mb-3 uppercase block">
            THE PROCESS
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-brand-text max-w-xl">
            From idea to digital growth, without the complexity.
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start gap-6 md:gap-12 bg-white border border-brand-text/5 rounded-2xl p-6 md:p-8 hover:border-sage-soft transition-all duration-300 hover:shadow-xs group"
            >
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-sans text-3xl font-light text-sage-soft group-hover:text-sage-deep transition-colors duration-300">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-sage-soft/10 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-brand-text mb-2 tracking-tight group-hover:text-sage-deep transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed max-w-3xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
