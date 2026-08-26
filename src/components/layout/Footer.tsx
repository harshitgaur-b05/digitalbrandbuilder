import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-secondary border-t border-sage-soft/10 py-16 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-brand-text/5">
          
          {/* Logo & About Info (Column span 5) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="mb-6 inline-block">
              <span className="font-sans text-xl font-bold tracking-tight text-brand-text lowercase">
                digital<span className="font-normal text-sage-deep">brand<span className="font-light text-brand-muted">builder</span></span>
              </span>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed max-w-sm mb-6">
              We turn Indian local businesses and growing D2C brands into digital leaders that get found, trusted, and chosen online. 
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-brand-muted font-medium">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-sage-deep" />
                <a href="mailto:hello@digitalbrandbuilder.in" className="hover:text-brand-text transition-colors">hello@digitalbrandbuilder.in</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-sage-deep" />
                <a href="tel:+919876543210" className="hover:text-brand-text transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-sage-deep" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Solutions (Column span 3) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li><a href="#solutions" className="hover:text-brand-text transition-colors">Web Design</a></li>
              <li><a href="#solutions" className="hover:text-brand-text transition-colors">Search Engine Optimization</a></li>
              <li><a href="#solutions" className="hover:text-brand-text transition-colors">Performance Marketing</a></li>
              <li><a href="#solutions" className="hover:text-brand-text transition-colors">Social Content Engines</a></li>
            </ul>
          </div>

          {/* Quick Links: Industries (Column span 2) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">Industries</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li><a href="#industries" className="hover:text-brand-text transition-colors">Fashion & D2C</a></li>
              <li><a href="#industries" className="hover:text-brand-text transition-colors">Local Services</a></li>
              <li><a href="#industries" className="hover:text-brand-text transition-colors">Manufacturing</a></li>
              <li><a href="#industries" className="hover:text-brand-text transition-colors">Furniture & Shops</a></li>
            </ul>
          </div>

          {/* Quick Links: Company (Column span 2) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li><a href="#how-it-works" className="hover:text-brand-text transition-colors">How It Works</a></li>
              <li><a href="#results" className="hover:text-brand-text transition-colors">Case Studies</a></li>
              <li><a href="#login" className="hover:text-brand-text transition-colors">Portal Login</a></li>
              <li><a href="#cta" className="hover:text-brand-text transition-colors font-medium text-sage-deep">Start Journey</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright/legal (Column span 12) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-brand-muted">
            &copy; {new Date().getFullYear()} digitalbrandbuilder. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-xs text-brand-muted">
            <a href="#privacy" className="hover:text-brand-text transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-text transition-colors">Terms of Service</a>
            <a href="#sitemap" className="hover:text-brand-text transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
