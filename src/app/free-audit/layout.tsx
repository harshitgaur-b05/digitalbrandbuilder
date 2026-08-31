import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Digital Audit | Digital Brand Builder",
  description: "Get a free digital audit for your business. We'll analyse your website, SEO, and online presence and show you exactly where you're losing customers.",
  alternates: { canonical: "https://digitalbrandbuilder.in/free-audit" },
};

export default function FreeAuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
