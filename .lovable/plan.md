

## Fix Plan: 3 Issues

### 1. Page jumping during count-up animation
**Problem:** When numbers animate from 0 to their target (e.g., 0 -> 4000), the text width changes, causing layout shifts that make the page jump up and down.

**Fix in `src/components/CountUpStat.tsx`:**
- Add `tabular-nums` font feature to the number span so all digits occupy equal width
- Add a fixed minimum width to prevent layout shifts during animation

### 2. Logos not showing on GitHub Pages
**Problem:** Header uses `src="/logo3.png"` and Footer uses `src="/logo.jpeg"` -- these absolute paths break on GitHub Pages where the base URL is `/mix-sweets-showcase/`.

**Fix:**
- Copy the uploaded logos to `src/assets/` (logo3.png for header, logo.jpeg for footer)
- Import them as ES6 modules in Header.tsx and Footer.tsx instead of using absolute `/` paths
- This way Vite handles the base URL automatically

### 3. Update favicon
**Fix:**
- Copy uploaded `logo3.png` to `public/favicon.png`
- Update `index.html` to reference the new favicon

---

### Technical Details

**Files to modify:**
- `src/components/CountUpStat.tsx` -- add `tabular-nums` style to prevent layout shift
- `src/components/Header.tsx` -- import logo from `@/assets/logo3.png` instead of `/logo3.png`
- `src/components/Footer.tsx` -- import logo from `@/assets/logo.jpeg` instead of `/logo.jpeg`
- `index.html` -- add favicon link to `/favicon.png`

**Files to copy:**
- `user-uploads://logo3.png` -> `public/favicon.png` (for favicon)
- `user-uploads://logo3.png` -> `src/assets/logo3.png` (for header, if not already there)
- `user-uploads://logo.jpeg` -> `src/assets/logo.jpeg` (for footer, if not already there -- check existing `src/assets/logo.jpg`)
