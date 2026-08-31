import { Metadata } from "next";
import ServicePageShell from "../_components/ServicePageShell";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { mergeServiceData } from "@/lib/service-data-merge";
import { SERVICE_DEFAULTS } from "@/lib/service-defaults";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const db = await Service.findOne({ slug: "content-writing" }).select("metaTitle metaDescription").lean() as any;
  return {
    title: db?.metaTitle || "SEO Content Writing & Copywriting Services | digitalbrandbuilder",
    description: db?.metaDescription || "High-quality, human-written content that ranks on search engines and builds brand trust. Blog posts, landing pages, and email copy.",
  };
}

export default async function ContentWritingPage() {
  await connectDB();
  const db = await Service.findOne({ slug: "content-writing" }).lean() as Record<string, any> | null;
  return <ServicePageShell data={mergeServiceData(SERVICE_DEFAULTS["content-writing"], db)} />;
}
