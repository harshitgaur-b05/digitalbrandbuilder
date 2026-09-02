import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-16 relative overflow-hidden z-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-border">

          {/* Logo & About Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Digital Brand Builder Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-sans text-xl font-bold tracking-tight text-foreground lowercase">
                digital
                <span className="font-normal text-primary">brand</span>
                <span className="font-light text-muted-foreground">builder</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
              We turn Indian local businesses and growing D2C brands into digital leaders
              that get found, trusted, and chosen online.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <a href="tel:+919211074113" className="hover:text-foreground transition-colors">
                  +91 92110 74113
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary" />
                <a href="mailto:hello@digitalbrandbuilder.in" className="hover:text-foreground transition-colors">
                  hello@digitalbrandbuilder.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/services/websites" className="hover:text-foreground transition-colors">
                  Web Design &amp; Development
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-foreground transition-colors">
                  SEO &amp; AI Search
                </Link>
              </li>
              <li>
                <Link href="/services/marketing" className="hover:text-foreground transition-colors">
                  Performance Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/social-media" className="hover:text-foreground transition-colors">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link href="/services/content-writing" className="hover:text-foreground transition-colors">
                  Content Writing
                </Link>
              </li>
              <li>
                <Link href="/services/brand-presence" className="hover:text-foreground transition-colors">
                  Brand Presence
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/free-audit" className="hover:text-foreground transition-colors">
                  Free Audit
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright/legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Digital Brand Builder. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
