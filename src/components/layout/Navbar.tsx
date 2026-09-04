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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3.5 bg-background/90 backdrop-blur-md border-b border-border shadow-xs dark:shadow-[0_4px_30px_rgba(43,158,220,0.15)]"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50" aria-label="digitalbrandbuilder homepage">
          <Image
            src="/logo.png"
            alt="Digital Brand Builder Logo"
            width={32}
            height={32}
            className="rounded-lg"
            priority
          />
          <span className="font-sans text-xl font-bold tracking-tight text-foreground lowercase hidden sm:inline-block">
            digital
            <span className="font-normal text-primary">brand</span>
            <span className="font-light text-muted-foreground">builder</span>
          </span>
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

        {/* Desktop Right: Theme Toggler + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <AnimatedThemeToggler variant="star" />
          <div className="flex flex-col items-center gap-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-80 hover:-translate-y-px transition-all duration-300 group"
            >
              Build My Brand
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+919211074113"
              className="text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide"
            >
              +91 92110 74113
            </a>
          </div>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex lg:hidden items-center gap-3 z-50">
          <AnimatedThemeToggler variant="star" />
          <button
            className="bg-transparent border-none cursor-pointer text-foreground p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-background z-40 flex items-center justify-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-5 text-center" aria-label="Mobile Navigation">
          {navLinks.map(({ label, href }) => {
            const isServices = label === "Services";
            return (
              <div key={href} className="flex flex-col items-center gap-2">
                <Link
                  href={href}
                  className={`text-2xl font-normal transition-colors ${
                    (href === "/" ? pathname === "/" : pathname.startsWith(href))
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
                {isServices && (
                  <div className="flex flex-col gap-1.5 mt-0.5">
                    <Link href="/services/websites" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">Websites</Link>
                    <Link href="/services/seo" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">SEO + AEO + GEO</Link>
                    <Link href="/services/marketing" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">Performance Marketing</Link>
                    <Link href="/services/social-media" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">Social Media</Link>
                    <Link href="/services/content-writing" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">Content Writing</Link>
                    <Link href="/services/brand-presence" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">Brand Presence</Link>
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-base font-medium"
            >
              Build My Brand
              <ArrowRight size={18} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
