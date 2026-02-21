import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { demoProducts, categories } from '@/data/products';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';

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
      <section className="py-12 bg-gradient-to-r from-[#8B1A1A] to-[#C62E65] relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{t('products.title')}</h1>
        </div>
        <WaveDivider className="absolute bottom-0 left-0 right-0" />
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className="lg:w-64 shrink-0">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('products.search')}
                  className="w-full ps-10 pe-4 py-2.5 bg-gray-50 border-0 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-candy-red/30 focus:shadow-lg focus:shadow-pink-100/30 text-foreground placeholder:text-muted-foreground transition-all"
                />
              </div>

              {/* Category chips */}
              <div className="flex flex-wrap lg:flex-col gap-2">
                <button
                  onClick={() => setCategory('all')}
                  className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all ${
                    activeCategory === 'all' ? 'bg-candy-red text-white shadow-md' : 'bg-white text-foreground shadow-sm hover:shadow-md'
                  }`}
                >
                  {t('products.all')}
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all ${
                      activeCategory === cat.id ? 'bg-candy-red text-white shadow-md' : 'bg-white text-foreground shadow-sm hover:shadow-md'
                    }`}
                  >
                    {cat.label[lang]}
                  </button>
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
                    <ScrollReveal key={product.id} delay={i * 0.05}>
                      <Link to={`/products/${product.slug}`} className="group block">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-pink-50 hover:shadow-xl hover:shadow-pink-200/30 transition-all duration-300 hover:-translate-y-3">
                          <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.name[lang]}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                            />
                            <div className="absolute top-3 start-3 flex gap-2">
                              {product.badges.map(badge => (
                                <span key={badge} className="px-2 py-0.5 bg-candy-red text-white text-xs font-semibold rounded-full">
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
                              <span className="text-sm font-semibold text-candy-red">{t('products.details')} →</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
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
