
## Fix: Equalize Stat Cards Height

**Problem:** The 4 stat cards in "Experiență și Tradiție" are not equal height. The "4000 m²" card with longer label text ("CAPACITATE DE DEPOZITARE") is taller, pushing its row to be bigger than the top row.

**Root Cause:** While `auto-rows-fr` equalizes grid row heights, the `ScrollReveal` wrapper inside each grid cell doesn't stretch to fill the available space, so the inner card doesn't expand either.

**Fix in `src/pages/Index.tsx` (lines 319-321):**
- Add `h-full` to the `ScrollReveal` component wrapper
- Add `h-full` to the inner card `div` so it stretches to match the tallest card in its row

This ensures all 4 cards visually appear the same size, with content centered vertically.
