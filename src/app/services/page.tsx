import type { Metadata } from "next";
import { Laptop, Search, Megaphone, Share2, ShoppingCart, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";

export const metadata: Metadata = {
  title: "Services | digitalbrandbuilder",
  description: "Explore our full suite of digital growth services — websites, SEO, performance marketing, social media, ecommerce, and brand presence for Indian businesses.",
};

function WebsiteBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#E8E5DD]/80 to-transparent flex items-start justify-end p-6 overflow-hidden">
      <div className="flex flex-col gap-2 opacity-40">
        {[140, 200, 160, 220, 180].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-[#7E8E71]" style={{ width: w }} />
        ))}
      </div>
    </div>
  );
}
function SeoBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#A0AD91]/10 to-transparent flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center w-32 h-32">
        {[0.12, 0.22, 0.32].map((op, i) => (
          <div key={i} className="absolute rounded-full border border-[#7E8E71]" style={{ width: 60 + i * 36, height: 60 + i * 36, opacity: op }} />
        ))}
        <Search size={22} className="text-[#7E8E71] z-10 opacity-60" />
      </div>
    </div>
  );
}
function MarketingBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#E8E5DD]/60 to-transparent overflow-hidden">
      <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-35">
        {[80, 120, 60, 100].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#A0AD91]/40 shrink-0" />
            <div className="h-2 rounded-full bg-[#7E8E71]/50" style={{ width: w }} />
          </div>
        ))}
      </div>
    </div>
  );
}
function SocialBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#A0AD91]/8 to-transparent overflow-hidden">
      <div className="absolute top-5 right-5 grid grid-cols-3 gap-2 opacity-30">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-[#7E8E71]" style={{ width: 28 + (i % 3) * 6, height: 28 + (i % 2) * 10 }} />
        ))}
      </div>
    </div>
  );
}
function EcomBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#E8E5DD]/70 to-transparent overflow-hidden">
      <div className="absolute top-5 right-6 flex gap-3 opacity-35">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-1.5 items-center">
            <div className="w-14 h-16 rounded-lg border border-[#A0AD91]/40 bg-white/50" />
            <div className="w-10 h-1.5 rounded-full bg-[#7E8E71]/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
function BrandBg() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#A0AD91]/10 to-transparent overflow-hidden">
      <div className="absolute top-6 right-6 opacity-30 flex flex-col gap-2">
        <div className="flex gap-2">
          {["#7E8E71", "#A0AD91", "#E8E5DD", "#20211D"].map((c, i) => (
            <div key={i} className="w-7 h-7 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const services = [
  { Icon: Laptop, name: "Websites", description: "Speed-optimized, high-converting digital storefronts with flawless mobile experience and polished transitions that lock in trust from the first visit.", href: "#websites", cta: "Learn more", background: <WebsiteBg />, className: "lg:col-span-2", id: "websites" },
  { Icon: Search, name: "SEO", description: "Local mapping and keyword authority that puts you where local buyers look. We optimize citations, keywords, and your full code structure.", href: "#seo", cta: "Learn more", background: <SeoBg />, className: "lg:col-span-1", id: "seo" },
  { Icon: Megaphone, name: "Performance Marketing", description: "Paid search and social campaigns targeting buying intent. Google Ads, Meta Ads, retargeting — maximizing acquisition through proven funnels.", href: "#marketing", cta: "Learn more", background: <MarketingBg />, className: "lg:col-span-1", id: "marketing" },
  { Icon: Share2, name: "Social Media", description: "An organic content engine elevating your brand character. Design templates, editorial copy, and reels to build a loyal community.", href: "#social", cta: "Learn more", background: <SocialBg />, className: "lg:col-span-2", id: "social" },
  { Icon: ShoppingCart, name: "Ecommerce", description: "Sophisticated Shopify or custom storefronts built to remove friction — advanced filtering, cart optimization, and checkout tuning.", href: "#ecommerce", cta: "Learn more", background: <EcomBg />, className: "lg:col-span-2", id: "ecommerce" },
  { Icon: Award, name: "Brand Presence", description: "Complete visual frameworks — logos, color palettes, and typographic guides so your offline legacy looks premium online.", href: "#brand", cta: "Learn more", background: <BrandBg />, className: "lg:col-span-1", id: "brand" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F1EB] text-[#20211D] antialiased">
      <Navbar />
      <main className="flex-grow">

        {/* Page Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden bg-[#F3F1EB]">
          <div className="absolute pointer-events-none top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-[#E8E5DD] opacity-40 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <span className="text-xs font-semibold tracking-[0.18em] text-[#7E8E71] mb-4 uppercase block">OUR SERVICES</span>
            <h1 className="font-sans text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-[#20211D] mb-6 max-w-4xl">
              Every tool your business needs to win online.
            </h1>
            <p className="text-lg md:text-xl text-[#5A5D55] max-w-2xl leading-relaxed">
              One integrated growth engine — websites, SEO, marketing, social, and brand — built and run for you.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <BentoGrid className="lg:grid-rows-3">
              {services.map((service) => (
                <BentoCard key={service.name} {...service} />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-[#E8E5DD] border-t border-[#A0AD91]/15">
          <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
            <h2 className="font-sans text-3xl md:text-5xl font-medium tracking-tight text-[#20211D] mb-5">
              Ready to grow your digital presence?
            </h2>
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#20211D] text-[#F3F1EB] px-8 py-4 rounded-full text-base font-medium hover:bg-[#7E8E71] transition-all duration-300 group">
              Build Your Digital Brand
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
