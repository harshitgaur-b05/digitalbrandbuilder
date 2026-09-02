/**
 * Merges a MongoDB Service document (db) over the hardcoded default ServicePageData.
 * Any field that exists in the DB record replaces the hardcoded default.
 * Falls back to the hardcoded default for every field that is absent in the DB.
 */
import type { ServicePageData } from "@/app/services/_components/ServicePageShell";

export function mergeServiceData(
  defaults: ServicePageData,
  db: Record<string, any> | null
): ServicePageData {
  if (!db) return defaults;

  return {
    // Hero: use heroSection if it was saved via the Hero tab.
    // If only the SEO & Meta tab was ever saved (no heroSection yet),
    // fall back to db.title as the H1 name so admin title changes
    // are immediately visible on the frontend.
    hero: db.heroSection
      ? {
          name:         db.heroSection.name         ?? db.title ?? defaults.hero.name,
          tagline:      db.heroSection.tagline       ?? defaults.hero.tagline,
          subtitle:     db.heroSection.subtitle      ?? defaults.hero.subtitle,
          primaryCta:   db.heroSection.primaryCta    ?? defaults.hero.primaryCta,
          secondaryCta: db.heroSection.secondaryCta  ?? defaults.hero.secondaryCta,
        }
      : {
          ...defaults.hero,
          name: db.title ?? defaults.hero.name,
        },

    whatIs: db.whatIsSection
      ? {
          heading: db.whatIsSection.heading ?? defaults.whatIs.heading,
          primary: db.whatIsSection.primary ?? defaults.whatIs.primary,
          secondary: db.whatIsSection.secondary ?? defaults.whatIs.secondary,
        }
      : defaults.whatIs,

    why: db.whyMattersSection
      ? {
          heading: db.whyMattersSection.heading ?? defaults.why.heading,
          intro: db.whyMattersSection.intro ?? defaults.why.intro,
          points: db.whyMattersSection.points ?? defaults.why.points,
        }
      : defaults.why,

    offerings: db.servicesSection
      ? {
          heading: db.servicesSection.heading ?? defaults.offerings.heading,
          items: db.servicesSection.items ?? defaults.offerings.items,
        }
      : defaults.offerings,

    process: db.processSection
      ? {
          heading: db.processSection.heading ?? defaults.process.heading,
          steps: db.processSection.steps ?? defaults.process.steps,
        }
      : defaults.process,

    deliverables: db.deliverables ?? defaults.deliverables,

    whyUs: db.whyUsSection
      ? {
          heading: db.whyUsSection.heading ?? defaults.whyUs.heading,
          items: db.whyUsSection.items ?? defaults.whyUs.items,
        }
      : defaults.whyUs,

    costOfInaction: db.inactionSection
      ? {
          heading: db.inactionSection.heading ?? defaults.costOfInaction.heading,
          items: db.inactionSection.items ?? defaults.costOfInaction.items,
        }
      : defaults.costOfInaction,

    faq: db.faq
      ? {
          heading: db.faqSection?.heading ?? defaults.faq.heading,
          items: (db.faq as { q: string; a: string }[]).map((f) => ({
            question: f.q,
            answer: f.a,
          })),
        }
      : defaults.faq,

    leadForm: db.leadFormSection
      ? {
          heading: db.leadFormSection.heading ?? defaults.leadForm.heading,
          subtitle: db.leadFormSection.subtitle ?? defaults.leadForm.subtitle,
          highlights: db.leadFormSection.highlights ?? defaults.leadForm.highlights,
          ctaLabel: db.leadFormSection.ctaLabel ?? defaults.leadForm.ctaLabel,
        }
      : defaults.leadForm,

    whatsappMessage: db.whatsappMessage ?? defaults.whatsappMessage,
  };
}
