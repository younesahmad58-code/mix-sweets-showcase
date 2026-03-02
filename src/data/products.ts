import { productsData } from './productsData';

export interface Product {
  id: number;
  slug: string;
  name: { ro: string; en: string; ar: string };
  description: { ro: string; en: string; ar: string };
  category: string;
  images: string[];
  grammage: { ro: string; en: string; ar: string };
  badges: string[];
  variants?: string[];
  cod: number;
  weight: string;
  cutieBox: number | string | null;
  bucCutie: number | string | null;
  baxuriPalet: number | null;
}

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

function categorizeProduct(name: string): string {
  const n = name.toUpperCase();

  if (/\b(BISCUIT|BISC|WAFER|NAPOLITANA|CORN)\b/.test(n) || n.includes('BISCUITI') || n.includes('NAP '))
    return 'biscuiti-napolitane';

  if (/\b(CAKE|DONUT|MUFFIN|ROLL|CROISSANT)\b/.test(n))
    return 'prajituri-torturi';

  if (/\b(JELLY|JELEU|GUMMY|PUDDING)\b/.test(n) || n.includes('JELEU'))
    return 'jeleuri-pudding';

  if (/\b(ACADELE|LIPSTICK|FLUTE|ROLLER|WHISTLE|BRATARA)\b/.test(n))
    return 'acadele-drajeuri';

  if (/\b(DRAJEURI|DRAJEU)\b/.test(n))
    return 'acadele-drajeuri';

  if (/\b(MARSHMALLOW)\b/.test(n) || n.includes('ICE LOLLY') || n.includes('ICE CREAM LOLLY'))
    return 'marshmallow';

  if (/\b(SUC|SPRAY|BALON)\b/.test(n))
    return 'sucuri-spray';

  if (/\b(GUMA)\b/.test(n))
    return 'guma';

  if (/\b(CARAMELE|DROPS)\b/.test(n))
    return 'caramele-drops';

  return 'altele';
}

export const demoProducts: Product[] = productsData.map(p => ({
  id: p.cod,
  slug: String(p.cod),
  name: { ro: p.name, en: p.name, ar: p.name },
  description: { ro: '', en: '', ar: '' },
  category: categorizeProduct(p.name),
  images: [`/products/${p.cod}.jpg`],
  grammage: { ro: p.weight, en: p.weight, ar: p.weight },
  badges: [],
  cod: p.cod,
  weight: p.weight,
  cutieBox: p.cutieBox,
  bucCutie: p.bucCutie,
  baxuriPalet: p.baxuriPalet,
}));
