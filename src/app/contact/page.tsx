import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Strategy Call",
  description:
    "Contact Digital Brand Builder to discuss your website, SEO, digital marketing, or brand strategy needs. Based in New Delhi, serving businesses across India.",
  alternates: { canonical: "https://www.digitalbrandbuilder.in/contact" },
  openGraph: {
    title: "Contact Digital Brand Builder",
    description:
      "Get in touch with our team in New Delhi for website design, SEO, and digital marketing services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Digital Brand Builder",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Navbar />
      <main className="flex-grow">

        {/* Hero — server-rendered for SEO */}
        <section className="relative pt-36 pb-20 overflow-hidden bg-background">
          <div className="absolute pointer-events-none top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-muted opacity-40 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <span className="text-xs font-semibold tracking-[0.18em] text-primary mb-4 uppercase block">
              GET IN TOUCH
            </span>
            <h1 className="font-sans text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl">
              Let&apos;s start building your digital brand.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Tell us about your business and what you need — we&apos;ll come back to you
              within one business day with a clear plan.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left: Info — server-rendered */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-card border border-foreground/5 rounded-2xl p-8 shadow-xs">
                <h3 className="text-lg font-bold text-foreground mb-6 tracking-tight">
                  Contact Information
                </h3>
                <div className="flex flex-col gap-5 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Email</p>
                      <a
                        href="mailto:hello@digitalbrandbuilder.in"
                        className="hover:text-foreground transition-colors"
                      >
                        hello@digitalbrandbuilder.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Phone</p>
                      <a
                        href="tel:+918285321936"
                        className="hover:text-foreground transition-colors"
                      >
                        +91 82853 21936
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Location</p>
                      <p>New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted border border-primary/20 rounded-2xl p-8">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  Response Time
                </p>
                <p className="text-foreground font-bold text-xl mb-1">Within 24 hours</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We review every enquiry personally and respond with a tailored assessment
                  — not a generic pitch.
                </p>
              </div>
            </div>

            {/* Right: Client form component */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
