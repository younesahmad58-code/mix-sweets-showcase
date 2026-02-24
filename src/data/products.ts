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
  { id: 'biscuiti-napolitane', label: { ro: 'Biscuiți & Napolitane', en: 'Biscuits & Wafers', ar: 'بسكويت وويفر' } },
  { id: 'prajituri-torturi', label: { ro: 'Prăjituri & Torturi', en: 'Cakes & Pastries', ar: 'كعك ومعجنات' } },
  { id: 'jeleuri-pudding', label: { ro: 'Jeleuri & Pudding', en: 'Jellies & Pudding', ar: 'جيلي وبودنغ' } },
  { id: 'acadele-drajeuri', label: { ro: 'Acadele & Drajeuri', en: 'Lollipops & Dragees', ar: 'مصاصات ودراجي' } },
  { id: 'marshmallow', label: { ro: 'Marshmallow', en: 'Marshmallow', ar: 'مارشميلو' } },
  { id: 'sucuri-spray', label: { ro: 'Sucuri & Spray', en: 'Drinks & Spray', ar: 'مشروبات ورذاذ' } },
  { id: 'guma', label: { ro: 'Gumă', en: 'Gum', ar: 'علكة' } },
  { id: 'caramele-drops', label: { ro: 'Caramele & Drops', en: 'Caramels & Drops', ar: 'كراميل ودروبس' } },
  { id: 'altele', label: { ro: 'Altele', en: 'Other', ar: 'أخرى' } },
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
