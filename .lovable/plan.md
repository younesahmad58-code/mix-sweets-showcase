

## Actualizare emoji-uri categorii pe pagina principala

### Problema
Harta `categoryEmoji` din `src/pages/Index.tsx` (linia 16-26) foloseste ID-uri vechi de categorii care nu se potrivesc cu cele actuale. Rezultat: aproape toate categoriile afiseaza emoji-ul default "gift box" in loc de unul specific.

### Solutia
Actualizam obiectul `categoryEmoji` cu ID-urile corecte din `categories` si emoji-uri unice si relevante pentru fiecare categorie:

```text
gama-magic       -> ✨ (stelute/magie)
biscuiti         -> 🍪 (biscuit)
napolitane       -> 🧇 (wafer/napolitana)
prajituri-checuri -> 🎂 (tort/prajitura)
ciocolata        -> 🍫 (ciocolata)
jeleuri          -> 🐻 (ursuleti gummy)
budinca          -> 🍮 (budinca/flan)
acadele          -> 🍭 (acadea)
drajeuri         -> 🍬 (bomboana)
marshmallow      -> ☁️ (nor/pufos)
guma             -> 🫧 (baloane/guma)
sucuri-spray     -> 🧃 (suc)
caramele         -> 🍯 (caramel/miere)
drops            -> 💧 (picatura/drops)
```

### Modificare tehnica

**Fisier: `src/pages/Index.tsx`** - inlocuim obiectul `categoryEmoji` (liniile 16-26) cu noile perechi cheie-emoji corecte. Restul codului ramane neschimbat, designul si stilul cardurilor raman identice.

