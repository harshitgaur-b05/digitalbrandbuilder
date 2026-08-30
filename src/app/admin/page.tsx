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

  const recentBlogDocs = await Blog.find({}).sort({ createdAt: -1 }).limit(5).lean();
  const recentBlogs = recentBlogDocs.map((b: any) => ({
    id: b._id.toString(),
    title: b.title,
    slug: b.slug,
    category: b.category || '',
    isActive: b.isActive,
    createdAt: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            href="/admin/services"
            className="group bg-card/80 border border-muted rounded-2xl p-6 shadow-sm hover:border-primary/20 hover:shadow-md transition-smooth cursor-pointer"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-50 text-purple-700 mb-4 group-hover:bg-purple-100 transition-smooth">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground text-lg mb-1">Service Pages</h3>
            <p className="text-sm text-muted-foreground mb-4">Edit content, SEO & copy for all 6 service pages</p>
            <span className="text-primary font-semibold text-sm group-hover:underline">Manage Services &rarr;</span>
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

        {/* Recent Blog Posts */}
        {recentBlogs.length > 0 && (
          <div className="bg-card/80 border border-muted rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-foreground text-lg">Recent Blog Posts</h2>
              <div className="flex items-center gap-3">
                <a
                  href="/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  View Blog
                </a>
                <a href="/admin/blogs" className="text-sm text-primary font-semibold hover:underline">Manage All &rarr;</a>
              </div>
            </div>
            <div className="divide-y divide-muted">
              {recentBlogs.map((blog) => (
                <div key={blog.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Status dot */}
                    <span className={`shrink-0 w-2 h-2 rounded-full ${blog.isActive ? 'bg-green-500' : 'bg-yellow-400'}`} title={blog.isActive ? 'Published' : 'Draft'} />
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{blog.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {blog.category && <span className="mr-2 bg-background border border-muted/60 px-1.5 py-0.5 rounded text-[10px] font-medium">{blog.category}</span>}
                        {blog.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      blog.isActive
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                    }`}>
                      {blog.isActive ? 'Published' : 'Draft'}
                    </span>
                    <a
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="View on site"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </a>
                    <a
                      href={`/admin/blogs/edit/${blog.id}`}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

