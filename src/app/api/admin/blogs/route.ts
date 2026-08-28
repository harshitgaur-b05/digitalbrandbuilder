import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { verifyAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    await verifyAuth(request);
    await connectDB();
    
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
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
    const newBlog = await Blog.create(body);
    
    // Revalidate paths where blogs might be displayed
    revalidatePath('/blogs');
    revalidatePath(`/blogs/${newBlog.slug}`);

    // If you had a dynamic sitemap endpoint, you'd bust its cache here
    // e.g. sitemapState.bust();

    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'Blog with this slug/title already exists.' }, { status: 400 });
    }
    console.error('Blog creation error:', error);
    return NextResponse.json({ success: false, error: error.stack || error.message }, { status: 500 });
  }
}
