import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { demoProducts } from '@/data/products';
import ScrollReveal from '@/components/ScrollReveal';
import SquishyCard from '@/components/SquishyCard';

const DetailImage: React.FC<{ src: string; alt: string; cod: number }> = ({ src, alt, cod }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-[400px] md:h-[600px] bg-gradient-to-br from-primary to-crimson flex items-center justify-center rounded-[20px]">
        <span className="text-cream font-display font-bold text-6xl md:text-8xl">
          {cod}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-contain max-h-[600px] mx-auto"
      onError={() => setFailed(true)}
    />
  );
};

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const lang = language as Language;

  const product = demoProducts.find(p => p.slug === slug);
  if (!product) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">{t('products.notfound')}</h1>
          <Link to="/products" className="mt-4 inline-block text-primary hover:underline">{t('nav.products')}</Link>
        </div>
      </main>
    );
  }

  const related = demoProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const infoRows: { label: string; value: string | number }[] = [];
  infoRows.push({ label: t('products.cod'), value: product.cod });
  if (product.weight) {
    infoRows.push({ label: t('products.weight'), value: product.weight });
  }
  if (product.cutieBox != null) {
    infoRows.push({ label: t('products.cutieBox'), value: product.cutieBox });
  }
  if (product.bucCutie != null) {
    infoRows.push({ label: t('products.bucCutie'), value: product.bucCutie });
  }
  if (product.baxuriPalet != null) {
    infoRows.push({ label: t('products.baxuriPalet'), value: product.baxuriPalet });
  }

  return (
    <main className="pt-20">
      <section className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 md:mb-8">
            <ArrowLeft className="w-4 h-4" /> {t('nav.products')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14">
            {/* Image */}
            <ScrollReveal>
              <div className="rounded-[20px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.06)] border border-gold/[0.15] bg-white">
                <DetailImage
                  src={product.images[0]}
                  alt={product.name[lang]}
                  cod={product.cod}
                />
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <h1 className="font-display text-2xl md:text-5xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
                  {product.name[lang]}
                </h1>

                <div className="mt-8">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">{t('products.packaging')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {infoRows.map(row => (
                      <div key={row.label} className="flex items-center justify-between p-3 bg-muted rounded-xl border border-border">
                        <span className="text-sm text-muted-foreground">{row.label}</span>
                        <span className="text-sm font-semibold text-foreground">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="shine-auto relative mt-10 inline-flex items-center justify-center px-10 py-4 bg-primary text-cream font-semibold rounded-full border border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-500 text-sm tracking-wide active:scale-[0.97]"
                >
                  {t('products.request')}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16 md:mt-28">
              <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-6 md:mb-10" style={{ letterSpacing: '-0.03em' }}>
                {t('products.related')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {related.map((p, i) => (
                  <SquishyCard key={p.id} delay={i * 0.1}>
                    <Link to={`/products/${p.slug}`} className="group block">
                      <div className="bg-card rounded-[20px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)] transition-all duration-500 border border-gold/[0.15]">
                        <div className="aspect-[4/3] bg-muted overflow-hidden">
                          <RelatedImage src={p.images[0]} alt={p.name[lang]} cod={p.cod} />
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-base font-semibold text-foreground">{p.name[lang]}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{p.weight}</p>
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

const RelatedImage: React.FC<{ src: string; alt: string; cod: number }> = ({ src, alt, cod }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary to-crimson flex items-center justify-center">
        <span className="text-cream font-display font-bold text-2xl">{cod}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      onError={() => setFailed(true)}
    />
  );
};

export default ProductDetail;
