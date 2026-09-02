import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/auth-utils";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  const session = token ? decryptSession(token) : null;
  if (!session || new Date(session.expiresAt) < new Date()) return null;
  return session;
}

/**
 * POST /api/admin/services
 * Creates a new service document with the given slug and title.
 * The full content is filled in afterwards via PUT /api/admin/services/[slug].
 */
export async function POST(request: NextRequest) {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { slug, title } = body;

  if (!slug || !title) {
    return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
  }

  // Validate slug format
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Slug must only contain lowercase letters, numbers, and hyphens." },
      { status: 400 }
    );
  }

  await connectDB();

  // Check for duplicate
  const existing = await Service.findOne({ slug }).lean();
  if (existing) {
    return NextResponse.json(
      { error: `A service with slug "${slug}" already exists.` },
      { status: 409 }
    );
  }

  const record = await Service.create({
    slug,
    title,
    isActive: true,
  });

  return NextResponse.json({ success: true, record }, { status: 201 });
}
