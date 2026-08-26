"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3.5 bg-[#F3F1EB]/90 backdrop-blur-md border-b border-sage-soft/15 shadow-xs"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center z-50" aria-label="digitalbrandbuilder homepage">
          <span className="font-sans text-xl font-bold tracking-tight text-brand-text lowercase">
            digital
            <span className="font-normal text-sage-deep">brand</span>
            <span className="font-light text-brand-muted">builder</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors relative py-1 
                after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-brand-text after:transition-all after:duration-300
                ${pathname === href
                  ? "text-brand-text after:w-full"
                  : "text-brand-muted hover:text-brand-text after:w-0 hover:after:w-full"
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-text text-[#F3F1EB] px-6 py-3 rounded-full text-sm font-medium hover:bg-sage-deep hover:-translate-y-px transition-all duration-300 group"
          >
            Build My Digital Brand
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="block lg:hidden bg-transparent border-none cursor-pointer text-brand-text z-50 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#F3F1EB] z-40 flex items-center justify-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-7 text-center" aria-label="Mobile Navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-3xl font-normal transition-colors ${
                pathname === href ? "text-sage-deep" : "text-brand-text hover:text-sage-deep"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-text text-[#F3F1EB] px-8 py-4 rounded-full text-base font-medium"
            >
              Build My Digital Brand
              <ArrowRight size={18} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
