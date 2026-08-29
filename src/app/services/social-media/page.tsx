import { Metadata } from "next";
import ServicePageShell, { ServicePageData } from "../_components/ServicePageShell";

export const metadata: Metadata = {
  title: "Social Media Marketing Services | digitalbrandbuilder",
  description: "Build brand awareness, engage your audience, and drive conversions. Custom content planning, design, writing, and platform management.",
};

const socialData: ServicePageData = {
  hero: {
    name: "Social Media",
    tagline: "Build a brand people remember across platforms.",
    subtitle: "Build a stronger brand, engage the right audience, generate qualified leads, and drive business growth with social media marketing. We combine strategy, creative content, community engagement, and paid social advertising to help your business grow across the platforms that matter.",
    primaryCta: { text: "Get Free Social Media Audit", href: "#lead-form" },
    secondaryCta: { text: "Explore Our Approach", href: "#approach" }
  },
  whatIs: {
    heading: "Social Media Marketing",
    primary: "Social Media Marketing is the strategic use of social media platforms to build brand awareness, connect with audiences, generate leads, drive website traffic, and support business growth.",
    secondary: "At Digital Brand Builder, social media marketing goes beyond simply publishing posts. We combine audience research, content strategy, creative development, platform management, community engagement, paid advertising, and performance analysis to create a social presence that supports your wider marketing goals."
  },
  why: {
    heading: "Why Social Media Marketing Matters for Modern Businesses",
    intro: "Your customers are already spending time on social media—discovering brands, researching products, watching videos, reading reviews, and interacting with businesses. A consistent and strategic social media presence gives your business more opportunities to be discovered, build trust, and stay connected with potential and existing customers.",
    points: [
      { title: "Increase Brand Awareness", desc: "Expand your reach and keep your business visible to the audiences that matter most." },
      { title: "Build Customer Relationships", desc: "Create meaningful interactions that strengthen trust, familiarity, and long-term customer loyalty." },
      { title: "Generate Qualified Leads", desc: "Use strategic content and social campaigns to attract potential customers and create new business opportunities." },
      { title: "Drive Website Traffic", desc: "Guide interested audiences from social platforms to your website, landing pages, products, and services." },
      { title: "Improve Brand Authority", desc: "Share valuable, relevant, and engaging content that positions your business as a credible voice in your industry." },
      { title: "Support Long-Term Growth", desc: "Build a consistent social media presence that continues to create visibility, engagement, and customer opportunities over time." }
    ]
  },
  offerings: {
    heading: "Everything Included in Our Social Media Marketing Service",
    items: [
      { title: "Social Media Strategy", desc: "Develop a customized social media strategy based on your business objectives, target audience, competitors, industry, and preferred platforms." },
      { title: "Content Creation", desc: "Create engaging social media content including graphics, carousels, captions, short-form videos, reels, promotional content, and platform-specific creative assets." },
      { title: "Community Management", desc: "Manage comments, messages, mentions, and audience interactions while helping your brand build stronger relationships with its community." },
      { title: "Social Media Advertising", desc: "Create and manage targeted paid social campaigns designed to increase awareness, generate leads, drive website traffic, and support conversions." },
      { title: "Influencer Marketing", desc: "Identify relevant creators and support strategic collaborations that can help your business reach new audiences and strengthen brand credibility." },
      { title: "Analytics & Reporting", desc: "Track important social media metrics, analyze content performance, identify trends, and use insights to continuously improve your strategy." }
    ]
  },
  process: {
    heading: "Our Social Media Marketing Process",
    steps: [
      { title: "Research & Discovery", desc: "We analyze your business, audience, competitors, industry, existing social presence, and current performance." },
      { title: "Strategy Development", desc: "We create a customized social media strategy covering platforms, content themes, posting frequency, creative direction, audience segments, and business goals." },
      { title: "Content Creation", desc: "Our team develops platform-specific content including graphics, captions, carousels, videos, reels, and promotional assets." },
      { title: "Publishing & Engagement", desc: "We execute the content calendar, publish content, monitor audience interactions, and maintain an active brand presence." },
      { title: "Optimization & Growth", desc: "We analyze performance, identify high-performing content, refine the strategy, and continuously improve your social media presence." }
    ]
  },
  deliverables: [
    "Custom Social Media Strategy development",
    "Structured Monthly Content Calendars",
    "Professional Visual Design & Templates",
    "Short-form video concepts & Reel ideas",
    "Strategic Caption Copywriting",
    "Active Community Management & Response",
    "Engagement Outreach & Relationship Building",
    "Influencer & Creator Campaign Coordination",
    "Paid Social Media Advertising (Meta, LinkedIn, etc.)",
    "Detailed Monthly Performance Analytics & Reporting"
  ],
  whyUs: {
    heading: "The Digital Brand Builder Difference",
    items: [
      { title: "Platform Expertise", desc: "Create strategies for platforms including Facebook, Instagram, LinkedIn, YouTube, TikTok, and other relevant channels." },
      { title: "Creative Excellence", desc: "Develop content designed to capture attention while maintaining a consistent and professional brand identity." },
      { title: "Audience-Centric Strategies", desc: "Build content and campaigns around what your audience actually cares about—not just what your business wants to promote." },
      { title: "Transparent Reporting", desc: "Get clear performance insights that show how your social media activity is progressing." },
      { title: "Growth-Focused Execution", desc: "Connect content, engagement, paid advertising, and optimization with your broader business objectives." },
      { title: "Long-Term Brand Building", desc: "Build a recognizable social presence that strengthens awareness, trust, engagement, and customer relationships over time." }
    ]
  },
  costOfInaction: {
    heading: "What Inaction Costs You",
    items: [
      { title: "Losing Visibility to Competitors", desc: "Businesses that consistently communicate with their audiences can capture attention that inactive brands miss." },
      { title: "Missed Customer Relationships", desc: "Without regular engagement, you lose opportunities to answer questions, build trust, and develop long-term customer relationships." },
      { title: "Reduced Brand Relevance", desc: "An inconsistent or inactive social presence can make your business less visible in an increasingly crowded digital environment." }
    ]
  },
  faq: {
    heading: "Everything You Need to Know",
    items: [
      { question: "Which social media platforms should my business be on?", answer: "We select platforms based on where your target audience is most active. For B2B businesses, we typically focus on LinkedIn and Twitter. For B2C or lifestyle brands, we focus heavily on Instagram, Facebook, and YouTube." },
      { question: "How often will you publish posts on our profiles?", answer: "Posting frequency depends on your custom strategy. Typically, we recommend 3 to 5 high-quality posts per week per platform, mixed with daily stories and active community engagement to maximize organic reach." },
      { question: "Can we review and approve posts before they go live?", answer: "Yes, absolutely. We create a complete monthly content calendar in advance, containing graphics, video briefs, and captions. You have full review and approval control before anything is scheduled or published." },
      { question: "Do you handle customer service queries in messages?", answer: "We manage basic community inquiries, comments, and direct messages by providing standardized brand responses or escalating complex sales and support queries to your designated team members." }
    ]
  },
  leadForm: {
    heading: "Ready to Grow Your Social Presence?",
    subtitle: "Nurture your digital community, showcase your brand character, and drive qualified website traffic with consistent social media strategies.",
    highlights: [
      { title: "Custom templates, no generic layouts", desc: "Adheres to your visual brand guidelines for high recognizability." },
      { title: "Strategic content over random posts", desc: "Every graphic, caption, and story works toward your growth objectives." },
      { title: "Comprehensive platform management", desc: "We handle strategy, layout design, publishing, and community engagement." }
    ],
    ctaLabel: "Grow My Social Presence"
  },
  whatsappMessage: "Hello digitalbrandbuilder, I'm interested in your Social Media Services!"
};

export default function SocialMediaPage() {
  return <ServicePageShell data={socialData} />;
}
