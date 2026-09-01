"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function FreeAuditForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    websiteUrl: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  if (status === "success") {
    return (
      <div className="bg-card border border-primary/20 rounded-2xl p-12 text-center shadow-sm h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="text-green-500 w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
          Request Received!
        </h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          We&apos;ll review your details and prepare your custom digital audit. You can
          expect to hear from us within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-foreground/5 rounded-2xl p-8 md:p-10 shadow-xs flex flex-col gap-6"
    >
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs font-semibold text-foreground uppercase tracking-wider"
          >
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-foreground uppercase tracking-wider"
          >
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@yourbusiness.com"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-xs font-semibold text-foreground uppercase tracking-wider"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="websiteUrl"
            className="text-xs font-semibold text-foreground uppercase tracking-wider"
          >
            Website URL *
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            required
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          What are your main goals/challenges? *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
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
        {status !== "submitting" && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
    </form>
  );
}
