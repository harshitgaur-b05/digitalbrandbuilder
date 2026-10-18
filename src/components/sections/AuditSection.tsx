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
    <section className="bg-background py-24 md:py-32 relative overflow-hidden transition-colors duration-500" id="audit">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-5 w-96 h-96 bg-[var(--color-ember-orange)]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-5 w-80 h-80 bg-[var(--color-brass)]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left: Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted border border-border w-fit shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--color-ember-orange)] animate-pulse" />
            <span className="font-[family-name:var(--font-polysans)] text-[11px] md:text-[12px] tracking-wide uppercase font-semibold text-foreground/80">
              Free Digital Audit — Confidential Diagnostic
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-polysans)] text-[34px] sm:text-[44px] md:text-[54px] font-normal leading-[0.98] sm:leading-[0.94] tracking-[-1.5px] text-foreground">
            Stop guessing. <br />
            <span className="relative inline-block mt-2 pb-3 text-foreground">
              Start dominating.
              <span className="absolute bottom-0 left-0 right-0 h-[3.5px] rounded-full bg-[var(--color-ember-orange)]" />
            </span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-muted-foreground leading-relaxed mt-1">
            Receive an exhaustive, no-obligation growth report on your website performance, keyword rankings, conversion bottlenecks, and paid search potential.
          </p>

          <div className="flex flex-col gap-5 mt-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 text-[var(--color-ember-orange)]">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-polysans)] uppercase tracking-wide font-bold text-foreground text-sm">
                  Search &amp; Local Pack Visibility
                </h4>
                <p className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground leading-relaxed mt-1">
                  In-depth competitor keyword gap analysis and Google Business Profile audit.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 text-[var(--color-ember-orange)]">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-polysans)] uppercase tracking-wide font-bold text-foreground text-sm">
                  Speed &amp; Conversion Diagnostics
                </h4>
                <p className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground leading-relaxed mt-1">
                  Core Web Vitals, mobile UX friction points, and checkout leak detection.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 text-[var(--color-ember-orange)]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-polysans)] uppercase tracking-wide font-bold text-foreground text-sm">
                  Strategic Scale Roadmap
                </h4>
                <p className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground leading-relaxed mt-1">
                  A high-impact, prioritized 90-day execution playbook engineered for revenue.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7">
          {status === "success" ? (
            <div className="bg-card/95 backdrop-blur-md border border-border/80 rounded-[24px] p-10 md:p-14 text-center shadow-2xl h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-ember-orange)]/15 border border-[var(--color-ember-orange)]/30 flex items-center justify-center mb-6 text-[var(--color-ember-orange)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-[family-name:var(--font-polysans)] text-2xl md:text-3xl font-bold text-foreground mb-3 uppercase tracking-tight">
                Audit Request Registered!
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
                Our growth team is running diagnostics on your digital presence. Expect your comprehensive audit dossier within 24-48 business hours.
              </p>
            </div>
          ) : (
            <div className="bg-card/95 backdrop-blur-md border border-border/80 rounded-[24px] p-7 md:p-10 shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)] relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                <h3 className="font-[family-name:var(--font-polysans)] text-xl font-bold text-foreground uppercase tracking-wide">
                  Claim Free Brand Audit
                </h3>
                <span className="font-mono text-[10px] text-[var(--color-ember-orange)] bg-[var(--color-ember-orange)]/10 px-2 py-0.5 rounded font-bold uppercase">
                  100% Free · No Obligation
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm font-medium font-mono">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-[family-name:var(--font-polysans)] text-[11px] font-bold text-foreground uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={formData.name} onChange={handleChange}
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--color-ember-orange)] focus:ring-1 focus:ring-[var(--color-ember-orange)] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-[family-name:var(--font-polysans)] text-[11px] font-bold text-foreground uppercase tracking-wider">
                      Business Email *
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="rahul@company.com"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--color-ember-orange)] focus:ring-1 focus:ring-[var(--color-ember-orange)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-[family-name:var(--font-polysans)] text-[11px] font-bold text-foreground uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required
                      value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--color-ember-orange)] focus:ring-1 focus:ring-[var(--color-ember-orange)] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="websiteUrl" className="font-[family-name:var(--font-polysans)] text-[11px] font-bold text-foreground uppercase tracking-wider">
                      Website URL *
                    </label>
                    <input
                      id="websiteUrl" name="websiteUrl" type="url" required
                      value={formData.websiteUrl} onChange={handleChange}
                      placeholder="https://yourbrand.in"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--color-ember-orange)] focus:ring-1 focus:ring-[var(--color-ember-orange)] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-[family-name:var(--font-polysans)] text-[11px] font-bold text-foreground uppercase tracking-wider">
                    Primary Goal or Challenge *
                  </label>
                  <textarea
                    id="message" name="message" rows={3} required
                    value={formData.message} onChange={handleChange}
                    placeholder="e.g. We need higher local search rank in Delhi, or our website conversions dropped after redesign."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--color-ember-orange)] focus:ring-1 focus:ring-[var(--color-ember-orange)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-3 inline-flex items-center justify-center gap-3 font-[family-name:var(--font-polysans)] uppercase tracking-wider text-[13px] md:text-[14px] font-semibold bg-foreground text-background hover:bg-[var(--color-ember-orange)] hover:text-white px-8 py-3.5 rounded-md shadow-md active:scale-95 transition-all duration-200 w-full sm:w-auto self-start disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "submitting" ? "Compiling Audit Request..." : "Claim Free Brand Audit"}
                  {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
