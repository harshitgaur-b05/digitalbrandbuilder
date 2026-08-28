"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
  Settings, 
  Search, 
  LayoutTemplate, 
  PenTool, 
  Link as LinkIcon, 
  MapPin, 
  TrendingDown, 
  Clock, 
  AlertTriangle,
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
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Icon mapping helper
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Settings,
  Search,
  LayoutTemplate,
  PenTool,
  Link: LinkIcon,
  MapPin,
  TrendingDown,
  Clock,
  AlertTriangle
};

interface SeoServiceClientProps {
  initialData: any;
}

export default function SeoServiceClient({ initialData }: SeoServiceClientProps) {
  const {
    heroSection,
    whatIsSection,
    whyMattersSection,
    servicesSection,
    approachSection,
    processSection,
    resultsSection,
    whyUsSection,
    costOfInactionSection,
    faqSection
  } = initialData;

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    challenge: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  if (!initialData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-surface">
        <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
        <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-background rounded-full text-sm font-bold uppercase tracking-wider">
          <ArrowRight className="rotate-180" size={16} /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="selection:bg-brand-accent selection:text-background overflow-x-hidden antialiased relative min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      {/* Section 0 — Background Orbs (Fixed) */}
      <div className="fixed inset-0 z-[-10] opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-accent/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-surface-container-high blur-[120px]" />
      </div>

      <main className="flex-grow">
        {/* Section 1 — Hero */}
        {heroSection && (
          <section className="relative pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
            {/* Back Button */}
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
              className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-6 shadow-sm"
            >
              {heroSection.tag}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-8 max-w-5xl leading-tight"
            >
              {heroSection.heading.split(" ").slice(0, -3).join(" ")}{" "}
              <span className="text-brand-accent">
                {heroSection.heading.split(" ").slice(-3).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-lg sm:text-xl text-on-surface-variant max-w-3xl leading-relaxed mb-10"
            >
              {heroSection.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={heroSection.primaryCta.href}
                className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-brand-bg bg-brand-accent px-8 py-4 rounded-full text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgba(126,142,113,0.3)] hover:-translate-y-0.5"
              >
                {heroSection.primaryCta.text}
              </a>
              <a
                href={heroSection.secondaryCta.href}
                className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-on-surface bg-surface-container-low border border-outline-variant px-8 py-4 rounded-full text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-container-high hover:shadow-sm"
              >
                {heroSection.secondaryCta.text}
              </a>
            </motion.div>
          </section>
        )}

        {/* Section 1.2 — What Is Section */}
        {whatIsSection && (
          <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-brand-accent/5 p-8 sm:p-12 rounded-3xl border border-brand-accent/20 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5">
                <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-4 shadow-xs">
                  {whatIsSection.tag}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
                  {whatIsSection.heading}
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <p className="font-display text-lg sm:text-xl font-bold leading-relaxed text-on-surface">
                  {whatIsSection.primaryDesc}
                </p>
                <p className="font-body text-base text-on-surface-variant leading-relaxed">
                  {whatIsSection.secondaryDesc}
                </p>
              </div>
            </motion.div>
          </section>
        )}

        {/* Section 1.3 — Why It Matters */}
        {whyMattersSection && (
          <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                {whyMattersSection.tag}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-6"
              >
                {whyMattersSection.heading}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed"
              >
                {whyMattersSection.intro}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyMattersSection.points.map((point: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-background border border-outline-variant flex items-center justify-center mb-6 text-brand-accent">
                    <Check size={18} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-on-surface mb-3">
                    {point.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {point.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Section 1.4 — Services / Offerings */}
        {servicesSection && (
          <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="bg-surface-container-low rounded-3xl border border-outline-variant p-8 sm:p-12 shadow-sm">
              <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-xs">
                  {servicesSection.tag}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                  {servicesSection.heading}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {servicesSection.items.map((item: any, idx: number) => {
                  const IconComponent = ICON_MAP[item.icon] || Sparkles;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-background p-6 sm:p-8 rounded-2xl border border-outline-variant shadow-xs flex items-start gap-4 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 mt-1">
                        <IconComponent size={18} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-on-surface mb-2">
                          {item.title}
                        </h3>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Sub-sections (AEO & GEO Specialty Areas) */}
              <div className="border-t border-outline-variant/50 pt-16 space-y-16">
                {servicesSection.subSections.map((sub: any, idx: number) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`p-8 sm:p-10 rounded-3xl border flex flex-col lg:flex-row gap-8 ${
                        isEven 
                          ? "bg-background border-outline-variant" 
                          : "bg-brand-accent/5 border-brand-accent/20"
                      }`}
                    >
                      <div className="lg:w-1/2">
                        <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-xs">
                          {sub.tag}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface mb-2">
                          {sub.heading}
                        </h3>
                        <h4 className="font-display text-xs font-bold text-brand-accent uppercase tracking-widest mb-4">
                          {sub.subheading}
                        </h4>
                        <p className="font-body text-base text-on-surface-variant leading-relaxed">
                          {sub.desc}
                        </p>
                      </div>
                      <div className="lg:w-1/2 flex flex-col justify-center">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {sub.bullets.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-center gap-3 text-sm font-semibold text-on-surface">
                              <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Section 2 — Approach / How We Work */}
        {approachSection && (
          <section id="approach" className="py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
            <div className="bg-surface-container-low rounded-3xl border border-outline-variant p-8 sm:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                  <span className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-xs">
                    {approachSection.tag}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                    {approachSection.heading}
                  </h2>
                </div>
                <div className="lg:col-span-7 space-y-6">
                  <p className="font-display text-xl sm:text-2xl font-bold leading-relaxed text-on-surface">
                    {approachSection.primaryDesc}
                  </p>
                  <p className="font-body text-base text-on-surface-variant leading-relaxed">
                    {approachSection.secondaryDesc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {approachSection.pills.map((pill: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-background p-6 rounded-2xl border border-outline-variant shadow-xs flex flex-col items-start hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent font-display font-bold text-xs mb-4">
                      0{idx + 1}
                    </div>
                    <h3 className="font-display text-base font-bold text-on-surface mb-2">
                      {pill.title}
                    </h3>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      {pill.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 3 — Process Steps */}
        {processSection && (
          <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                {processSection.tag}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                {processSection.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSection.steps.map((step: any, idx: number) => {
                const isFirstOrLast = idx === 0 || idx === processSection.steps.length - 1;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant shadow-sm hover:bg-surface-container-high hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm mb-6 ${
                      isFirstOrLast ? "bg-brand-accent text-brand-bg shadow-sm" : "bg-background border border-outline-variant text-on-surface"
                    }`}>
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
        )}

        {/* Section 4 — Deliverables */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant p-8 sm:p-12 shadow-sm">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-xs">
                WHAT YOU GET
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Complete Deliverables
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                "Custom Keyword & Strategy Blueprint",
                "Full Technical SEO Audit & Code Polish",
                "On-Page Optimization & Meta Structure",
                "Advanced Schema & Structured Data Setup",
                "AEO (Answer Engine) Optimization & FAQs",
                "GEO (Generative Engine) & AI Search Mapping",
                "Targeted Content Development & Creation",
                "Link Profile Hardening & Digital PR",
                "Monthly Performance Dashboard & Analysis"
              ].map((item: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-background p-4 rounded-xl border border-outline-variant flex items-center gap-3 shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold text-on-surface">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom Guarantee Strip */}
            <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-on-surface mb-1">
                    Continuous Growth Focus
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant max-w-xl">
                    Every engagement includes transparent reporting, strategic recommendations, and continuous optimization designed to improve organic rankings and traffic over time.
                  </p>
                </div>
              </div>
              <a
                href="#lead-form"
                className="w-full md:w-auto inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-brand-bg bg-brand-accent px-6 py-3 rounded-full text-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
              >
                Launch My Growth Strategy
              </a>
            </div>
          </div>
        </section>

        {/* Section 4.2 — Why Choose Us */}
        {whyUsSection && (
          <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-8 sm:p-12 shadow-sm">
              <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                  {whyUsSection.tag}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                  {whyUsSection.heading}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyUsSection.items.map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-background p-6 rounded-2xl border border-outline-variant flex flex-col h-full shadow-xs"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-7 h-7 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
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
        )}

        {/* Section 4.3 — Results / Outcomes (Fallback Variant) */}
        {resultsSection && (
          <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                {resultsSection.tag}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                {resultsSection.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {resultsSection.outcomes.map((outcome: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant shadow-sm text-center flex flex-col justify-center min-h-[160px]"
                >
                  <span className="text-brand-accent font-display text-[10px] uppercase tracking-widest font-bold mb-2 block">
                    {outcome.label}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-on-surface mb-2">
                    {outcome.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant">
                    {outcome.subLabel}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="max-w-4xl mx-auto text-center mt-16 px-4">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-lg sm:text-2xl font-medium italic text-on-surface leading-relaxed mb-6"
              >
                &ldquo;Organic search remains the largest driver of trackable website traffic for most businesses. By combining SEO, AEO, and GEO into a unified strategy, we maximize visibility across traditional search engines, answer engines, and AI-powered discovery platforms.&rdquo;
              </motion.p>
              <div className="inline-block bg-surface-container-low border border-outline-variant px-4 py-2 rounded-full shadow-xs">
                <span className="text-xs font-semibold text-brand-accent">
                  BrightEdge Organic Search Report
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Section 6 — The Cost of Inaction */}
        {costOfInactionSection && (
          <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="bg-surface-container-low rounded-3xl border border-outline-variant p-8 sm:p-12 shadow-sm text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-xs">
                {costOfInactionSection.tag}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-16">
                {costOfInactionSection.heading}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {costOfInactionSection.items.map((item: any, idx: number) => {
                  const IconComponent = ICON_MAP[item.icon] || AlertTriangle;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-background p-8 rounded-2xl border border-outline-variant shadow-xs flex flex-col items-center hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-accent/5 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6">
                        <IconComponent size={20} />
                      </div>
                      <h3 className="font-display text-base font-bold text-on-surface mb-3">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Section 7 — Lead Capture Form */}
        <section id="lead-form" className="py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Info & Benefits */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                  PARTNER WITH US
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
                  Ready to Grow Your Online Visibility?
                </h2>
              </div>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Increase rankings, attract qualified traffic, generate more leads, and establish your brand as a trusted authority across search engines and AI platforms.
              </p>

              <div className="space-y-4">
                {[
                  { title: "No Fluff, Data-Driven Audits", desc: "We dissect your site's tech and content to build a precise plan." },
                  { title: "SEO + AEO + GEO Integrated", desc: "Always optimized for keywords, voice questions, and LLM answers." },
                  { title: "Complete Weekly Transparency", desc: "No vanity dashboards. Real data showing visibility and leads." }
                ].map((item, idx) => (
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

            {/* Right Column: Form Card */}
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
                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-surface-container-low/50 border border-outline-variant rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          Business Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-surface-container-low/50 border border-outline-variant rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+91 99999 99999"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-surface-container-low/50 border border-outline-variant rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>
                      </div>

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

                      <div>
                        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 pl-1">
                          Biggest Search Challenge
                        </label>
                        <textarea
                          name="challenge"
                          rows={3}
                          placeholder="Tell us about your traffic, ranking, or visibility challenges..."
                          value={formData.challenge}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low/50 border border-outline-variant rounded-2xl p-4 text-sm focus:outline-none focus:border-brand-accent transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-brand-bg bg-brand-accent py-4 rounded-full text-xs sm:text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer mt-2"
                      >
                        Submit Request Consultation
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
                        Message Received
                      </h3>
                      <p className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed mb-6">
                        Thank you, <span className="font-semibold text-on-surface">{formData.name}</span>. We&apos;ve received your request for <span className="font-semibold text-on-surface">{formData.email}</span>. One of our growth strategists will reach out to analyze your SEO challenges.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", email: "", phone: "", website: "", challenge: "" });
                        }}
                        className="text-xs font-bold text-brand-accent hover:underline uppercase tracking-wider"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </section>

        {/* Section 8 — FAQ Accordion */}
        {faqSection && (
          <section className="py-20 px-6 md:px-12 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                {faqSection.tag}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
                {faqSection.heading}
              </h2>
            </div>

            <div className="space-y-3">
              {faqSection.items.map((item: any, idx: number) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`bg-surface-container-low rounded-2xl border transition-all duration-300 ${
                      isOpen ? "border-brand-accent shadow-sm" : "border-outline-variant"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <span className="font-display text-sm sm:text-base font-bold text-on-surface pr-4">
                        {item.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? "bg-brand-accent text-brand-bg border-brand-accent" : "text-on-surface hover:bg-surface-container-high"
                      }`}>
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
        )}

        {/* Section 9 — Related Insights */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-outline-variant/30">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
              Latest Growth <span className="text-brand-accent">Insights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Decoding the AI Search Era: AEO and GEO Explained",
                category: "Marketing",
                desc: "How search engine answers are moving beyond link directories into direct LLM answers, and what brands must do to remain visible.",
                readTime: "5 min read",
                tag: "AEO & GEO"
              },
              {
                title: "The Core Web Vitals Checklist for 2026 Storefronts",
                category: "Technology",
                desc: "Speed is the bottom-line factor. Learn the key performance optimizations that keep bounces low and conversion rates scaling.",
                readTime: "8 min read",
                tag: "Performance"
              },
              {
                title: "Local Search Optimization: Dominating Maps Locally",
                category: "SEO Strategy",
                desc: "A complete tactical playbook to optimize local citations and claim Google Business positions for Indian local enterprises.",
                readTime: "6 min read",
                tag: "Local SEO"
              }
            ].map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-surface-container-low border border-outline-variant rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full cursor-pointer"
              >
                {/* Thumbnail placeholder */}
                <div className="w-full aspect-[16/8] bg-brand-accent/5 flex flex-col items-center justify-center gap-2 shrink-0 border-b border-outline-variant/50 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent" />
                  <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase relative z-10">
                    {post.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-semibold text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-full">
                      Guide
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-3 leading-snug tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
                    {post.desc}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 mt-auto">
                    <span className="text-[10px] text-on-surface-variant font-medium">
                      {post.readTime}
                    </span>
                    <span className="text-xs text-brand-accent font-semibold flex items-center gap-1">
                      Read Article <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Elements — Custom Floating WhatsApp component */}
      <a
        href="https://wa.me/919999999999?text=Hello%20digitalbrandbuilder,%20I'm%20interested%20in%20your%20SEO%20Services!"
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
