import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/lib/models/Service';
import { verifyAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    await verifyAuth(request);
    await connectDB();
    
    const services = await Service.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await verifyAuth(request);
    await connectDB();

    const body = await request.json();
    const newService = await Service.create(body);
    
    revalidatePath('/services');
    revalidatePath(`/services/${newService.slug}`);

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'Service with this slug already exists.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
