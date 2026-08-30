import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/auth-utils";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { revalidatePath } from "next/cache";

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  const session = token ? decryptSession(token) : null;
  if (!session || new Date(session.expiresAt) < new Date()) return null;
  return session;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  await connectDB();
  const record = await Service.findOne({ slug }).lean();
  return NextResponse.json({ record: record || null });
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  const body = await request.json();
  await connectDB();

  // $set ensures Mongoose writes Mixed-type fields (heroSection, etc.)
  const record = await Service.findOneAndUpdate(
    { slug },
    { $set: { slug, ...body } },
    { returnDocument: "after", upsert: true, runValidators: false }
  );

  // Bust the Next.js cache for the public service page immediately
  revalidatePath(`/services/${slug}`);
  revalidatePath("/services");

  return NextResponse.json({ success: true, record });
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  await connectDB();
  await Service.deleteOne({ slug });

  revalidatePath(`/services/${slug}`);
  revalidatePath("/services");

  return NextResponse.json({ success: true, message: "Reset to defaults" });
}
