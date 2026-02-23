import rainbowCanes from '@/assets/products/rainbow-canes.jpeg';
import flashlightCandy from '@/assets/products/flashlight-candy.jpeg';
import sprayCandy from '@/assets/products/spray-candy.jpeg';
import bulletSpray from '@/assets/products/bullet-spray.jpeg';
import monkeyPudding from '@/assets/products/monkey-pudding.jpeg';
import loveLollipop from '@/assets/products/love-lollipop.jpeg';
import balloonGummy from '@/assets/products/balloon-gummy.jpeg';
import fruitSticks from '@/assets/products/fruit-sticks.jpeg';
import iceCreamMarshmallow from '@/assets/products/ice-cream-marshmallow.jpeg';
import flowerLollipops from '@/assets/products/flower-lollipops.jpeg';
import chocolateBeans from '@/assets/products/chocolate-beans.jpeg';
import eggosChocolate from '@/assets/products/eggos-chocolate.jpeg';
import magicWafer from '@/assets/products/magic-wafer.png';

export interface Product {
  id: string;
  slug: string;
  name: { ro: string; en: string; ar: string };
  description: { ro: string; en: string; ar: string };
  category: string;
  images: string[];
  grammage: { ro: string; en: string; ar: string };
  badges: string[];
  variants?: string[];
}

export const categories = [
  { id: 'biscuits', label: { ro: 'Biscuiți', en: 'Biscuits', ar: 'بسكويت' } },
  { id: 'cakes', label: { ro: 'Prăjituri', en: 'Cakes', ar: 'كعك' } },
  { id: 'chocolate', label: { ro: 'Ciocolată', en: 'Chocolate', ar: 'شوكولاتة' } },
  { id: 'lollipops', label: { ro: 'Acadele', en: 'Lollipops', ar: 'مصاصات' } },
  { id: 'jellies', label: { ro: 'Jeleuri', en: 'Jellies', ar: 'جيلي' } },
];

