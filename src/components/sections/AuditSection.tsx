"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, TrendingUp, Search, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuditSection() {
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
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="free-audit">
      <div className="absolute pointer-events-none z-0 opacity-40 top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-[45%_55%_35%_65%/_55%_45%_65%_35%] bg-primary/10 blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left: Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase inline-block w-fit bg-primary/10 px-3 py-1.5 rounded-full">
            FREE DIGITAL AUDIT
          </span>
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-foreground">
            Stop guessing. Start <span className="text-primary italic font-normal">growing.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-2">
            Get a comprehensive, no-obligation review of your website, SEO, and digital presence. Find out exactly what's holding you back and what you need to scale.
          </p>

          <div className="flex flex-col gap-5 mt-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                <Search className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">SEO & Discoverability</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">We analyze your search rankings and local map visibility.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                <Zap className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">Website Performance</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">We find the friction points in speed, mobile UX, and conversions.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                <TrendingUp className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">Actionable Growth Plan</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">You'll walk away with a clear, prioritized list of steps to improve.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7">
          {status === "success" ? (
            <div className="bg-card border border-border rounded-3xl p-10 md:p-14 text-center shadow-lg h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="text-green-500 w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight">Request Received!</h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                We'll review your details and prepare your custom digital audit. You can expect to hear from us within 1-2 business days.
              </p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-foreground mb-6">Request your free audit</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[11px] font-bold text-foreground uppercase tracking-wider">Your Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      value={formData.name} onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[11px] font-bold text-foreground uppercase tracking-wider">Email Address *</label>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="john@yourbusiness.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-[11px] font-bold text-foreground uppercase tracking-wider">Phone Number</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="websiteUrl" className="text-[11px] font-bold text-foreground uppercase tracking-wider">Website URL *</label>
                    <input
                      id="websiteUrl" name="websiteUrl" type="url" required
                      value={formData.websiteUrl} onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[11px] font-bold text-foreground uppercase tracking-wider">What are your main goals/challenges? *</label>
                  <textarea
                    id="message" name="message" rows={3} required
                    value={formData.message} onChange={handleChange}
                    placeholder="E.g., We need more local leads, our current website is too slow, or we want to start selling online."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm font-semibold shadow-sm hover:bg-primary motion-safe:hover:-translate-y-px transition-[transform,background-color] duration-300 group w-full sm:w-auto self-start disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Submitting..." : "Get My Free Audit"}
                  {status !== "submitting" && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
