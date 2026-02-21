export interface Product {
  id: string;
  slug: string;
  name: { ro: string; en: string; ar: string };
  description: { ro: string; en: string; ar: string };
  category: string;
  images: string[];
  grammage: string;
  badges: string[];
  variants?: string[];
}

export const categories = [
  { id: 'biscuits', label: { ro: 'Biscuiți', en: 'Biscuits', ar: 'بسكويت' } },
  { id: 'cakes', label: { ro: 'Prăjituri', en: 'Cakes', ar: 'كعك' } },
  { id: 'candies', label: { ro: 'Bomboane', en: 'Candies', ar: 'حلوى' } },
  { id: 'seasonal', label: { ro: 'Sezoniere', en: 'Seasonal', ar: 'موسمية' } },
  { id: 'lollipops', label: { ro: 'Acadele', en: 'Lollipops', ar: 'مصاصات' } },
  { id: 'wafers', label: { ro: 'Napolitane', en: 'Wafers', ar: 'ويفر' } },
];

export const demoProducts: Product[] = [
  {
    id: '1', slug: 'biscuiti-glazurati',
    name: { ro: 'Biscuiți Glazurați', en: 'Glazed Biscuits', ar: 'بسكويت مزجج' },
    description: {
      ro: 'Biscuiți crocanți acoperiți cu un strat fin de glazură de ciocolată. Perfecti pentru momentele de răsfăț alături de o ceașcă de cafea.',
      en: 'Crunchy biscuits coated with a fine layer of chocolate glaze. Perfect for indulgent moments with a cup of coffee.',
      ar: 'بسكويت مقرمش مغطى بطبقة رقيقة من الشوكولاتة. مثالي للحظات الاستمتاع مع فنجان قهوة.',
    },
    category: 'biscuits', images: ['/placeholder.svg'], grammage: '200g',
    badges: ['popular'], variants: ['200g', '400g', '1kg'],
  },
  {
    id: '2', slug: 'turta-dulce',
    name: { ro: 'Turtă Dulce', en: 'Gingerbread', ar: 'خبز الزنجبيل' },
    description: {
      ro: 'Turtă dulce tradițională românească cu scorțișoară și miere, preparată după rețete vechi de familie.',
      en: 'Traditional Romanian gingerbread with cinnamon and honey, prepared following old family recipes.',
      ar: 'خبز الزنجبيل الروماني التقليدي بالقرفة والعسل، محضر وفق وصفات عائلية قديمة.',
    },
    category: 'seasonal', images: ['/placeholder.svg'], grammage: '300g',
    badges: ['seasonal'], variants: ['300g', '500g'],
  },
  {
    id: '3', slug: 'fursecuri-asortate',
    name: { ro: 'Fursecuri Asortate', en: 'Assorted Cookies', ar: 'كعك متنوع' },
    description: {
      ro: 'Selecție rafinată de fursecuri cu diverse arome: vanilie, cacao, fructe de pădure și caramel.',
      en: 'Refined selection of cookies with various flavors: vanilla, cocoa, berries, and caramel.',
      ar: 'مجموعة مختارة من الكعك بنكهات متنوعة: فانيليا، كاكاو، توت، وكراميل.',
    },
    category: 'biscuits', images: ['/placeholder.svg'], grammage: '350g',
    badges: ['popular'], variants: ['350g', '700g'],
  },
  {
    id: '4', slug: 'rulouri-cu-crema',
    name: { ro: 'Rulouri cu Cremă', en: 'Cream Rolls', ar: 'لفائف الكريمة' },
    description: {
      ro: 'Rulouri fine de patiserie umplute cu cremă de vanilie și acoperite cu ciocolată.',
      en: 'Fine pastry rolls filled with vanilla cream and coated with chocolate.',
      ar: 'لفائف معجنات فاخرة محشوة بكريمة الفانيليا ومغطاة بالشوكولاتة.',
    },
    category: 'cakes', images: ['/placeholder.svg'], grammage: '250g',
    badges: ['new'], variants: ['250g', '500g'],
  },
  {
    id: '5', slug: 'acadele-fructate',
    name: { ro: 'Acadele Fructate', en: 'Fruit Lollipops', ar: 'مصاصات الفواكه' },
    description: {
      ro: 'Acadele colorate cu arome naturale de fructe: căpșuni, portocale, lămâie și mere verzi.',
      en: 'Colorful lollipops with natural fruit flavors: strawberry, orange, lemon, and green apple.',
      ar: 'مصاصات ملونة بنكهات فواكه طبيعية: فراولة، برتقال، ليمون، وتفاح أخضر.',
    },
    category: 'lollipops', images: ['/placeholder.svg'], grammage: '150g',
    badges: [], variants: ['150g', '300g'],
  },
  {
    id: '6', slug: 'napolitane-cu-ciocolata',
    name: { ro: 'Napolitane cu Ciocolată', en: 'Chocolate Wafers', ar: 'ويفر بالشوكولاتة' },
    description: {
      ro: 'Napolitane crocante cu straturi multiple de cremă de ciocolată intensă.',
      en: 'Crispy wafers with multiple layers of rich chocolate cream.',
      ar: 'ويفر مقرمش بطبقات متعددة من كريمة الشوكولاتة الغنية.',
    },
    category: 'wafers', images: ['/placeholder.svg'], grammage: '200g',
    badges: ['popular'], variants: ['200g', '400g'],
  },
  {
    id: '7', slug: 'bomboane-asortate',
    name: { ro: 'Bomboane Asortate', en: 'Assorted Candies', ar: 'حلوى متنوعة' },
    description: {
      ro: 'Mix elegant de bomboane cu diverse umpluturi: caramel, ciocolată, fructe și mentă.',
      en: 'Elegant mix of candies with various fillings: caramel, chocolate, fruit, and mint.',
      ar: 'مزيج أنيق من الحلويات بحشوات متنوعة: كراميل، شوكولاتة، فواكه، ونعناع.',
    },
    category: 'candies', images: ['/placeholder.svg'], grammage: '400g',
    badges: [], variants: ['400g', '800g'],
  },
  {
    id: '8', slug: 'jeleuri-fructate',
    name: { ro: 'Jeleuri Fructate', en: 'Fruit Jellies', ar: 'جيلي الفواكه' },
    description: {
      ro: 'Jeleuri moi și aromate cu extract natural de fructe, acoperite cu zahăr fin.',
      en: 'Soft and aromatic jellies with natural fruit extract, coated in fine sugar.',
      ar: 'جيلي طري وعطري بخلاصة فواكه طبيعية، مغطى بالسكر الناعم.',
    },
    category: 'candies', images: ['/placeholder.svg'], grammage: '300g',
    badges: ['new'], variants: ['300g', '600g'],
  },
  {
    id: '9', slug: 'praline-fine',
    name: { ro: 'Praline Fine', en: 'Fine Pralines', ar: 'برالين فاخرة' },
    description: {
      ro: 'Praline artizanale cu ciocolată belgiană, umplute cu ganache și alune crocante.',
      en: 'Artisanal pralines with Belgian chocolate, filled with ganache and crunchy hazelnuts.',
      ar: 'برالين حرفية من الشوكولاتة البلجيكية، محشوة بالغاناش والبندق المقرمش.',
    },
    category: 'candies', images: ['/placeholder.svg'], grammage: '200g',
    badges: ['popular'], variants: ['200g', '400g'],
  },
  {
    id: '10', slug: 'bezele-colorate',
    name: { ro: 'Bezele Colorate', en: 'Colorful Meringues', ar: 'ميرانغ ملون' },
    description: {
      ro: 'Bezele ușoare și aerisate în culori pastelate, cu arome delicate de vanilie și zmeură.',
      en: 'Light and airy meringues in pastel colors, with delicate vanilla and raspberry flavors.',
      ar: 'ميرانغ خفيف وهوائي بألوان باستيل، بنكهات فانيليا وتوت لطيفة.',
    },
    category: 'cakes', images: ['/placeholder.svg'], grammage: '150g',
    badges: ['seasonal', 'new'], variants: ['150g'],
  },
];
