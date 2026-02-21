import React from 'react';
import { Award, Heart, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';
import FloatingBlobs from '@/components/FloatingBlobs';
import SquishyCard from '@/components/SquishyCard';

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
      <section className="py-28 bg-gradient-to-br from-[#8B1A1A] via-[#B91C4A] to-[#E0336E] relative overflow-hidden">
        <FloatingBlobs className="opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white" style={{ letterSpacing: '-0.04em' }}>
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
      <WaveDivider variant="glaze" color="hsl(var(--cream))" flip />
      <section className="py-28 bg-cream">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-16" style={{ letterSpacing: '-0.03em' }}>
              {t('about.values.title')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <SquishyCard key={i} delay={i * 0.1} className="h-full">
                <div className="bg-white rounded-[2rem] p-8 text-center candy-shadow hover:candy-shadow-hover transition-shadow duration-500 h-full">
                  <div className="w-16 h-16 mx-auto rounded-[1.25rem] bg-gradient-to-br from-candy-red/10 to-candy-pink/15 flex items-center justify-center mb-6">
                    <v.icon className="w-7 h-7 text-candy-red" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </SquishyCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
