import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decryptSession } from '@/lib/auth-utils';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import BlogEditorClient from '../../BlogEditorClient';

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || new Date(session.expiresAt) < new Date()) {
    redirect('/admin/login');
  }

  await connectDB();
  const blog = await Blog.findById(params.id);

  if (!blog) {
    redirect('/admin/blogs');
  }

  // Serialize Mongoose doc to plain object for Client Component
  const initialData = {
    id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    intro: blog.intro || '',
    excerpt: blog.excerpt || '',
    author: blog.author || '',
    category: blog.category || '',
    tags: blog.tags || [],
    seoTitle: blog.seoTitle || '',
    seoDescription: blog.seoDescription || '',
    isActive: blog.isActive,
    priority: blog.priority || 0,
    heroImage: blog.heroImage ? {
      url: blog.heroImage.url || '',
      alt: blog.heroImage.alt || '',
      filename: blog.heroImage.filename || '',
    } : undefined,
    sections: (blog.sections || []).map((sec: any) => ({
      heading: sec.heading || '',
      subheading: sec.subheading || '',
      text: sec.text || '',
      listItems: sec.listItems || [],
      metaLinking: sec.metaLinking || '',
      image: sec.image ? {
        url: sec.image.url || '',
        alt: sec.image.alt || '',
      } : undefined,
    })),
    faqs: (blog.faqs || []).map((faq: any) => ({
      question: faq.question || '',
      answer: faq.answer || '',
      tag: faq.tag || '',
    })),
  };

  return <BlogEditorClient mode="edit" initialData={initialData} />;
}
