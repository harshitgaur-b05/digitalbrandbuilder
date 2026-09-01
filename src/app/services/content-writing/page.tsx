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
  const db = await Service.findOne({ slug: "content-writing" })
    .select("metaTitle metaDescription")
    .lean() as any;
  return {
    title:
      db?.metaTitle ||
      "SEO Content Writing & Copywriting Services in Delhi | Digital Brand Builder",
    description:
      db?.metaDescription ||
      "High-quality, human-written content that ranks on search engines and builds brand trust. Blog posts, landing pages, website copy, and email sequences.",
    alternates: {
      canonical: "https://www.digitalbrandbuilder.in/services/content-writing",
    },
    openGraph: {
      title:
        db?.metaTitle ||
        "SEO Content Writing & Copywriting Services | Digital Brand Builder",
      description:
        db?.metaDescription ||
        "Human-written SEO content — blog posts, landing pages, and brand copy that attract, educate, and convert.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Content Writing Services — Digital Brand Builder",
        },
      ],
    },
  };
}

export default async function ContentWritingPage() {
  await connectDB();
  const db = (await Service.findOne({ slug: "content-writing" }).lean()) as Record<
    string,
    any
  > | null;
  return (
    <ServicePageShell
      data={mergeServiceData(SERVICE_DEFAULTS["content-writing"], db)}
    />
  );
}
