

## Rezolvare fundal negru inconsistent la Gama Magic

### Problema
Produsele din Gama Magic au imagini cu fundal negru, dar containerul imaginii are `bg-white` si padding, ceea ce face ca fundalul negru sa apara cu dimensiuni diferite de la produs la produs. Rezultatul: aspect neuniform si urat.

### Solutia
Detectam daca un produs este din Gama Magic (folosind flag-ul `is_gama_magic` deja existent in baza de date) si aplicam un stil diferit containerului imaginii:

- **Fundal negru** (`bg-black`) in loc de `bg-white` pentru produsele Gama Magic
- **Fara padding** (sau padding uniform redus) pentru a lasa imaginea sa umple intreg spatiul
- **`object-contain`** pastrat pentru a nu deforma imaginea, dar pe fundal negru se va integra natural

### Modificari tehnice

**Fisier: `src/pages/Products.tsx`**

1. Transmitem proprietatea `is_gama_magic` catre zona de afisare a imaginii
2. Modificam containerul imaginii din grid sa verifice daca produsul este Gama Magic:

```text
Inainte:
<div className="aspect-[4/3] bg-white relative overflow-hidden p-2 md:p-3">

Dupa (pentru Gama Magic):
<div className="aspect-[4/3] bg-black relative overflow-hidden">

Dupa (pentru restul):
<div className="aspect-[4/3] bg-white relative overflow-hidden p-2 md:p-3">
```

3. In hook-ul `useProducts`, proprietatea `is_gama_magic` este deja disponibila pe fiecare produs, deci nu sunt necesare modificari in baza de date.

### Rezultat
Toate cardurile Gama Magic vor avea fundal negru uniform, de aceeasi dimensiune, fara variatii vizuale intre produse.

