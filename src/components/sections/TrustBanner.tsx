export default function TrustBanner() {
  const industries = [
    "Fashion & D2C",
    "Beauty & Wellness",
    "Furniture & Decor",
    "Manufacturing & B2B",
    "Events & Hospitality",
    "Ecommerce",
    "Local Services",
  ];

  return (
    <section className="bg-muted border-y border-border py-5 md:py-6 overflow-hidden relative z-20 transition-colors duration-500" id="industries">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
        <span className="text-xs sm:text-sm font-bold text-primary shrink-0 uppercase tracking-wider text-center lg:text-left">
          Built for Indian local businesses &amp; D2C brands ready to grow online.
        </span>

        {/* Mobile Horizontal Scrolling Pills */}
        <div className="w-full lg:w-auto overflow-x-auto flex items-center gap-2.5 pb-1 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {industries.map((industry, index) => (
            <span
              key={index}
              className="text-xs font-semibold text-foreground bg-card border border-border/80 px-3.5 py-2 rounded-full whitespace-nowrap shrink-0 shadow-2xs flex items-center min-h-[44px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2" />
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
