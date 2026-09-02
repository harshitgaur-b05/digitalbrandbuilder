import { Metadata } from "next";
import SeoServiceClient from "./SeoServiceClient";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const db = await Service.findOne({ slug: "seo" })
    .select("metaTitle metaDescription title heroSection")
    .lean() as any;

  const title = db?.metaTitle || db?.title || "SEO, AEO & GEO Services in Delhi | Digital Brand Builder";
  const description = db?.metaDescription || "Grow your business with expert SEO, Answer Engine Optimisation (AEO), and Generative Engine Optimisation (GEO). Improve rankings, visibility, and AI search presence.";

  return {
    title,
    description,
    alternates: { canonical: "https://www.digitalbrandbuilder.in/services/seo" },
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${title} — Digital Brand Builder`,
        },
      ],
    },
  };
}

const DEFAULT_SEO_DATA = {
  heroSection: {
    tag: "SEO, AEO & GEO",
    heading: "Drive more traffic, leads & revenue with advanced SEO, AEO & GEO strategies",
    subtitle: "Search is evolving faster than ever. Traditional rankings remain important, but today's customers also discover businesses through AI-powered search experiences. We combine SEO, AEO, and GEO to help businesses increase online visibility and generate sustainable growth.",
    primaryCta: { text: "Get Your Free SEO Strategy Consultation", href: "#lead-form" },
    secondaryCta: { text: "Explore Our Approach", href: "#approach" }
  },
  whatIsSection: {
    tag: "What is SEO?",
    heading: "Search Engine Optimization",
    primaryDesc: "SEO is the process of improving your website's visibility in search engine results. When potential customers search for products or services related to your business, SEO helps your website appear higher in search results, increasing the likelihood of attracting qualified visitors.",
    secondaryDesc: "A successful SEO strategy includes keyword research, technical optimization, content development, user experience improvements, and authority building. SEO remains one of the most cost-effective digital marketing investments because it generates long-term organic traffic and sustainable business growth."
  },
  whyMattersSection: {
    tag: "Why It Matters",
    heading: "Why SEO Matters for Modern Businesses",
    intro: "More than ever, consumers rely on search engines to find information, compare solutions, and make purchasing decisions. If your website isn't visible when customers search, you're missing valuable opportunities.",
    points: [
      { title: "Increase Organic Website Traffic", desc: "Attract highly qualified visitors who are actively searching for your products and services." },
      { title: "Generate Qualified Leads", desc: "Connect with high-intent prospects who are more likely to convert into paying customers." },
      { title: "Improve Online Visibility", desc: "Expand your reach across search results and increase brand awareness among potential buyers." },
      { title: "Build Brand Credibility", desc: "Higher search rankings establish trust and position your business as an industry authority." },
      { title: "Reduce Dependency on Paid Advertising", desc: "Generate sustainable traffic without relying solely on increasing advertising budgets." },
      { title: "Increase Conversions and Revenue", desc: "Drive targeted visitors who are more likely to engage, inquire, and purchase." }
    ]
  },
  servicesSection: {
    tag: "Our SEO Services",
    heading: "Comprehensive Search Optimization",
    items: [
      { icon: "Settings", title: "Technical SEO", desc: "We optimize website architecture, crawlability, indexing, site speed, mobile usability, Core Web Vitals, XML sitemaps, and structured data to ensure search engines can efficiently understand your website." },
      { icon: "Search", title: "Keyword Research & Strategy", desc: "Our team identifies high-intent keywords your audience actively searches for. We analyze competitor rankings, search behavior, and industry trends to create a strategy that drives meaningful traffic and conversions." },
      { icon: "LayoutTemplate", title: "On-Page SEO", desc: "We optimize website content, title tags, meta descriptions, headings, internal linking, image optimization, and user experience factors to improve rankings and engagement." },
      { icon: "PenTool", title: "Content Optimization", desc: "High-quality content remains one of the strongest ranking factors. We create and optimize content that satisfies user intent, answers questions, and establishes your authority within your industry." },
      { icon: "Link", title: "Off-Page SEO & Link Building", desc: "We build your website's authority through ethical link acquisition, digital PR, brand mentions, and trust-building strategies that improve search visibility over time." },
      { icon: "MapPin", title: "Local SEO", desc: "For location-based businesses, we optimize Google Business Profiles, local citations, map visibility, and local search signals to attract nearby customers." }
    ],
    subSections: [
      {
        tag: "Answer Engine Optimization",
        heading: "Become the Preferred Answer in Search Results",
        subheading: "AEO",
        desc: "Search behavior has changed dramatically. Users increasingly ask complete questions through search engines, voice assistants, and AI-powered platforms. Our AEO services focus on positioning your brand as the trusted answer that search engines and AI systems choose to display.",
        bullets: ["Featured Snippet Optimization", "FAQ Content Development", "Voice Search Optimization", "Conversational Search Strategies", "Structured Data Implementation", "Entity-Based Optimization"]
      },
      {
        tag: "Generative Engine Optimization",
        heading: "Get Discovered Across AI-Powered Search Platforms",
        subheading: "GEO",
        desc: "Generative AI is transforming digital discovery. Users increasingly rely on platforms such as ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity to receive direct recommendations and answers. GEO ensures your content, brand entities, and authority signals are optimized for the next generation of search.",
        bullets: ["AI Visibility Audits", "Knowledge Graph Optimization", "Entity Building & Recognition", "Brand Authority Enhancement", "AI-Friendly Content Architecture", "E-E-A-T Optimization", "Citation & Reference Optimization"]
      }
    ]
  },
  approachSection: {
    tag: "The Approach",
    heading: "How We Make Growth Predictable",
    primaryDesc: "Our SEO Service combines technical excellence, content strategy, and authority building into a unified growth system.",
    secondaryDesc: "Most agencies focus on vanity metrics. We focus on revenue, traffic quality, pipeline value, and profitability. Every decision is supported by data, testing, and business impact.",
    pills: [
      { title: "No Vanity Metrics", desc: "We optimize for revenue, leads, and profitability." },
      { title: "Data-Driven Decisions", desc: "Every recommendation is supported by research and analytics." },
      { title: "Transparent Reporting", desc: "Complete visibility into campaign performance and ROI." }
    ]
  },
  processSection: {
    tag: "Our SEO Process",
    heading: "Proven Methodology for Search Success",
    steps: [
      { title: "Discovery & Strategy", desc: "We begin by understanding your business, industry, competitors, goals, and target audience." },
      { title: "Comprehensive SEO Audit", desc: "In-depth analysis of your website to identify technical issues, content gaps, and growth opportunities." },
      { title: "Research & Planning", desc: "Keyword research, competitor analysis, audience research, and search intent mapping to build a customized strategy." },
      { title: "Optimization & Implementation", desc: "Our team implements technical fixes, on-page improvements, content enhancements, and authority-building initiatives." },
      { title: "Monitoring & Continuous Growth", desc: "SEO is an ongoing process. We track rankings, traffic, conversions, and AI visibility while continuously refining your strategy." }
    ]
  },
  resultsSection: {
    tag: "Results You Can Expect",
    heading: "Measurable Business Outcomes",
    outcomes: [
      { title: "Increased Keyword Rankings", label: "Visibility", subLabel: "Top positions for high-intent queries" },
      { title: "Higher Organic Traffic", label: "Acquisition", subLabel: "More qualified visitors" },
      { title: "More Qualified Leads", label: "Conversion", subLabel: "Connect with ready-to-buy prospects" },
      { title: "Enhanced Brand Authority", label: "Trust", subLabel: "Positioned as an industry leader" }
    ]
  },
  whyUsSection: {
    tag: "Why Choose Us?",
    heading: "Your Partner in Digital Growth",
    items: [
      { title: "Data-Driven Decision Making", desc: "Every recommendation is supported by research, analytics, and measurable performance data." },
      { title: "SEO + AEO + GEO Expertise", desc: "We help businesses stay visible across traditional search engines and emerging AI platforms." },
      { title: "Transparent Reporting", desc: "Receive detailed reports that clearly demonstrate campaign performance and business impact." },
      { title: "Customized Strategies", desc: "No generic packages. Every campaign is tailored to your industry, goals, and competitive landscape." },
      { title: "Long-Term Growth Focus", desc: "We prioritize sustainable growth and lasting visibility rather than short-term ranking spikes." }
    ]
  },
  costOfInactionSection: {
    tag: "The Cost of Inaction",
    heading: "What Inaction Costs You",
    items: [
      { icon: "TrendingDown", title: "Lost Market Share", desc: "While you wait, competitors are capturing the organic search traffic and leads that should be yours." },
      { icon: "Clock", title: "Delayed ROI", desc: "SEO is a long-term investment. The longer you wait to start, the longer it takes to see meaningful returns." },
      { icon: "AlertTriangle", title: "AI Invisibility", desc: "As search behavior shifts to AI-powered platforms, failing to optimize now means becoming invisible in the future." }
    ]
  },
  faqSection: {
    tag: "Frequently Asked Questions",
    heading: "Everything You Need to Know",
    items: [
      { question: "What is included in your SEO Service?", answer: "Our SEO Service includes technical SEO, keyword research, content optimization, on-page SEO, link building, local SEO, international SEO, AEO, GEO, performance tracking, and strategic consulting." },
      { question: "How long does SEO take to show results?", answer: "Most businesses begin seeing measurable improvements within three to six months. However, SEO is a long-term strategy, and significant growth often occurs through consistent optimization over time." },
      { question: "What is the difference between SEO, AEO, and GEO?", answer: "SEO improves visibility in traditional search engine results. AEO focuses on becoming the preferred answer for search queries, while GEO helps businesses gain visibility within AI-generated search experiences such as ChatGPT and Google AI Overviews." },
      { question: "Is SEO still worth investing in?", answer: "Absolutely. Search remains one of the highest-intent marketing channels available. When combined with AEO and GEO, SEO helps businesses remain visible across both traditional and AI-powered search environments." }
    ]
  }
};

export default async function SeoServicePage() {
  await connectDB();
  const db = await Service.findOne({ slug: "seo" }).lean() as any;

  // Format the DB data to match what SeoServiceClient expects
  const seoData = {
    heroSection: {
      // Admin Hero tab saves: name (H1), tagline (subheading), subtitle, primaryCta, secondaryCta
      tag:          db?.heroSection?.name     || db?.title                    || DEFAULT_SEO_DATA.heroSection.tag,
      heading:      db?.heroSection?.tagline  || DEFAULT_SEO_DATA.heroSection.heading,
      subtitle:     db?.heroSection?.subtitle || DEFAULT_SEO_DATA.heroSection.subtitle,
      primaryCta:   db?.heroSection?.primaryCta   || DEFAULT_SEO_DATA.heroSection.primaryCta,
      secondaryCta: db?.heroSection?.secondaryCta || DEFAULT_SEO_DATA.heroSection.secondaryCta
    },
    whatIsSection: {
      tag: db?.whatIsSection?.tag || DEFAULT_SEO_DATA.whatIsSection.tag,
      heading: db?.whatIsSection?.heading || DEFAULT_SEO_DATA.whatIsSection.heading,
      primaryDesc: db?.whatIsSection?.primaryDesc || db?.whatIsSection?.primary || DEFAULT_SEO_DATA.whatIsSection.primaryDesc,
      secondaryDesc: db?.whatIsSection?.secondaryDesc || db?.whatIsSection?.secondary || DEFAULT_SEO_DATA.whatIsSection.secondaryDesc
    },
    whyMattersSection: {
      tag: db?.whyMattersSection?.tag || DEFAULT_SEO_DATA.whyMattersSection.tag,
      heading: db?.whyMattersSection?.heading || DEFAULT_SEO_DATA.whyMattersSection.heading,
      intro: db?.whyMattersSection?.intro || DEFAULT_SEO_DATA.whyMattersSection.intro,
      points: db?.whyMattersSection?.points || DEFAULT_SEO_DATA.whyMattersSection.points
    },
    servicesSection: {
      tag: db?.servicesSection?.tag || DEFAULT_SEO_DATA.servicesSection.tag,
      heading: db?.servicesSection?.heading || DEFAULT_SEO_DATA.servicesSection.heading,
      items: db?.servicesSection?.items || DEFAULT_SEO_DATA.servicesSection.items,
      subSections: db?.servicesSection?.subSections || DEFAULT_SEO_DATA.servicesSection.subSections
    },
    approachSection: db?.approachSection || DEFAULT_SEO_DATA.approachSection,
    processSection: {
      tag: db?.processSection?.tag || DEFAULT_SEO_DATA.processSection.tag,
      heading: db?.processSection?.heading || DEFAULT_SEO_DATA.processSection.heading,
      steps: db?.processSection?.steps || DEFAULT_SEO_DATA.processSection.steps
    },
    resultsSection: db?.resultsSection || DEFAULT_SEO_DATA.resultsSection,
    whyUsSection: {
      tag: db?.whyUsSection?.tag || DEFAULT_SEO_DATA.whyUsSection.tag,
      heading: db?.whyUsSection?.heading || DEFAULT_SEO_DATA.whyUsSection.heading,
      items: db?.whyUsSection?.items || DEFAULT_SEO_DATA.whyUsSection.items
    },
    costOfInactionSection: {
      tag: db?.inactionSection?.tag || DEFAULT_SEO_DATA.costOfInactionSection.tag,
      heading: db?.inactionSection?.heading || DEFAULT_SEO_DATA.costOfInactionSection.heading,
      items: db?.inactionSection?.items || DEFAULT_SEO_DATA.costOfInactionSection.items
    },
    faqSection: {
      tag: db?.faqSection?.tag || DEFAULT_SEO_DATA.faqSection.tag,
      heading: db?.faqSection?.heading || DEFAULT_SEO_DATA.faqSection.heading,
      items: (db?.faq && db.faq.length > 0) 
        ? db.faq.map((f: any) => ({ question: f.q, answer: f.a })) 
        : DEFAULT_SEO_DATA.faqSection.items
    }
  };

  return <SeoServiceClient initialData={seoData} />;
}
