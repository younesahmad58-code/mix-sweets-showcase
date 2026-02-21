import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { demoProducts, categories } from '@/data/products';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';
import FloatingBlobs from '@/components/FloatingBlobs';
import SquishyCard from '@/components/SquishyCard';
import { motion } from 'framer-motion';

const Products: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const activeCategory = searchParams.get('category') || 'all';

  const filtered = useMemo(() => {
    return demoProducts.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = !search || p.name[lang].toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search, lang]);

  const setCategory = (cat: string) => {
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <main className="pt-20">
      <section className="py-16 bg-cocoa relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[120px] z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(18,8,4,0.6) 0%, transparent 100%)' }} />
        <FloatingBlobs className="opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('products.eyebrow')}</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold text-cream" style={{ letterSpacing: '-0.03em' }}>
            {t('products.title')}
          </h1>
        </div>
        <WaveDivider variant="drip" className="absolute bottom-0 left-0 right-0" />
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
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
              {filtered.length === 0 ? (
                <p className="text-muted-foreground text-center py-16">No products found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((product, i) => (
                    <SquishyCard key={product.id} delay={i * 0.04}>
                      <Link to={`/products/${product.slug}`} className="group block">
                        <div className="bg-card rounded-[20px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)] transition-all duration-500 border border-gold/[0.15]">
                          <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.name[lang]}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                            />
                            <div className="absolute top-3 start-3 flex gap-2">
                              {product.badges.map(badge => (
                                <span key={badge} className="px-2.5 py-1 bg-gold text-cocoa text-xs font-medium rounded-full">
                                  {t(`badge.${badge}`)}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-5">
                            <h3 className="font-display text-lg font-semibold text-foreground">{product.name[lang]}</h3>
                            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{product.description[lang]}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{product.grammage}</span>
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
    </main>
  );
};

export default Products;
