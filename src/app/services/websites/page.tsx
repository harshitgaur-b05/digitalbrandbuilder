import { Metadata } from "next";
import ServicePageShell, { ServicePageData } from "../_components/ServicePageShell";

export const metadata: Metadata = {
  title: "Website Design & Development Services | digitalbrandbuilder",
  description: "Build a high-performing, speed-optimized website with digitalbrandbuilder. Custom business websites, e-commerce stores, and conversion-focused landing pages.",
};

const websitesData: ServicePageData = {
  hero: {
    name: "Websites",
    tagline: "Build a high-performing website designed to generate results.",
    subtitle: "We build websites that do more than look professional. We combine fast load times, responsive code, conversion strategy, and SEO-friendly foundations to turn visitors into customers.",
    primaryCta: { text: "Start My Project", href: "#lead-form" },
    secondaryCta: { text: "Explore Our Approach", href: "#approach" }
  },
  whatIs: {
    heading: "Web Development",
    primary: "Web development is the process of designing, building, optimizing, and maintaining websites that deliver seamless user experiences while supporting your business goals.",
    secondary: "At Digital Brand Builder, we build websites that do more than look professional. We combine responsive development, performance optimization, user experience, security, scalability, and SEO-friendly foundations to create websites that work effectively across devices and help businesses turn online visitors into customers."
  },
  why: {
    heading: "Why Web Development Matters for Modern Businesses",
    intro: "Your website is often the first place potential customers interact with your brand. A slow, outdated, or difficult-to-use website can create a poor first impression and send potential customers to competitors.",
    points: [
      { title: "Build Brand Credibility", desc: "Create a professional digital presence that builds trust and communicates the quality of your business." },
      { title: "Improve User Experience", desc: "Give visitors a smooth, intuitive, and engaging browsing experience across every page." },
      { title: "Increase Conversions", desc: "Guide visitors toward meaningful actions such as enquiries, bookings, purchases, and lead submissions." },
      { title: "Mobile-First Accessibility", desc: "Deliver a seamless experience across smartphones, tablets, laptops, and desktop devices." },
      { title: "Better Search Visibility", desc: "Build SEO-friendly website structures that make it easier for search engines to crawl, understand, and index your content." },
      { title: "Support Business Growth", desc: "Create a flexible and scalable website that can adapt as your products, services, audience, and business grow." }
    ]
  },
  offerings: {
    heading: "Everything Included in Our Web Development Service",
    items: [
      { title: "Custom Website Development", desc: "Get a website built specifically around your business goals, target audience, brand identity, and customer journey." },
      { title: "Business Website Development", desc: "Build a professional business website that communicates your services, establishes credibility, and encourages potential customers to get in touch." },
      { title: "Ecommerce Development", desc: "Create user-friendly ecommerce websites designed to showcase products, simplify shopping, and support online sales." },
      { title: "Landing Page Development", desc: "Develop focused, conversion-oriented landing pages for lead generation, Google Ads, social media campaigns, product launches, and promotional campaigns." },
      { title: "Website Redesign", desc: "Transform an outdated website into a modern, responsive, user-friendly digital experience with improved design, functionality, speed, and usability." },
      { title: "Website Maintenance & Support", desc: "Keep your website secure, updated, functional, and performing efficiently with ongoing technical maintenance and support." }
    ]
  },
  process: {
    heading: "Our Web Development Process",
    steps: [
      { title: "Discovery & Planning", desc: "We understand your business, target audience, competitors, goals, website requirements, and customer journey before development begins." },
      { title: "Design & Wireframing", desc: "We create strategic page structures, wireframes, and visual concepts that establish a clear user experience and website direction." },
      { title: "Development", desc: "Our team builds your website with responsive layouts, optimized functionality, SEO-friendly structures, and the technical features your business needs." },
      { title: "Testing & Optimization", desc: "We test the website across devices and browsers while checking functionality, usability, speed, responsiveness, forms, links, and technical performance." },
      { title: "Launch & Support", desc: "Once everything is ready, we launch your website and provide ongoing support to help keep your digital platform secure, updated, and performing effectively." }
    ]
  },
  deliverables: [
    "Custom Website Design tailored to your brand",
    "Responsive HTML5/CSS3/JS mobile-optimized code",
    "SEO-friendly site architecture & structured data",
    "Performance & speed optimization for fast loading",
    "CMS integration (WordPress, Shopify, or Custom)",
    "Strategic contact forms & conversion funnels",
    "Security hardening & SSL configuration",
    "Google Analytics & search tracking setup",
    "Post-launch training & ongoing support"
  ],
  whyUs: {
    heading: "The Difference Digital Brand Builder Brings",
    items: [
      { title: "Custom-Built Solutions", desc: "Every website is developed around your business, customers, brand, and specific requirements." },
      { title: "Conversion-Focused Development", desc: "We structure websites to guide visitors toward enquiries, purchases, bookings, and other valuable actions." },
      { title: "Mobile-First Approach", desc: "Your website is designed and optimized to deliver a strong experience across mobile, tablet, and desktop." },
      { title: "SEO-Friendly Foundation", desc: "We build with search visibility in mind, including crawlability, structure, performance, and technical SEO considerations." },
      { title: "Transparent Communication", desc: "Stay informed throughout the project with clear communication, defined requirements, and regular progress updates." },
      { title: "Long-Term Support", desc: "Our relationship doesn't have to end after launch. We provide ongoing technical support and website maintenance to help your digital presence stay reliable." }
    ]
  },
  costOfInaction: {
    heading: "What Inaction Costs You",
    items: [
      { title: "Website Loads Too Slowly", desc: "Slow-loading pages can frustrate visitors, increase abandonment, and create a poor first impression of your brand." },
      { title: "Looks Broken on Mobile Screens", desc: "With customers browsing across different devices, a poor mobile experience can cost your business valuable enquiries and sales." },
      { title: "Visitors Do Not Convert Into Leads", desc: "If your website lacks clear messaging, strong calls to action, and an intuitive customer journey, visitors may leave without taking action." }
    ]
  },
  faq: {
    heading: "Everything You Need to Know",
    items: [
      { question: "How long does it take to build a website?", answer: "A typical business website takes 4-6 weeks from discovery to launch, depending on complexity, page count, and feature requirements. E-commerce sites and custom applications may take longer." },
      { question: "Will my website be mobile-friendly?", answer: "Yes, every website we build is fully responsive, meaning it automatically adjusts and displays beautifully on smartphones, tablets, laptops, and large desktop monitors." },
      { question: "Can I update the content on my website myself?", answer: "Absolutely. We integrate user-friendly content management systems (CMS) and provide walkthrough guides so you can easily update text, images, blogs, and products without any coding knowledge." },
      { question: "Do you offer web hosting and domain name support?", answer: "We assist you in selecting and setting up the best hosting environment and registering your domain. We also provide secure, high-performance hosting packages as part of our ongoing maintenance plans." }
    ]
  },
  leadForm: {
    heading: "Ready to Build a Website That Converts?",
    subtitle: "Transform your digital storefront, showcase your brand credibility, and convert more online visitors into customers.",
    highlights: [
      { title: "Custom layouts, no generic templates", desc: "Every page tailored to fit your specific customer journey." },
      { title: "Speed & performance hardened", desc: "Optimized code for low bounce rates and fast mobile loading." },
      { title: "Built with growth in mind", desc: "Configured for SEO, analytics, tracking, and future expansions." }
    ],
    ctaLabel: "Start My Web Development Project"
  },
  whatsappMessage: "Hello digitalbrandbuilder, I'm interested in your Web Development Services!"
};

export default function WebsitesPage() {
  return <ServicePageShell data={websitesData} />;
}
