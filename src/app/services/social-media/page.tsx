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
  const db = await Service.findOne({ slug: "social-media" })
    .select("metaTitle metaDescription")
    .lean() as any;
  return {
    title:
      db?.metaTitle ||
      "Social Media Marketing Services in Delhi | Digital Brand Builder",
    description:
      db?.metaDescription ||
      "Build brand awareness, engage your audience, and drive conversions with strategic social media management. Custom content planning, design, writing, and platform management.",
    alternates: { canonical: "https://www.digitalbrandbuilder.in/services/social-media" },
    openGraph: {
      title:
        db?.metaTitle ||
        "Social Media Marketing Services | Digital Brand Builder",
      description:
        db?.metaDescription ||
        "Strategic social media management — content creation, community engagement, and paid social campaigns.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Social Media Marketing — Digital Brand Builder",
        },
      ],
    },
  };
}

export default async function SocialMediaPage() {
  await connectDB();
  const db = (await Service.findOne({ slug: "social-media" }).lean()) as Record<
    string,
    any
  > | null;
  return (
    <ServicePageShell data={mergeServiceData(SERVICE_DEFAULTS["social-media"], db)} />
  );
}
