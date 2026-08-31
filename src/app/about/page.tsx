import type { Metadata } from "next";
import { ArrowRight, Target, Heart, Lightbulb } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us | digitalbrandbuilder",
  description: "We are a digital growth partner for Indian local businesses and D2C brands — turning offline businesses into digital market leaders.",
  alternates: { canonical: "https://digitalbrandbuilder.in/about" },
};

const values = [
  {
    icon: <Target className="text-primary w-7 h-7" />,
    title: "Results Over Noise",
    desc: "Every strategy we build is grounded in measurable outcomes — not impressions, followers, or vanity metrics.",
  },
  {
    icon: <Heart className="text-primary w-7 h-7" />,
    title: "Honest Partnership",
    desc: "We tell you what actually works for your business, not what earns us a bigger retainer.",
  },
  {
    icon: <Lightbulb className="text-primary w-7 h-7" />,
    title: "Premium at Every Layer",
    desc: "From your website code to your content calendar — everything we build is designed to feel expensive and perform powerfully.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative pt-36 pb-24 overflow-hidden bg-background">
          <div className="absolute pointer-events-none top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-muted opacity-40 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.18em] text-primary mb-4 uppercase block">WHO WE ARE</span>
              <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-foreground mb-6">
                We build digital brands. Not just websites.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                digitalbrandbuilder is a growth partner for Indian local businesses and D2C brands that are ready to take their online presence seriously. We combine brand strategy, premium design, and performance marketing into one unified system.
              </p>
            </div>
            <div className="bg-card border border-foreground/5 rounded-3xl p-10 shadow-lg">
              <p className="text-2xl md:text-3xl font-medium text-foreground leading-snug tracking-tight">
                &ldquo;We don&apos;t just put your business online. We turn it into a digital brand that gets found, trusted and chosen.&rdquo;
              </p>
              <div className="mt-8 pt-8 border-t border-foreground/5">
                <p className="font-bold text-foreground">The digitalbrandbuilder Team</p>
                <p className="text-sm text-muted-foreground mt-0.5">New Delhi, India</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted border-y border-primary/20/15">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-16">
              <span className="text-xs font-semibold tracking-[0.15em] text-primary mb-3 uppercase block">OUR VALUES</span>
              <h2 className="font-sans text-4xl md:text-5xl font-medium tracking-tight text-foreground">What drives our work.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div key={i} className="bg-card border border-foreground/5 rounded-2xl p-8 shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-primary/20/10 flex items-center justify-center mb-6">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
            <h2 className="font-sans text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-5">
              Let&apos;s build something great together.
            </h2>
            <a href="/contact" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-base font-medium hover:bg-primary transition-all duration-300 group">
              Get In Touch
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

