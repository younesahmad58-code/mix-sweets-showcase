import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import logo from '@/assets/logo_2.png';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm inline-block">
                <img src={logo} alt="MIX SWEETS" className="h-10 w-auto rounded" />
              </div>
              <span className="font-display text-xl font-bold">MIX SWEETS</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              MIX SWEETS SRL<br />
              CUI: 46078008<br />
              Nr. Reg. Com.: J23/2927/2022
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">{t('footer.quicklinks')}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.home')}</Link>
              <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.about')}</Link>
              <Link to="/products" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.products')}</Link>
              <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.contact')}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">{t('footer.contact')}</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Bdul. Voluntari 86, Sc. 1, Et. 1, Ap. BIR. 9, Cod 077190, Voluntari, Ilfov</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+40728980123" className="hover:text-accent transition-colors">0728 980 123</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:Contact.mixsweets@gmail.com" className="hover:text-accent transition-colors">Contact.mixsweets@gmail.com</a>
              </div>
            </div>
          </div>

          {/* CTA + Admin */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">{t('cta.title')}</h4>
            <Link
              to="/contact"
              className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">{t('footer.rights')}</p>
          <Link to="/admin" className="text-xs text-primary-foreground/30 hover:text-primary-foreground/50 transition-colors">
            {t('footer.admin')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
