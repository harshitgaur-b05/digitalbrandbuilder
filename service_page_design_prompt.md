# Service Page Design Prompt

Use this prompt to create a new service detail page that follows the exact same design language, layout structure, and component patterns as the existing `ServiceDetailClient.tsx`.

---

## Prompt

> **Task:** Create a new Next.js client component called `[PageName]Client.tsx` for the `/app/[route]/` directory. This component receives a `initialData` prop from a server component and renders a full-page marketing layout. The design must **exactly match** the design system, layout structure, and visual style described below.

---

## Design System Reference

### Fonts
- **Display font** (`font-display`): Used for all headings, tags, CTAs, and bold labels. Uppercase tracking-wider for tags and buttons.
- **Body font** (`font-body`): Used for paragraphs, descriptions, and secondary text.

### Color Tokens (Tailwind CSS custom tokens — do NOT substitute with defaults)
| Token | Usage |
|---|---|
| `bg-background` | Page/root background |
| `text-on-surface` | Primary text |
| `text-on-surface-variant` | Muted/secondary text |
| `bg-surface-container-low` | Card backgrounds, subtle fills |
| `bg-surface-container-high` | Hover state of cards |
| `border-outline-variant` | All card/input borders |
| `text-brand-accent` | Accent color (yellow/gold). All highlights, CTAs, active states |
| `bg-brand-accent` | Primary CTA button fill |
| `bg-brand-accent/5` | Very subtle tinted section backgrounds |
| `border-brand-accent/20` | Tinted section borders |

### Motion Library
- Use `framer-motion`: `motion`, `AnimatePresence`
- Standard entry animation: `initial={{ opacity: 0, y: 15 }}` → `animate/whileInView={{ opacity: 1, y: 0 }}`
- Always use `viewport={{ once: true }}` on `whileInView` elements
- Stagger children with `transition={{ delay: idx * 0.1 }}`
- Scale entry for cards: `initial={{ opacity: 0, scale: 0.95 }}` → `whileInView={{ opacity: 1, scale: 1 }}`

### Tag / Badge Component Pattern
```tsx
<motion.span
  initial={{ opacity: 0, y: -10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
>
  SECTION TAG
</motion.span>
```

### Section Heading Pattern
```tsx
<motion.h2
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
>
  Section Heading
</motion.h2>
```

### Card Pattern (Standard)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: idx * 0.1 }}
  className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow"
>
  ...content
</motion.div>
```

### Accent Card Pattern (Tinted)
```tsx
className="bg-brand-accent/5 p-6 rounded-3xl border border-brand-accent/20 shadow-sm"
```

### CTA Button — Primary
```tsx
<a
  href="#lead-form"
  className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-background bg-brand-accent px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgb(245,194,0,0.3)] hover:-translate-y-0.5"
>
  CTA Text
</a>
```

### CTA Button — Secondary
```tsx
className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-on-surface bg-surface-container-low border border-outline-variant px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-container-high hover:shadow-sm"
```

---

## Page Section Structure (in order)

### Section 0 — Background Orbs (Fixed, full-page decoration)
- `position: fixed`, `z-index: -10`, `opacity: 0.3`, `pointer-events: none`
- Two blurred radial orbs: top-left (`bg-brand-accent/20`, 400px, `blur-[100px]`) and bottom-right (`bg-surface-container-high`, 500px, `blur-[100px]`)

---

### Section 1 — Hero
- `min-h-[65vh]`, centered content, `pt-28 pb-12`
- Back navigation button (top-left, absolute positioned): small pill with `ArrowRight` rotated 180°, links to parent listing page
- Main heading (`h1`): `font-display text-4xl sm:text-5xl md:text-6xl font-extrabold`, last word in `text-brand-accent`
- Subtitle (`p`): `text-lg sm:text-xl text-on-surface-variant`
- Two CTA buttons side by side: primary links to `#lead-form`, secondary links to `#approach`
- All animated with staggered `y: 15` entry delays (0.2, 0.3, 0.4)

---

### Section 1.1 — Stats (Conditional)
- Only render if `statsSection` data exists
- Centered tag + h2 header
- `grid grid-cols-1 md:grid-cols-2` (or more columns depending on stat count)
- Each stat card: **very large** accent-colored value (`text-5xl md:text-7xl font-extrabold text-brand-accent`), label below, optional tiny source line
- Cards use `scale` animation entry

---

### Section 1.2 — "What Is" / Definition Section (Conditional)
- Only render if `whatIsSection` data exists
- Full-width accent-tinted card (`bg-brand-accent/5 border-brand-accent/20 rounded-3xl`)
- **Two-column layout** (`lg:grid-cols-12`): left 5 cols = tag + heading; right 7 cols = two paragraphs
  - Left heading: `font-display text-2xl sm:text-3xl md:text-4xl font-extrabold`
  - Right primary `p`: `font-display text-xl sm:text-2xl font-bold` (large, bold)
  - Right secondary `p`: `font-body text-base text-on-surface-variant`

---

