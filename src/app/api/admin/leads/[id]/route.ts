import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { verifyAuth } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyAuth(request);
    await connectDB();
    const { id } = await params;
    const { status } = await request.json();
    if (!status || !['unread', 'contacted', 'archived'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status value.' }, { status: 400 });
    }
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedLead) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedLead });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyAuth(request);
    await connectDB();
    const { id } = await params;
    const deletedLead = await Lead.findByIdAndDelete(id);
    if (!deletedLead) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
