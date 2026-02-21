

# Complete Premium Luxury Redesign -- MIX SWEETS 2026

A full visual overhaul transforming every page into a cohesive, award-winning luxury artisan sweets brand. Zero changes to routing, i18n logic, database, admin, or state management.

---

## 1. Design System Update (index.css + tailwind.config.ts)

**CSS Variables (index.css light mode):**
- `--background`: Champagne Cream `30 50% 97%` (#FDF8F2)
- `--foreground`: Rich Cocoa `10 60% 8%` (#1A0A08)
- `--card`: Warm off-white `30 30% 98%`
- `--primary`: Deep Crimson `350 75% 32%` (#8B1A1A)
- `--primary-foreground`: Cream `38 50% 92%` (#F5ECD7)
- `--secondary`: Warm muted `30 15% 94%`
- `--accent`: Gold Leaf `42 55% 54%` (#C9A84C)
- `--accent-foreground`: Cocoa `10 60% 8%`
- `--muted`: Warm gray `30 12% 95%`
- `--border`: Subtle warm `30 15% 90%`
- `--cocoa`: `10 60% 7%` (#1A0A08)
- `--cream`: `38 50% 92%` (#F5ECD7)
- `--gold`: `42 55% 54%` (#C9A84C)

Remove all candy-pink, candy-red, candy-glow tokens -- replace with gold-based accents.

**Typography:**
- Keep Playfair Display for headings (already loaded)
- Body remains Plus Jakarta Sans (or Inter if user prefers -- keeping existing Plus Jakarta Sans since it is already configured and very similar)
- Add utility class for eyebrow/label text: uppercase, `tracking-[0.2em]`, `text-[11px]`, gold color

**Shadow utilities:**
- Replace all pink/candy shadows with warm neutral shadows
- `candy-shadow`: `box-shadow: 0 4px 40px rgba(0,0,0,0.06)` (no color tint)
- `candy-shadow-hover`: `box-shadow: 0 8px 48px rgba(0,0,0,0.1)`
- `candy-glow`: `box-shadow: 0 12px 60px rgba(0,0,0,0.08)`
- `gold-glow`: `box-shadow: 0 0 40px rgba(201,168,76,0.15)` (for hover accents)

**Global styles:**
- `scroll-behavior: smooth` on html
- Remove all pink glow references
- Shine effect stays but uses `rgba(255,255,255,0.25)` (warm white, not pink)

---

## 2. WaveDivider Update

Keep the existing component but refine the SVG paths:
- `drip` variant: smoother, more realistic chocolate drip silhouette (fewer bumps, more organic)
- `glaze` variant: elegant, minimal wave -- not cartoonish
- Remove `wave` variant or keep as fallback
- These transitions create the luxury feel between dark cocoa and champagne cream sections

---

## 3. Header (Glassmorphism Navbar)

**Not scrolled (over dark hero):**
- `bg-transparent`
- Logo text "MIX SWEETS": `text-cream` (#F5ECD7), `font-weight: 600`
- Nav links: `text-cream/80`, hover: animated golden underline sliding from left (CSS `::after` pseudo-element via Tailwind `after:` utilities -- `after:h-px after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform`)

**Scrolled:**
- `bg-[rgba(20,6,4,0.6)]` (deep cocoa frosted glass)
- `backdrop-blur-[20px]`
- `border-b border-gold/10`
- Nav links remain cream, active link has gold underline

**Mobile drawer:**
- `bg-cocoa/95 backdrop-blur-xl`
- Links: cream text, active: gold accent

---

## 4. Home Page (Index.tsx)

**Hero Section:**
- Background: `bg-cocoa` (#1A0A08) solid, with floating blobs at very low opacity
- Ken Burns: wrap a pseudo background div with `animate-[kenBurns_12s_ease-in-out_infinite_alternate]` (scale 1 to 1.05)
- Add `kenBurns` keyframe to tailwind config
- Eyebrow: Gold label `tracking-[0.2em] text-[11px] uppercase text-gold` -- text: `"✦ PREMIUM ARTISAN SWEETS ✦"` (already there, just ensure it uses the right gold token)
- Heading: `clamp(3rem, 7vw, 6rem)` via inline style, `font-display`, tight tracking `-0.04em`
- Subtitle: `text-cream/70` (increase from /50), `leading-[1.7]`
- Primary CTA: `bg-primary text-cream border border-gold/30 rounded-full`, hover: `scale(1.03)` + `shadow-[0_0_20px_rgba(201,168,76,0.3)]`
- Secondary CTA: glassmorphism `bg-cream/5 border border-gold/30 text-gold`, hover: `bg-cream/10`
- Wave divider at bottom: `drip` variant with `color="hsl(var(--background))"`

**"Why MIX SWEETS" Section:**
- Remove "Why Choose Us" English eyebrow -- replace with i18n-ready `t('why.eyebrow')` key
- Add translation keys: RO `"✦ AVANTAJELE NOASTRE ✦"`, EN `"✦ OUR ADVANTAGES ✦"`, AR `"✦ مزايانا ✦"`
- Cards: `bg-card rounded-[20px] border border-gold/[0.15]` on light background
- Shadow: `shadow-[0_4px_40px_rgba(0,0,0,0.06)]`
- Hover: `translateY(-8px)` + `shadow-[0_8px_40px_rgba(201,168,76,0.2)]` + `transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1)`
- Icon container: `rounded-xl bg-gold/10` (gold tint)
- Icons: Lucide icons in `text-gold` color (keep existing icons, just recolor)

**Categories Section:**
- Background: `bg-cocoa` (#1A0A08)
- Remove "Our Collection" English eyebrow -- replace with `t('categories.eyebrow')`: RO `"✦ COLECȚIA NOASTRĂ ✦"`, EN `"✦ OUR COLLECTION ✦"`, AR `"✦ مجموعتنا ✦"`
- Grid: 5-column on desktop, horizontal scroll on mobile (`flex overflow-x-auto snap-x snap-mandatory` with `snap-center min-w-[240px]`)
- Each card: `bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-[20px]`, min-height `280px`, flex col justify-end
- Category name: `font-display text-cream text-xl`
- "Explore" text: `text-gold/60 text-xs tracking-[0.15em]`, hover: slides right 4px
- Hover: `border-t-2 border-gold` appears, subtle shimmer sweep (reuse existing shine-effect)
- Dividers: `glaze` variant before/after section

**Seasonal/New Products:**
- Remove "New Arrivals" English eyebrow -- replace with `t('seasonal.eyebrow')`: RO `"✦ NOUTĂȚI ✦"`, EN `"✦ NEW ARRIVALS ✦"`, AR `"✦ جديد ✦"`
- Product cards: `rounded-[20px] border border-gold/[0.15] bg-card shadow-[0_4px_40px_rgba(0,0,0,0.06)]`
- Badge: gold background `bg-gold text-cocoa` instead of primary red
- Hover: lift + golden glow shadow

**Experience and Tradition:**
- Background: `bg-cocoa`
- Remove "Our Heritage" English eyebrow -- replace with `t('tradition.eyebrow')`: RO `"✦ MOȘTENIREA NOASTRĂ ✦"`, EN `"✦ OUR HERITAGE ✦"`, AR `"✦ تراثنا ✦"`
- Text: `text-cream/70`, heading `text-cream`
- Dividers: drip variants

**CTA Strip:**
- Background: `bg-primary` (deep crimson)
- Heading: `text-cream`
- Button: `bg-cream text-cocoa rounded-full`, hover: golden glow

---

## 5. About Page (About.tsx)

**Hero:** `bg-cocoa` with floating blobs, gold eyebrow label (replace "Our Story" with `t('about.eyebrow')`): RO `"✦ POVESTEA NOASTRĂ ✦"`, EN `"✦ OUR STORY ✦"`, AR `"✦ قصتنا ✦"`

**Story section:** `bg-background` (champagne cream), clean serif headings

**Values section:**
- `bg-cocoa` background
- Replace "What We Stand For" with `t('about.values.eyebrow')`: RO `"✦ VALORILE NOASTRE ✦"`, EN `"✦ OUR VALUES ✦"`, AR `"✦ قيمنا ✦"`
- Cards: glassmorphism `bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-[20px]`
- Icons: `text-gold`
- Hover: lift + gold border glow

---

## 6. Products Page (Products.tsx)

**Hero:** `bg-cocoa` with drip divider
- Replace "Our Collection" with `t('categories.eyebrow')`

**Sidebar:**
- Search input: `bg-muted border border-border rounded-[20px]` with focus ring `focus:ring-primary/20`
- Category buttons: active = `bg-primary text-cream`, inactive = `bg-muted text-foreground border border-border rounded-full`

**Product cards:** `rounded-[20px] border border-gold/[0.15] bg-card shadow-[0_4px_40px_rgba(0,0,0,0.06)]`
- Badges: `bg-gold text-cocoa`
- Hover: lift + warm shadow

---

## 7. Product Detail (ProductDetail.tsx)

- Image: `rounded-[20px] border border-gold/[0.15] shadow-[0_4px_40px_rgba(0,0,0,0.06)]`
- Badges: `bg-gold text-cocoa`
- Variant chips: `bg-muted rounded-full border border-border`
- CTA: `bg-primary text-cream border border-gold/30 rounded-full` with shine effect
- Related cards: same style as Products page

---

## 8. Contact Page (Contact.tsx)

**Hero:** `bg-cocoa` with drip divider
- Replace "Get In Touch" with `t('contact.eyebrow')`: RO `"✦ CONTACTEAZĂ-NE ✦"`, EN `"✦ GET IN TOUCH ✦"`, AR `"✦ تواصل معنا ✦"`

**Info Cards:** Glassmorphism on champagne background:
- `bg-white/40 backdrop-blur-lg border border-gold/[0.15] rounded-[20px]`
- Icons: `text-gold`
- Hover: lift + gold glow

**Contact Form:**
- Container: `bg-card rounded-[20px] shadow-[0_12px_60px_rgba(0,0,0,0.08)] border border-gold/[0.15]`
- Inputs: `bg-muted border-0 rounded-xl focus:ring-2 focus:ring-gold/30`
- Submit: `bg-primary text-cream rounded-full border border-gold/30`

---

## 9. Footer (Footer.tsx)

- Background: `bg-cocoa` (#1A0A08)
- Transition from body: drip SVG divider in cocoa color
- Logo text: `text-cream`
- Divider line below logo: `border-gold/20`
- Links: `text-cream/40 hover:text-gold transition-colors`
- Contact icons: `text-gold/60`
- CTA button: `bg-primary text-cream border border-gold/30 rounded-full`
- Copyright: `text-cream/25`, admin link: `text-cream/15`

---

## 10. WhatsApp Button

- Keep existing animation logic
- Glow: `shadow-[0_4px_16px_rgba(37,211,102,0.3)]` (unchanged, green is fine)
- Pulse ring remains

---

## 11. Floating Blobs (FloatingBlobs.tsx)

- Change blob colors from pink to warm gold/amber tones: `bg-gold/20`, `bg-primary/15`, `bg-amber-700/10`
- Keep subtle, slow movement

---

## 12. SquishyCard (SquishyCard.tsx)

- Spring physics: `stiffness: 200, damping: 18` (keep elegant, not bouncy)
- Scale on hover: subtle `1.02` max, not exaggerated

---

## 13. Translations Update

Add new eyebrow keys to all 3 languages (RO/EN/AR):
- `why.eyebrow`
- `categories.eyebrow`
- `seasonal.eyebrow`
- `tradition.eyebrow`
- `about.eyebrow`
- `about.values.eyebrow`
- `contact.eyebrow`

---

## 14. Ken Burns Animation

Add to `tailwind.config.ts` keyframes:
```
kenBurns: {
  "0%": { transform: "scale(1)" },
  "100%": { transform: "scale(1.05)" },
}
```
Animation: `kenBurns 12s ease-in-out infinite alternate`

---

## Files Modified (visual + translations only):

| File | Change |
|------|--------|
| `src/index.css` | Color variables, shadow utilities, smooth scroll |
| `tailwind.config.ts` | Color tokens, kenBurns keyframe, remove pink tokens |
| `src/i18n/translations.ts` | Add eyebrow keys (RO/EN/AR), remove hardcoded English |
| `src/components/Header.tsx` | Frosted glass navbar, golden underlines, cream text |
| `src/components/Footer.tsx` | Deep cocoa bg, gold accents, cream text |
| `src/components/WaveDivider.tsx` | Refined drip/glaze SVG paths |
| `src/components/FloatingBlobs.tsx` | Gold/amber blob colors |
| `src/components/SquishyCard.tsx` | Refined spring physics |
| `src/pages/Index.tsx` | Full visual overhaul, Ken Burns, gold accents, remove English labels |
| `src/pages/About.tsx` | Matching luxury aesthetic, gold eyebrows |
| `src/pages/Products.tsx` | Card styling, gold badges, remove English labels |
| `src/pages/ProductDetail.tsx` | Gold badges, refined shadows |
| `src/pages/Contact.tsx` | Glassmorphism cards, refined form, gold accents |

**Zero changes to:** Routing, i18n system logic, database, admin, WhatsApp logic, state management, data fetching, form handlers.

