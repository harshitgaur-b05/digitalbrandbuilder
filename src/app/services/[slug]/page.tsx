import { Metadata } from "next";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { mergeServiceData } from "@/lib/service-data-merge";
import { SERVICE_DEFAULTS, buildGenericDefaults } from "@/lib/service-defaults";
import ServicePageShell from "../_components/ServicePageShell";

// Every request hits MongoDB — admin edits are reflected immediately.
export const dynamic = "force-dynamic";

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  await connectDB();
  const db = await Service.findOne({ slug })
    .select("metaTitle metaDescription isActive title heroSection")
    .lean() as any;

  // 404 if explicitly marked inactive
  if (db && db.isActive === false) return {};

  const defaults = SERVICE_DEFAULTS[slug] ?? buildGenericDefaults(slug);
  const title = db?.metaTitle || defaults.hero.name;
  const description = db?.metaDescription || defaults.whatIs.primary.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.digitalbrandbuilder.in/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${title} — Digital Brand Builder`,
        },
      ],
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ServicePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  await connectDB();
  const db = await Service.findOne({ slug }).lean() as Record<string, any> | null;

  // Show 404 only if the slug has never been created in DB
  // AND there's no hardcoded default for it — i.e. it truly doesn't exist.
  if (!db && !SERVICE_DEFAULTS[slug]) {
    notFound();
  }

  // If explicitly deactivated in admin, treat as 404
  if (db?.isActive === false) {
    notFound();
  }

  const defaults = SERVICE_DEFAULTS[slug] ?? buildGenericDefaults(slug);
  const data = mergeServiceData(defaults, db);

  return <ServicePageShell data={data} />;
}
