import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  variable: "--font-outfit",
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
      className={cn("h-full", "antialiased", outfit.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
