import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decryptSession } from '@/lib/auth-utils';
import BlogEditorClient from '../BlogEditorClient';

export default async function NewBlogPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || new Date(session.expiresAt) < new Date()) {
    redirect('/admin/login');
  }

  return <BlogEditorClient mode="create" />;
}
