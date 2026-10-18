"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import GooeyNav from "@/components/layout/GooeyNav";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Derive active index from current route; default to 0 (Home) if no match.
  // Use startsWith so nested routes like /blog/my-post highlight "Blog".
  // Keep "/" as exact-only so it doesn't match every path.
  const activeIndex = (() => {
    const idx = navLinks.findIndex((l) =>
      l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
    );
    return idx >= 0 ? idx : 0;
  })();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change & prevent background scroll when open
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/95 backdrop-blur-xl border-b border-foreground/20 shadow-sm"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">

        {/* Brand Logo & Two-Line Wordmark */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 z-50 min-h-[48px] group" aria-label="Digital Brand Builder homepage">
          <Image
            src="/newlogo/android-chrome-192x192.png"
            alt="Digital Brand Builder Logo"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-xs"
            priority
          />
          <div className="flex flex-col justify-center leading-[0.86] select-none">
            <div className="font-[family-name:var(--font-polysans)] text-[19px] sm:text-[22px] font-black tracking-tight lowercase">
              <span className="text-foreground">digital </span>
              <span className="text-[var(--color-ember-orange)]">brand</span>
            </div>
            <span className="font-[family-name:var(--font-polysans)] text-[19px] sm:text-[22px] font-black tracking-tight text-foreground lowercase">
              builder
            </span>
          </div>
        </Link>

        {/* Desktop Nav — GooeyNav */}
        <div className="hidden lg:flex items-center">
          <GooeyNav
            items={navLinks}
            initialActiveIndex={activeIndex}
            animationTime={600}
            particleCount={15}
            particleR={80}
          />
        </div>

        {/* Desktop Right: Theme Toggler + CTA Button Block */}
        <div className="hidden lg:flex items-center gap-4">
          <AnimatedThemeToggler variant="star" />
          <div className="flex flex-col items-center gap-1">
            <Link
              href="/#audit"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-polysans)] bg-foreground text-background hover:bg-[var(--color-ember-orange)] hover:text-white px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all duration-200 group"
            >
              Claim Free Brand Audit
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+919211074113"
              className="text-[11px] font-mono font-semibold text-muted-foreground hover:text-[var(--color-ember-orange)] transition-colors tracking-wide text-center"
            >
              +91 92110 74113
            </a>
          </div>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex lg:hidden items-center gap-3 z-50">
          <AnimatedThemeToggler variant="star" />
          <button
            className="bg-transparent border-none cursor-pointer text-foreground p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-between pt-28 pb-12 px-6 transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-center w-full max-w-sm overflow-y-auto" aria-label="Mobile Navigation">
          {navLinks.map(({ label, href }) => {
            const isServices = label === "Services";
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <div key={href} className="flex flex-col items-center gap-2 w-full">
                <Link
                  href={href}
                  className={`font-sans text-xl font-bold uppercase tracking-wider py-2 min-h-[44px] flex items-center justify-center transition-colors w-full ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
                {isServices && (
                  <div className="grid grid-cols-2 gap-2 w-full pt-1 pb-3 px-2 bg-card/50 border border-border/50 rounded-2xl text-left">
                    <Link href="/services/websites" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5 min-h-[44px] flex items-center">Websites</Link>
                    <Link href="/services/seo" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5 min-h-[44px] flex items-center">SEO + GEO</Link>
                    <Link href="/services/marketing" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5 min-h-[44px] flex items-center">Performance</Link>
                    <Link href="/services/social-media" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5 min-h-[44px] flex items-center">Social Media</Link>
                    <Link href="/services/content-writing" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5 min-h-[44px] flex items-center">Content</Link>
                    <Link href="/services/brand-presence" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5 min-h-[44px] flex items-center">Brand PR</Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Thumb Zone CTA & Direct Call */}
        <div className="flex flex-col items-center gap-3 w-full max-w-sm pt-4 border-t border-border/50">
          <Link
            href="/#audit"
            className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background border-2 border-foreground px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-wider min-h-[48px] shadow-sm active:scale-95 transition-transform"
          >
            Claim Free Brand Audit
            <ArrowRight size={18} />
          </Link>
          <a
            href="tel:+919211074113"
            className="text-sm font-mono font-bold text-foreground/90 hover:text-primary transition-colors py-1 min-h-[44px] flex items-center"
          >
            📞 Call Us: +91 92110 74113
          </a>
        </div>
      </div>
    </header>
  );
}
