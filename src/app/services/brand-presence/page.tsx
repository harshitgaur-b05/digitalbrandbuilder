import { Metadata } from "next";
import ServicePageShell from "../_components/ServicePageShell";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { mergeServiceData } from "@/lib/service-data-merge";
import { SERVICE_DEFAULTS } from "@/lib/service-defaults";

// Use ISR — revalidated on admin save via revalidatePath, with 1-hour fallback
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const db = await Service.findOne({ slug: "brand-presence" })
    .select("metaTitle metaDescription")
    .lean() as any;
  return {
    title:
      db?.metaTitle ||
      "Brand Strategy & Identity Design Services in Delhi | Digital Brand Builder",
    description:
      db?.metaDescription ||
      "Create a consistent and memorable brand identity. Brand strategy, logo design, visual style guides, colour palettes, and typography systems for Indian businesses.",
    alternates: {
      canonical: "https://www.digitalbrandbuilder.in/services/brand-presence",
    },
    openGraph: {
      title:
        db?.metaTitle ||
        "Brand Strategy & Identity Design Services | Digital Brand Builder",
      description:
        db?.metaDescription ||
        "Brand strategy, logo design, and visual identity systems that make your business look premium online.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Brand Presence & Identity — Digital Brand Builder",
        },
      ],
    },
  };
}

export default async function BrandPresencePage() {
  await connectDB();
  const db = (await Service.findOne({ slug: "brand-presence" }).lean()) as Record<
    string,
    any
  > | null;
  return (
    <ServicePageShell
      data={mergeServiceData(SERVICE_DEFAULTS["brand-presence"], db)}
    />
  );
}
