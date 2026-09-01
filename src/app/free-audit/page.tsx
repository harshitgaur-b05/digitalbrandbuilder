import type { Metadata } from "next";
import { Search, Zap, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FreeAuditForm from "./FreeAuditForm";

export const metadata: Metadata = {
  title: "Free Digital Marketing Audit for Your Business",
  description:
    "Get a free, no-obligation review of your website, SEO, and digital presence from Digital Brand Builder. Find out exactly what's holding your growth back.",
  alternates: { canonical: "https://www.digitalbrandbuilder.in/free-audit" },
  openGraph: {
    title: "Free Digital Marketing Audit | Digital Brand Builder",
    description:
      "Find out exactly what's holding your business back online. Free website, SEO, and digital strategy review — no obligation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Digital Audit — Digital Brand Builder",
      },
    ],
  },
};

export default function FreeAuditPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Navbar />
      <main className="flex-grow">

        {/* Hero Section — server-rendered for SEO */}
        <section className="relative pt-36 pb-20 overflow-hidden bg-background">
          <div className="absolute pointer-events-none top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-primary/10 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-xs font-semibold tracking-[0.18em] text-primary mb-4 uppercase inline-block bg-primary/10 px-3 py-1.5 rounded-full">
              FREE DIGITAL AUDIT
            </span>
            <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-6 max-w-4xl">
              Stop guessing. Start{" "}
              <span className="text-primary italic">growing.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Get a comprehensive, no-obligation review of your website, SEO, and digital
              presence. Find out exactly what&apos;s holding you back and what you need to
              scale.
            </p>
          </div>
        </section>

        {/* Content & Form Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left: What's included — server-rendered */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-card border border-foreground/5 rounded-2xl p-8 shadow-xs h-full">
                <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                  What&apos;s included in the audit?
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  We don&apos;t do automated PDF reports. A real strategist reviews your
                  digital footprint.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Search className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        SEO &amp; Discoverability
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Are your ideal customers finding you? We analyze your search
                        rankings and local map visibility.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Website Performance
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Speed, mobile responsiveness, and UX. We find the friction points
                        that are costing you sales.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Actionable Growth Plan
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        You&apos;ll walk away with a clear, prioritized list of steps to
                        improve your digital brand and drive revenue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Client form */}
            <div className="lg:col-span-7">
              <FreeAuditForm />
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
