import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decryptSession } from '@/lib/auth-utils';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import LeadsManagerClient from './LeadsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || new Date(session.expiresAt) < new Date()) {
    redirect('/admin/login');
  }

  await connectDB();
  const rawLeads = await Lead.find({}).sort({ createdAt: -1 });
  
  // Serialize Mongoose models for Client Component
  const leads = rawLeads.map(lead => ({
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone || '',
    message: lead.message,
    service: lead.service || '',
    status: lead.status,
    createdAt: lead.createdAt.toISOString(),
  }));

  return <LeadsManagerClient initialLeads={leads} />;
}
