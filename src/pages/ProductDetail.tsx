import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { demoProducts } from '@/data/products';
import ScrollReveal from '@/components/ScrollReveal';
import SquishyCard from '@/components/SquishyCard';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const lang = language as Language;

  const product = demoProducts.find(p => p.slug === slug);
  if (!product) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Product not found</h1>
          <Link to="/products" className="mt-4 inline-block text-primary hover:underline">{t('nav.products')}</Link>
        </div>
      </main>
    );
  }

  const related = demoProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <main className="pt-20">
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> {t('nav.products')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Image */}
            <ScrollReveal>
              <div className="aspect-square bg-muted rounded-3xl overflow-hidden candy-shadow border border-border/50">
                <img
                  src={product.images[0]}
                  alt={product.name[lang]}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <div className="flex gap-2 mb-4">
                  {product.badges.map(badge => (
                    <span key={badge} className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {t(`badge.${badge}`)}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
                  {product.name[lang]}
                </h1>

                <div className="mt-8">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">{t('products.description')}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{product.description[lang]}</p>
                </div>

                <div className="mt-8">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">{t('products.packaging')}</h3>
                  <p className="text-muted-foreground">{t('products.grammage')}: {product.grammage}</p>
                </div>

                {product.variants && product.variants.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3">{t('products.variants')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map(v => (
                        <motion.span
                          key={v}
                          whileHover={{ scale: 1.04 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                          className="px-5 py-2.5 bg-muted rounded-full text-sm font-medium text-foreground border border-border/50 cursor-default"
                        >
                          {v}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  to="/contact"
                  className="shine-auto relative mt-10 inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:shadow-[0_8px_32px_rgba(178,24,48,0.25)] transition-all duration-500 text-sm tracking-wide"
                >
                  {t('products.request')}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-28">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10" style={{ letterSpacing: '-0.03em' }}>
                {t('products.related')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <SquishyCard key={p.id} delay={i * 0.1}>
                    <Link to={`/products/${p.slug}`} className="group block">
                      <div className="bg-background rounded-3xl overflow-hidden candy-shadow hover:candy-shadow-hover transition-all duration-500 border border-border/50">
                        <div className="aspect-[4/3] bg-muted overflow-hidden">
                          <img src={p.images[0]} alt={p.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-base font-semibold text-foreground">{p.name[lang]}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{p.grammage}</p>
                        </div>
                      </div>
                    </Link>
                  </SquishyCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
