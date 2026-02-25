import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { categories } from '@/data/products';
import { useProducts } from '@/hooks/useProducts';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingBlobs from '@/components/FloatingBlobs';
import SquishyCard from '@/components/SquishyCard';
import { motion } from 'framer-motion';

const ProductImage: React.FC<{ alt: string; slug: string }> = ({ alt, slug }) => {
  const base = import.meta.env.BASE_URL;
  const [imgSrc, setImgSrc] = useState(`${base}products/${slug}.jpg`);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary to-crimson flex items-center justify-center">
        <span className="text-cream font-display font-bold text-2xl md:text-3xl">
          {slug}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
      onError={() => {
        if (imgSrc.endsWith('.jpg')) {
          setImgSrc(`${base}products/${slug}.jpeg`);
        } else if (imgSrc.endsWith('.jpeg')) {
          setImgSrc(`${base}products/${slug}.png`);
        } else if (imgSrc.endsWith('.png')) {
          setImgSrc(`${base}products/${slug}.avif`);
        } else {
          setFailed(true);
        }
      }}
    />
  );
};

const Products: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const activeCategory = searchParams.get('category') || 'all';
  const { products, loading } = useProducts();

  const getName = (p: any) => {
    if (lang === 'en' && p.name_en) return p.name_en;
    if (lang === 'ar' && p.name_ar) return p.name_ar;
    return p.name_ro;
  };

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = !search || getName(p).toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search, lang, products]);

  const setCategory = (cat: string) => {
    window.scrollTo(0, 0);
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <main className="pt-16 md:pt-20">
      <section className="py-20 bg-cocoa relative overflow-hidden grain-overlay">
        <div className="absolute top-0 left-0 right-0 h-[120px] z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(18,8,4,0.6) 0%, transparent 100%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(176,18,42,0.1) 0%, transparent 70%)' }} />
        <FloatingBlobs className="opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('products.eyebrow')}</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold text-cream" style={{ letterSpacing: '-0.03em' }}>
            {t('products.title')}
          </h1>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="relative mb-6">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('products.search')}
                  className="w-full ps-11 pe-4 py-3 bg-muted border border-border rounded-[20px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all"
                />
              </div>

              <div className="flex flex-wrap lg:flex-col gap-2">
                <motion.button
                  onClick={() => setCategory('all')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === 'all' ? 'bg-primary text-cream' : 'bg-muted text-foreground border border-border hover:border-primary/20'
                  }`}
                >
                  {t('products.all')}
                </motion.button>
                {categories.map(cat => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.id ? 'bg-primary text-cream' : 'bg-muted text-foreground border border-border hover:border-primary/20'
                    }`}
                  >
                    {cat.label[lang]}
                  </motion.button>
                ))}
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              {loading ? (
                <p className="text-muted-foreground text-center py-16">Loading...</p>
              ) : filtered.length === 0 ? (
                <p className="text-muted-foreground text-center py-16">{t('products.empty')}</p>
              ) : (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {filtered.map((product, i) => (
                    <SquishyCard key={product.id} delay={i * 0.04}>
                      <Link to={`/products/${product.slug}`} className="group block">
                        <div className="bg-card rounded-[20px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)] transition-all duration-500 border border-gold/[0.15]">
                          <div className="aspect-[4/3] bg-white relative overflow-hidden">
                            <ProductImage
                              alt={getName(product)}
                              slug={product.slug}
                            />
                          </div>
                          <div className="p-3 md:p-5">
                            <h3 className="font-display text-sm md:text-lg font-semibold text-foreground">{getName(product)}</h3>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground">COD: {product.slug}</span>
                                {product.grammage && (
                                  <span className="text-xs text-muted-foreground">{product.grammage}</span>
                                )}
                              </div>
                              <span className="text-sm font-medium text-primary">{t('products.details')} →</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SquishyCard>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
              {t('prefooter.title')}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t('prefooter.subtitle')}</p>
            <Link
              to="/contact"
              className="shine-auto relative mt-8 inline-flex items-center justify-center px-10 py-4 bg-crimson text-cream font-semibold rounded-full hover:shadow-[0_0_24px_rgba(176,18,42,0.3)] transition-all duration-500 text-sm tracking-wide active:scale-[0.97]"
            >
              {t('cta.button')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Products;