export const demoProducts: Product[] = [
  {
    id: '1', slug: 'rainbow-candy-canes',
    name: { ro: 'Acadele Baston Rainbow', en: 'Rainbow Candy Canes', ar: 'عصا حلوى قوس قزح' },
    description: {
      ro: 'Acadele în formă de baston, colorate în culorile curcubeului. Pachet de 60 bucăți, ideale pentru cadouri și evenimente.',
      en: 'Rainbow-colored candy canes in a jar. Pack of 60 pieces, perfect for gifts and events.',
      ar: 'عصا حلوى ملونة بألوان قوس قزح. عبوة من 60 قطعة، مثالية للهدايا والمناسبات.',
    },
    category: 'lollipops', images: [rainbowCanes],
    grammage: { ro: '60 buc', en: '60 pcs', ar: '60 قطعة' },
    badges: ['popular'], variants: ['60 buc'],
  },
  {
    id: '2', slug: 'flashlight-toy-candy',
    name: { ro: 'Flashlight Toy CC Stick', en: 'Flashlight Toy CC Stick', ar: 'حلوى مصباح يدوي' },
    description: {
      ro: 'Bomboane CC Stick cu jucărie lanternă inclusă. Un mix distractiv pentru copii — dulciuri și joc într-un singur produs.',
      en: 'CC Stick candies with a flashlight toy included. A fun mix for kids — sweets and play in one product.',
      ar: 'حلوى CC Stick مع لعبة مصباح يدوي. مزيج ممتع للأطفال — حلويات ولعب في منتج واحد.',
    },
    category: 'lollipops', images: [flashlightCandy],
    grammage: { ro: '20 buc', en: '20 pcs', ar: '20 قطعة' },
    badges: ['new'], variants: ['20 buc'],
  },
  {
    id: '3', slug: 'spray-candy',
    name: { ro: 'Spray Candy Fructat', en: 'Fruit Spray Candy', ar: 'حلوى رذاذ الفواكه' },
    description: {
      ro: 'Bomboane lichide spray cu arome de cola, lămâie și portocală. Format distractiv care aduce zâmbete.',
      en: 'Liquid spray candies with cola, lemon, and orange flavors. Fun format that brings smiles.',
      ar: 'حلوى رذاذ سائلة بنكهات الكولا والليمون والبرتقال. تنسيق ممتع يجلب الابتسامات.',
    },
    category: 'lollipops', images: [sprayCandy],
    grammage: { ro: '24 buc', en: '24 pcs', ar: '24 قطعة' },
    badges: ['popular'], variants: ['24 buc'],
  },
  {
    id: '4', slug: 'bullet-spray-candy',
    name: { ro: 'Mini Bullet Spray Candy', en: 'Mini Bullet Spray Candy', ar: 'حلوى رذاذ الرصاصة' },
    description: {
      ro: 'Bomboane spray în formă de glonț, cu arome intense de fructe. Design unic și gust irezistibil.',
      en: 'Bullet-shaped spray candies with intense fruit flavors. Unique design and irresistible taste.',
      ar: 'حلوى رذاذ على شكل رصاصة بنكهات فواكه مكثفة. تصميم فريد وطعم لا يقاوم.',
    },
    category: 'lollipops', images: [bulletSpray],
    grammage: { ro: '30 buc', en: '30 pcs', ar: '30 قطعة' },
    badges: ['new'], variants: ['30 buc'],
  },
  {
    id: '5', slug: 'monkey-pudding',
    name: { ro: 'Monkey Pudding', en: 'Monkey Pudding', ar: 'بودنغ القرد' },
    description: {
      ro: 'Budincă fructată în borcan, cu arome variate. 65 de bucăți colorate și delicioase, perfecte pentru copii.',
      en: 'Fruit pudding in a jar with various flavors. 65 colorful and delicious pieces, perfect for kids.',
      ar: 'بودنغ فاكهة في برطمان بنكهات متنوعة. 65 قطعة ملونة ولذيذة، مثالية للأطفال.',
    },
    category: 'jellies', images: [monkeyPudding],
    grammage: { ro: '65 buc', en: '65 pcs', ar: '65 قطعة' },
    badges: ['popular'], variants: ['65 buc'],
  },
  {
    id: '6', slug: 'love-lollipop',
    name: { ro: 'Love Lollipop Inimioară', en: 'Love Heart Lollipop', ar: 'مصاصة قلب الحب' },
    description: {
      ro: 'Acadele în formă de inimă, colorate și atractive. 30 de bucăți ambalate individual, ideale pentru Valentine\'s Day.',
      en: 'Heart-shaped lollipops, colorful and attractive. 30 individually wrapped pieces, ideal for Valentine\'s Day.',
      ar: 'مصاصات على شكل قلب، ملونة وجذابة. 30 قطعة مغلفة بشكل فردي، مثالية لعيد الحب.',
    },
    category: 'lollipops', images: [loveLollipop],
    grammage: { ro: '30 buc', en: '30 pcs', ar: '30 قطعة' },
    badges: ['seasonal'], variants: ['30 buc'],
  },
  {
    id: '7', slug: 'balloon-gummy',
    name: { ro: 'Balloon Gummy', en: 'Balloon Gummy', ar: 'حلوى البالون المطاطية' },
    description: {
      ro: 'Jeleuri moi în formă de balon, 50 de bucăți colorate într-un borcan atractiv. Textura perfectă.',
      en: 'Soft balloon-shaped gummies, 50 colorful pieces in an attractive jar. Perfect texture.',
      ar: 'حلوى مطاطية على شكل بالون، 50 قطعة ملونة في برطمان جذاب. قوام مثالي.',
    },
    category: 'jellies', images: [balloonGummy],
    grammage: { ro: '8g × 50 buc', en: '8g × 50 pcs', ar: '8غ × 50 قطعة' },
    badges: ['popular'], variants: ['50 buc'],
  },
  {
    id: '8', slug: 'fruit-sticks',
    name: { ro: 'Fruit Sticks Răcoritoare', en: 'Refreshing Fruit Sticks', ar: 'أعواد الفواكه المنعشة' },
    description: {
      ro: 'Batoane de gheață cu arome de fructe tropicale. Răcoritoare și colorate, într-un borcan transparent.',
      en: 'Ice sticks with tropical fruit flavors. Refreshing and colorful, in a transparent jar.',
      ar: 'أعواد ثلج بنكهات فواكه استوائية. منعشة وملونة، في برطمان شفاف.',
    },
    category: 'jellies', images: [fruitSticks],
    grammage: { ro: '30 buc', en: '30 pcs', ar: '30 قطعة' },
    badges: ['new', 'seasonal'], variants: ['30 buc'],
  },
  {
    id: '9', slug: 'ice-cream-marshmallow',
    name: { ro: 'Ice Cream Marshmallow cu Gem', en: 'Ice Cream Marshmallow with Jam', ar: 'مارشميلو آيس كريم بالمربى' },
    description: {
      ro: 'Marshmallow în formă de cornet de înghețată, umplut cu gem de fructe. 30 de bucăți ambalate individual.',
      en: 'Ice cream cone shaped marshmallow filled with fruit jam. 30 individually wrapped pieces.',
      ar: 'مارشميلو على شكل كوب آيس كريم محشو بمربى الفواكه. 30 قطعة مغلفة بشكل فردي.',
    },
    category: 'cakes', images: [iceCreamMarshmallow],
    grammage: { ro: '30 buc', en: '30 pcs', ar: '30 قطعة' },
    badges: ['new'], variants: ['30 buc'],
  },
  {
    id: '10', slug: 'flower-lollipops',
    name: { ro: 'Acadele Floare', en: 'Flower Lollipops', ar: 'مصاصات الزهور' },
    description: {
      ro: 'Acadele decorative în formă de floare, cu bile de ciocolată. Perfecte pentru petreceri și cadouri.',
      en: 'Decorative flower-shaped lollipops with chocolate balls. Perfect for parties and gifts.',
      ar: 'مصاصات زهور مزخرفة مع كرات شوكولاتة. مثالية للحفلات والهدايا.',
    },
    category: 'lollipops', images: [flowerLollipops],
    grammage: { ro: '24 buc', en: '24 pcs', ar: '24 قطعة' },
    badges: ['seasonal'], variants: ['24 buc'],
  },
  {
    id: '11', slug: 'colorful-chocolate-beans',
    name: { ro: 'Colorful Chocolate Beans', en: 'Colorful Chocolate Beans', ar: 'حبوب شوكولاتة ملونة' },
    description: {
      ro: 'Drajeuri de ciocolată colorate în formă de creioane. Design unic și distractiv, perfect pentru copii.',
      en: 'Colorful chocolate beans in crayon-shaped packaging. Unique and fun design, perfect for kids.',
      ar: 'حبوب شوكولاتة ملونة في عبوة على شكل أقلام تلوين. تصميم فريد وممتع، مثالي للأطفال.',
    },
    category: 'chocolate', images: [chocolateBeans],
    grammage: { ro: '24 buc', en: '24 pcs', ar: '24 قطعة' },
    badges: ['new'], variants: ['24 buc'],
  },
  {
    id: '12', slug: 'eggos-chocolate-egg',
    name: { ro: 'Eggos Ou de Ciocolată', en: 'Eggos Chocolate Egg', ar: 'بيضة شوكولاتة إيغوس' },
    description: {
      ro: 'Ouă de ciocolată cu surpriză și biscuiți crocanți. 24 de bucăți, disponibile pentru băieți și fete.',
      en: 'Chocolate eggs with surprise toy and crunchy biscuits. 24 pieces, available for boys and girls.',
      ar: 'بيض شوكولاتة مع لعبة مفاجأة وبسكويت مقرمش. 24 قطعة، متاحة للأولاد والبنات.',
    },
    category: 'biscuits', images: [eggosChocolate],
    grammage: { ro: '24 buc', en: '24 pcs', ar: '24 قطعة' },
    badges: ['popular'], variants: ['24 buc'],
  },
  {
    id: '13', slug: 'magic-wafer-strawberry',
    name: { ro: 'Magic Wafer Căpșuni', en: 'Magic Wafer Strawberry', ar: 'ويفر ماجيك فراولة' },
    description: {
      ro: 'Napolitane crocante umplute cu cremă de căpșuni. 8 bucăți într-un pachet, gustare perfectă pentru orice moment.',
      en: 'Crunchy wafers filled with strawberry cream. 8 pieces per pack, the perfect snack for any moment.',
      ar: 'ويفر مقرمش محشو بكريمة الفراولة. 8 قطع في العبوة، وجبة خفيفة مثالية لأي وقت.',
    },
    category: 'biscuits', images: [magicWafer],
    grammage: { ro: '8 buc', en: '8 pcs', ar: '8 قطع' },
    badges: ['new'], variants: ['8 buc'],
  },
];
