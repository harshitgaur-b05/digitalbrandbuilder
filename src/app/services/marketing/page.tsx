import { Metadata } from "next";
import ServicePageShell from "../_components/ServicePageShell";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { mergeServiceData } from "@/lib/service-data-merge";
import { SERVICE_DEFAULTS } from "@/lib/service-defaults";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const db = await Service.findOne({ slug: "marketing" }).select("metaTitle metaDescription").lean() as any;
  return {
    title: db?.metaTitle || "Performance Marketing & Paid Ads Services | digitalbrandbuilder",
    description: db?.metaDescription || "Drive targeted leads and sales with data-driven paid advertising. Google Ads, Meta Ads (Facebook & Instagram), and LinkedIn campaign management.",
  };
}

export default async function MarketingPage() {
  await connectDB();
  const db = await Service.findOne({ slug: "marketing" }).lean() as Record<string, any> | null;
  return <ServicePageShell data={mergeServiceData(SERVICE_DEFAULTS["marketing"], db)} />;
}
