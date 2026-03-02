

## Image Container Padding Update

**Single change** in `src/pages/Products.tsx`, line 153:

Change the image container div class from:
```
aspect-[4/3] bg-white relative overflow-hidden
```
to:
```
aspect-[4/3] bg-white relative overflow-hidden p-2 md:p-3
```

This adds inner padding (8px on mobile, 12px on desktop) so product images don't touch the card edges. The existing `bg-white` background will show through the padding, which also helps visually mask images that have dark/black backgrounds baked in.

No other files or lines are modified.

