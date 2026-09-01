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
  const db = await Service.findOne({ slug: "marketing" })
    .select("metaTitle metaDescription")
    .lean() as any;
  return {
    title:
      db?.metaTitle ||
      "Performance Marketing & Paid Ads Services in Delhi | Digital Brand Builder",
    description:
      db?.metaDescription ||
      "Drive targeted leads and sales with data-driven paid advertising. Google Ads, Meta Ads (Facebook & Instagram), and LinkedIn campaign management for Indian businesses.",
    alternates: { canonical: "https://digitalbrandbuilder.in/services/marketing" },
    openGraph: {
      title:
        db?.metaTitle ||
        "Performance Marketing & Paid Ads Services | Digital Brand Builder",
      description:
        db?.metaDescription ||
        "Google Ads, Meta Ads, and LinkedIn campaigns designed to generate qualified leads and measurable sales.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Performance Marketing Services — Digital Brand Builder",
        },
      ],
    },
  };
}

export default async function MarketingPage() {
  await connectDB();
  const db = (await Service.findOne({ slug: "marketing" }).lean()) as Record<
    string,
    any
  > | null;
  return (
    <ServicePageShell data={mergeServiceData(SERVICE_DEFAULTS["marketing"], db)} />
  );
}
