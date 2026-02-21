import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Package, Truck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';
import { categories, demoProducts } from '@/data/products';
import { Language } from '@/i18n/translations';

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as Language;

  const whyCards = [
    { icon: Award, title: t('why.quality.title'), desc: t('why.quality.desc') },
    { icon: Package, title: t('why.variety.title'), desc: t('why.variety.desc') },
    { icon: ShieldCheck, title: t('why.reliability.title'), desc: t('why.reliability.desc') },
    { icon: Truck, title: t('why.distribution.title'), desc: t('why.distribution.desc') },
  ];

  const seasonalProducts = demoProducts.filter(p => p.badges.includes('seasonal') || p.badges.includes('new'));

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A] via-[#A0153E] to-[#C62E65]" />
        {/* Floating blur circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-red-300/15 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-1/2 w-48 h-48 bg-pink-300/20 blur-3xl rounded-full" />

        <div className="relative z-10 container mx-auto px-4 text-center py-32">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight max-w-4xl mx-auto"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="shine-effect inline-flex items-center justify-center px-8 py-4 bg-white text-candy-red font-semibold rounded-3xl hover:shadow-lg hover:shadow-white/20 transition-all text-base"
            >
              {t('hero.cta.products')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-3xl hover:bg-white/10 transition-all text-base"
            >
              {t('hero.cta.offer')}
            </Link>
          </motion.div>
        </div>
        <WaveDivider className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Why MIX SWEETS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">{t('why.title')}</h2>
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCards.map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group relative bg-white rounded-3xl p-8 shadow-lg shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/40 transition-all duration-300 hover:-translate-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--candy-red)/0.1)] to-[hsl(var(--candy-pink)/0.1)] flex items-center justify-center mb-6 group-hover:from-[hsl(var(--candy-red)/0.2)] group-hover:to-[hsl(var(--candy-pink)/0.2)] transition-colors">
                    <card.icon className="w-7 h-7 text-candy-red" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-[#FFF5F5]">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">{t('categories.title')}</h2>
          </ScrollReveal>
          <div className="mt-16 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 0.08}>
                <Link
                  to={`/products?category=${cat.id}`}
                  className="snap-start flex-shrink-0 w-48 h-48 bg-white rounded-3xl shadow-md hover:shadow-xl hover:shadow-pink-200/30 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-3"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--candy-red)/0.1)] to-[hsl(var(--candy-pink)/0.2)] flex items-center justify-center">
                    <Package className="w-8 h-8 text-candy-red" />
                  </div>
                  <span className="font-display text-base font-semibold text-foreground">{cat.label[lang]}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal / New */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{t('seasonal.title')}</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t('seasonal.subtitle')}</p>
            </div>
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasonalProducts.slice(0, 3).map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.1}>
                <Link to={`/products/${product.slug}`} className="group block">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-pink-100/30 hover:shadow-xl hover:-translate-y-3 transition-all duration-300">
                    <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                      <div className="absolute top-3 start-3 flex gap-2">
                        {product.badges.map(badge => (
                          <span key={badge} className="px-2.5 py-1 bg-candy-red text-white text-xs font-semibold rounded-full">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Tradition */}
      <WaveDivider color="#8B1A1A" flip />
      <section className="py-24 bg-gradient-to-r from-[#8B1A1A] to-[#A0153E]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">{t('tradition.title')}</h2>
            <p className="mt-8 text-white/80 leading-relaxed">{t('tradition.p1')}</p>
            <p className="mt-4 text-white/80 leading-relaxed">{t('tradition.p2')}</p>
          </ScrollReveal>
        </div>
      </section>
      <WaveDivider color="hsl(var(--candy-red))" />

      {/* CTA Strip */}
      <section className="py-20 bg-candy-red">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">{t('cta.title')}</h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">{t('cta.subtitle')}</p>
            <Link
              to="/contact"
              className="shine-effect mt-8 inline-flex items-center justify-center px-8 py-4 bg-white text-candy-red font-semibold rounded-3xl hover:shadow-lg hover:shadow-white/20 transition-all text-base"
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
