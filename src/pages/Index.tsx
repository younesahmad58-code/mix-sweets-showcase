import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Sparkles, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingBlobs from '@/components/FloatingBlobs';
import GoldParticles from '@/components/GoldParticles';
import SquishyCard from '@/components/SquishyCard';
import Icon3D from '@/components/Icon3D';
import CountUpStat from '@/components/CountUpStat';
import { categories, demoProducts } from '@/data/products';
import { Language } from '@/i18n/translations';
import rainbowCanes from '@/assets/products/rainbow-canes.jpeg';
import monkeyPudding from '@/assets/products/monkey-pudding.jpeg';
import iceCreamMarshmallow from '@/assets/products/ice-cream-marshmallow.jpeg';
import chocolateBeans from '@/assets/products/chocolate-beans.jpeg';
import eggosChocolate from '@/assets/products/eggos-chocolate.jpeg';

const categoryProductImages: Record<string, string | null> = {
  lollipops: rainbowCanes,
  jellies: monkeyPudding,
  cakes: iceCreamMarshmallow,
  chocolate: chocolateBeans,
  biscuits: eggosChocolate,
};

const marqueeTexts: Record<string, string> = {
  ro: '✦ Calitate Certificată ✦ Distribuție Națională ✦ Gamă Completă ✦ Parteneri de Încredere ✦ Produse Premium ✦ Livrare Rapidă ✦\u00a0\u00a0\u00a0',
  en: '✦ Certified Quality ✦ National Distribution ✦ Complete Range ✦ Trusted Partners ✦ Premium Products ✦ Fast Delivery ✦\u00a0\u00a0\u00a0',
  ar: '✦ جودة معتمدة ✦ توزيع وطني ✦ مجموعة كاملة ✦ شركاء موثوقون ✦ منتجات فاخرة ✦ توصيل سريع ✦\u00a0\u00a0\u00a0',
};

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1920&q=80',
    'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1920&q=80',
    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1920&q=80',
    'https://images.unsplash.com/photo-1612201535116-ead35a9f5a4a?w=1920&q=80',
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const whyCards = [
    { icon: Award, title: t('why.quality.title'), desc: t('why.quality.desc') },
    { icon: Sparkles, title: t('why.variety.title'), desc: t('why.variety.desc') },
    { icon: ShieldCheck, title: t('why.reliability.title'), desc: t('why.reliability.desc') },
    { icon: Truck, title: t('why.distribution.title'), desc: t('why.distribution.desc') },
  ];

  const seasonalProducts = demoProducts.filter(p => p.badges.includes('seasonal') || p.badges.includes('new'));

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-[1500ms]"
            style={{ opacity: index === currentImageIndex ? 1 : 0, zIndex: 0 }}
          >
            <img src={img} alt="" className="w-full h-full object-cover animate-ken-burns" style={{ animationDuration: '15s' }} />
          </div>
        ))}
        <div className="absolute inset-0 bg-[rgba(18,8,4,0.82)] z-[0]" />
        <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] z-[1]" style={{ background: 'radial-gradient(ellipse, rgba(176,18,42,0.12) 0%, transparent 70%)' }} />
        <FloatingBlobs className="opacity-10" />
        <GoldParticles />

        <div className="relative z-10 container mx-auto px-5 md:px-4 text-center py-20 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-6">
            <span className="inline-block text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('hero.badge')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-cream leading-[0.95] max-w-5xl mx-auto px-2"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 6rem)', letterSpacing: '-0.04em' }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 md:mt-8 text-base md:text-xl text-cream/70 max-w-2xl mx-auto font-light px-2" style={{ lineHeight: 1.7 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
          >
            <Link to="/products" className="shine-auto relative inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 bg-crimson text-cream font-semibold rounded-full hover:shadow-[0_0_24px_rgba(176,18,42,0.35)] hover:scale-[1.03] transition-all duration-500 text-sm tracking-wide active:scale-[0.97]">
              {t('hero.cta.products')}
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 bg-cream/5 border border-cream/20 text-cream font-medium rounded-full hover:bg-cream/10 transition-all duration-500 text-sm tracking-wide active:scale-[0.97]">
              {t('hero.cta.offer')}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-14 flex items-center justify-center gap-6 md:gap-10"
          >
            {[
              { value: '30+', label: t('stats.years') },
              { value: '500+', label: t('stats.products') },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-8 bg-cream/15" />}
                <div className="text-center">
                  <span className="font-display text-gold text-lg md:text-xl font-semibold">{stat.value}</span>
                  <span className="block text-cream/40 text-[11px] tracking-[0.1em] uppercase mt-0.5">{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Trust Strip Marquee (right after hero) ─── */}
      <div className="py-6 bg-cocoa overflow-hidden border-y border-gold/10">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee-scroll 25s linear infinite' }}>
          {[...Array(3)].map((_, i) => (
            <span key={`${lang}-${i}`} className="text-gold text-sm tracking-widest uppercase font-medium">
              {marqueeTexts[lang]}
            </span>
          ))}
        </div>
      </div>


      {/* ─── Why MIX SWEETS ─── */}
      <section className="py-16 md:py-28 bg-background relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('why.eyebrow')}</span>
            </div>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-center text-foreground" style={{ letterSpacing: '-0.03em' }}>
              {t('why.title')}
            </h2>
          </ScrollReveal>
          <div className="mt-10 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {whyCards.map((card, i) => (
              <SquishyCard key={i} delay={i * 0.1} className="h-full">
                <div className="card-3d p-5 md:p-8 h-full">
                  <Icon3D icon={card.icon} variant="crimson" size="lg" delay={i * 0.1} className="mb-4 md:mb-6" />
                  <h3 className="font-display text-base md:text-xl font-semibold text-foreground mb-2 md:mb-3">{card.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>

      

      {/* ─── Categories ─── */}
      <section className="py-16 md:py-28 bg-cocoa-warm">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('categories.eyebrow')}</span>
            </div>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-center text-cream mb-10 md:mb-16" style={{ letterSpacing: '-0.03em' }}>
              {t('categories.title')}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {categories.map((cat, i) => {
              const emoji = cat.id === 'biscuits' ? '🍪' : cat.id === 'cakes' ? '🎂' : cat.id === 'chocolate' ? '🍫' : cat.id === 'lollipops' ? '🍬' : '🐻';
              const productImage = categoryProductImages[cat.id];
              return (
                <SquishyCard key={cat.id} delay={i * 0.06}>
                  <Link to={`/products?category=${cat.id}`} className="group block">
                    <div className="category-shimmer relative overflow-hidden rounded-[20px] border border-gold/15 bg-white/[0.04] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-t-2 hover:border-t-gold hover:bg-white/[0.06]">
                      <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                        {productImage ? (
                          <>
                            <img src={productImage} alt={cat.label[lang]} className="absolute inset-0 w-full h-full object-cover opacity-15" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </>
                        ) : (
                          <span className="absolute bottom-2 right-2 text-[120px] opacity-[0.12] blur-sm select-none pointer-events-none">{emoji}</span>
                        )}
                        <span className="relative text-[40px] md:text-[60px] drop-shadow-lg group-hover:scale-[1.15] group-hover:rotate-6 transition-transform duration-500">{emoji}</span>
                      </div>
                      <div className="p-3 md:p-5 text-center">
                        <h3 className="font-display text-sm md:text-lg font-semibold text-cream mb-1 md:mb-2">{cat.label[lang]}</h3>
                        <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-gold tracking-[0.12em] uppercase font-medium group-hover:gap-2 transition-all duration-300">
                          {t('categories.explore')} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </SquishyCard>
              );
            })}
          </div>
        </div>
      </section>


      {/* ─── Recent Products ─── */}
      <section className="py-16 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('recent.eyebrow')}</span>
            </div>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-center text-foreground mb-10 md:mb-16" style={{ letterSpacing: '-0.03em' }}>
              {t('recent.title')}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">
            {demoProducts.filter(p => p.badges.includes('new')).slice(0, 3).map((product, i) => {
              const category = categories.find(c => c.id === product.category);
              return (
                <SquishyCard key={product.id} delay={i * 0.1}>
                  <Link to={`/products/${product.slug}`} className="group block">
                    <div className="card-3d overflow-hidden hover:shadow-[0_8_32px_rgba(201,168,76,0.15)] transition-all duration-500">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={product.images[0]} alt={product.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-4 md:p-6">
                        <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-medium tracking-widest uppercase rounded-full mb-3">{category?.label[lang]}</span>
                        <h3 className="font-display text-base md:text-xl font-semibold text-foreground mb-2 group-hover:text-crimson transition-colors duration-300">{product.name[lang]}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{product.description[lang]}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gold tracking-[0.12em] uppercase font-medium group-hover:gap-2 group-hover:underline transition-all duration-300">
                          {t('recent.details')} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </SquishyCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Seasonal / New Products ─── */}
      <section className="py-16 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center">
              <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('seasonal.eyebrow')}</span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
                {t('seasonal.title')}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t('seasonal.subtitle')}</p>
            </div>
          </ScrollReveal>
          <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {seasonalProducts.slice(0, 3).map((product, i) => (
              <SquishyCard key={product.id} delay={i * 0.1}>
                <Link to={`/products/${product.slug}`} className="group block">
                  <div className="card-3d">
                    <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                      <div className="absolute top-4 start-4 flex gap-2">
                        {product.badges.map(badge => (
                          <span key={badge} className="px-3 py-1 bg-crimson text-cream text-xs font-medium rounded-full">
                            {t(`badge.${badge}`)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground">{product.name[lang]}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description[lang]}</p>
                      <p className="mt-3 text-xs text-muted-foreground">{product.grammage[lang]}</p>
                    </div>
                  </div>
                </Link>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Experience & Tradition with Stats Grid (no wave divider before) ─── */}
      <section className="py-16 md:py-28 bg-cocoa-warm relative overflow-hidden grain-overlay">
        <FloatingBlobs className="opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <div>
              <ScrollReveal>
                <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('tradition.eyebrow')}</span>
                <h2 className="mt-4 font-display text-2xl md:text-5xl font-bold text-cream" style={{ letterSpacing: '-0.03em' }}>
                  {t('tradition.title')}
                </h2>
                <p className="mt-6 md:mt-8 text-cream/60 leading-relaxed text-base md:text-lg">{t('tradition.p1')}</p>
                <p className="mt-3 md:mt-4 text-cream/60 leading-relaxed text-base md:text-lg">{t('tradition.p2')}</p>
              </ScrollReveal>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
              {[
                { value: 30, suffix: '+', label: t('stats.years') },
                { value: 500, suffix: '+', label: t('stats.products') },
              ].map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="card-3d-dark p-6 text-center">
                    <CountUpStat
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      className="[&>span:first-child]:text-[40px] [&>span:first-child]:font-bold"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* ─── CTA Strip (premium glass on cream) ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div
            className="rounded-[24px] px-8 py-16 md:px-16 md:py-20 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(176,18,42,0.08), rgba(199,155,42,0.06))',
              border: '1px solid rgba(26,20,18,0.08)',
            }}
          >
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
                {t('cta.title')}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">{t('cta.subtitle')}</p>
              <Link
                to="/contact"
                className="shine-auto relative mt-10 inline-flex items-center justify-center px-10 py-4 bg-crimson text-cream font-semibold rounded-full hover:shadow-[0_0_24px_rgba(176,18,42,0.3)] transition-all duration-500 text-sm tracking-wide active:scale-[0.97]"
              >
                {t('cta.button')}
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
