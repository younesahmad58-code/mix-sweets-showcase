

## Performance Optimization for Products Page

### What changes

Only `src/pages/Products.tsx` will be modified. No design, layout, colors, or functionality changes.

### 1. "Load More" button (progressive rendering)

- Add a `visibleCount` state, starting at 24
- Slice `filtered` to only render the first `visibleCount` items
- Show an "Incarc&#259; mai multe" button below the grid when there are more products to show
- When category/search changes, reset `visibleCount` back to 24 and scroll to top
- The button shows a count like "Incarc&#259; mai multe (showing 24 of 120)"

### 2. Remove per-card stagger animation delay

- Currently each card gets `delay={i * 0.04}` on `SquishyCard`, which with 279 cards means the last card animates after 11+ seconds
- Change to `delay={Math.min(i * 0.04, 0.4)}` so max stagger is capped at 400ms -- keeps the cascade effect for visible cards but doesn't penalize cards loaded later

### 3. Image sizing hint

- Add `sizes="(min-width: 1280px) 33vw, 50vw"` to the `<img>` tag so the browser knows the display size and can optimize loading
- `loading="lazy"` and `decoding="async"` are already present -- no change needed there

### Technical details

**State additions in Products component:**
```typescript
const [visibleCount, setVisibleCount] = useState(24);
```

**Reset on filter/search change:**
```typescript
// Inside setCategory:
setVisibleCount(24);

// Add useEffect to reset on search change:
useEffect(() => { setVisibleCount(24); }, [search, activeCategory]);
```

**Slicing filtered results:**
```typescript
const visible = filtered.slice(0, visibleCount);
const hasMore = visibleCount < filtered.length;
```

**Load More button** (placed after the grid div, styled to match existing design):
```tsx
{hasMore && (
  <div className="flex justify-center mt-8">
    <button
      onClick={() => setVisibleCount(prev => prev + 24)}
      className="px-8 py-3 bg-primary text-cream rounded-full font-medium text-sm 
                 hover:shadow-[0_0_24px_rgba(176,18,42,0.2)] transition-all duration-300"
    >
      Incarc&#259; mai multe ({visibleCount} / {filtered.length})
    </button>
  </div>
)}
```

**SquishyCard delay cap:**
```tsx
<SquishyCard key={product.id} delay={Math.min(i * 0.04, 0.4)}>
```

**Image sizes attribute:**
```tsx
<img ... sizes="(min-width: 1280px) 33vw, 50vw" />
```

