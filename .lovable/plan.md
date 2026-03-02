

## Simplify SquishyCard Animation

**File:** `src/components/SquishyCard.tsx` -- replace the bouncy spring animation with a clean fade-in + slide-up.

### Current code
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  className={`hover:-translate-y-2 transition-transform duration-300 ${className}`}
>
```

### New code
```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.3, delay, ease: 'easeOut' }}
  className={`hover:-translate-y-2 transition-transform duration-300 ${className}`}
>
```

### What changes
- `y: 30` to `y: 16` -- shorter slide distance, less perceived movement
- `duration: 0.7` to `duration: 0.3` -- snappier, no time for visible bounce
- `ease: [0.22, 1, 0.36, 1]` (custom cubic bezier with overshoot) to `ease: 'easeOut'` -- simple deceleration, no spring/bounce effect
- Everything else stays identical: `viewport`, `delay` prop, hover effect, className passthrough

