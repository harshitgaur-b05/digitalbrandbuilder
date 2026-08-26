import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBanner from "@/components/sections/TrustBanner";
import ProblemSection from "@/components/sections/ProblemSection";
import TransformationSection from "@/components/sections/TransformationSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CaseStudies from "@/components/sections/CaseStudies";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text antialiased">
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

        {/* SECTION 7 - PROOF */}
        <CaseStudies />

        {/* SECTION 8 - FINAL CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
