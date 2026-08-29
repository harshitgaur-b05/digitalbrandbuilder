import { MessageSquare, Hammer, Search, Users, RotateCw } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Tell us about your business",
      desc: "We learn about your business, target audience, competitors, products, services, and growth goals to identify the biggest digital opportunities.",
      icon: <MessageSquare className="text-primary w-6 h-6" />,
    },
    {
      num: "02",
      title: "Build your digital foundation",
      desc: "We create or improve your website, brand presence, analytics, tracking, and core digital assets to establish a strong foundation for growth.",
      icon: <Hammer className="text-primary w-6 h-6" />,
    },
    {
      num: "03",
      title: "Get discovered",
      desc: "We optimize your website for search engines, improve your local visibility, strengthen your Google Business Profile, and create content aligned with what your customers are searching for.",
      icon: <Search className="text-primary w-6 h-6" />,
    },
    {
      num: "04",
      title: "Turn attention into customers",
      desc: "We combine SEO, Google Ads, social media, content, and conversion-focused strategies to turn relevant traffic into enquiries, leads, and sales.",
      icon: <Users className="text-primary w-6 h-6" />,
    },
    {
      num: "05",
      title: "Keep improving",
      desc: "We monitor performance, analyze user behavior, measure conversions, and continuously optimize your digital strategy to improve visibility, engagement, and business results.",
      icon: <RotateCw className="text-primary w-6 h-6" />,
    },
  ];

  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="mb-20">
          <span className="text-xs font-semibold tracking-[0.15em] text-primary mb-3 uppercase block">
            THE PROCESS
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground max-w-xl">
            From idea to digital growth, without the complexity.
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start gap-6 md:gap-12 bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-[transform,box-shadow,border-color] duration-300 hover:shadow-md dark:shadow-[0_4px_20px_rgba(43,158,220,0.08)] motion-safe:hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-sans text-3xl font-light text-primary/70 group-hover:text-primary transition-colors duration-300">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
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
