

## Plan: Adaugare 23 produse noi in catalog

### Produse de adaugat

**20 produse noi** + **3 produse existente de actualizat** (1256, 1200, 1195 — actualizare baxuriPalet și alte detalii).

### Categorizare

| Categorie | Produse |
|-----------|---------|
| **napolitane** (Wafers) | 1625, 1626, 1627 — WAFER ROLL MAGIC (+ is_gama_magic = true) |
| **jeleuri** (Jellies) | 1628, 1629, 1630, 1631, 1632, 1633, 1634 — JELEU GUMMY series |
| **jeleuri** | 1448 — JELLY SPIDER POPPING |
| **jeleuri** | 1635, 1636 — PINEAPPLE/ORANGE JELLY |
| **jeleuri** | 1642 — JELEU FRIES JAM |
| **jeleuri** | 1256 (update baxuriPalet: 55), 1195 (update baxuriPalet: 40) |
| **acadele** (Lollipops) | 1638 — ACADELE COMB |
| **acadele** | 1200 (update name: ACADELE CRAZY POPPING STAND, baxuriPalet: 30), 1643 — ACADELE CRAZY POPPING CUTIE |
| **drajeuri** (Dragees) | 1639 — DRAJEU SMOKE |
| **guma** (Gum) | 1637 — GUMA SUPER MINT, 1640 — GUMA RACER TOY |
| **marshmallow** | 1641 — SPRING MARSHMALLOW |

### Modificari

1. **`src/data/productsData.ts`** — adaug 20 intrari noi si actualizez 3 existente (1256, 1200, 1195) cu baxuriPalet corect
2. **Database (insert tool)** — inserez cele 20 produse noi in tabela `products` si actualizez cele 3 existente
3. Produsele 1625, 1626, 1627 (WAFER ROLL MAGIC) vor avea `is_gama_magic = true`
4. Imaginile vor fi adaugate ulterior cand le trimiti

