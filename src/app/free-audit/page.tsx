"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, TrendingUp, Search, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function FreeAuditPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    websiteUrl: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: "Free Audit",
          message: `Website: ${formData.websiteUrl}\n\nGoals/Challenges: ${formData.message}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        throw new Error(data.error || "Failed to submit request.");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Navbar />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative pt-36 pb-20 overflow-hidden bg-background">
          <div className="absolute pointer-events-none top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40%_60%_30%_70%/_60%_30%_70%_40%] bg-primary/10 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-xs font-semibold tracking-[0.18em] text-primary mb-4 uppercase inline-block bg-primary/10 px-3 py-1.5 rounded-full">FREE DIGITAL AUDIT</span>
            <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-6 max-w-4xl">
              Stop guessing. Start <span className="text-primary italic">growing.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Get a comprehensive, no-obligation review of your website, SEO, and digital presence. Find out exactly what's holding you back and what you need to scale.
            </p>
          </div>
        </section>

        {/* Content & Form Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: What's included */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-card border border-foreground/5 rounded-2xl p-8 shadow-xs h-full">
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">What's included in the audit?</h3>
                <p className="text-sm text-muted-foreground mb-8">
                  We don't do automated PDF reports. A real strategist reviews your digital footprint.
                </p>
                
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Search className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">SEO & Discoverability</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Are your ideal customers finding you? We analyze your search rankings and local map visibility.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Website Performance</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Speed, mobile responsiveness, and UX. We find the friction points that are costing you sales.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Actionable Growth Plan</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">You'll walk away with a clear, prioritized list of steps to improve your digital brand and drive revenue.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              {status === "success" ? (
                <div className="bg-card border border-primary/20 rounded-2xl p-12 text-center shadow-sm h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-green-500 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Request Received!</h3>
                  <p className="text-muted-foreground max-w-sm leading-relaxed">
                    We'll review your details and prepare your custom digital audit. You can expect to hear from us within 1-2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-foreground/5 rounded-2xl p-8 md:p-10 shadow-xs flex flex-col gap-6">
                  
                  {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-semibold text-foreground uppercase tracking-wider">Your Name *</label>
                      <input
                        id="name" name="name" type="text" required
                        value={formData.name} onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold text-foreground uppercase tracking-wider">Email Address *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        placeholder="john@yourbusiness.com"
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
                      <label htmlFor="websiteUrl" className="text-xs font-semibold text-foreground uppercase tracking-wider">Website URL *</label>
                      <input
                        id="websiteUrl" name="websiteUrl" type="url" required
                        value={formData.websiteUrl} onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-semibold text-foreground uppercase tracking-wider">What are your main goals/challenges? *</label>
                    <textarea
                      id="message" name="message" rows={4} required
                      value={formData.message} onChange={handleChange}
                      placeholder="E.g., We need more local leads, our current website is too slow, or we want to start selling online."
                      className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-bold hover:bg-primary/90 hover:-translate-y-px transition-all duration-300 group w-full md:w-auto self-start disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Submitting..." : "Get My Free Audit"}
                    {status !== "submitting" && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
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
