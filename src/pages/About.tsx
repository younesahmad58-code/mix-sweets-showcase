import React from 'react';
import { Award, Heart, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';

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
      <section className="py-24 bg-gradient-to-r from-[#8B1A1A] to-[#C62E65] relative">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{t('about.title')}</h1>
          </ScrollReveal>
        </div>
        <WaveDivider className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">{t('about.story.title')}</h2>
          </ScrollReveal>
          {['about.story.p1', 'about.story.p2'].map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.1}>
              <p className="text-muted-foreground leading-relaxed mb-6">{t(key)}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#FFF5F5]">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-16">{t('about.values.title')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-8 text-center shadow-lg shadow-pink-100/40 hover:-translate-y-3 hover:shadow-xl hover:shadow-pink-200/40 transition-all duration-300">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[hsl(var(--candy-red)/0.1)] to-[hsl(var(--candy-pink)/0.15)] flex items-center justify-center mb-6">
                    <v.icon className="w-7 h-7 text-candy-red" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
