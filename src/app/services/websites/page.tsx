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
  const db = await Service.findOne({ slug: "websites" })
    .select("metaTitle metaDescription")
    .lean() as any;
  return {
    title:
      db?.metaTitle ||
      "Website Design & Development Services in Delhi | Digital Brand Builder",
    description:
      db?.metaDescription ||
      "Build a high-performing, speed-optimised website with Digital Brand Builder. Custom business websites, e-commerce stores, and conversion-focused landing pages for Indian businesses.",
    alternates: { canonical: "https://www.digitalbrandbuilder.in/services/websites" },
    openGraph: {
      title:
        db?.metaTitle ||
        "Website Design & Development Services in Delhi | Digital Brand Builder",
      description:
        db?.metaDescription ||
        "Custom business websites, e-commerce stores, and landing pages built for performance and conversions.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Website Design & Development — Digital Brand Builder",
        },
      ],
    },
  };
}

export default async function WebsitesPage() {
  await connectDB();
  const db = (await Service.findOne({ slug: "websites" }).lean()) as Record<
    string,
    any
  > | null;
  return (
    <ServicePageShell data={mergeServiceData(SERVICE_DEFAULTS["websites"], db)} />
  );
}
