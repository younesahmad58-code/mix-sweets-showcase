

## Transformare sectiune "Noutati" in "Produse de Top" cu carousel Gama Magic

### Ce se schimba

Sectiunea "Noutati si Produse Sezoniere" de pe homepage devine "Produse de Top" si va afisa produsele din Gama Magic intr-un carousel/slideshow automat.

### Modificari

**1. Traduceri (`src/i18n/translations.ts`)**
- `seasonal.eyebrow`: "NOUTATI" -> "PRODUSE DE TOP" (ro), "TOP PRODUCTS" (en), "افضل المنتجات" (ar)
- `seasonal.title`: "Noutati si Produse Sezoniere" -> "Produsele noastre de Top" (ro), "Our Top Products" (en), "منتجاتنا الأفضل" (ar)
- `seasonal.subtitle`: text actualizat despre cele mai vandute produse din Gama Magic

**2. Logica produse (`src/pages/Index.tsx`)**
- In loc de 3 produse hardcodate (FEATURED_SLUGS), filtram produsele cu `is_gama_magic === true` si luam primele 6
- Eliminam constanta FEATURED_SLUGS

**3. Carousel cu Embla (`src/pages/Index.tsx`)**
- Proiectul are deja `embla-carousel-react` instalat
- Inlocuim grid-ul static cu un carousel Embla cu autoplay
- Desktop: afiseaza 3 carduri vizibile simultan, se misca automat la ~4 secunde
- Mobil: afiseaza 1.2 carduri (peek effect - se vede partial urmatorul card), aceeasi viteza
- Loop infinit activat
- Cardurile pastreaza acelasi design existent (card-3d, FeaturedImage, etc.)
- Produsele Gama Magic vor avea `bg-black` pe containerul imaginii (consistent cu pagina Products)

**4. Stilizare carousel**
- Adaugam CSS minimal in `src/index.css` pentru spatiere slide-uri Embla
- Fara butoane next/prev vizibile (optional dots indicator discret)
- Tranzitie smooth intre slide-uri

### Detalii tehnice

- Embla autoplay se configureaza cu `embla-carousel-autoplay` plugin - verificam daca e instalat, altfel folosim `setInterval` + `scrollNext()`
- Pe mobil, `slidesToScroll: 1`, `align: 'start'`, cu CSS gap pentru peek effect
- Pe desktop, `slidesToScroll: 1`, afisam 3 slide-uri prin CSS `flex: 0 0 33.33%`
