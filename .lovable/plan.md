

## Plan: Lazy Loading + Mobile Overflow Fix

### Issue 1 — Lazy Loading for Product Images

Add `loading="lazy"` and `decoding="async"` to all product image `<img>` tags across 3 files:

**1. `src/pages/Products.tsx`** — `ProductImage` component (line 30)
- Add `loading="lazy"` and `decoding="async"` to the img tag

**2. `src/pages/Index.tsx`** — `FeaturedImage` component (line 43)
- Add `loading="lazy"` and `decoding="async"` to the img tag
- Also add to hero images (line 108) with `decoding="async"` (hero images can keep eager loading since they're above the fold, but decoding async still helps)

**3. `src/pages/ProductDetail.tsx`** — `DetailImage` and `RelatedImage` components
- Add `loading="lazy"` and `decoding="async"` to both img tags

**4. `src/components/AdminEditButton.tsx`** — image thumbnails in edit modal
- Add `loading="lazy"` and `decoding="async"` to the thumbnail img tag

### Issue 2 — Mobile Horizontal Overflow

Add overflow-x hidden to prevent the white bar on mobile:

**1. `src/index.css`** — Add to the base layer:
```css
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}
```

**2. `src/pages/Index.tsx`** — The hero section has a 600px wide radial gradient div (line 113) that could cause overflow. The trust strip marquee (line 167) may also cause issues. Both parent sections already have `overflow-hidden`, so the CSS fix on html/body should be sufficient.

### Technical Summary

- **Files modified**: 5 files (`Products.tsx`, `Index.tsx`, `ProductDetail.tsx`, `AdminEditButton.tsx`, `index.css`)
- **No design/layout/color changes** — only adding native HTML attributes and overflow constraint
- **No new dependencies needed**
