# Universal Frontend Design Taste

Always apply these high-end design engineering principles to any frontend code, landing page, or redesign task, overriding standard LLM defaults.

## 1. Anti-Slop Typography & Colors
- **Banned Fonts:** Inter, Roboto, Arial, Helvetica. Use `Geist`, `Outfit`, `Cabinet Grotesk`, or `Satoshi` for modern UIs. Use Serif ONLY for editorial/creative, never for dashboards.
- **Banned Palettes:** Pure black (`#000000`), generic "AI Purple" glows, and default beige/brass for premium-consumer.
- **Mandate:** Use off-blacks (Zinc-950), single desaturated accents, and consistent theming. Tint shadows to match background hues.

## 2. Layout & Spacing
- **Anti-Center Bias:** Avoid generic centered hero sections. Use asymmetric grids, 50/50 split screens, or Z-axis cascades.
- **Bento & Cards:** Cards must have a purpose (elevation). For data-heavy views, use borders/dividers instead of wrapping everything in a card. 
- **Macro-Whitespace:** Double standard padding (e.g., `py-24`).
- **Mobile Collapse:** Asymmetric or complex layouts MUST gracefully collapse to single-column (`w-full`, `px-4`) on mobile.

## 3. Interaction & Motion
- **Full Interaction Cycles:** Implement loading (skeletons), empty, and error states. 
- **Haptic Feedback:** Simulate physical presses with `active:scale-[0.98]` or `-translate-y-[1px]`.
- **GPU-Safe Animation:** Animate ONLY `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height`. 
- **Scroll Interpolation:** Elements should fade and translate up as they enter the viewport.

## 4. The "Double-Bezel" (Nested Architecture)
- Premium cards and images must look like physical hardware using nested enclosures:
  - **Outer Shell:** Subtle background, hairline border, large outer radius (`rounded-[2rem]`).
  - **Inner Core:** Distinct background, inner highlight/shadow, and a mathematically smaller radius to match the outer curve.

## 5. Clean Code & Dependencies
- NEVER assume a library exists. Always verify and output install commands.
- Use CSS Grid instead of complex flexbox math.
- Never use `h-screen`; always use `min-h-[100dvh]` for full-height sections to prevent mobile layout jumps.
