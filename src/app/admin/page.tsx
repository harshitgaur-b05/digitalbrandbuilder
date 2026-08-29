import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decryptSession } from '@/lib/auth-utils';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import Lead from '@/lib/models/Lead';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-session')?.value;
  const session = token ? decryptSession(token) : null;

  if (!session || new Date(session.expiresAt) < new Date()) {
    redirect('/admin/login');
  }

  await connectDB();
  const [totalBlogs, activeBlogs, totalLeads, unreadLeads] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ isActive: true }),
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'unread' }),
  ]);

  const recentLeads = await Lead.find({ status: 'unread' }).sort({ createdAt: -1 }).limit(5);
  const leads = recentLeads.map(l => ({
    id: l._id.toString(),
    name: l.name,
    email: l.email,
    service: l.service || '',
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans selection:bg-primary/20/30">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-card/80 border border-muted rounded-2xl p-6 md:p-8 shadow-xl shadow-foreground/5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Logged in as <span className="font-semibold text-foreground">{session.email}</span></p>
            </div>
            <a
              href="/api/admin/logout"
              className="inline-flex items-center gap-2 px-4 py-2 border border-muted rounded-xl text-sm font-semibold text-muted-foreground hover:bg-background transition-smooth cursor-pointer w-fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
              Logout
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Blogs', value: totalBlogs, sub: `${activeBlogs} published`, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Active Posts', value: activeBlogs, sub: 'publicly visible', color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'Total Leads', value: totalLeads, sub: 'all time', color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Unread Leads', value: unreadLeads, sub: 'need attention', color: 'text-red-700', bg: 'bg-red-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card/80 border border-muted rounded-2xl p-5 shadow-sm">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${stat.bg}`}>
                <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <p className="font-bold text-foreground text-sm">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/blogs"
            className="group bg-card/80 border border-muted rounded-2xl p-6 shadow-sm hover:border-primary/20 hover:shadow-md transition-smooth cursor-pointer"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-smooth">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground text-lg mb-1">Blog Posts</h3>
            <p className="text-sm text-muted-foreground mb-4">{totalBlogs} articles — {activeBlogs} published</p>
            <span className="text-primary font-semibold text-sm group-hover:underline">Manage Blogs &rarr;</span>
          </a>

          <a
            href="/admin/leads"
            className="group bg-card/80 border border-muted rounded-2xl p-6 shadow-sm hover:border-primary/20 hover:shadow-md transition-smooth cursor-pointer"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-700 mb-4 group-hover:bg-blue-100 transition-smooth">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground text-lg mb-1">Lead Management</h3>
            <p className="text-sm text-muted-foreground mb-4">{totalLeads} total — <span className="text-red-600 font-semibold">{unreadLeads} unread</span></p>
            <span className="text-primary font-semibold text-sm group-hover:underline">View Leads &rarr;</span>
          </a>

          <a
            href="/admin/blogs/new"
            className="group bg-primary/5 border-2 border-dashed border-primary/30 rounded-2xl p-6 hover:border-primary hover:bg-primary/10 transition-smooth cursor-pointer flex flex-col items-center justify-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <h3 className="font-bold text-primary text-lg mb-1">Write New Post</h3>
            <p className="text-sm text-muted-foreground">Start writing and publishing a new blog article</p>
          </a>
        </div>

        {/* Recent Unread Leads */}
        {leads.length > 0 && (
          <div className="bg-card/80 border border-muted rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-foreground text-lg">Recent Unread Leads</h2>
              <a href="/admin/leads" className="text-sm text-primary font-semibold hover:underline">View All &rarr;</a>
            </div>
            <div className="divide-y divide-muted">
              {leads.map((lead) => (
                <div key={lead.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}{lead.service ? ` — ${lead.service}` : ''}</p>
                  </div>
                  <span className="text-xs text-muted-foreground/60">
                    {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

