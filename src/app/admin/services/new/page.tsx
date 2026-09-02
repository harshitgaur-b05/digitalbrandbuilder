"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  // Auto-generate a slug from the title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
    );
  };

  const handleCreate = async () => {
    setError("");
    if (!slug || !title) {
      setError("Both title and slug are required.");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setError("Slug must only contain lowercase letters, numbers, and hyphens.");
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create service.");
      // Navigate to the editor for the new slug
      router.push(`/admin/services/${slug}`);
    } catch (err: any) {
      setError(err.message);
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans">
      <div className="max-w-xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/services"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft size={16} className="text-muted-foreground" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create New Service Page</h1>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
          <p className="text-sm text-muted-foreground">
            Create a new service page. After creating, you will be taken to the editor where you can
            fill in all content, SEO tags, and settings.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Service Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="e.g. Email Marketing"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-border bg-background/60 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
            />
            <p className="text-[10px] text-muted-foreground">This will appear in the admin panel and as the default page heading.</p>
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono bg-muted px-3 py-2.5 rounded-xl border border-border whitespace-nowrap">
                /services/
              </span>
              <input
                type="text"
                value={slug}
                onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="email-marketing"
                className="flex-1 px-3 py-2.5 text-sm rounded-xl border border-border bg-background/60 text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">
              Only lowercase letters, numbers, and hyphens. This becomes the permanent URL.
            </p>
          </div>

          {slug && (
            <div className="bg-muted/40 rounded-xl px-4 py-3 text-sm text-muted-foreground">
              Page will be live at:{" "}
              <span className="font-mono text-foreground font-semibold">
                /services/{slug}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={handleCreate}
            disabled={creating || !slug || !title}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? (
              <><Loader2 size={15} className="animate-spin" /> Creating...</>
            ) : (
              <><Plus size={15} /> Create Service Page</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
