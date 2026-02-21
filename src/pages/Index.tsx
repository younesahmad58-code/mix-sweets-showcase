import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';
import FloatingBlobs from '@/components/FloatingBlobs';
import SquishyCard from '@/components/SquishyCard';
import { categories, demoProducts } from '@/data/products';
import { Language } from '@/i18n/translations';

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as Language;

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cocoa via-chocolate to-primary/80" />
        <FloatingBlobs className="opacity-20" />

        <div className="relative z-10 container mx-auto px-4 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block text-gold text-sm font-medium tracking-[0.2em] uppercase">
              ✦ Premium Artisan Sweets ✦
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold text-cream leading-[0.95] max-w-5xl mx-auto"
            style={{ letterSpacing: '-0.04em' }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-cream/50 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="shine-auto relative inline-flex items-center justify-center px-10 py-4 bg-cream text-cocoa font-semibold rounded-full hover:shadow-[0_8px_32px_rgba(253,248,245,0.2)] transition-all duration-500 text-sm tracking-wide"
            >
              {t('hero.cta.products')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 border border-gold/30 text-gold font-medium rounded-full hover:bg-gold/10 hover:border-gold/50 transition-all duration-500 text-sm tracking-wide"
            >
              {t('hero.cta.offer')}
            </Link>
          </motion.div>
        </div>

        <WaveDivider variant="drip" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* ─── Why MIX SWEETS ─── */}
      <section className="py-28 bg-background relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase">Why Choose Us</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center text-foreground" style={{ letterSpacing: '-0.03em' }}>
              {t('why.title')}
            </h2>
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((card, i) => (
              <SquishyCard key={i} delay={i * 0.08} className="h-full">
                <div className="relative bg-background rounded-3xl p-8 candy-shadow hover:candy-shadow-hover transition-all duration-500 h-full border border-border/50">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/8 to-accent/10 flex items-center justify-center mb-6">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <WaveDivider variant="glaze" color="hsl(var(--cocoa))" flip />
      <section className="py-28 bg-cocoa">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase">Our Collection</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center text-cream mb-16" style={{ letterSpacing: '-0.03em' }}>
              {t('categories.title')}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <SquishyCard key={cat.id} delay={i * 0.06}>
                <Link
                  to={`/products?category=${cat.id}`}
                  className="group block h-full bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-3xl p-8 hover:bg-cream/10 hover:border-gold/20 transition-all duration-500 text-center"
                >
                  <span className="block font-display text-lg font-semibold text-cream group-hover:text-gold transition-colors duration-300">
                    {cat.label[lang]}
                  </span>
                  <span className="block mt-2 text-xs text-cream/30 tracking-[0.15em] uppercase">Explore →</span>
                </Link>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider variant="drip" color="hsl(var(--background))" />

      {/* ─── Seasonal / New Products ─── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center">
              <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase">New Arrivals</span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
                {t('seasonal.title')}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t('seasonal.subtitle')}</p>
            </div>
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasonalProducts.slice(0, 3).map((product, i) => (
              <SquishyCard key={product.id} delay={i * 0.1}>
                <Link to={`/products/${product.slug}`} className="group block">
                  <div className="bg-background rounded-3xl overflow-hidden candy-shadow hover:candy-shadow-hover transition-all duration-500 border border-border/50">
                    <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                      <div className="absolute top-4 start-4 flex gap-2">
                        {product.badges.map(badge => (
                          <span key={badge} className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            {t(`badge.${badge}`)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground">{product.name[lang]}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description[lang]}</p>
                      <p className="mt-3 text-xs text-muted-foreground">{product.grammage}</p>
                    </div>
                  </div>
                </Link>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Experience & Tradition ─── */}
      <WaveDivider variant="glaze" color="hsl(var(--cocoa))" flip />
      <section className="py-28 bg-cocoa relative overflow-hidden">
        <FloatingBlobs className="opacity-10" />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <ScrollReveal>
            <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase">Our Heritage</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-cream" style={{ letterSpacing: '-0.03em' }}>
              {t('tradition.title')}
            </h2>
            <p className="mt-8 text-cream/50 leading-relaxed text-lg">{t('tradition.p1')}</p>
            <p className="mt-4 text-cream/50 leading-relaxed text-lg">{t('tradition.p2')}</p>
          </ScrollReveal>
        </div>
      </section>
      <WaveDivider variant="drip" color="hsl(var(--primary))" />

      {/* ─── CTA Strip ─── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <FloatingBlobs className="opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground" style={{ letterSpacing: '-0.03em' }}>
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-primary-foreground/50 max-w-xl mx-auto text-lg">{t('cta.subtitle')}</p>
            <Link
              to="/contact"
              className="shine-auto relative mt-10 inline-flex items-center justify-center px-10 py-4 bg-cream text-cocoa font-semibold rounded-full hover:shadow-[0_8px_32px_rgba(253,248,245,0.2)] transition-all duration-500 text-sm tracking-wide"
            >
              {t('cta.button')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Index;
