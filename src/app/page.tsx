import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBanner from "@/components/sections/TrustBanner";
import ProblemSection from "@/components/sections/ProblemSection";
import TransformationSection from "@/components/sections/TransformationSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CaseStudies from "@/components/sections/CaseStudies";
import TestimonialSection from "@/components/sections/TestimonialSection";
import BlogSection from "@/components/sections/BlogSection";
import AuditSection from "@/components/sections/AuditSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

// ── JSON-LD: Organization + LocalBusiness ────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://www.digitalbrandbuilder.in/#organization",
  name: "Digital Brand Builder",
  url: "https://www.digitalbrandbuilder.in",
  logo: {
    "@type": "ImageObject",
    url: "https://www.digitalbrandbuilder.in/logo.png",
    width: 200,
    height: 200,
  },
  description:
    "Digital Brand Builder is a digital marketing agency in New Delhi, India, providing website design, SEO, performance marketing, social media management, content writing, and brand identity services to local businesses and D2C brands.",
  telephone: "+918285321936",
  email: "hello@digitalbrandbuilder.in",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  serviceArea: {
    "@type": "City",
    name: "New Delhi",
  },
  foundingLocation: {
    "@type": "Place",
    name: "New Delhi, India",
  },
  knowsAbout: [
    "Digital Marketing",
    "Search Engine Optimization",
    "Website Design",
    "Performance Marketing",
    "Social Media Marketing",
    "Content Writing",
    "Brand Identity",
    "Google Ads",
    "Meta Ads",
    "Local SEO",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Design & Development",
          url: "https://www.digitalbrandbuilder.in/services/websites",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO, AEO & GEO",
          url: "https://www.digitalbrandbuilder.in/services/seo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Performance Marketing",
          url: "https://www.digitalbrandbuilder.in/services/marketing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Social Media Marketing",
          url: "https://www.digitalbrandbuilder.in/services/social-media",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Content Writing",
          url: "https://www.digitalbrandbuilder.in/services/content-writing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Presence & Identity",
          url: "https://www.digitalbrandbuilder.in/services/brand-presence",
        },
      },
    ],
  },
  // Add your real social profiles here when available:
  sameAs: [
    // "https://www.instagram.com/digitalbrandbuilder",
    // "https://www.linkedin.com/company/digitalbrandbuilder",
    // "https://twitter.com/digitalbrandbuilder",
  ],
};

// ── JSON-LD: WebSite ─────────────────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.digitalbrandbuilder.in/#website",
  url: "https://www.digitalbrandbuilder.in",
  name: "Digital Brand Builder",
  description:
    "Digital marketing agency in New Delhi helping local businesses and D2C brands build stronger digital brands.",
  publisher: { "@id": "https://www.digitalbrandbuilder.in/#organization" },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://www.digitalbrandbuilder.in/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500 antialiased">
        {/* Navigation */}
        <Navbar />

        {/* Main Contents */}
        <main className="flex-grow">
          {/* SECTION 1 - HERO */}
          <Hero />

          {/* SECTION 2 - TRUST / RELEVANCE */}
          <TrustBanner />

          {/* SECTION 3 - THE PROBLEM */}
          <ProblemSection />

          {/* SECTION 4 - TRANSFORMATION */}
          <TransformationSection />

          {/* SECTION 5 - SERVICES */}
          <ServicesSection />

          {/* SECTION 6 - HOW IT WORKS */}
          <ProcessSection />

          {/* SECTION 7 - PROOF / CASE STUDIES */}
          <CaseStudies />

          {/* SECTION 8 - TESTIMONIALS */}
          <TestimonialSection />

          {/* SECTION 9 - BLOG */}
          <BlogSection />

          {/* SECTION 10 - FREE AUDIT */}
          <AuditSection />

          {/* SECTION 11 - FINAL CTA */}
          <FinalCTA />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
