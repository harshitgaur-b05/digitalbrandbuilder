import { Star, Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      company: "Elite Fitness Delhi",
      text: "Since partnering with Digital Brand Builder, our local search traffic has skyrocketed. We've seen a 40% increase in walk-ins and memberships within just three months.",
    },
    {
      name: "Priya Patel",
      company: "Patel & Co. Consultants",
      text: "They redesigned our outdated website and created a brand identity that actually reflects our expertise. The professional look has helped us close higher-ticket clients.",
    },
    {
      name: "Amit Desai",
      company: "Desai Auto Care",
      text: "I was skeptical about SEO, but the results speak for themselves. We are now ranking #1 for 'car repair near me' and our phones haven't stopped ringing.",
    },
  ];

  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-primary mb-4 uppercase inline-block bg-primary/10 px-3 py-1.5 rounded-full">TESTIMONIALS</span>
          <h2 className="font-sans text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight text-foreground max-w-2xl mx-auto">
            Don't just take our word for it.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col gap-6 relative group hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-current" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed text-sm italic">"{t.text}"</p>
              <div className="mt-auto pt-6 border-t border-border">
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </div>
              <Quote className="absolute top-8 right-8 text-primary/10 w-12 h-12 rotate-180 -z-0 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
