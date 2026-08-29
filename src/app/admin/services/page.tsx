import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptSession } from "@/lib/auth-utils";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import Link from "next/link";
import { Pencil, CheckCircle2, Clock, ArrowLeft, Globe, Search, Megaphone, Share2, PenLine, Award } from "lucide-react";

export const dynamic = "force-dynamic";

const SERVICE_DEFS = [
  { slug: "websites", title: "Websites", Icon: Globe, color: "text-blue-400" },
  { slug: "seo", title: "SEO + AEO + GEO", Icon: Search, color: "text-green-400" },
  { slug: "marketing", title: "Performance Marketing", Icon: Megaphone, color: "text-orange-400" },
  { slug: "social-media", title: "Social Media", Icon: Share2, color: "text-pink-400" },
  { slug: "content-writing", title: "Content Writing", Icon: PenLine, color: "text-yellow-400" },
  { slug: "brand-presence", title: "Brand Presence", Icon: Award, color: "text-purple-400" },
];

export default async function AdminServicesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  const session = token ? decryptSession(token) : null;
  if (!session || new Date(session.expiresAt) < new Date()) redirect("/admin/login");

  await connectDB();
  const dbRecords = await Service.find({}).select("slug metaTitle metaDescription updatedAt").lean();
  const dbMap = new Map((dbRecords as any[]).map((r) => [r.slug, r]));

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ArrowLeft size={16} className="text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Service Pages</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Edit content, SEO meta & copy for each service page</p>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICE_DEFS.map(({ slug, title, Icon, color }) => {
            const db = dbMap.get(slug) as any;
            const hasEdits = !!db;
            return (
              <div key={slug} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${color}`}>
                    <Icon size={18} />
                  </div>
                  {hasEdits ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      <CheckCircle2 size={10} /> Customised
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      <Clock size={10} /> Default
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-foreground mb-1">{title}</h3>
                {db?.metaTitle ? (
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{db.metaTitle}</p>
                ) : (
                  <p className="text-xs text-muted-foreground italic mb-4">No custom meta title yet</p>
                )}

                {db?.updatedAt && (
                  <p className="text-[10px] text-muted-foreground mb-3">
                    Last saved: {new Date(db.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                )}

                <div className="flex gap-2">
                  <Link
                    href={`/admin/services/${slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Pencil size={13} /> Edit Content
                  </Link>
                  <Link
                    href={`/services/${slug}`}
                    target="_blank"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    title="Preview page"
                  >
                    <Globe size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Changes are saved to the database and applied instantly. Default content is always preserved as fallback.
        </p>
      </div>
    </div>
  );
}