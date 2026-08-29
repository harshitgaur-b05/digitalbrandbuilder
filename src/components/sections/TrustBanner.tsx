export default function TrustBanner() {
  const industries = [
    "Fashion",
    "Beauty",
    "Furniture",
    "Manufacturing",
    "Events",
    "Ecommerce",
    "Local Services",
  ];

  return (
    <section className="bg-muted border-y border-border py-6 overflow-hidden relative z-20 transition-colors duration-500" id="industries">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        <span className="text-sm font-semibold text-primary shrink-0 uppercase tracking-wider">
          Built for businesses ready to grow, compete, and build a stronger digital presence.
        </span>
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-4 gap-y-2">
          {industries.map((industry, index) => (
            <span key={index} className="text-xs sm:text-sm font-bold text-foreground flex items-center whitespace-nowrap">
              {industry}
              {index < industries.length - 1 && (
                <span className="ml-4 text-primary/70 font-extrabold" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
