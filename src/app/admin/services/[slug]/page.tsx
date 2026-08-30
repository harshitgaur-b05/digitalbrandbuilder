import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { decryptSession } from "@/lib/auth-utils";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import ServiceEditorClient from "./ServiceEditorClient";
import { SERVICE_DEFAULTS } from "@/lib/service-defaults";

export const dynamic = "force-dynamic";

const VALID_SLUGS = [
  "websites",
  "seo",
  "marketing",
  "social-media",
  "content-writing",
  "brand-presence",
];

/**
 * Build the flat ServiceEditorData shape the client expects.
 * Every field falls back to the hardcoded defaults so the editor
 * is always pre-populated with real content — never blank.
 */
function buildInitial(slug: string, db: Record<string, any> | null) {
  const d = SERVICE_DEFAULTS[slug]; // hardcoded defaults for this slug

  // ── resolve each section from DB first, then defaults ──────────────────
  const hero      = db?.heroSection      ?? {};
  const whatIs    = db?.whatIsSection    ?? {};
  const why       = db?.whyMattersSection ?? {};
  const offerings = db?.servicesSection  ?? {};
  const process   = db?.processSection   ?? {};
  const whyUs     = db?.whyUsSection     ?? {};
  const inaction  = db?.inactionSection  ?? {};
  const leadForm  = db?.leadFormSection  ?? {};

  const faqItems = Array.isArray(db?.faq) && db.faq.length > 0
    ? (db.faq as { q: string; a: string }[]).map((f) => ({
        question: f.q ?? "",
        answer:   f.a ?? "",
      }))
    : (d?.faq.items ?? []);

  return {
    // ── SEO & Meta ──────────────────────────────────────────────────────
    title:           db?.title           ?? d?.hero.name ?? slug,
    metaTitle:       db?.metaTitle       ?? "",
    metaDescription: db?.metaDescription ?? "",
    schemaData:      db?.schemaData ? JSON.stringify(db.schemaData, null, 2) : "",

    // ── Hero ────────────────────────────────────────────────────────────
    hero: {
      name:             hero.name             ?? d?.hero.name             ?? "",
      tagline:          hero.tagline          ?? d?.hero.tagline          ?? "",
      subtitle:         hero.subtitle         ?? d?.hero.subtitle         ?? "",
      primaryCtaText:   hero.primaryCta?.text  ?? d?.hero.primaryCta.text  ?? "",
      primaryCtaHref:   hero.primaryCta?.href  ?? d?.hero.primaryCta.href  ?? "#lead-form",
      secondaryCtaText: hero.secondaryCta?.text ?? d?.hero.secondaryCta.text ?? "",
      secondaryCtaHref: hero.secondaryCta?.href ?? d?.hero.secondaryCta.href ?? "#approach",
    },

    // ── What Is ─────────────────────────────────────────────────────────
    whatIsHeading:   whatIs.heading   ?? d?.whatIs.heading   ?? "",
    whatIsPrimary:   whatIs.primary   ?? d?.whatIs.primary   ?? "",
    whatIsSecondary: whatIs.secondary ?? d?.whatIs.secondary ?? "",

    // ── Why ─────────────────────────────────────────────────────────────
    whyHeading: why.heading ?? d?.why.heading ?? "",
    whyIntro:   why.intro   ?? d?.why.intro   ?? "",
    whyPoints:  why.points  ?? d?.why.points  ?? [],

    // ── Offerings ───────────────────────────────────────────────────────
    offeringsHeading: offerings.heading ?? d?.offerings.heading ?? "",
    offeringsItems:   offerings.items   ?? d?.offerings.items   ?? [],

    // ── Process ─────────────────────────────────────────────────────────
    processHeading: process.heading ?? d?.process.heading ?? "",
    processSteps:   process.steps   ?? d?.process.steps   ?? [],

    // ── Deliverables ────────────────────────────────────────────────────
    deliverables: (db?.deliverables?.length ? db.deliverables : null) ?? d?.deliverables ?? [],

    // ── Why Us ──────────────────────────────────────────────────────────
    whyUsHeading: whyUs.heading ?? d?.whyUs.heading ?? "",
    whyUsItems:   whyUs.items   ?? d?.whyUs.items   ?? [],

    // ── Cost of Inaction ────────────────────────────────────────────────
    costHeading: inaction.heading ?? d?.costOfInaction.heading ?? "",
    costItems:   inaction.items   ?? d?.costOfInaction.items   ?? [],

    // ── FAQ ─────────────────────────────────────────────────────────────
    faqHeading: db?.faqSection?.heading ?? d?.faq.heading ?? "",
    faqItems,

    // ── Lead Form ───────────────────────────────────────────────────────
    leadFormHeading:    leadForm.heading    ?? d?.leadForm.heading    ?? "",
    leadFormSubtitle:   leadForm.subtitle   ?? d?.leadForm.subtitle   ?? "",
    leadFormHighlights: leadForm.highlights ?? d?.leadForm.highlights ?? [],
    leadFormCtaLabel:   leadForm.ctaLabel   ?? d?.leadForm.ctaLabel   ?? "",

    // ── WhatsApp ────────────────────────────────────────────────────────
    whatsappMessage: db?.whatsappMessage ?? d?.whatsappMessage ?? "",
  };
}

export default async function ServiceEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  const session = token ? decryptSession(token) : null;
  if (!session || new Date(session.expiresAt) < new Date()) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();

  await connectDB();
  const record = await Service.findOne({ slug }).lean();

  const initial = buildInitial(slug, record as Record<string, any> | null);

  return <ServiceEditorClient slug={slug} initial={initial} />;
}
