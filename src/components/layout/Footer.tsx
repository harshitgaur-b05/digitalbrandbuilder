import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-16 relative overflow-hidden z-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-border">
          
          {/* Logo & About Info (Column span 5) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
              <img src="/logo.png" alt="Digital Brand Builder Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-sans text-xl font-bold tracking-tight text-foreground lowercase">
                digital<span className="font-normal text-primary">brand<span className="font-light text-muted-foreground">builder</span></span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
              We turn Indian local businesses and growing D2C brands into digital leaders that get found, trusted, and chosen online. 
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <a href="tel:+918285321936" className="hover:text-foreground transition-colors">+91 82853 21936</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Solutions (Column span 3) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#solutions" className="hover:text-foreground transition-colors">Web Design</a></li>
              <li><a href="#solutions" className="hover:text-foreground transition-colors">Search Engine Optimization</a></li>
              <li><a href="#solutions" className="hover:text-foreground transition-colors">Performance Marketing</a></li>
              <li><a href="#solutions" className="hover:text-foreground transition-colors">Social Content Engines</a></li>
            </ul>
          </div>

          {/* Quick Links: Industries (Column span 2) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-xs font-bold tracking-widest text-foreground uppercase mb-4">Industries</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#industries" className="hover:text-foreground transition-colors">Fashion & D2C</a></li>
              <li><a href="#industries" className="hover:text-foreground transition-colors">Local Services</a></li>
              <li><a href="#industries" className="hover:text-foreground transition-colors">Manufacturing</a></li>
              <li><a href="#industries" className="hover:text-foreground transition-colors">Furniture & Shops</a></li>
            </ul>
          </div>


        </div>

        {/* Bottom copyright/legal (Column span 12) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} digitalbrandbuilder. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#sitemap" className="hover:text-foreground transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
