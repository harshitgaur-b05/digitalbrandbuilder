"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const services = [
  "Website Design & Development",
  "SEO & Local Search",
  "Performance Marketing",
  "Social Media Management",
  "Ecommerce Store",
  "Brand Identity",
  "Full Digital Growth Package",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to backend / form service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden bg-background">
          <div className="absolute pointer-events-none top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-muted opacity-40 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <span className="text-xs font-semibold tracking-[0.18em] text-primary mb-4 uppercase block">GET IN TOUCH</span>
            <h1 className="font-sans text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl">
              Let&apos;s start building your digital brand.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Tell us about your business and what you need — we&apos;ll come back to you within one business day with a clear plan.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left: Info */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-card border border-foreground/5 rounded-2xl p-8 shadow-xs">
                <h3 className="text-lg font-bold text-foreground mb-6 tracking-tight">Contact Information</h3>
                <div className="flex flex-col gap-5 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/20/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Email</p>
                      <a href="mailto:hello@digitalbrandbuilder.in" className="hover:text-foreground transition-colors">
                        hello@digitalbrandbuilder.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/20/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Phone</p>
                      <a href="tel:+919876543210" className="hover:text-foreground transition-colors">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/20/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Location</p>
                      <p>New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted border border-primary/20/15 rounded-2xl p-8">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Response Time</p>
                <p className="text-foreground font-bold text-xl mb-1">Within 24 hours</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We review every enquiry personally and respond with a tailored assessment — not a generic pitch.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="bg-card border border-primary/20/20 rounded-2xl p-12 text-center shadow-sm h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20/10 flex items-center justify-center mb-6">
                    <Send className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Message received.</h3>
                  <p className="text-muted-foreground max-w-sm leading-relaxed">
                    We&apos;ll review your details and get back to you within one business day with a clear next step.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-foreground/5 rounded-2xl p-8 md:p-10 shadow-xs flex flex-col gap-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-semibold text-foreground uppercase tracking-wider">Your Name *</label>
                      <input
                        id="name" name="name" type="text" required
                        value={formData.name} onChange={handleChange}
                        placeholder="Harshit Gaur"
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold text-foreground uppercase tracking-wider">Email Address *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        placeholder="hello@yourbrand.com"
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-semibold text-foreground uppercase tracking-wider">Phone Number</label>
                      <input
                        id="phone" name="phone" type="tel"
                        value={formData.phone} onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="business" className="text-xs font-semibold text-foreground uppercase tracking-wider">Business Name *</label>
                      <input
                        id="business" name="business" type="text" required
                        value={formData.business} onChange={handleChange}
                        placeholder="Your Brand Name"
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="text-xs font-semibold text-foreground uppercase tracking-wider">Service You Need *</label>
                    <select
                      id="service" name="service" required
                      value={formData.service} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-semibold text-foreground uppercase tracking-wider">Tell Us About Your Business *</label>
                    <textarea
                      id="message" name="message" rows={5} required
                      value={formData.message} onChange={handleChange}
                      placeholder="What does your business do, who are your customers, and what's your biggest digital challenge right now?"
                      className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary hover:-translate-y-px transition-all duration-300 group w-full md:w-auto self-start"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                </form>
              )}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

