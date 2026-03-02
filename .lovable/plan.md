

## Category Reorganization with Gama Magic Flag

### Part A: Database Changes

**Step 1 -- Schema migration** (add boolean column):
```sql
ALTER TABLE products ADD COLUMN is_gama_magic BOOLEAN DEFAULT FALSE;
```

**Step 2 -- Data updates** (using insert/update tool, NOT migration):

```sql
-- 1. Rename prajituri-torturi -> prajituri-checuri
UPDATE products SET category = 'prajituri-checuri' WHERE category = 'prajituri-torturi';

-- 2. Split biscuiti-napolitane -> biscuiti and napolitane
UPDATE products SET category = 'biscuiti' WHERE slug IN ('1537','1536','1526','1527','1528','1454','1452','1577','1453','1456','1584','1587','1529','1583','1455','1580','1578','1251','972','1252');
UPDATE products SET category = 'napolitane' WHERE slug IN ('398','397','441','1102','1226','1520','1521','1585','1586','1522','1519','1525','1523','1524','1486','808','810','807','809','788','787','789','811','1502','1503','1501','302','1572');

-- 3. Split acadele-drajeuri -> acadele and drajeuri
UPDATE products SET category = 'acadele' WHERE slug IN ('626','1384','988','1569','581','1200','580','1333','1164','1119','582','1485','536','564','1334','932','374');
UPDATE products SET category = 'drajeuri' WHERE slug IN ('1391','1369','453','205','930','212','454');

-- 4. Split jeleuri-pudding -> budinca first, then jeleuri
UPDATE products SET category = 'budinca' WHERE slug IN ('929','686','1387','982','1557','919','1491','1490','1492','1497','1496','1489','1495','1494','1493','979','976','978','1147','1018','1131','953');
UPDATE products SET category = 'jeleuri' WHERE slug IN ('957','1570','1567','1566','279','1127','1562','1129','1165','1121','1235','291','1237','1256','1371','1386','1563','1227','1556','1559','1230','1380','1231','1228','1555','1262','1565','266','935','1561','1389','533','1542','1238','1539','1560','497','700','980','540','1553','583','496','584','495','1326','1136','755','754','756','117','1148','1400','541','1545','984','947','975','974','870','1475','1488','1478','1477','1476','1540','272','958','1411','1038');

-- 5. Rename altele -> ciocolata
UPDATE products SET category = 'ciocolata' WHERE category = 'altele';

-- 6. Flag Gama Magic products (they STAY in biscuiti/napolitane)
UPDATE products SET is_gama_magic = TRUE WHERE slug IN ('1453','1452','1454','1577','1455','1456','1529','1584','1583','1587','1528','1526','1527','1578','1580','1585','1586','1521','1520','1522','1519','1525','1523','1524');
```

---

### Part B: Code Changes (2 files)

**File 1: `src/data/products.ts`** -- Replace the `categories` array (lines 20-29) with new order and labels:

```typescript
export const categories = [
  { id: 'gama-magic', label: { ro: 'Gama Magic', en: 'Magic Range', ar: 'مجموعة ماجيك' } },
  { id: 'biscuiti', label: { ro: 'Biscuiți', en: 'Biscuits', ar: 'بسكويت' } },
  { id: 'napolitane', label: { ro: 'Napolitane', en: 'Wafers', ar: 'ويفر' } },
  { id: 'prajituri-checuri', label: { ro: 'Prăjituri & Checuri', en: 'Cakes & Pastries', ar: 'كعك ومعجنات' } },
  { id: 'ciocolata', label: { ro: 'Ciocolată', en: 'Chocolate', ar: 'شوكولاتة' } },
  { id: 'jeleuri', label: { ro: 'Jeleuri', en: 'Jellies', ar: 'جيلي' } },
  { id: 'budinca', label: { ro: 'Budincă', en: 'Pudding', ar: 'بودنغ' } },
  { id: 'acadele', label: { ro: 'Acadele', en: 'Lollipops', ar: 'مصاصات' } },
  { id: 'drajeuri', label: { ro: 'Drajeuri', en: 'Dragees', ar: 'دراجي' } },
  { id: 'marshmallow', label: { ro: 'Marshmallow', en: 'Marshmallow', ar: 'مارشميلو' } },
  { id: 'guma', label: { ro: 'Gumă', en: 'Gum', ar: 'علكة' } },
  { id: 'sucuri-spray', label: { ro: 'Sucuri Spray', en: 'Drinks & Spray', ar: 'مشروبات ورذاذ' } },
  { id: 'caramele-drops', label: { ro: 'Caramele & Drops', en: 'Caramels & Drops', ar: 'كراميل ودروبس' } },
];
```

**File 2: `src/hooks/useProducts.ts`** -- Add `is_gama_magic` to the `DBProduct` interface:

```typescript
export interface DBProduct {
  // ... existing fields ...
  is_gama_magic: boolean;
}
```

**File 3: `src/pages/Products.tsx`** -- Update filter logic (line 70) to handle `gama-magic`:

```typescript
const filtered = useMemo(() => {
  return products.filter(p => {
    const matchCat =
      activeCategory === 'all' ||
      (activeCategory === 'gama-magic' ? (p as any).is_gama_magic : p.category === activeCategory);
    const q = search.toLowerCase();
    const matchSearch = !search || getName(p).toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}, [activeCategory, search, lang, products]);
```

Also update the mobile category buttons (lines 120-146) to a horizontal scrollable row on mobile with left/right chevron arrows, keeping the vertical sidebar on desktop.

---

### Summary
- 1 schema migration: add `is_gama_magic` boolean column
- 7 SQL UPDATE statements for category reassignment + gama magic flag
- 3 code files: categories array, DBProduct interface, filter logic + mobile scroll buttons
- Gama Magic products stay in biscuiti/napolitane but are also filterable via the `is_gama_magic` flag

