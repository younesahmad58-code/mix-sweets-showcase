import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().min(10),
});

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      await supabase.from('contact_submissions').insert({
        name: form.name,
        company: form.company || '',
        email: form.email,
        phone: form.phone,
        message: form.message,
        language,
      });
    } catch (err) {
      // Fallback: even if DB fails, continue with mailto
    }

    const subject = encodeURIComponent(`Offer Request from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:Contact.mixsweets@gmail.com?subject=${subject}&body=${body}`, '_self');

    setSubmitting(false);
    setSuccess(true);
    setForm({ name: '', company: '', email: '', phone: '', message: '' });
  };

  const inputCls = "w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-candy-red/30 focus:shadow-lg focus:shadow-pink-100/20 text-foreground placeholder:text-muted-foreground transition-all";

  const infoCards = [
    {
      icon: MapPin,
      title: t('contact.card.location'),
      content: (
        <span className="text-sm text-muted-foreground leading-relaxed">
          Bdul. Voluntari 86, Sc. 1, Et. 1,<br />
          Ap. BIR. 9, Cod 077190,<br />
          Voluntari, Ilfov
        </span>
      ),
    },
    {
      icon: Phone,
      title: t('contact.card.info'),
      content: (
        <div className="space-y-2">
          <a href="tel:+40728980123" className="block text-sm text-muted-foreground hover:text-candy-red transition-colors">0728 980 123</a>
          <a href="mailto:Contact.mixsweets@gmail.com" className="block text-sm text-muted-foreground hover:text-candy-red transition-colors">Contact.mixsweets@gmail.com</a>
        </div>
      ),
    },
    {
      icon: Clock,
      title: t('contact.card.schedule'),
      content: (
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>{t('contact.card.weekdays')}</p>
          <p>{t('contact.card.weekend')}</p>
        </div>
      ),
    },
  ];

  return (
    <main className="pt-20">
      <section className="py-12 bg-gradient-to-r from-[#8B1A1A] to-[#C62E65] relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{t('contact.title')}</h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </div>
        <WaveDivider className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Premium Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-muted-foreground leading-relaxed">{t('contact.intro')}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {infoCards.map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-8 text-center shadow-lg shadow-pink-100/40 hover:-translate-y-3 hover:shadow-xl hover:shadow-pink-200/40 transition-all duration-300">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[hsl(var(--candy-red)/0.1)] to-[hsl(var(--candy-pink)/0.15)] flex items-center justify-center mb-5">
                    <card.icon className="w-7 h-7 text-candy-red" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">{card.title}</h3>
                  {card.content}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/20 p-8">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-candy-red/10 flex items-center justify-center mb-4">
                      <Mail className="w-8 h-8 text-candy-red" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{t('contact.form.success')}</h3>
                    <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-candy-red hover:underline">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <input className={inputCls} placeholder={t('contact.form.name')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input className={inputCls} placeholder={t('contact.form.company')} value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                    </div>
                    <div>
                      <input className={inputCls} type="email" placeholder={t('contact.form.email')} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <input className={inputCls} placeholder={t('contact.form.phone')} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <textarea className={`${inputCls} min-h-[120px]`} placeholder={t('contact.form.message')} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="shine-effect w-full py-3.5 bg-candy-red text-white font-semibold rounded-3xl hover:shadow-lg hover:shadow-red-500/20 transition-all disabled:opacity-50"
                    >
                      {submitting ? '...' : t('contact.form.submit')}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="rounded-3xl overflow-hidden shadow-lg shadow-pink-100/20 h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.8!2d26.12!3d44.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI5JzI0LjAiTiAyNsKwMDcnMTIuMCJF!5e0!3m2!1sen!2sro!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MIX SWEETS Location"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
