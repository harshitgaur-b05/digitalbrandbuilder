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
    <section className="bg-brand-secondary border-y border-sage-soft/15 py-6 overflow-hidden relative z-20" id="industries">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        <span className="text-sm font-semibold text-sage-deep shrink-0 uppercase tracking-wider">
          Built for businesses that are ready to grow.
        </span>
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-6 gap-y-3">
          {industries.map((industry, index) => (
            <span key={index} className="text-sm font-bold text-brand-text flex items-center whitespace-nowrap">
              {industry}
              {index < industries.length - 1 && (
                <span className="ml-6 text-sage-soft font-extrabold" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
