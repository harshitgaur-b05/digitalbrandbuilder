"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  // Derive active index from current route; default to 0 (Home) if no match
  const activeIndex = Math.max(
    navLinks.findIndex((l) => l.href === pathname),
    0
  );

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
        <Link href="/" className="flex items-center z-50" aria-label="digitalbrandbuilder homepage">
          <span className="font-sans text-xl font-bold tracking-tight text-foreground lowercase">
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
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-80 hover:-translate-y-px transition-all duration-300 group"
          >
            Build My Brand
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="block lg:hidden bg-transparent border-none cursor-pointer text-foreground z-50 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-background z-40 flex items-center justify-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-7 text-center" aria-label="Mobile Navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-3xl font-normal transition-colors ${
                pathname === href ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-4">
            <AnimatedThemeToggler variant="star" />
          </div>
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
