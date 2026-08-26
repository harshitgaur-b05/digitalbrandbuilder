import { Laptop, Search, Megaphone, Share2, ShoppingCart, Award } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";

// ─── Card Backgrounds ──────────────────────────────────────────────────────
function WebsiteBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/80 to-transparent flex items-start justify-end p-6 overflow-hidden">
      <div className="flex flex-col gap-2 opacity-40">
        {[140, 200, 160, 220, 180].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-sage-deep" style={{ width: w }} />
        ))}
      </div>
      <div className="absolute bottom-12 right-8 w-24 h-16 rounded-lg border border-sage-soft/25 bg-white/50 shadow-sm" />
      <div className="absolute bottom-20 right-16 w-16 h-10 rounded-md border border-sage-soft/20 bg-white/40 shadow-sm" />
    </div>
  );
}

function SeoBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-sage-soft/10 to-transparent flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center w-32 h-32">
        {[0.15, 0.25, 0.35].map((op, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-sage-deep"
            style={{
              width: 60 + i * 36,
              height: 60 + i * 36,
              opacity: op,
            }}
          />
        ))}
        <Search size={22} className="text-sage-deep z-10 opacity-60" />
      </div>
    </div>
  );
}

function MarketingBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/60 to-transparent overflow-hidden">
      <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-35">
        {[
          { w: 80, h: 8 },
          { w: 120, h: 8 },
          { w: 60, h: 8 },
          { w: 100, h: 8 },
        ].map((bar, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-sage-soft/40 shrink-0" />
            <div className="h-2 rounded-full bg-sage-deep/50" style={{ width: bar.w }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-sage-soft/8 to-transparent overflow-hidden">
      <div className="absolute top-5 right-5 grid grid-cols-3 gap-2 opacity-30">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-sage-deep"
            style={{
              width: 28 + (i % 3) * 6,
              height: 28 + (i % 2) * 10,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function EcomBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/70 to-transparent overflow-hidden">
      <div className="absolute top-5 right-6 flex gap-3 opacity-35">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-1.5 items-center">
            <div className="w-14 h-16 rounded-lg border border-sage-soft/40 bg-white/50" />
            <div className="w-10 h-1.5 rounded-full bg-sage-deep/40" />
            <div className="w-8 h-1.5 rounded-full bg-sage-soft/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-sage-soft/10 to-transparent overflow-hidden">
      <div className="absolute top-6 right-6 opacity-30 flex flex-col gap-2">
        <div className="flex gap-2">
          {["#7E8E71", "#A0AD91", "#E8E5DD", "#20211D"].map((c, i) => (
            <div key={i} className="w-7 h-7 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="w-28 h-3 rounded-full bg-sage-deep/40" />
          <div className="w-20 h-2 rounded-full bg-sage-soft/40" />
          <div className="w-24 h-2 rounded-full bg-sage-soft/25" />
        </div>
      </div>
    </div>
  );
}

// ─── Features / Services Data ──────────────────────────────────────────────
const features = [
  {
    Icon: Laptop,
    name: "Websites",
    description:
      "Speed-optimized, high-converting digital storefronts. Fully customized design, polished transitions, and flawless mobile experience.",
    href: "/services#websites",
    cta: "Learn more",
    background: <WebsiteBg />,
    className: "lg:col-span-2",
  },
  {
    Icon: Search,
    name: "SEO",
    description:
      "Local mapping and keyword authority that puts you where local buyers look — optimized citations, keywords, and code structure.",
    href: "/services#seo",
    cta: "Learn more",
    background: <SeoBg />,
    className: "lg:col-span-1",
  },
  {
    Icon: Megaphone,
    name: "Performance Marketing",
    description:
      "Paid search and social campaigns that target buying intent, not vanity stats. Maximize acquisition with high-converting funnels.",
    href: "/services#marketing",
    cta: "Learn more",
    background: <MarketingBg />,
    className: "lg:col-span-1",
  },
  {
    Icon: Share2,
    name: "Social Media",
    description:
      "An organic content engine that elevates your brand character — design templates, editorial copy, and video to grow your community.",
    href: "/services#social",
    cta: "Learn more",
    background: <SocialBg />,
    className: "lg:col-span-2",
  },
  {
    Icon: ShoppingCart,
    name: "Ecommerce",
    description:
      "Sophisticated Shopify or custom storefronts built to remove friction — product filtering, cart optimization, and checkout tuning.",
    href: "/services#ecommerce",
    cta: "Learn more",
    background: <EcomBg />,
    className: "lg:col-span-2",
  },
  {
    Icon: Award,
    name: "Brand Presence",
    description:
      "Complete visual frameworks — logos, color palettes, and typographic guides that make your offline legacy look expensive online.",
    href: "/services#brand",
    cta: "Learn more",
    background: <BrandBg />,
    className: "lg:col-span-1",
  },
];

// ─── Section ───────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section className="bg-brand-bg py-24 md:py-32 relative overflow-hidden" id="solutions">
      <div className="absolute pointer-events-none z-0 opacity-25 bottom-[-5%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_70%_30%/_50%_30%_70%_50%] bg-brand-secondary blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <span className="text-xs font-semibold tracking-[0.15em] text-sage-deep mb-3 uppercase block">
            OUR PLATFORM
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-brand-text mb-4">
            Everything your business needs to grow online.
          </h2>
          <p className="text-base md:text-lg text-brand-muted max-w-xl mx-auto leading-relaxed">
            One integrated growth engine — no juggling multiple agencies.
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
