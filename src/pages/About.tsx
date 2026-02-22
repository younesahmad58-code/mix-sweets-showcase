import React from 'react';
import { Award, Heart, Shield, Quote, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingBlobs from '@/components/FloatingBlobs';
import SquishyCard from '@/components/SquishyCard';
import Icon3D from '@/components/Icon3D';

const About: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Award, title: t('about.values.quality'), desc: t('about.values.quality.desc') },
    { icon: Heart, title: t('about.values.honesty'), desc: t('about.values.honesty.desc') },
    { icon: Shield, title: t('about.values.responsibility'), desc: t('about.values.responsibility.desc') },
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-32 bg-cocoa relative overflow-hidden grain-overlay">
        <div className="absolute top-0 left-0 right-0 h-[120px] z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(18,8,4,0.6) 0%, transparent 100%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(176,18,42,0.1) 0%, transparent 70%)' }} />
        <FloatingBlobs className="opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('about.eyebrow')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-cream" style={{ letterSpacing: '-0.03em' }}>
              {t('about.title')}
            </h1>
          </ScrollReveal>
        </div>
      </section>


      {/* Story */}
      <section className="py-16 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6 md:mb-8" style={{ letterSpacing: '-0.03em' }}>
              {t('about.story.title')}
            </h2>
          </ScrollReveal>
          {['about.story.p1', 'about.story.p2'].map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.1}>
              <p className="text-muted-foreground leading-relaxed mb-4 md:mb-6 text-base md:text-lg">{t(key)}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="pb-16 md:pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('about.mission.eyebrow')}</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
              {t('about.mission.title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-10 relative">
              <div className="flex justify-center -mb-8 relative z-10">
                <Icon3D icon={Quote} variant="crimson" size="lg" />
              </div>
              <div className="card-3d pt-16 pb-10 px-8 md:px-12 border-t-2 border-t-gold/30">
                <blockquote className="font-display text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
                  {t('about.mission.quote')}
                </blockquote>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      

      {/* Values */}
      <section className="py-16 md:py-28 bg-cocoa-warm">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('about.values.eyebrow')}</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center text-cream mb-10 md:mb-16" style={{ letterSpacing: '-0.03em' }}>
              {t('about.values.title')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <SquishyCard key={i} delay={i * 0.1} className="h-full">
                <div className="card-3d-dark p-8 text-center h-full flex flex-col items-center">
                  <Icon3D icon={v.icon} variant="crimson" size="lg" delay={i * 0.1} className="mb-6" />
                  <h3 className="font-display text-xl font-semibold text-cream mb-3">{v.title}</h3>
                  <p className="text-sm text-cream/45 leading-relaxed">{v.desc}</p>
                </div>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>

      

      {/* Distribution Reach */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <div className="text-center">
              <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('about.reach.eyebrow')}</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-foreground" style={{ letterSpacing: '-0.03em' }}>
                {t('about.reach.title')}
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-12 card-3d p-10 md:p-14 text-center">
              <Icon3D icon={Globe} variant="crimson" size="lg" className="mx-auto mb-6" />
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                {t('about.reach.desc')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default About;
