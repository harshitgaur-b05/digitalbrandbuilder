"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  User,
  Mail,
  Phone,
  Globe,
  ChevronDown,
  Shield,
  MessageSquare,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ServiceHero {
  /** Short service name — becomes the giant h1 */
  name: string;
  /** One-line value prop displayed under the name */
  tagline: string;
  /** Longer descriptive paragraph */
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export interface ServicePoint {
  title: string;
  desc: string;
}

export interface ServiceOffering {
  title: string;
  desc: string;
}

export interface ServiceProcess {
  title: string;
  desc: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePageData {
  hero: ServiceHero;
  /** What is this service? */
  whatIs: { heading: string; primary: string; secondary: string };
  /** Why does it matter — zig-zag numbered list */
  why: { heading: string; intro: string; points: ServicePoint[] };
  /** What we do — 2-col card grid */
  offerings: { heading: string; items: ServiceOffering[] };
  /** Step-by-step process */
  process: { heading: string; steps: ServiceProcess[] };
  /** List of deliverables */
  deliverables: string[];
  /** Why choose us */
  whyUs: { heading: string; items: ServicePoint[] };
  /** Cost of inaction */
  costOfInaction: { heading: string; items: { title: string; desc: string }[] };
  /** FAQ */
  faq: { heading: string; items: ServiceFaq[] };
  /** Lead form context text */
  leadForm: { heading: string; subtitle: string; highlights: ServicePoint[]; ctaLabel: string };
  /** WhatsApp message */
  whatsappMessage: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  data: ServicePageData;
}

export default function ServicePageShell({ data }: Props) {
  const {
    hero,
    whatIs,
    why,
    offerings,
    process,
    deliverables,
    whyUs,
    costOfInaction,
    faq,
    leadForm,
    whatsappMessage,
  } = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    challenge: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
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
          service: hero.name,
          message: `Website URL: ${formData.website}\n\nChallenge: ${formData.challenge}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
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
    <div className="selection:bg-brand-accent selection:text-background overflow-x-hidden antialiased relative min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      {/* Fixed ambient orbs */}
      <div className="fixed inset-0 z-[-10] opacity-25 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-accent/20 blur-[120px] animate-pulse"
          style={{ animationDuration: "9s" }}
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-surface-container-high blur-[120px]" />
      </div>

      <main className="flex-grow">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Back button */}
          <div className="absolute top-28 left-6 md:left-12">
            <Link
              href="/services"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
              title="Back to Services"
            >
              <ArrowRight className="rotate-180 w-4 h-4" />
            </Link>
          </div>

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-xl bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-6 shadow-sm"
            aria-hidden="true"
          >
            Service
          </motion.span>

          {/* Giant service name as h1 — tagline included for SEO context */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-on-surface mb-6 max-w-4xl leading-[0.95]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {hero.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-lg sm:text-xl font-medium text-on-surface-variant max-w-2xl leading-relaxed mb-3"
          >
            {hero.tagline}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-body text-base text-on-surface-variant/70 max-w-2xl leading-relaxed mb-10"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-brand-bg bg-brand-accent px-8 py-4 rounded-full text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgba(126,142,113,0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {hero.primaryCta.text}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-on-surface bg-surface-container-low border border-outline-variant px-8 py-4 rounded-full text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-container-high hover:shadow-sm active:scale-[0.98]"
            >
              {hero.secondaryCta.text}
            </a>
          </motion.div>
        </section>

        {/* ── What Is ──────────────────────────────────────────────── */}
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-accent/5 p-8 sm:p-12 rounded-3xl border border-brand-accent/20 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
                {whatIs.heading}
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="font-display text-lg sm:text-xl font-bold leading-relaxed text-on-surface">
                {whatIs.primary}
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                {whatIs.secondary}
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── Why It Matters — zig-zag ─────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-6"
            >
              {why.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed"
            >
              {why.intro}
            </motion.p>
          </div>

          <div className="space-y-6">
            {why.points.map((point, idx) => {
              const isRight = idx % 2 !== 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isRight ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex flex-col sm:flex-row gap-6 items-start bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
                    isRight ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center font-display font-extrabold text-brand-accent text-base">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-base sm:text-lg font-bold text-on-surface mb-2">
                      {point.title}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── What We Do (Offerings) ───────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant p-8 sm:p-12 shadow-sm">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                {offerings.heading}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {offerings.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-background p-6 sm:p-8 rounded-2xl border border-outline-variant shadow-xs flex items-start gap-4 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 mt-1">
                    <Sparkles size={16} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-on-surface mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────── */}
        <section id="approach" className="py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
              {process.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {process.steps.map((step, idx) => {
              const isHighlight = idx === 0 || idx === process.steps.length - 1;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant shadow-sm hover:bg-surface-container-high hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm mb-6 ${
                      isHighlight
                        ? "bg-brand-accent text-brand-bg shadow-sm"
                        : "bg-background border border-outline-variant text-on-surface"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="font-display text-base font-bold text-on-surface mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Deliverables ─────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant p-8 sm:p-12 shadow-sm">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-xl bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-xs">
                What you get
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Complete deliverables
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {deliverables.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-background p-4 rounded-xl border border-outline-variant flex items-center gap-3 shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold text-on-surface">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Guarantee strip */}
            <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-on-surface mb-1">
                    Continuous growth focus
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant max-w-xl">
                    Every engagement includes transparent reporting, strategic recommendations, and continuous optimization built around your actual business goals.
                  </p>
                </div>
              </div>
              <a
                href="#lead-form"
                className="w-full md:w-auto inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-brand-bg bg-brand-accent px-6 py-3 rounded-full text-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap active:scale-[0.98]"
              >
                Get started
              </a>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                {whyUs.heading}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyUs.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-background p-6 rounded-2xl border border-outline-variant flex flex-col h-full shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <h3 className="font-display text-base font-bold text-on-surface">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cost of Inaction ─────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant p-8 sm:p-12 shadow-sm text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-16">
              {costOfInaction.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {costOfInaction.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-background p-8 rounded-2xl border border-outline-variant shadow-xs flex flex-col items-center hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-accent/5 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6">
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="font-display text-base font-bold text-on-surface mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead Capture Form ────────────────────────────────────── */}
        <section id="lead-form" className="py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-xl bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                  Partner with us
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
                  {leadForm.heading}
                </h2>
              </div>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                {leadForm.subtitle}
              </p>
              <div className="space-y-4">
                {leadForm.highlights.map((item, idx) => (
                  <div key={idx} className="bg-background p-5 rounded-2xl border border-outline-variant flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-on-surface mb-1">{item.title}</h4>
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-6 w-full">
              <div className="bg-background rounded-2xl shadow-xl border border-outline-variant p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      {status === "error" && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-2xl text-xs font-semibold">
                          {errorMessage}
                        </div>
                      )}

                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          Full name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Rahul Sharma"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-surface-container-low/50 border border-outline-variant rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          Business email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="rahul@yourbrand.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-surface-container-low/50 border border-outline-variant rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          Phone number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-surface-container-low/50 border border-outline-variant rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>
                      </div>

                      {/* Website */}
                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          Website URL
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                          <input
                            type="url"
                            name="website"
                            placeholder="https://yourbrand.com"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full bg-surface-container-low/50 border border-outline-variant rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>
                      </div>

                      {/* Challenge */}
                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          What&apos;s your biggest challenge?
                        </label>
                        <textarea
                          name="challenge"
                          rows={3}
                          placeholder="Tell us what you're struggling with..."
                          value={formData.challenge}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low/50 border border-outline-variant rounded-2xl p-4 text-sm focus:outline-none focus:border-brand-accent transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-brand-bg bg-brand-accent py-4 rounded-full text-xs sm:text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? "Sending Request..." : leadForm.ctaLabel}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10 flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6">
                        <Check size={28} strokeWidth={2.5} />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-on-surface mb-3">
                        Message received
                      </h3>
                      <p className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed mb-6">
                        Thank you, <span className="font-semibold text-on-surface">{formData.name}</span>. We&apos;ve got your request. Our team will reach out within one business day.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", email: "", phone: "", website: "", challenge: "" });
                        }}
                        className="text-xs font-bold text-brand-accent hover:underline uppercase tracking-wider"
                      >
                        Submit another inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
              {faq.heading}
            </h2>
          </div>
          <div className="space-y-3">
            {faq.items.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-surface-container-low rounded-2xl border transition-all duration-300 ${
                    isOpen ? "border-brand-accent shadow-sm" : "border-outline-variant"
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-2xl"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-on-surface pr-4">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-brand-accent text-brand-bg border-brand-accent"
                          : "border-outline-variant text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 border-t border-outline-variant/30 mt-1">
                          <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-4">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      {/* WhatsApp float */}
      <a
        href={`https://wa.me/919211074113?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2"
        title="Chat with us on WhatsApp"
      >
        <MessageSquare size={20} className="fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-wider group-hover:max-w-[120px] transition-all duration-500 ease-in-out pl-0 group-hover:pl-1">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
