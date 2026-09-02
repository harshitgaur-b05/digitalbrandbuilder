"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Save, Plus, X,
  Globe, Search, Megaphone, Share2, PenLine, Award, Layers,
  ArrowLeft, ExternalLink, RotateCcw, Loader2, CheckCircle2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface HeroData {
  name: string; tagline: string; subtitle: string;
  primaryCtaText: string; primaryCtaHref: string;
  secondaryCtaText: string; secondaryCtaHref: string;
}
interface PointItem   { title: string; desc: string; }
interface OfferingItem { title: string; desc: string; }
interface ProcessStep { title: string; desc: string; }
interface FaqItem     { question: string; answer: string; }

export interface ServiceEditorData {
  title: string;
  metaTitle: string;
  metaDescription: string;
  schemaData: string;
  isActive: boolean;
  hero: HeroData;
  whatIsHeading: string;
  whatIsPrimary: string;
  whatIsSecondary: string;
  whyHeading: string;
  whyIntro: string;
  whyPoints: PointItem[];
  offeringsHeading: string;
  offeringsItems: OfferingItem[];
  processHeading: string;
  processSteps: ProcessStep[];
  deliverables: string[];
  whyUsHeading: string;
  whyUsItems: PointItem[];
  costHeading: string;
  costItems: PointItem[];
  faqHeading: string;
  faqItems: FaqItem[];
  leadFormHeading: string;
  leadFormSubtitle: string;
  leadFormHighlights: PointItem[];
  leadFormCtaLabel: string;
  whatsappMessage: string;
}

const TABS = ["SEO & Meta", "Hero", "Content", "Deliverables", "FAQ", "Lead Form"] as const;
type Tab = typeof TABS[number];

// Generic icon fallback for custom/unknown slugs
const SLUG_ICONS: Record<string, React.ReactNode> = {
  websites:          <Globe size={16} />,
  seo:               <Search size={16} />,
  marketing:         <Megaphone size={16} />,
  "social-media":    <Share2 size={16} />,
  "content-writing": <PenLine size={16} />,
  "brand-presence":  <Award size={16} />,
};
function getSlugIcon(slug: string): React.ReactNode {
  return SLUG_ICONS[slug] ?? <Layers size={16} />;
}

