

## Optimizare performanta homepage - carousel si animatii

### Problema
Pagina de acasa merge greu pe telefon din cauza:
- Toate cele ~24 produse Gama Magic sunt renderizate cu animatii framer-motion (SquishyCard) in carousel - inutil deoarece carousel-ul le gestioneaza deja vizibilitatea
- FeaturedImage incearca multiple formate de imagine prin cascada de erori (jpg -> jpeg -> png -> avif)
- GoldParticles ruleaza 10 animatii CSS continue in hero
- FloatingBlobs adauga elemente blur costisitoare

### Modificari

**1. Elimina SquishyCard din slide-urile carousel-ului (`src/pages/Index.tsx`)**
- Slide-urile carousel-ului NU au nevoie de wrapping in framer-motion - Embla gestioneaza deja tranzitiile
- Eliminam orice animatie per-slide, pastram doar structura HTML simpla

**2. Optimizeaza FeaturedImage (`src/pages/Index.tsx`)**
- Adaugam `loading="lazy"` si `decoding="async"` (deja exista) dar si `fetchpriority="low"` pentru imaginile din carousel care nu sunt vizibile initial

**3. Reduce GoldParticles pe mobil (`src/components/GoldParticles.tsx`)**
- Pe mobil, reducem de la 10 particule la 5 (sau le dezactivam complet) pentru a economisi resurse GPU

**4. Adaugam `will-change: auto` si reducem blur pe FloatingBlobs pe mobil (`src/components/FloatingBlobs.tsx`)**
- `blur-3xl` este foarte costisitor pe mobil - reducem la `blur-xl` pe mobil

**5. Memoizeaza `gamaMagicProducts` cu `useMemo` (`src/pages/Index.tsx`)**
- Logica de sortare se recalculeaza la fiecare render - o invelim in `useMemo`

### Detalii tehnice

- In `GoldParticles.tsx`: verificam `window.innerWidth < 768` si generam doar 4 particule pe mobil
- In `Index.tsx`: inlocuim `SquishyCard` wrapper din carousel cu un simplu `div`, pastram `card-3d` styling
- In `Index.tsx`: `gamaMagicProducts` devine `useMemo(() => { ... }, [allProducts])`
- Aceste schimbari nu afecteaza designul vizual, doar elimina overhead-ul de animatie si rendering

