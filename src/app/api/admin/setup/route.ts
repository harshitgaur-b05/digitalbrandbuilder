import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword } from '@/lib/auth-utils';

export async function GET() {
  try {
    await connectDB();
    const userCount = await User.countDocuments();
    return NextResponse.json({ setupRequired: userCount === 0 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json(
        { error: 'Setup already completed. You cannot create more users through this route.' },
        { status: 403 }
      );
    }

    const { email, password } = await request.json();
    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: 'Valid email and password (min 6 characters) are required.' },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);
    const newAdmin = await User.create({
      email,
      passwordHash,
      role: 'admin',
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully.',
      user: { email: newAdmin.email, role: newAdmin.role },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
