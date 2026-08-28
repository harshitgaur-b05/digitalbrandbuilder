import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decryptSession } from '@/lib/auth-utils';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import BlogsManagerClient from './BlogsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || new Date(session.expiresAt) < new Date()) {
    redirect('/admin/login');
  }

  await connectDB();
  const rawBlogs = await Blog.find({}).sort({ createdAt: -1 });

  // Serialize Blogs for Client Component
  const blogs = rawBlogs.map(blog => ({
    id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    category: blog.category || '',
    isActive: blog.isActive,
    date: blog.date || '',
    createdAt: blog.createdAt.toISOString(),
  }));

  return <BlogsManagerClient initialBlogs={blogs} />;
}