### Section 1.3 — Why It Matters (Conditional)
- Only render if `whyMattersSection` data exists
- Centered tag + h2 + intro paragraph
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5` card grid
- Each card: check icon circle (`w-10 h-10 rounded-full bg-background border border-outline-variant`), bold title, small desc

---

### Section 1.4 — Services / Offerings (Conditional)
- Only render if `servicesSection` data exists
- Outer wrapper: `bg-surface-container-low rounded-3xl border border-outline-variant` full-width card
- Centered tag + h2
- Services grid: `grid grid-cols-1 lg:grid-cols-2 gap-6`
  - Each card: `Target` icon in small accent circle, bold title, indented desc (`pl-11`)
- Optional sub-sections (nested specialty areas): rendered as 2-col or 3-col grids below a divider (`border-t border-outline-variant/50`)
  - Even-indexed: `bg-background border-outline-variant`; odd-indexed: `bg-brand-accent/5 border-brand-accent/20`
  - Each sub-section: tag badge, h3 heading, h4 subheading (accent-colored), description, bulleted list with `Check` icons

---

### Section 2 — Approach / How We Work (Always Present)
- `id="approach"` for in-page nav anchor
- Outer wrapper: `bg-surface-container-low rounded-3xl border border-outline-variant` card
- **Two-column layout**: left 5 cols sticky (tag + h2), right 7 cols (large bold description + secondary body text)
- Below the text block: `grid grid-cols-1 md:grid-cols-3 gap-4` "pill" cards
  - Each pill: numbered circle badge (`01`, `02`, `03` in accent color), bold title, small desc
  - Hover: `-translate-y-1 shadow-md`

---

### Section 3 — Process Steps (Conditional, first render)
- Only render if `processSection` data exists
- Centered tag + h2
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` card grid (adjust cols to step count)
- Each card: numbered circle (accent for first/last), centered title, centered desc
- Hover: `bg-surface-container-high`

---

### Section 4 — Deliverables / What You Get (Always Present)
- Outer wrapper: `bg-surface-container-low rounded-3xl border border-outline-variant` card
- Centered tag + h2
- `grid grid-cols-1 md:grid-cols-2 gap-4` deliverable cards
  - Each: `Check` icon circle, bold title
- Bottom guarantee strip: accent-tinted flex row with shield icon, guarantee text, and primary CTA button

---

### Section 4.1 — Process Steps (Conditional, second render variant)
- Same conditional on `processSection`, renders as `lg:grid-cols-5` variant

---

### Section 4.2 — Why Us (Conditional)
- Only render if `whyUsSection` data exists
- Full-width accent-tinted outer card
- Centered tag + h2
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`
- Each card: `Check` icon inline with title, indented desc

---

### Section 4.3 — Results / Outcomes (Conditional with Fallback)
- **If** `resultsSection` data exists: render dynamic outcomes in `lg:grid-cols-4` cards with accent-colored title
- **Else** (fallback): render static 4-stat strip + a blockquote testimonial
  - Stat cards: large accent value, small label, tiny sub-label
  - Testimonial: `font-display text-xl sm:text-2xl font-medium` quote, attribution pill (`bg-surface-container-low border border-outline-variant rounded-full`)

---

### Section 6 — The Cost of Inaction (Always Present)
- Outer wrapper: `bg-surface-container-low rounded-3xl border border-outline-variant` card
- Centered tag + h2 ("WHAT INACTION COSTS YOU" / "The Price of Stagnation" as defaults)
- `grid grid-cols-1 md:grid-cols-3 gap-5`
- Each pain point: icon from rotating set (`TrendingDown`, `AlertTriangle`, `Clock`), centered layout, title, desc
- Hover: `-translate-y-1`

---

### Section 7 — Lead Capture Form (Always Present)
- `id="lead-form"` anchor
- `bg-brand-accent/5 rounded-3xl border border-brand-accent/20` outer card
- **Two-column layout** (`lg:grid-cols-12`):
  - Left 6 cols: tag + h2 + stacked benefit cards (Check icon + title + desc, each in `bg-background rounded-2xl border`)
  - Right 6 cols: the contact form in a `bg-background rounded-2xl shadow-xl` card
- **Form fields** (all using `rounded-full` inputs with left-icon):
  - Full Name (`User` icon)
  - Business Email (`Mail` icon)
  - Phone Number (`Phone` icon)
  - Website URL (`Globe` icon)
  - Challenge (textarea, `rounded-2xl`, no icon)
- Submit button: full-width, primary CTA style
- **Success state**: Check icon circle, "Message Received" heading, personalized thank-you text with user's name/email/website highlighted, "Submit another" reset link

---

### Section 8 — FAQ Accordion (Always Present)
- Centered max-w-3xl
- Centered tag + h2
- `space-y-3` accordion list
- Each item: `bg-surface-container-low rounded-2xl border`
  - Active: `border-brand-accent shadow-sm`
  - Toggle button: question text + chevron icon circle (accent bg when open)
  - Answer panel: `AnimatePresence` with `height: 0 → auto` animation, `duration: 0.3 easeInOut`

---

### Section 9 — Related Insights / Blog Cards (Always Present)
- `border-t border-outline-variant/30` top border
- Centered h2 with last word in `text-brand-accent`
- `grid grid-cols-1 md:grid-cols-3 gap-8`
- Reuse existing `<BlogCard>` component

---

### Floating Elements
- `<FloatingWhatsApp />` component always at the bottom of the JSX

---

## Implementation Notes

1. **All sections are conditionally rendered** based on optional data fields — use `&&` guards.
2. **Fallback values** should always be provided for sections that are "always present" (e.g., `service.approachSection?.tag ?? "The Approach"`).
3. **Icon resolution**: Store icon names as strings in the database; resolve to Lucide components via a `ICON_MAP` record at the top of the file.
4. **Scroll restoration**: Call `window.scrollTo({ top: 0, left: 0, behavior: "instant" })` in a `useEffect` on mount.
5. **Not-found state**: Before the main `return`, check for null data and render a minimal centered "Not Found" UI with a back button.
6. **Wrapper root**: The root `<div>` should have `selection:bg-brand-accent selection:text-background overflow-x-hidden antialiased relative`.
7. **Header**: Always include `<Header />` as the very first child of the root div.
8. **Section padding convention**: `py-12 px-4 md:px-margin-desktop` on all sections. Inner content uses `max-w-container-max mx-auto`.
