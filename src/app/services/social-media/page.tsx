import { Metadata } from "next";
import ServicePageShell from "../_components/ServicePageShell";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { mergeServiceData } from "@/lib/service-data-merge";
import { SERVICE_DEFAULTS } from "@/lib/service-defaults";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const db = await Service.findOne({ slug: "social-media" }).select("metaTitle metaDescription").lean() as any;
  return {
    title: db?.metaTitle || "Social Media Marketing Services | digitalbrandbuilder",
    description: db?.metaDescription || "Build brand awareness, engage your audience, and drive conversions. Custom content planning, design, writing, and platform management.",
    alternates: { canonical: "https://digitalbrandbuilder.in/services/social-media" },
  };
}

export default async function SocialMediaPage() {
  await connectDB();
  const db = await Service.findOne({ slug: "social-media" }).lean() as Record<string, any> | null;
  return <ServicePageShell data={mergeServiceData(SERVICE_DEFAULTS["social-media"], db)} />;
}
