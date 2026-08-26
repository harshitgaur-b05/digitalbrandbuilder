"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-4 bg-brand-bg/90 backdrop-blur-md border-b border-sage-soft/10 shadow-xs" 
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center z-50" aria-label="digitalbrandbuilder homepage">
          <span className="font-sans text-xl font-bold tracking-tight text-brand-text lowercase">
            digital<span className="font-normal text-sage-deep">brand<span className="font-light text-brand-muted">builder</span></span>
          </span>
        </Link>

        {/* Middle: Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          <a href="#solutions" className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-text hover:after:w-full after:transition-all after:duration-300">Solutions</a>
          <a href="#industries" className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-text hover:after:w-full after:transition-all after:duration-300">Industries</a>
          <a href="#how-it-works" className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-text hover:after:w-full after:transition-all after:duration-300">How It Works</a>
          <a href="#results" className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-text hover:after:w-full after:transition-all after:duration-300">Results</a>
        </nav>

        {/* Right: Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="#login" className="text-sm font-medium text-brand-text hover:text-sage-deep transition-colors py-2 px-3">Login</a>
          <a href="#cta" className="inline-flex items-center gap-2 bg-brand-text text-brand-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-sage-deep hover:-translate-y-px transition-all duration-300 group">
            Build My Digital Brand
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="block lg:hidden bg-transparent border-none cursor-pointer text-brand-text z-50 p-2 focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-brand-bg z-45 flex items-center justify-center transition-all duration-500 ease-in-out ${
        mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}>
        <nav className="flex flex-col items-center gap-6 text-center" aria-label="Mobile Navigation">
          <a href="#solutions" className="text-2xl font-normal text-brand-text hover:text-sage-deep transition-colors" onClick={() => setMobileMenuOpen(false)}>Solutions</a>
          <a href="#industries" className="text-2xl font-normal text-brand-text hover:text-sage-deep transition-colors" onClick={() => setMobileMenuOpen(false)}>Industries</a>
          <a href="#how-it-works" className="text-2xl font-normal text-brand-text hover:text-sage-deep transition-colors" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#results" className="text-2xl font-normal text-brand-text hover:text-sage-deep transition-colors" onClick={() => setMobileMenuOpen(false)}>Results</a>
          
          <div className="flex flex-col items-center gap-4 mt-8">
            <a href="#login" className="text-lg font-medium text-brand-text" onClick={() => setMobileMenuOpen(false)}>Login</a>
            <a href="#cta" className="inline-flex items-center gap-2 bg-brand-text text-brand-bg px-8 py-4 rounded-full text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
              Build My Digital Brand
              <ArrowRight size={18} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
