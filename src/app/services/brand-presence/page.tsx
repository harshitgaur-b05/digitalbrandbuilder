import { Metadata } from "next";
import ServicePageShell from "../_components/ServicePageShell";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { mergeServiceData } from "@/lib/service-data-merge";
import { SERVICE_DEFAULTS } from "@/lib/service-defaults";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const db = await Service.findOne({ slug: "brand-presence" }).select("metaTitle metaDescription").lean() as any;
  return {
    title: db?.metaTitle || "Brand Strategy & Identity Services | digitalbrandbuilder",
    description: db?.metaDescription || "Create a consistent and memorable brand identity. Brand strategy, logo design, visual style guides, and typography systems.",
  };
}

export default async function BrandPresencePage() {
  await connectDB();
  const db = await Service.findOne({ slug: "brand-presence" }).lean() as Record<string, any> | null;
  return <ServicePageShell data={mergeServiceData(SERVICE_DEFAULTS["brand-presence"], db)} />;
}
