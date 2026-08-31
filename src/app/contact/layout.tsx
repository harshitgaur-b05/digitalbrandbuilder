import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Digital Brand Builder",
  description: "Get in touch with Digital Brand Builder. We help Delhi businesses grow online with web design, SEO, and digital marketing. Book a free consultation today.",
  alternates: { canonical: "https://digitalbrandbuilder.in/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
