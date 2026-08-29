import { Metadata } from "next";
import ServicePageShell, { ServicePageData } from "../_components/ServicePageShell";

export const metadata: Metadata = {
  title: "Brand Strategy & Identity Services | digitalbrandbuilder",
  description: "Create a consistent and memorable brand identity. Brand strategy, logo design, visual style guides, and typography systems.",
};

const brandData: ServicePageData = {
  hero: {
    name: "Brand Presence",
    tagline: "Build a memorable and consistent brand identity.",
    subtitle: "Create a professional identity, strengthen brand recognition, build customer trust, and make your business stand out across every digital touchpoint with brand presence services.",
    primaryCta: { text: "Get Free Brand Consultation", href: "#lead-form" },
    secondaryCta: { text: "Explore Our Approach", href: "#approach" }
  },
  whatIs: {
    heading: "Brand Presence",
    primary: "Brand presence is how your business is recognized, perceived, and remembered by customers across online and offline touchpoints. It includes your visual identity, messaging, website, social media, content, customer experience, and the way your brand communicates with its audience.",
    secondary: "At Digital Brand Builder, we help businesses create a strong and consistent brand presence that communicates who they are, what they offer, and why customers should choose them. A strong brand presence goes beyond having a logo. It brings together visual identity, brand messaging, typography, design systems, content, digital experiences, and customer touchpoints into one recognizable brand."
  },
  why: {
    heading: "Why Brand Presence Matters for Modern Businesses",
    intro: "Customers interact with brands across websites, Google Search, social media, advertisements, marketplaces, emails, and other digital platforms. When your brand looks and communicates differently across each channel, it can create confusion and reduce trust. Digital Brand Builder creates cohesive brand systems that help businesses communicate consistently, look professional, and build stronger connections with their audiences.",
    points: [
      { title: "Build Brand Recognition", desc: "Create a recognizable identity that helps customers remember your business across different platforms." },
      { title: "Strengthen Customer Trust", desc: "A professional and consistent brand presence creates confidence and credibility throughout the customer journey." },
      { title: "Stand Out From Competitors", desc: "Develop a distinctive visual and communication style that helps your business differentiate itself in a crowded market." },
      { title: "Communicate Your Value", desc: "Use clear messaging and visual storytelling to communicate what your business offers and why it matters." },
      { title: "Create Brand Consistency", desc: "Maintain a unified brand experience across your website, social media, advertising, content, and other customer touchpoints." },
      { title: "Support Business Growth", desc: "Build a flexible brand foundation that can evolve as your business, products, services, and audience grow." }
    ]
  },
  offerings: {
    heading: "Everything Included in Our Brand Presence Service",
    items: [
      { title: "Brand Strategy", desc: "Define your brand positioning, audience, personality, messaging, values, and overall direction to create a clear foundation for your brand." },
      { title: "Logo & Visual Identity", desc: "Create a professional visual identity including logo direction, typography, imagery, design elements, and visual guidelines." },
      { title: "Brand Guidelines", desc: "Develop clear guidelines that help maintain consistency across digital and offline communication." },
      { title: "Brand Messaging", desc: "Create clear and consistent messaging that communicates your value proposition and connects with your target audience." },
      { title: "Digital Brand Identity", desc: "Align your website, social media, advertising, content, and digital assets with a consistent brand identity." },
      { title: "Brand Refresh & Rebranding", desc: "Modernize an existing brand identity while maintaining valuable brand recognition and creating a stronger market position." }
    ]
  },
  process: {
    heading: "Our Brand Presence Process",
    steps: [
      { title: "Discovery & Brand Research", desc: "We understand your business, audience, competitors, existing brand identity, market position, and growth objectives." },
      { title: "Brand Strategy", desc: "We define your positioning, audience, personality, messaging direction, and visual identity requirements." },
      { title: "Identity Development", desc: "We develop the visual and communication elements required to create a consistent and recognizable brand." },
      { title: "Brand Application", desc: "We apply your brand identity across your website, social media, marketing materials, advertising, and other relevant digital touchpoints." },
      { title: "Launch & Brand Support", desc: "We provide the required brand assets and guidelines while supporting the consistent implementation of your new or refreshed identity." }
    ]
  },
  deliverables: [
    "Strategic Brand Positioning & Blueprint",
    "Custom Logo Design & Vector Variations",
    "Calibrated Typography & Type Scale Guides",
    "Harmonized Color Palette Selection & Specifications",
    "Comprehensive Visual Brand Guidelines",
    "Core Brand Messaging & Value Propositions",
    "Social Media Design Templates & Layout Guides",
    "Digital Brand Asset Integration (Website & Email)",
    "Custom Marketing & Print Collateral Assets",
    "Ongoing Implementation Support & Consulting"
  ],
  whyUs: {
    heading: "The Difference Digital Brand Builder Brings",
    items: [
      { title: "Strategy First", desc: "We start by understanding your business, audience, competitors, positioning, and long-term goals." },
      { title: "Consistency Everywhere", desc: "We create systems that keep your brand identity and messaging consistent across every relevant customer touchpoint." },
      { title: "Built for Growth", desc: "Your brand identity is designed to remain flexible as your business expands into new products, services, markets, and platforms." },
      { title: "Digital-First Approach", desc: "Your brand is designed to work effectively across modern digital platforms and customer touchpoints." },
      { title: "Consistent Brand Experience", desc: "Create a recognizable identity that remains consistent wherever customers interact with your business." },
      { title: "Audience-Centric Positioning", desc: "Your brand is developed around the people you want to reach, not simply what your business wants to say." }
    ]
  },
  costOfInaction: {
    heading: "What Inaction Costs You",
    items: [
      { title: "Customers Don't Remember You", desc: "Without a recognizable identity, your business can become difficult to distinguish from competitors." },
      { title: "Inconsistent Brand Experience", desc: "Different designs, messaging, and visuals across platforms can create confusion and reduce credibility." },
      { title: "Weak First Impressions", desc: "An outdated or unprofessional brand presence can influence how potential customers perceive the quality of your business." }
    ]
  },
  faq: {
    heading: "Everything You Need to Know",
    items: [
      { question: "What is included in a visual identity package?", answer: "Our visual identity package includes logo design (primary, secondary, and sub-marks), color palette guidelines, typography selection, visual element templates, asset guidelines, and social media layout templates." },
      { question: "We already have a logo. Can you help us clean it up?", answer: "Yes, absolutely. We offer brand refresh services where we modernize, refine, and vectorize existing logos while preserving your core brand recognition and company history." },
      { question: "What are Brand Guidelines, and why do we need them?", answer: "Brand Guidelines are a rulebook explaining how to use your brand assets. They ensure that internal teams, external agencies, and print shops use the correct colors, fonts, margins, and logos consistently." },
      { question: "How long does a rebranding project take?", answer: "Rebranding or developing a new visual identity system typically takes 3 to 6 weeks, covering research, creative strategy, logo concepts, revisions, asset creation, and guideline packaging." }
    ]
  },
  leadForm: {
    heading: "Ready to Build a Brand People Remember?",
    subtitle: "Define your strategic positioning, polish your visual assets, and establish a professional, consistent digital brand presence.",
    highlights: [
      { title: "Fully customized brand assets", desc: "Tailored specifically around your positioning and business goals." },
      { title: "Complete digital and print guidelines", desc: "Rules and formats optimized for all touchpoints." },
      { title: "Strategic positioning foundation", desc: "A brand identity built on research, audience understanding, and value." }
    ],
    ctaLabel: "Build My Brand Presence"
  },
  whatsappMessage: "Hello digitalbrandbuilder, I'm interested in your Brand Presence Services!"
};

export default function BrandPresencePage() {
  return <ServicePageShell data={brandData} />;
}
