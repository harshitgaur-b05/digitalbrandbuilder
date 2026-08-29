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

export async function GET(
  _req: NextRequest,
  context: any
) {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = context.params.slug;
  await connectDB();
  const record = await Service.findOne({ slug }).lean();
  return NextResponse.json({ record: record || null });
}

export async function PUT(
  request: NextRequest,
  context: any
) {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = context.params.slug;
  const body = await request.json();
  await connectDB();
  const record = await Service.findOneAndUpdate(
    { slug },
    { slug, ...body },
    { new: true, upsert: true, runValidators: true }
  );
  return NextResponse.json({ success: true, record });
}

export async function DELETE(
  _req: NextRequest,
  context: any
) {
  const session = await authenticate();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = context.params.slug;
  await connectDB();
  await Service.deleteOne({ slug });
  return NextResponse.json({ success: true, message: "Reset to defaults" });
}