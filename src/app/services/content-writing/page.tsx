import { Metadata } from "next";
import ServicePageShell, { ServicePageData } from "../_components/ServicePageShell";

export const metadata: Metadata = {
  title: "SEO Content Writing & Copywriting Services | digitalbrandbuilder",
  description: "High-quality, human-written content that ranks on search engines and builds brand trust. Blog posts, landing pages, and email copy.",
};

const contentData: ServicePageData = {
  hero: {
    name: "Content Writing",
    tagline: "SEO-driven copy that engages, educates, and converts.",
    subtitle: "We write clear, compelling, human-written content for your business. From blog posts and landing pages to email newsletters and brand copywriting, we help you communicate your value and turn readers into customers.",
    primaryCta: { text: "Get Free Content Consultation", href: "#lead-form" },
    secondaryCta: { text: "Explore Our Approach", href: "#approach" }
  },
  whatIs: {
    heading: "Content Writing & Copywriting",
    primary: "Content writing is the process of planning, writing, and editing web content, typically for digital marketing purposes.",
    secondary: "At Digital Brand Builder, we believe that content is the voice of your brand. We write articles, website copy, sales pages, and social media posts designed to solve your audience's problems, establish your authority, and build lasting customer trust. We focus on search intent, readability, and business results."
  },
  why: {
    heading: "Why High-Quality Content Writing Matters",
    intro: "Your audience and search engines are looking for valuable information. Well-written, original content helps establish your credibility, improves your search engine rankings, and gives visitors a clear reason to choose you.",
    points: [
      { title: "Improve Search Engine Rankings", desc: "Publishing useful, keyword-optimized content is one of the most effective ways to rank higher on Google and attract organic traffic." },
      { title: "Establish Industry Authority", desc: "Demonstrate your expertise and build trust by answering your customers' questions and addressing their challenges." },
      { title: "Increase Reader Engagement", desc: "Keep visitors on your website longer with clear, interesting, and easy-to-read content that holds their attention." },
      { title: "Nurture Qualified Leads", desc: "Provide valuable information that guides prospects through the buying journey and encourages them to take action." },
      { title: "Strengthen Brand Character", desc: "Develop a consistent voice and tone that sets your business apart and connects with your audience." },
      { title: "Support Broader Marketing", desc: "High-quality content provides the foundation for your SEO, social media, email campaigns, and paid advertising." }
    ]
  },
  offerings: {
    heading: "Everything Included in Our Content Writing Service",
    items: [
      { title: "Blog Post Writing", desc: "In-depth, well-researched, and search-optimized blog posts designed to answer user queries, drive organic traffic, and demonstrate your industry expertise." },
      { title: "Website Copywriting", desc: "Clear, persuasive, and conversion-focused copy for your homepage, about page, service descriptions, and key landing pages." },
      { title: "SEO Content Strategy", desc: "Comprehensive research and content planning to align topics, keywords, formatting, and posting schedules with your growth objectives." },
      { title: "Email Newsletter Copy", desc: "Engaging and informative email campaigns designed to build customer relationships, promote offers, and drive repeat traffic." },
      { title: "Brand Copywriting", desc: "Develop cohesive taglines, brand stories, values, and messaging guides that maintain a consistent voice across digital platforms." },
      { title: "Content Refresh & Optimization", desc: "Audit, update, and rewrite existing website content to improve readability, search relevance, keywords, and conversion performance." }
    ]
  },
  process: {
    heading: "Our Content Writing Process",
    steps: [
      { title: "Topic & Keyword Research", desc: "We identify high-intent topics and keywords your target audience is actively searching for." },
      { title: "Briefing & Outline", desc: "We create detailed content outlines establishing the structure, goals, key points, and search intent alignment." },
      { title: "Drafting & Writing", desc: "Our professional writers create original, engaging, and clear content tailored to your brand voice." },
      { title: "Editing & SEO Polish", desc: "We review drafts for readability, structure, grammar, flow, internal linking, and meta optimization." },
      { title: "Publishing & Tracking", desc: "We format and publish the content, set up tracking, and monitor search rankings and reader engagement." }
    ]
  },
  deliverables: [
    "SEO-optimized blog posts & articles",
    "Conversion-focused landing page copy",
    "Homepage, about page, and services copywriting",
    "Email marketing templates & newsletter campaigns",
    "Detailed topic, keyword & competitor content mapping",
    "Internal linking structure & recommendations",
    "Meta titles, descriptions & search snippet optimization",
    "Social media caption and promo copywriting templates",
    "Detailed monthly content performance reporting"
  ],
  whyUs: {
    heading: "The Digital Brand Builder Difference",
    items: [
      { title: "100% Human-Written", desc: "No generic, AI-generated content. We write original, in-depth copy that demonstrates real experience and expertise." },
      { title: "SEO + Conversion Focus", desc: "We write content that ranks well in search results and naturally guides readers toward taking business actions." },
      { title: "Audience-Centric Approach", desc: "Every article is structured around answering real questions and solving real problems for your customers." },
      { title: "Clear Voice & Tone Consistency", desc: "We adapt our writing to match your unique brand character and guidelines across all content assets." },
      { title: "Data-Driven Topic Strategy", desc: "We base our content plans on actual search demand, competitor gaps, and customer research." },
      { title: "Transparent Collaboration", desc: "Full visibility into writing timelines, drafts, editing workflows, and performance tracking." }
    ]
  },
  costOfInaction: {
    heading: "What Inaction Costs You",
    items: [
      { title: "Zero Organic Search Visibility", desc: "Without search-optimized content, your website will be invisible to customers searching for info in your industry." },
      { title: "High Website Bounce Rates", desc: "Outdated or thin copy fails to capture attention, sending visitors away to competitors with better resources." },
      { title: "Stagnant Brand Authority", desc: "Failing to share helpful insights makes it harder for customers to see you as a credible, trustworthy industry choice." }
    ]
  },
  faq: {
    heading: "Everything You Need to Know",
    items: [
      { question: "Is your content written by AI or humans?", answer: "All our content is researched, structured, and written 100% by human writers who specialize in business copywriting. We focus on in-depth quality, original perspectives, and readability." },
      { question: "How do you choose blog post topics?", answer: "We conduct keyword research, search volume analysis, and competitor audits to identify topics your audience is actively searching for. We also align topics with your services and sales funnel." },
      { question: "Do you upload the content to our website directly?", answer: "Yes, as part of our content management, we format, optimize images, verify metadata, and publish the posts directly on your CMS (WordPress, Shopify, etc.)." },
      { question: "Do you ensure the tone of voice matches our brand?", answer: "We begin by analyzing your existing materials and creating a brief style guide covering brand voice, grammar choices, writing goals, and formatting rules before drafting begins." }
    ]
  },
  leadForm: {
    heading: "Ready to Tell Your Brand Story?",
    subtitle: "Publish human-written, search-optimized content that builds trust, drives traffic, and turns readers into customers.",
    highlights: [
      { title: "No AI slop, 100% human-crafted copy", desc: "Deeply researched topics that display genuine authority." },
      { title: "SEO integrated from day one", desc: "Optimized for target keywords, readability, and snippet features." },
      { title: "Continuous content planning", desc: "Structured content calendars aligned with your product and marketing cycles." }
    ],
    ctaLabel: "Launch My Content Strategy"
  },
  whatsappMessage: "Hello digitalbrandbuilder, I'm interested in your Content Writing Services!"
};

export default function ContentWritingPage() {
  return <ServicePageShell data={contentData} />;
}
