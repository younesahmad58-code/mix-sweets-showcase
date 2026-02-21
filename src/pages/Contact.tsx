import React, { useState } from 'react';
import { Phone, Mail, MapPin, Building, Hash } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
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

    // Store in database
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

    // mailto fallback
    const subject = encodeURIComponent(`Offer Request from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:Contact.mixsweets@gmail.com?subject=${subject}&body=${body}`, '_self');

    setSubmitting(false);
    setSuccess(true);
    setForm({ name: '', company: '', email: '', phone: '', message: '' });
  };

  const inputCls = "w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground";

  return (
    <main className="pt-20">
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">{t('contact.title')}</h1>
          <p className="mt-4 text-cream/60 max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <div className="bg-card rounded-2xl border border-border p-8">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Mail className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{t('contact.form.success')}</h3>
                    <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-accent hover:underline">
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
                      className="w-full py-3.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50"
                    >
                      {submitting ? '...' : t('contact.form.submit')}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-8">
                <h2 className="font-display text-2xl font-bold text-foreground">{t('contact.info.title')}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Bdul. Voluntari 86, Sc. 1, Et. 1, Ap. BIR. 9, Cod 077190, Voluntari, Ilfov</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-5 h-5 text-accent shrink-0" />
                    <a href="tel:+40728980123" className="hover:text-accent transition-colors">0728 980 123</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-5 h-5 text-accent shrink-0" />
                    <a href="mailto:Contact.mixsweets@gmail.com" className="hover:text-accent transition-colors">Contact.mixsweets@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Hash className="w-5 h-5 text-accent shrink-0" />
                    <span>CUI: 46078008</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Building className="w-5 h-5 text-accent shrink-0" />
                    <span>Nr. Reg. Com.: J23/2927/2022</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-border h-64 lg:h-80">
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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