// ── Field helpers ─────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false, rows = 3, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; rows?: number; placeholder?: string;
}) {
  const cls = "w-full px-3 py-2.5 text-sm rounded-xl border border-border bg-background/60 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors resize-none";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      {multiline
        ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

function StringList({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
        <button type="button" onClick={() => onChange([...items, ""])} className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
          <Plus size={12} /> Add
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={e => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
            className="flex-1 px-3 py-2 text-sm rounded-xl border border-border bg-background/60 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
          />
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="w-8 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:border-red-400 hover:text-red-400 transition-colors">
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}

function PointList({ label, items, onChange }: { label: string; items: PointItem[]; onChange: (items: PointItem[]) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
        <button type="button" onClick={() => onChange([...items, { title: "", desc: "" }])} className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
          <Plus size={12} /> Add
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="bg-muted/40 rounded-xl p-4 flex flex-col gap-3 relative">
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-red-400 hover:text-red-400 transition-colors">
            <X size={12} />
          </button>
          <Field label={`#${i + 1} Title`} value={item.title} onChange={v => { const n = [...items]; n[i] = { ...n[i], title: v }; onChange(n); }} />
          <Field label="Description" value={item.desc} onChange={v => { const n = [...items]; n[i] = { ...n[i], desc: v }; onChange(n); }} multiline rows={2} />
        </div>
      ))}
    </div>
  );
}

function FaqList({ items, onChange }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">FAQ Items</label>
        <button type="button" onClick={() => onChange([...items, { question: "", answer: "" }])} className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
          <Plus size={12} /> Add Q&amp;A
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="bg-muted/40 rounded-xl p-4 flex flex-col gap-3 relative">
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-red-400 hover:text-red-400 transition-colors">
            <X size={12} />
          </button>
          <Field label={`Q${i + 1} Question`} value={item.question} onChange={v => { const n = [...items]; n[i] = { ...n[i], question: v }; onChange(n); }} />
          <Field label="Answer" value={item.answer} onChange={v => { const n = [...items]; n[i] = { ...n[i], answer: v }; onChange(n); }} multiline rows={3} />
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ServiceEditorClient({
  slug,
  initial,
  isNew = false,
}: {
  slug: string;
  initial: ServiceEditorData;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<ServiceEditorData>(initial);
  const [activeTab, setActiveTab] = useState<Tab>("SEO & Meta");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const set = useCallback(<K extends keyof ServiceEditorData>(key: K, val: ServiceEditorData[K]) => {
    setData(prev => ({ ...prev, [key]: val }));
  }, []);

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      let schemaData = null;
      if (data.schemaData.trim()) {
        try { schemaData = JSON.parse(data.schemaData); } catch { /* ignore */ }
      }

      const payload = {
        title: data.title,
        isActive: data.isActive,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        schemaData,
        heroSection: {
          name: data.hero.name,
          tagline: data.hero.tagline,
          subtitle: data.hero.subtitle,
          primaryCta:   { text: data.hero.primaryCtaText,   href: data.hero.primaryCtaHref },
          secondaryCta: { text: data.hero.secondaryCtaText, href: data.hero.secondaryCtaHref },
        },
        whatIsSection:     { heading: data.whatIsHeading,   primary: data.whatIsPrimary,  secondary: data.whatIsSecondary },
        whyMattersSection: { heading: data.whyHeading,      intro: data.whyIntro,         points: data.whyPoints },
        servicesSection:   { heading: data.offeringsHeading, items: data.offeringsItems },
        processSection:    { heading: data.processHeading,  steps: data.processSteps },
        deliverables: data.deliverables,
        whyUsSection:    { heading: data.whyUsHeading,   items: data.whyUsItems },
        inactionSection: { heading: data.costHeading,    items: data.costItems },
        faq: data.faqItems.map(f => ({ q: f.question, a: f.answer })),
        faqSection: { heading: data.faqHeading },
        leadFormSection: {
          heading:    data.leadFormHeading,
          subtitle:   data.leadFormSubtitle,
          highlights: data.leadFormHighlights,
          ctaLabel:   data.leadFormCtaLabel,
        },
        whatsappMessage: data.whatsappMessage,
      };

      const res = await fetch(`/api/admin/services/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
      if (isNew) {
        // After first save of a new service, navigate to the proper editor URL
        router.replace(`/admin/services/${slug}`);
      } else {
        router.refresh();
      }
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleReset = async () => {
    if (!confirm("Reset this service page to default content? Your custom edits will be deleted from the database.")) return;
    await fetch(`/api/admin/services/${slug}`, { method: "DELETE" });
    router.push("/admin/services");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background font-sans">

      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border px-4 md:px-8 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
        >
          <ArrowLeft size={15} className="text-muted-foreground" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <div className="text-primary">{getSlugIcon(slug)}</div>
          <h1 className="text-base font-bold text-foreground truncate">{data.title || slug}</h1>
          <span className="hidden sm:block text-xs font-mono text-muted-foreground">— /services/{slug}</span>
          {isNew && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 shrink-0">
          {/* Active toggle */}
          <button
            type="button"
            onClick={() => set("isActive", !data.isActive)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
              data.isActive
                ? "border-green-500/40 text-green-500 hover:bg-green-500/10"
                : "border-red-400/40 text-red-400 hover:bg-red-400/10"
            }`}
            title={data.isActive ? "Page is live — click to hide" : "Page is hidden — click to publish"}
          >
            {data.isActive ? "Live" : "Hidden"}
          </button>

          <a
            href={`/services/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <ExternalLink size={12} /> Preview
          </a>

          {!isNew && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-400/40 text-xs font-semibold text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              saveStatus === "saved"  ? "bg-green-500 text-white" :
              saveStatus === "error"  ? "bg-red-500 text-white"   :
              "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {saveStatus === "saving" ? <><Loader2 size={13} className="animate-spin" /> Saving...</>  :
             saveStatus === "saved"  ? <><CheckCircle2 size={13} /> Saved!</>                         :
             saveStatus === "error"  ? "Error — Retry"                                                :
             <><Save size={13} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto p-4 md:p-8">

        {/* Tab Nav */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl mb-6 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">

          {/* SEO & Meta */}
          {activeTab === "SEO & Meta" && (
            <>
              <Field label="Page Title (for admin list)" value={data.title} onChange={v => set("title", v)} placeholder="e.g. Website Design" />

              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="text-sm font-bold text-foreground">SEO Meta Tags</h3>
                <Field label="Meta Title" value={data.metaTitle} onChange={v => set("metaTitle", v)} placeholder="50–60 characters recommended" />
                <p className="text-[10px] text-muted-foreground -mt-2">Currently: {data.metaTitle.length} chars</p>
                <Field label="Meta Description" value={data.metaDescription} onChange={v => set("metaDescription", v)} multiline rows={3} placeholder="120–160 characters recommended" />
                <p className="text-[10px] text-muted-foreground -mt-2">Currently: {data.metaDescription.length} chars</p>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="text-sm font-bold text-foreground">Schema / Structured Data (JSON-LD)</h3>
                <p className="text-xs text-muted-foreground">Paste valid JSON-LD for rich snippets. Leave blank if not needed.</p>
                <Field label="Schema JSON" value={data.schemaData} onChange={v => set("schemaData", v)} multiline rows={8} placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Service"\n}'} />
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-bold text-foreground mb-3">Page Visibility</h3>
                <div className="flex items-center justify-between bg-muted/40 rounded-xl p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {data.isActive ? "Page is Live" : "Page is Hidden"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {data.isActive
                        ? "Visitors can access /services/" + slug
                        : "Page returns 404 for visitors"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => set("isActive", !data.isActive)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      data.isActive
                        ? "bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500/20"
                        : "bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20"
                    }`}
                  >
                    {data.isActive ? "Set as Hidden" : "Set as Live"}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Hero */}
          {activeTab === "Hero" && (
            <>
              <h3 className="text-sm font-bold text-foreground">Hero Section</h3>
              <Field label="Service Name (giant H1 heading)" value={data.hero.name} onChange={v => set("hero", { ...data.hero, name: v })} placeholder="e.g. Website Design & Development" />
              <Field label="Tagline (one-line value prop)" value={data.hero.tagline} onChange={v => set("hero", { ...data.hero, tagline: v })} />
              <Field label="Subtitle (descriptive paragraph)" value={data.hero.subtitle} onChange={v => set("hero", { ...data.hero, subtitle: v })} multiline rows={3} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Field label="Primary CTA Text" value={data.hero.primaryCtaText} onChange={v => set("hero", { ...data.hero, primaryCtaText: v })} placeholder="Start My Project" />
                <Field label="Primary CTA Link" value={data.hero.primaryCtaHref} onChange={v => set("hero", { ...data.hero, primaryCtaHref: v })} placeholder="#lead-form" />
                <Field label="Secondary CTA Text" value={data.hero.secondaryCtaText} onChange={v => set("hero", { ...data.hero, secondaryCtaText: v })} placeholder="Explore Our Approach" />
                <Field label="Secondary CTA Link" value={data.hero.secondaryCtaHref} onChange={v => set("hero", { ...data.hero, secondaryCtaHref: v })} placeholder="#approach" />
              </div>
              <div className="border-t border-border pt-6">
                <Field label="What Is — Section Heading" value={data.whatIsHeading} onChange={v => set("whatIsHeading", v)} />
                <div className="mt-4">
                  <Field label="Primary Description (bold)" value={data.whatIsPrimary} onChange={v => set("whatIsPrimary", v)} multiline rows={3} />
                </div>
                <div className="mt-4">
                  <Field label="Secondary Description (muted)" value={data.whatIsSecondary} onChange={v => set("whatIsSecondary", v)} multiline rows={4} />
                </div>
              </div>
            </>
          )}

          {/* Content */}
          {activeTab === "Content" && (
            <div className="space-y-8">
              <div>
                <Field label="Why It Matters — Heading" value={data.whyHeading} onChange={v => set("whyHeading", v)} />
                <div className="mt-4"><Field label="Why Intro" value={data.whyIntro} onChange={v => set("whyIntro", v)} multiline rows={2} /></div>
                <div className="mt-6"><PointList label="Why Points (numbered cards)" items={data.whyPoints} onChange={v => set("whyPoints", v)} /></div>
              </div>
              <div className="border-t border-border pt-6">
                <Field label="Offerings — Section Heading" value={data.offeringsHeading} onChange={v => set("offeringsHeading", v)} />
                <div className="mt-6"><PointList label="Offering Cards" items={data.offeringsItems} onChange={v => set("offeringsItems", v)} /></div>
              </div>
              <div className="border-t border-border pt-6">
                <Field label="Process — Section Heading" value={data.processHeading} onChange={v => set("processHeading", v)} />
                <div className="mt-6"><PointList label="Process Steps" items={data.processSteps} onChange={v => set("processSteps", v)} /></div>
              </div>
              <div className="border-t border-border pt-6">
                <Field label="Why Choose Us — Heading" value={data.whyUsHeading} onChange={v => set("whyUsHeading", v)} />
                <div className="mt-6"><PointList label="Why Us Cards" items={data.whyUsItems} onChange={v => set("whyUsItems", v)} /></div>
              </div>
              <div className="border-t border-border pt-6">
                <Field label="Cost of Inaction — Heading" value={data.costHeading} onChange={v => set("costHeading", v)} />
                <div className="mt-6"><PointList label="Inaction Cards" items={data.costItems} onChange={v => set("costItems", v)} /></div>
              </div>
            </div>
          )}

          {/* Deliverables */}
          {activeTab === "Deliverables" && (
            <StringList label="Deliverable Items" items={data.deliverables} onChange={v => set("deliverables", v)} />
          )}

          {/* FAQ */}
          {activeTab === "FAQ" && (
            <>
              <Field label="FAQ Section Heading" value={data.faqHeading} onChange={v => set("faqHeading", v)} />
              <div className="mt-2"><FaqList items={data.faqItems} onChange={v => set("faqItems", v)} /></div>
            </>
          )}

          {/* Lead Form */}
          {activeTab === "Lead Form" && (
            <div className="space-y-6">
              <Field label="Lead Form Heading" value={data.leadFormHeading} onChange={v => set("leadFormHeading", v)} />
              <Field label="Lead Form Subtitle" value={data.leadFormSubtitle} onChange={v => set("leadFormSubtitle", v)} multiline rows={2} />
              <Field label="Submit Button Label" value={data.leadFormCtaLabel} onChange={v => set("leadFormCtaLabel", v)} placeholder="Start My Project" />
              <div className="border-t border-border pt-6">
                <PointList label="Highlight Cards (left side)" items={data.leadFormHighlights} onChange={v => set("leadFormHighlights", v)} />
              </div>
              <div className="border-t border-border pt-6">
                <Field label="WhatsApp Pre-filled Message" value={data.whatsappMessage} onChange={v => set("whatsappMessage", v)} placeholder="Hello, I am interested in your service..." />
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Changes apply only after clicking <strong>Save Changes</strong>. Unsaved edits are lost on navigation.
        </p>
      </div>
    </div>
  );
}
