import React from 'react';
import { Award, Heart, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';
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
      <section className="py-28 bg-cocoa relative overflow-hidden">
        <FloatingBlobs className="opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('about.eyebrow')}</span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-cream" style={{ letterSpacing: '-0.03em' }}>
              {t('about.title')}
            </h1>
          </ScrollReveal>
        </div>
        <WaveDivider variant="drip" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Story */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8" style={{ letterSpacing: '-0.03em' }}>
              {t('about.story.title')}
            </h2>
          </ScrollReveal>
          {['about.story.p1', 'about.story.p2'].map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.1}>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">{t(key)}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <WaveDivider variant="glaze" color="hsl(var(--cocoa))" flip />
      <section className="py-28 bg-cocoa">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-gold text-[11px] font-medium tracking-[0.2em] uppercase">{t('about.values.eyebrow')}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-cream mb-16" style={{ letterSpacing: '-0.03em' }}>
              {t('about.values.title')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <SquishyCard key={i} delay={i * 0.1} className="h-full">
                <div className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-[20px] p-8 text-center hover:bg-cream/8 hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)] transition-all duration-500 h-full flex flex-col items-center" style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                  <Icon3D icon={v.icon} variant="gold" delay={i * 0.1} className="mb-6" />
                  <h3 className="font-display text-xl font-semibold text-cream mb-3">{v.title}</h3>
                  <p className="text-sm text-cream/45 leading-relaxed">{v.desc}</p>
                </div>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider variant="drip" color="hsl(var(--background))" />
    </main>
  );
};

export default About;
