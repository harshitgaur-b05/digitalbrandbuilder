import { Laptop, Search, Megaphone, Share2, ShoppingCart, Award, Radio } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";

// ─── Card Backgrounds (High-Tech Telemetry matching Hero) ──────────────────────
function WebsiteBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ember-orange)]/10 via-transparent to-transparent flex items-start justify-end p-6 overflow-hidden">
      <div className="flex flex-col items-end gap-2.5 opacity-60">
        <div className="flex items-center gap-2 bg-muted/80 backdrop-blur-sm px-3 py-1 rounded-md border border-border text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-foreground font-semibold">100/100 Core Web Vitals</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/70 px-2.5 py-1 rounded border border-border/60 text-[9px] font-mono text-muted-foreground">
          <span>FCP: 0.4s</span>
          <span>·</span>
          <span>SSR Ready</span>
        </div>
        <div className="w-32 h-14 rounded-lg border border-[var(--color-ember-orange)]/30 bg-background/50 p-2 flex flex-col justify-between shadow-xs">
          <div className="w-12 h-1.5 rounded-full bg-[var(--color-ember-orange)]/70"></div>
          <div className="w-20 h-1 rounded-full bg-muted-foreground/30"></div>
          <div className="w-16 h-1 rounded-full bg-muted-foreground/20"></div>
        </div>
      </div>
    </div>
  );
}

function SeoBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ember-orange)]/10 to-transparent flex items-start justify-end overflow-hidden p-6">
      <div className="flex flex-col items-end gap-2 opacity-65">
        <div className="flex items-center gap-2 bg-muted/80 backdrop-blur-sm px-3 py-1 rounded-md border border-[var(--color-ember-orange)]/30 text-[10px] font-mono text-[var(--color-ember-orange)] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ember-orange)] animate-ping"></span>
          <span>SERP Rank #1</span>
        </div>
        <div className="text-[9px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/50">
          +320% Organic Clicks
        </div>
      </div>
    </div>
  );
}

function MarketingBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ember-orange)]/15 via-transparent to-transparent overflow-hidden p-6 flex items-start justify-end">
      <div className="flex flex-col items-end gap-1.5 opacity-65">
        <div className="bg-muted/80 backdrop-blur-sm px-3 py-1 rounded-md border border-border text-[11px] font-mono font-bold text-foreground flex items-center gap-1.5">
          <span className="text-[var(--color-ember-orange)]">4.8×</span>
          <span className="text-muted-foreground text-[10px]">ROAS</span>
        </div>
        <div className="flex items-end gap-1 h-8 pt-1">
          {[35, 55, 75, 95].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-t-xs bg-[var(--color-ember-orange)]/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ember-orange)]/10 to-transparent overflow-hidden p-6 flex items-start justify-end">
      <div className="flex flex-col items-end gap-2 opacity-60">
        <div className="flex items-center gap-1.5 bg-muted/80 px-2.5 py-1 rounded-md border border-border text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-foreground font-semibold">180K+ Impressions</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="w-7 h-7 rounded-md bg-muted border border-border/60 flex items-center justify-center text-[8px] font-mono text-[var(--color-ember-orange)] font-bold">
              #{i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EcomBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ember-orange)]/10 to-transparent overflow-hidden p-6 flex items-start justify-end">
      <div className="flex flex-col items-end gap-2 opacity-60">
        <div className="bg-muted/80 backdrop-blur-sm px-3 py-1 rounded-md border border-border text-[10px] font-mono text-foreground font-bold">
          3.7% CVR · ₹12.4L GMV
        </div>
        <div className="w-28 h-6 flex items-end gap-1">
          {[20, 35, 50, 45, 65, 80, 95].map((val, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-xs bg-[var(--color-ember-orange)]/50"
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ember-orange)]/10 to-transparent overflow-hidden p-6 flex items-start justify-end">
      <div className="flex flex-col items-end gap-2 opacity-65">
        <div className="flex items-center gap-1.5 bg-muted/80 px-2.5 py-1 rounded-md border border-border text-[10px] font-mono">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-ember-orange)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-brass)]" />
          <span className="text-foreground font-mono font-semibold ml-1">Identity DNA</span>
        </div>
        <span className="text-[9px] font-mono text-muted-foreground uppercase">Space Grotesk + Inter</span>
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
      "Ultra-fast, responsive, and conversion-focused web applications built with Next.js. Engineered for zero friction, sub-second load times, and maximum client acquisition.",
    href: "/services/websites",
    cta: "Explore Architecture",
    background: <WebsiteBg />,
    className: "lg:col-span-2",
  },
  {
    Icon: Search,
    name: "SEO & Discovery",
    description:
      "Dominate high-intent search with programmatic on-page optimization, Google Business Profile scaling, and local search supremacy.",
    href: "/services/seo",
    cta: "Rank #1",
    background: <SeoBg />,
    className: "lg:col-span-1",
  },
  {
    Icon: Megaphone,
    name: "Performance Marketing",
    description:
      "Scale revenue with precision Google Ads, Meta campaigns, high-converting landing funnels, and data-backed ROAS compounding.",
    href: "/services/marketing",
    cta: "Scale Campaigns",
    background: <MarketingBg />,
    className: "lg:col-span-1",
  },
  {
    Icon: Share2,
    name: "Social Media",
    description:
      "Build brand gravity and community with viral content pipelines, motion creative, strategic positioning, and consistent high-trust publishing.",
    href: "/services/social-media",
    cta: "Build Presence",
    background: <SocialBg />,
    className: "lg:col-span-2",
  },
  {
    Icon: ShoppingCart,
    name: "Ecommerce",
    description:
      "Convert visitors into repeat customers with optimized Shopify architectures, frictionless 1-click checkouts, and custom D2C stores.",
    href: "/services#ecommerce",
    cta: "Boost Conversions",
    background: <EcomBg />,
    className: "lg:col-span-2",
  },
  {
    Icon: Award,
    name: "Brand Presence",
    description:
      "Command authority with distinctive visual identities, curated design tokens, logos, typography systems, and cohesive multi-channel guidelines.",
    href: "/services/brand-presence",
    cta: "Craft Identity",
    background: <BrandBg />,
    className: "lg:col-span-1",
  },
];

// ─── Section ───────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="solutions">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-[var(--color-ember-orange)]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-[var(--color-brass)]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border mb-6">
            <Radio size={14} className="text-[var(--color-ember-orange)] animate-pulse" />
            <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
              Our Platform — Full-Stack Growth Capabilities
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-polysans)] text-[34px] sm:text-[44px] md:text-[54px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground mb-4 uppercase">
            Everything Your Business <br className="hidden sm:block" />
            <span className="relative inline-block mt-2 text-foreground">
              Needs To Dominate &amp; Scale
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[var(--color-ember-orange)] opacity-80" />
            </span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            One integrated digital marketing stack designed to eliminate agency silos, strengthen your brand authority, and turn traffic into compound revenue.
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
