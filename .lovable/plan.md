

# UI Patch Plan -- MIX SWEETS

## 1. Remove Unverified Claims

**Index.tsx (Home page)**
- Delete the entire "Trust / Stats" section (lines 164-187) -- the block with 150+, 25+, 200+ stats and the "Partner de Incredere" heading.
- Replace it with a simple "Experienta si Traditie" section: a centered heading + 2-3 generic sentences mentioning "peste 30 de ani experienta" without any specific numbers (except "30+").

**About.tsx**
- Remove the entire Timeline section (lines 71-95) with years 1993/2000/2010/2018/2022/2025.
- Replace about.story.p3 (which mentions "Top Profit / locul #2") with a safe, generic paragraph about commitment to quality. No rankings.

**translations.ts**
- Remove all `trust.partners`, `trust.fairs`, `trust.products` keys (keep `trust.years` as fallback or remove).
- Remove all `about.timeline.*` keys.
- Update `about.story.p3` across RO/EN/AR to remove the #2 ranking claim.
- Add new keys for the "Experienta si Traditie" replacement section (RO/EN/AR).

---

## 2. Fix Product Categories

**products.ts** -- Update `categories` array to keep only 5:
- `biscuits` (Biscuiti)
- `cakes` (Prajituri)
- `chocolate` (Ciocolata) -- new ID, replacing previous
- `lollipops` (Acadele)
- `jellies` (Jeleuri) -- new ID, replacing previous

Remove: `candies` (Bomboane), `wafers` (Napolitane), `seasonal` (Sezoniere).

Reassign existing demo products:
- "Napolitane cu Ciocolata" -> category `chocolate`
- "Bomboane Asortate" -> category `chocolate`
- "Jeleuri Fructate" -> category `jellies`
- "Praline Fine" -> category `chocolate`
- "Bezele Colorate" -> category `cakes`
- "Turta Dulce" -> keep but change category from `seasonal` to `cakes` (remove seasonal category)

Update `translations.ts` category keys accordingly (RO/EN/AR).

---

## 3. About Page -- Replace Intro Text

Replace the 3 story paragraphs with content based on the user's provided Romanian base text:

**RO**: "Compania noastra MIX SWEETS este o afacere romaneasca cu experienta de peste 30 de ani, dezvoltata in Bucuresti. Oferim o gama de produse precum biscuiti, prajituri, ciocolata, acadele si jeleuri, alaturi de produse de sezon si sortimente potrivite in orice perioada. Punem accent pe calitate, consecventa si respect fata de clientii nostri, oferind partenerilor produse realizate cu atentie si seriozitate."

Slightly expanded into 2 paragraphs (keeping it factual, no fake claims). Translate naturally to EN and AR (RTL).

---

## 4. Contact Page -- Premium 3D Info Cards

Redesign the contact info area (currently a flat list of address/phone/email/CUI/reg) into:

- A section title "Contacteaza-ne" with a short intro paragraph (translated RO/EN/AR).
- A 3-column grid (desktop) / stacked (mobile) with 3 lifted cards:
  - **Card A "Locatia Noastra"** -- MapPin icon, formatted address
  - **Card B "Informatii de Contact"** -- Phone icon, phone + email
  - **Card C "Program de Lucru"** -- Clock icon, "Luni-Vineri: 09:00-17:00" + "Sambata-Duminica: Inchis"

Card styling: `rounded-xl`, soft shadow (`shadow-lg`), `border border-border`, `bg-card`, hover: `hover:-translate-y-1 hover:shadow-xl`, transition. Icons centered above card titles.

Keep existing form, map, and WhatsApp unchanged.

---

## 5. Color Tone Adjustment

Shift heavy brown sections to cleaner tones:

**index.css**
- Change `--primary` from deep brown `20 60% 20%` to a softer warm charcoal like `20 25% 22%` (less saturated brown).
- Shift hero gradient in Index.tsx from `from-primary via-chocolate to-cocoa` to a more refined `from-[hsl(20,20%,18%)] via-[hsl(15,15%,22%)] to-[hsl(20,10%,28%)]` -- darker, less "brown paint" feel.
- Keep gold accent and cream backgrounds as-is.
- The About hero and Contact hero sections (`bg-primary`) will automatically look cleaner with the adjusted primary.

---

## 6. Logo Treatment

**Header.tsx and Footer.tsx**
- Wrap the logo `<img>` in a container with: `bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm` so the logo sits in a soft light badge instead of appearing as a raw white rectangle.

Also copy the new uploaded logo (`logo_2.png`) to `src/assets/logo_2.png` for use (transparent/cleaner version). Update imports in Header and Footer to use the new logo.

---

## Technical Details

### Files to modify:
1. `src/index.css` -- adjust `--primary` HSL value
2. `src/i18n/translations.ts` -- update/remove keys for trust stats, timeline, about story, add contact card keys, update category keys
3. `src/data/products.ts` -- update categories array and reassign product categories
4. `src/pages/Index.tsx` -- remove Trust/Stats section, add "Experienta si Traditie" section
5. `src/pages/About.tsx` -- remove Timeline section, update story paragraph references
6. `src/pages/Contact.tsx` -- redesign info area into 3-column card grid
7. `src/components/Header.tsx` -- logo badge wrapper + new logo import
8. `src/components/Footer.tsx` -- logo badge wrapper + new logo import

### Asset to copy:
- `user-uploads://logo_2.png` -> `src/assets/logo_2.png`

### No changes to:
- Routing, admin, database, auth, WhatsApp, i18n system logic
- No new libraries

