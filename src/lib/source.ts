// Blog data types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tag: string;
  author?: string;
  featured?: boolean;
  published: boolean;
  image?: string; // URL — set by admin panel when uploading cover image
  body?: BlogSection[];
}

export interface BlogSection {
  type: "paragraph" | "heading" | "subheading" | "quote" | "list";
  content: string;
  items?: string[]; // for list type
}

// ─────────────────────────────────────────────────────────────────────────────
// Static placeholder data — replace this function body with an API call once
// your admin panel and backend are ready:
//
//   const res = await fetch(`${process.env.API_URL}/api/blogs`);
//   return res.json();
// ─────────────────────────────────────────────────────────────────────────────
export async function getBlogPosts(): Promise<BlogPost[]> {
  return [
    {
      id: "1",
      slug: "why-local-businesses-are-invisible-on-google",
      title: "Why 70% of Local Businesses Are Invisible on Google (And How to Fix It)",
      description: "Most small businesses have a Google Business Profile that's incomplete, outdated, or simply never optimized. Here's the exact checklist we use for every client.",
      date: "August 20, 2024",
      readTime: "8 min read",
      category: "SEO",
      tag: "Guide",
      author: "Harshit Gaur",
      featured: true,
      published: true,
      body: [
        {
          type: "paragraph",
          content: "There are over 63 million small businesses in India. A staggering number of them share one invisible problem: they exist online, but Google can't find them. If your business isn't showing up when a nearby customer searches for your service, you're not losing to a competitor — you're losing to obscurity.",
        },
        {
          type: "heading",
          content: "The Google Business Profile Problem",
        },
        {
          type: "paragraph",
          content: "Google Business Profile (GBP) is the single most important free tool available to a local business. It's what populates the map results, the knowledge panel on the right side of your search results, and the local pack — those three listings at the top of a local search. Yet most businesses treat it like a one-time form they filled in and forgot.",
        },
        {
          type: "paragraph",
          content: "The algorithm that decides who shows up in those three slots weighs three things above all else: Relevance, Distance, and Prominence. You can't control distance. But relevance and prominence are completely within your control — and most businesses ignore both.",
        },
        {
          type: "heading",
          content: "The Checklist We Use for Every Client",
        },
        {
          type: "subheading",
          content: "1. Profile Completeness",
        },
        {
          type: "list",
          content: "",
          items: [
            "Business name matches your signboard and website exactly",
            "Primary category is precise (not just 'Restaurant' — 'South Indian Restaurant')",
            "Add 3–5 secondary categories that reflect your full service range",
            "Business hours are accurate, including holiday hours",
            "Phone number is a local number, not just a mobile",
            "Website URL links to a fast, mobile-friendly page",
          ],
        },
        {
          type: "subheading",
          content: "2. Photos That Actually Work",
        },
        {
          type: "paragraph",
          content: "Businesses with photos receive 42% more requests for directions and 35% more website clicks than those without. Add at least 10 high-quality photos: your storefront, interior, team, products, and if applicable, the process. Update them quarterly. Google rewards fresh signals.",
        },
        {
          type: "quote",
          content: "\"The best time to optimize your Google Business Profile was when you created it. The second best time is today.\"",
        },
        {
          type: "heading",
          content: "Why Reviews Are Your Most Powerful Asset",
        },
        {
          type: "paragraph",
          content: "Reviews are not just social proof — they are a ranking signal. Google uses the volume, velocity, and sentiment of your reviews to assess prominence. A business with 200 reviews averaging 4.2 stars will consistently outrank a newer business with 10 reviews averaging 4.9 stars. The lesson: consistently ask every satisfied customer to leave a review, and respond to every single one — positive or negative.",
        },
        {
          type: "paragraph",
          content: "The businesses that win local search aren't the ones with the biggest budgets. They're the ones that treat their Google presence like a living asset — updating it, engaging with it, and optimizing it every month. That's exactly what we help our clients do.",
        },
      ],
    },
    {
      id: "2",
      slug: "what-makes-a-website-premium",
      title: "What Makes a Website Premium? The 5 Design Signals That Build Trust Instantly",
      description: "Speed, typography, whitespace, contrast, and consistency — the five invisible forces that decide whether a customer stays or bounces within 3 seconds.",
      date: "August 10, 2024",
      readTime: "6 min read",
      category: "Websites",
      tag: "Design",
      author: "Harshit Gaur",
      published: true,
      body: [
        {
          type: "paragraph",
          content: "You have 3 seconds. That's the average time a visitor takes to form a first impression of your website — and decide whether to stay or leave. In those 3 seconds, they haven't read your copy. They haven't watched your video. They've simply looked. And in that glance, your design is speaking for you.",
        },
        {
          type: "heading",
          content: "Why 'Good Enough' Is Costing You Clients",
        },
        {
          type: "paragraph",
          content: "A study by Stanford found that 75% of users judge a company's credibility based on its website design. Your pricing page, your testimonials, your case studies — none of it gets read if the design doesn't first establish trust. Premium design is not about aesthetics. It's about conversion.",
        },
        {
          type: "heading",
          content: "The 5 Signals of a Premium Website",
        },
        {
          type: "subheading",
          content: "1. Speed",
        },
        {
          type: "paragraph",
          content: "Every second of load time costs you 7% of conversions. A premium website loads in under 2 seconds on mobile. This is achieved through optimized images (WebP format), minimal third-party scripts, and edge-cached hosting. Speed is not a technical detail — it's a brand statement.",
        },
        {
          type: "subheading",
          content: "2. Typography",
        },
        {
          type: "paragraph",
          content: "Cheap websites use system fonts or generic Google Font pairings without thought. Premium websites choose a type system — a deliberate combination of a display typeface for headlines and a highly legible sans-serif for body text, set at sizes and line-heights that feel effortless to read. Typography is the single fastest way to signal quality.",
        },
        {
          type: "subheading",
          content: "3. Whitespace",
        },
        {
          type: "paragraph",
          content: "Whitespace is not empty space — it's breathing room. It directs attention. It creates hierarchy. It signals confidence. The instinct of most business owners is to fill every inch of the screen. The instinct of every good designer is the opposite.",
        },
        {
          type: "quote",
          content: "\"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.\" — Antoine de Saint-Exupéry",
        },
        {
          type: "subheading",
          content: "4. Contrast",
        },
        {
          type: "paragraph",
          content: "A premium website uses contrast strategically — not just for accessibility (WCAG AA compliance), but to guide the eye. Your CTA button should be the highest-contrast element on the page. Your headline should pop. Your background should recede. Contrast creates a visual hierarchy that tells users exactly where to look and what to do next.",
        },
        {
          type: "subheading",
          content: "5. Consistency",
        },
        {
          type: "paragraph",
          content: "Nothing destroys trust faster than inconsistency. Different button styles, mismatched font sizes, inconsistent padding — these are the tells of an amateur build. A premium website is built on a design system: a defined set of colors, type styles, spacing units, and component patterns that are applied uniformly across every page.",
        },
        {
          type: "paragraph",
          content: "The good news: you don't need a ₹10 lakh budget to have a premium website. You need a team that understands these principles and executes them with precision. That's the difference between a website that costs money and one that makes money.",
        },
      ],
    },
    {
      id: "3",
      slug: "stop-boosting-posts",
      title: "Stop Boosting Posts. Here's How Performance Marketing Actually Works for D2C Brands",
      description: "Boosting a post is not advertising. Here's the real architecture of a campaign that generates consistent, trackable revenue for growing product brands.",
      date: "Coming soon",
      readTime: "10 min read",
      category: "Marketing",
      tag: "Strategy",
      published: false,
    },
    {
      id: "4",
      slug: "3-layer-brand-framework",
      title: "The 3-Layer Brand Framework: How Local Businesses Build Recognition That Scales",
      description: "Brand identity is not your logo. It's the sum of how your business looks, sounds, and behaves across every touchpoint your customer encounters.",
      date: "Coming soon",
      readTime: "7 min read",
      category: "Brand",
      tag: "Branding",
      published: false,
    },
  ];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
