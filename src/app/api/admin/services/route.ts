import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/auth-utils";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

export const SERVICE_SLUGS = [
  { slug: "websites", title: "Websites" },
  { slug: "seo", title: "SEO + AEO + GEO" },
  { slug: "marketing", title: "Performance Marketing" },
  { slug: "social-media", title: "Social Media" },
  { slug: "content-writing", title: "Content Writing" },
  { slug: "brand-presence", title: "Brand Presence" },
];

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  const session = token ? decryptSession(token) : null;
  if (!session || new Date(session.expiresAt) < new Date()) return null;
  return session;
}

export async function GET() {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const dbRecords = await Service.find({}).select("slug title metaTitle metaDescription updatedAt").lean();
  const dbMap = new Map((dbRecords as any[]).map((r) => [r.slug, r]));

  const services = SERVICE_SLUGS.map(({ slug, title }) => {
    const db = dbMap.get(slug) as any;
    return {
      slug,
      title: db?.title || title,
      hasDbRecord: !!db,
      metaTitle: db?.metaTitle || "",
      metaDescription: db?.metaDescription || "",
      updatedAt: db?.updatedAt || null,
    };
  });

  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { slug, ...data } = body;
  if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

  await connectDB();
  const record = await Service.findOneAndUpdate(
    { slug },
    { slug, ...data },
    { new: true, upsert: true, runValidators: true }
  );

  return NextResponse.json({ success: true, record }, { status: 200 });
}
