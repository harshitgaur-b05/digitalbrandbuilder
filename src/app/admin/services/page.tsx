import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptSession } from "@/lib/auth-utils";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import Link from "next/link";
import {
  Pencil, CheckCircle2, Clock, ArrowLeft, Globe, Search,
  Megaphone, Share2, PenLine, Award, Plus, ToggleLeft, ToggleRight,
} from "lucide-react";
import { SERVICE_DEFAULTS } from "@/lib/service-defaults";

export const dynamic = "force-dynamic";

// ── Icon map for known slugs ──────────────────────────────────────────────────
const SLUG_ICONS: Record<string, React.ReactNode> = {
  websites:          <Globe size={18} />,
  seo:               <Search size={18} />,
  marketing:         <Megaphone size={18} />,
  "social-media":    <Share2 size={18} />,
  "content-writing": <PenLine size={18} />,
  "brand-presence":  <Award size={18} />,
};
const SLUG_COLORS: Record<string, string> = {
  websites:          "text-blue-400",
  seo:               "text-green-400",
  marketing:         "text-orange-400",
  "social-media":    "text-pink-400",
  "content-writing": "text-yellow-400",
  "brand-presence":  "text-purple-400",
};

export default async function AdminServicesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  const session = token ? decryptSession(token) : null;
  if (!session || new Date(session.expiresAt) < new Date()) redirect("/admin/login");

  await connectDB();

  // Fetch ALL service records from DB
  const dbRecords = await Service.find({})
    .select("slug title metaTitle metaDescription isActive updatedAt")
    .sort({ order: 1, createdAt: 1 })
    .lean() as any[];

  const dbMap = new Map(dbRecords.map((r) => [r.slug, r]));

  // Build a deduplicated list: all DB slugs + all hardcoded slugs not yet in DB
  const allSlugs = Array.from(
    new Set([
      ...dbRecords.map((r) => r.slug),
      ...Object.keys(SERVICE_DEFAULTS),
    ])
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ArrowLeft size={16} className="text-muted-foreground" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Service Pages</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Edit content, SEO &amp; copy for each service page. New slugs go live instantly.
                </p>
              </div>
            </div>

            {/* New Service Button */}
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus size={15} /> New Service
            </Link>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allSlugs.map((slug) => {
            const db = dbMap.get(slug);
            const hasEdits = !!db;
            const isActive = db ? db.isActive !== false : true; // default active
            const icon = SLUG_ICONS[slug] ?? <Globe size={18} />;
            const color = SLUG_COLORS[slug] ?? "text-primary";
            const displayTitle =
              db?.title || SERVICE_DEFAULTS[slug]?.hero.name ||
              slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

            return (
              <div
                key={slug}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${color}`}>
                    {icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {hasEdits ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                        <CheckCircle2 size={10} /> Customised
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        <Clock size={10} /> Default
                      </span>
                    )}
                    {hasEdits && !isActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground mb-1">{displayTitle}</h3>
                <p className="text-[10px] font-mono text-muted-foreground mb-1">/services/{slug}</p>

                {db?.metaTitle ? (
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {db.metaTitle}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground italic mb-4">No custom meta title yet</p>
                )}

                {db?.updatedAt && (
                  <p className="text-[10px] text-muted-foreground mb-3">
                    Last saved:{" "}
                    {new Date(db.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
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
          Changes saved to MongoDB are reflected immediately on the frontend. Hardcoded defaults are
          always preserved as fallback for uncustomised fields.
        </p>
      </div>
    </div>
  );
}
