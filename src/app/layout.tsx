import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "digitalbrandbuilder | Premium Digital Growth Partner for Growing Brands",
  description: "We don't just build websites. We turn local businesses and growing brands into digital brands that get found, trusted, and chosen online. Websites, SEO, Performance Marketing, and Social Media.",
  metadataBase: new URL("https://digitalbrandbuilder.in"),
  openGraph: {
    title: "digitalbrandbuilder | Turn Your Business Into A Digital Brand",
    description: "Premium digital presence for local businesses and D2C brands. Websites, SEO, performance marketing, and social media integrated into one powerful growth engine.",
    url: "https://digitalbrandbuilder.in",
    siteName: "digitalbrandbuilder",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "digitalbrandbuilder | Premium Digital Growth Partner",
    description: "We turn local businesses and growing brands into digital brands that get found, trusted, and chosen online.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
