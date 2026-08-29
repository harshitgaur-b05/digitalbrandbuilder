import { Metadata } from "next";
import ServicePageShell, { ServicePageData } from "../_components/ServicePageShell";

export const metadata: Metadata = {
  title: "Performance Marketing & Paid Ads Services | digitalbrandbuilder",
  description: "Drive targeted leads and sales with data-driven paid advertising. Google Ads, Meta Ads (Facebook & Instagram), and LinkedIn campaign management.",
};

const marketingData: ServicePageData = {
  hero: {
    name: "Performance Marketing",
    tagline: "Scale your business with data-driven paid media strategies.",
    subtitle: "Drive qualified traffic, generate more leads and sales, improve conversion rates, and make every advertising investment more measurable with results-focused paid media campaigns.",
    primaryCta: { text: "Start My Marketing Strategy", href: "#lead-form" },
    secondaryCta: { text: "Explore Our Approach", href: "#approach" }
  },
  whatIs: {
    heading: "Performance Marketing",
    primary: "Performance Marketing is a results-focused digital advertising strategy where campaigns are measured against specific business outcomes such as leads, sales, conversions, customer acquisition costs, and revenue.",
    secondary: "At Digital Brand Builder, we combine paid media management, audience targeting, conversion tracking, analytics, landing page optimization, creative testing, and continuous campaign optimization to build advertising strategies around your business goals. Instead of simply chasing clicks and impressions, we focus on understanding what happens after the click."
  },
  why: {
    heading: "Why Performance Marketing Matters for Modern Businesses",
    intro: "Your advertising budget should work toward measurable business objectives. Performance marketing gives businesses the ability to understand where their budget is going, which campaigns are performing, and how advertising contributes to leads, sales, and revenue.",
    points: [
      { title: "Generate Measurable Business Growth", desc: "Build campaigns around meaningful outcomes such as qualified leads, purchases, bookings, enquiries, and revenue." },
      { title: "Reach High-Intent Audiences", desc: "Connect with people actively searching for your products or services or audiences with strong potential interest." },
      { title: "Improve Customer Acquisition Efficiency", desc: "Identify wasted spend, optimize campaigns, and allocate budget toward opportunities that demonstrate stronger performance." },
      { title: "Scale with Data", desc: "Use campaign performance, audience insights, conversion data, and testing to identify opportunities for controlled growth." },
      { title: "Maximize Advertising ROI", desc: "Improve campaign efficiency by optimizing targeting, bidding, creatives, landing pages, and conversion journeys." },
      { title: "Compete More Effectively", desc: "Reach the right audiences with stronger campaigns, better messaging, and a more efficient digital acquisition strategy." }
    ]
  },
  offerings: {
    heading: "Everything Included in Our Performance Marketing Service",
    items: [
      { title: "Google Ads Management", desc: "Build and manage Google Ads campaigns across Search, Performance Max, Shopping, Display, Demand Gen, and remarketing to reach customers at different stages of the buying journey." },
      { title: "Meta Ads Management", desc: "Create and optimize Facebook and Instagram advertising campaigns focused on awareness, lead generation, conversions, ecommerce sales, and customer acquisition." },
      { title: "LinkedIn Advertising", desc: "Reach professional audiences and decision-makers through targeted B2B advertising campaigns designed around specific industries, job roles, and business objectives." },
      { title: "YouTube Advertising", desc: "Use video advertising to build awareness, generate demand, retarget interested audiences, and support conversions across the customer journey." },
      { title: "Conversion Rate Optimization", desc: "Improve landing pages, website experiences, calls to action, forms, and conversion paths to help turn more advertising traffic into valuable actions." },
      { title: "Analytics & Attribution", desc: "Set up and analyze conversion tracking, analytics, UTM parameters, events, and attribution data to understand how campaigns contribute to business results." }
    ]
  },
  process: {
    heading: "Our Performance Marketing Process",
    steps: [
      { title: "Discovery & Strategy", desc: "We understand your business model, goals, target audience, competitors, products, services, customer journey, and advertising objectives." },
      { title: "Tracking & Attribution", desc: "We review or implement analytics, conversion tracking, events, pixels, UTM parameters, and attribution systems to create a reliable measurement foundation." },
      { title: "Campaign Launch", desc: "We build and launch campaigns across the most relevant advertising platforms with carefully structured audiences, keywords, creatives, messaging, budgets, and conversion goals." },
      { title: "Optimization & Testing", desc: "We continuously analyze campaign performance and test audiences, creatives, keywords, landing pages, bids, budgets, and messaging to identify improvement opportunities." },
      { title: "Scale & Growth", desc: "Once campaigns demonstrate consistent performance, we strategically expand budgets, audiences, and campaigns while monitoring efficiency and business outcomes." }
    ]
  },
  deliverables: [
    "Google Ads strategy & complete campaign management",
    "Meta Ads campaign management (Facebook & Instagram)",
    "LinkedIn B2B targeted advertising campaigns",
    "YouTube video advertising campaigns",
    "Conversion tracking, pixel, UTM & attribution setup",
    "Landing page conversion rate optimization audits",
    "Remarketing & audience retargeting campaigns",
    "Audience research, segmentation & targeting setup",
    "Ad creatives, copy variations & A/B testing frameworks",
    "Detailed monthly analytics & performance reporting"
  ],
  whyUs: {
    heading: "The Digital Brand Builder Difference",
    items: [
      { title: "Data-Driven Decision Making", desc: "Every campaign decision is supported by performance data, analytics, audience insights, and testing." },
      { title: "Revenue-Focused Approach", desc: "We optimize toward meaningful business outcomes rather than treating clicks, impressions, or engagement as the final goal." },
      { title: "Cross-Platform Expertise", desc: "Build campaigns across Google Ads, Meta Ads, LinkedIn, YouTube, and other relevant paid media channels." },
      { title: "Transparent Communication", desc: "Receive clear performance updates, reporting, and strategic recommendations without unnecessary complexity." },
      { title: "Full-Funnel Optimization", desc: "We consider the complete customer journey—from the first advertisement to the landing page, conversion, and remarketing experience." },
      { title: "Scalable Growth Systems", desc: "Build an advertising system that can be tested, optimized, and scaled as your business grows." }
    ]
  },
  costOfInaction: {
    heading: "What Inaction Costs You",
    items: [
      { title: "Wasted Advertising Budget", desc: "Poor targeting, weak campaigns, and inaccurate tracking can result in spending money without understanding what is actually generating value." },
      { title: "Paying for Traffic That Does Not Convert", desc: "Generating clicks is not enough. Without strong landing pages and conversion journeys, valuable advertising traffic can leave without taking action." },
      { title: "Missing High-Intent Customers", desc: "If your competitors appear when potential customers search for relevant products and services, they have an opportunity to capture demand that could have gone to your business." }
    ]
  },
  faq: {
    heading: "Everything You Need to Know",
    items: [
      { question: "What is your minimum recommended advertising budget?", answer: "We recommend starting with a minimum media spend of ₹25,000 per month per platform to gather enough data for effective optimization. Budgets can be scaled up as we establish profitable performance." },
      { question: "How do you track campaign performance?", answer: "We set up comprehensive tracking via Google Analytics 4, Meta Pixel, and server-side API integrations. This allows us to track precise actions like form submissions, purchases, phone calls, and lead source attribution." },
      { question: "How quickly will we see results from paid ads?", answer: "Paid ads generate traffic and visibility instantly once approved. However, optimization is an ongoing process. We typically see initial campaign stabilization and lead flow within the first 14-30 days, followed by efficiency improvements." },
      { question: "Who creates the ad text and graphics?", answer: "Our team handles the copy, graphic design, and video formatting for your ads. We align all creatives with your brand guidelines and test multiple variations to find the highest-performing options." }
    ]
  },
  leadForm: {
    heading: "Ready to Scale Your Customer Acquisition?",
    subtitle: "Build a structured paid media growth system that converts search intent and social attention into measurable leads and sales.",
    highlights: [
      { title: "No vanity metrics, only business results", desc: "We optimize for leads, sales, and actual customer acquisition value." },
      { title: "Multi-channel targeting", desc: "Reach intent-driven buyers across Google and engage prospects on Meta/LinkedIn." },
      { title: "Transparent analytics & weekly dashboards", desc: "Always know exactly where your media spend is going and what it returned." }
    ],
    ctaLabel: "Launch My Growth Strategy"
  },
  whatsappMessage: "Hello digitalbrandbuilder, I'm interested in your Performance Marketing Services!"
};

export default function MarketingPage() {
  return <ServicePageShell data={marketingData} />;
}
