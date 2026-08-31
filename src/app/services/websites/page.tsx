import { Metadata } from "next";
import ServicePageShell from "../_components/ServicePageShell";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { mergeServiceData } from "@/lib/service-data-merge";
import { SERVICE_DEFAULTS } from "@/lib/service-defaults";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const db = await Service.findOne({ slug: "websites" }).select("metaTitle metaDescription").lean() as any;
  return {
    title: db?.metaTitle || "Website Design & Development Services | digitalbrandbuilder",
    description: db?.metaDescription || "Build a high-performing, speed-optimized website with digitalbrandbuilder. Custom business websites, e-commerce stores, and conversion-focused landing pages.",
  };
}

export default async function WebsitesPage() {
  await connectDB();
  const db = await Service.findOne({ slug: "websites" }).lean() as Record<string, any> | null;
  return <ServicePageShell data={mergeServiceData(SERVICE_DEFAULTS["websites"], db)} />;
}
