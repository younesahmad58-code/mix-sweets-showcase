import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Icon3D from '@/components/Icon3D';
import footerLogo from '@/assets/logo_footer.png';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-cocoa text-cream relative">
      {/* Decorative gold line */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent)' }} />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center">
              <div style={{ background: 'white', borderRadius: '8px', padding: '6px', display: 'inline-block' }}>
                <img src={footerLogo} alt="MIX SWEETS" className="h-16 w-auto block" />
              </div>
            </div>
            <div className="w-12 h-px bg-gold/10 mt-4" />
            <p className="text-sm text-cream/50 leading-relaxed">
              MIX SWEETS SRL<br />
              CUI: 46078008<br />
              Nr. Reg. Com.: J23/2927/2022
            </p>
            <p className="text-sm text-cream/30 leading-relaxed mt-3">
              {t('footer.brand.desc')}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-cream">{t('footer.quicklinks')}</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-cream/50 hover:text-gold transition-colors duration-200">{t('nav.home')}</Link>
              <Link to="/about" className="text-sm text-cream/50 hover:text-gold transition-colors duration-200">{t('nav.about')}</Link>
              <Link to="/products" className="text-sm text-cream/50 hover:text-gold transition-colors duration-200">{t('nav.products')}</Link>
              <Link to="/contact" className="text-sm text-cream/50 hover:text-gold transition-colors duration-200">{t('nav.contact')}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-cream">{t('footer.contact')}</h4>
            <div className="space-y-4 text-sm text-cream/50">
              <div className="flex items-start gap-3">
                <Icon3D icon={MapPin} variant="gold" size="sm" />
                <span className="pt-2.5">Bdul. Voluntari 86, Sc. 1, Et. 1, Ap. BIR. 9, Cod 077190, Voluntari, Ilfov</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon3D icon={Phone} variant="gold" size="sm" />
                <a href="tel:+40728980123" className="hover:text-gold transition-colors duration-200">0728 980 123</a>
              </div>
              <div className="flex items-center gap-3">
                <Icon3D icon={Mail} variant="gold" size="sm" />
                <a href="mailto:Contact.mixsweets@gmail.com" className="hover:text-gold transition-colors duration-200">Contact.mixsweets@gmail.com</a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-5 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />
            <h4 className="font-display text-lg font-semibold text-cream">{t('cta.title')}</h4>
            <Link
              to="/contact"
              className="shine-effect inline-block bg-primary text-cream px-7 py-3.5 rounded-full text-sm font-semibold border border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] transition-all duration-300"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30">{t('footer.rights')}</p>
          <Link to="/admin" className="text-xs text-cream/15 hover:text-cream/25 transition-colors duration-200">
            {t('footer.admin')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
