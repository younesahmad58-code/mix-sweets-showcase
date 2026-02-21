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

// Category emoji/color map for visual variety
const categoryVisuals: Record<string, { emoji: string; gradient: string }> = {
  biscuits: { emoji: '🍪', gradient: 'from-amber-100 to-orange-50' },
  cakes: { emoji: '🎂', gradient: 'from-pink-100 to-rose-50' },
  chocolate: { emoji: '🍫', gradient: 'from-amber-100 to-yellow-50' },
  lollipops: { emoji: '🍭', gradient: 'from-purple-100 to-pink-50' },
  jellies: { emoji: '🍬', gradient: 'from-green-100 to-emerald-50' },
};

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A] via-[#B91C4A] to-[#E0336E]" />
        <FloatingBlobs />

        <div className="relative z-10 container mx-auto px-4 text-center py-32">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-white leading-[0.95] max-w-5xl mx-auto"
            style={{ letterSpacing: '-0.04em' }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="shine-auto relative inline-flex items-center justify-center px-10 py-4.5 bg-white text-candy-red font-bold rounded-[2rem] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all duration-300 text-base"
            >
              {t('hero.cta.products')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4.5 border-2 border-white/30 text-white font-semibold rounded-[2rem] hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-base backdrop-blur-sm"
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
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center text-foreground" style={{ letterSpacing: '-0.03em' }}>
              {t('why.title')}
            </h2>
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((card, i) => (
              <SquishyCard key={i} delay={i * 0.08} className="h-full">
                <div className="relative bg-white rounded-[2rem] p-8 candy-shadow hover:candy-shadow-hover transition-shadow duration-500 h-full">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-candy-red/10 to-candy-pink/15 flex items-center justify-center mb-6">
                    <card.icon className="w-7 h-7 text-candy-red" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories Bento Grid ─── */}
      <WaveDivider variant="glaze" color="hsl(var(--cream))" flip />
      <section className="py-28 bg-cream">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center text-foreground mb-16" style={{ letterSpacing: '-0.03em' }}>
              {t('categories.title')}
            </h2>
          </ScrollReveal>

          {/* Bento grid — asymmetric layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]">
            {categories.map((cat, i) => {
              const vis = categoryVisuals[cat.id] || { emoji: '🍬', gradient: 'from-pink-100 to-rose-50' };
              // Make first and last cards span 2 rows for bento effect
              const isLarge = i === 0 || i === 3;
              return (
                <SquishyCard
                  key={cat.id}
                  delay={i * 0.06}
                  className={`${isLarge ? 'row-span-2' : ''}`}
                >
                  <Link
                    to={`/products?category=${cat.id}`}
                    className={`group block h-full bg-gradient-to-br ${vis.gradient} rounded-[2rem] p-6 md:p-8 candy-shadow hover:candy-shadow-hover transition-all duration-500 relative overflow-hidden`}
                  >
                    <span className="absolute -bottom-4 -end-4 text-[5rem] md:text-[7rem] opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 select-none leading-none">
                      {vis.emoji}
                    </span>
                    <span className="relative font-display text-lg md:text-xl font-bold text-foreground">
                      {cat.label[lang]}
                    </span>
                  </Link>
                </SquishyCard>
              );
            })}
          </div>
        </div>
      </section>
      <WaveDivider variant="drip" color="hsl(var(--background))" />

      {/* ─── Seasonal / New Products ─── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
                {t('seasonal.title')}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t('seasonal.subtitle')}</p>
            </div>
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasonalProducts.slice(0, 3).map((product, i) => (
              <SquishyCard key={product.id} delay={i * 0.1}>
                <Link to={`/products/${product.slug}`} className="group block">
                  <div className="bg-white rounded-[2rem] overflow-hidden candy-shadow hover:candy-shadow-hover transition-shadow duration-500">
                    <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name[lang]}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                      <div className="absolute top-4 start-4 flex gap-2">
                        {product.badges.map(badge => (
                          <span key={badge} className="px-3 py-1 bg-candy-red text-white text-xs font-bold rounded-full shadow-lg">
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
      <WaveDivider variant="glaze" color="#8B1A1A" flip />
      <section className="py-28 bg-gradient-to-r from-[#8B1A1A] to-[#B91C4A] relative overflow-hidden">
        <FloatingBlobs className="opacity-30" />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white" style={{ letterSpacing: '-0.03em' }}>
              {t('tradition.title')}
            </h2>
            <p className="mt-8 text-white/70 leading-relaxed text-lg">{t('tradition.p1')}</p>
            <p className="mt-4 text-white/70 leading-relaxed text-lg">{t('tradition.p2')}</p>
          </ScrollReveal>
        </div>
      </section>
      <WaveDivider variant="drip" color="hsl(var(--candy-red))" />

      {/* ─── CTA Strip ─── */}
      <section className="py-24 bg-candy-red relative overflow-hidden">
        <FloatingBlobs className="opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white" style={{ letterSpacing: '-0.03em' }}>
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto text-lg">{t('cta.subtitle')}</p>
            <Link
              to="/contact"
              className="shine-auto relative mt-10 inline-flex items-center justify-center px-10 py-4.5 bg-white text-candy-red font-bold rounded-[2rem] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all duration-300 text-base"
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
