import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, service } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    await connectDB();
    const newLead = await Lead.create({
      name,
      email,
      phone,
      message,
      service,
      status: 'unread',
    });

    console.log('New Lead Saved in DB:', newLead._id);

    return NextResponse.json(
      { success: true, message: 'Your message has been received. Thank you!' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
