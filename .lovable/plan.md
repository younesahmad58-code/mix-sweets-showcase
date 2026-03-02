

## Equal Height Product Cards

**File:** `src/pages/Products.tsx` -- 3 small class changes, no other modifications.

### Changes

1. **Link element** (~line 151): Add `h-full` so the link stretches to fill the SquishyCard
   - From: `className="group block"`
   - To: `className="group block h-full"`

2. **Inner card div** (~line 152): Add `flex flex-col h-full` so the card fills the link and uses flexbox layout
   - From: `className="bg-card rounded-[20px] overflow-hidden shadow-[...] transition-all duration-500 border border-gold/[0.15]"`
   - To: `className="bg-card rounded-[20px] overflow-hidden shadow-[...] transition-all duration-500 border border-gold/[0.15] flex flex-col h-full"`

3. **Text content div** (~line 157): Add `flex flex-col flex-1` so the text area expands to fill remaining space, pushing the bottom row down uniformly
   - From: `className="p-3 md:p-5"`
   - To: `className="p-3 md:p-5 flex flex-col flex-1"`

These three additions ensure all cards in each grid row share the same height regardless of product name length.

