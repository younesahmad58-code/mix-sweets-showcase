import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import logo from '@/assets/logo_2.png';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-cocoa text-cream">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 inline-block">
                <img src={logo} alt="MIX SWEETS" className="h-10 w-auto rounded-xl" />
              </div>
              <span className="font-display text-xl font-bold text-cream">MIX SWEETS</span>
            </div>
            <div className="w-12 h-px bg-gold/20 mt-4" />
            <p className="text-sm text-cream/35 leading-relaxed">
              MIX SWEETS SRL<br />
              CUI: 46078008<br />
              Nr. Reg. Com.: J23/2927/2022
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-cream">{t('footer.quicklinks')}</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-cream/35 hover:text-gold transition-colors duration-200">{t('nav.home')}</Link>
              <Link to="/about" className="text-sm text-cream/35 hover:text-gold transition-colors duration-200">{t('nav.about')}</Link>
              <Link to="/products" className="text-sm text-cream/35 hover:text-gold transition-colors duration-200">{t('nav.products')}</Link>
              <Link to="/contact" className="text-sm text-cream/35 hover:text-gold transition-colors duration-200">{t('nav.contact')}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-cream">{t('footer.contact')}</h4>
            <div className="space-y-3 text-sm text-cream/35">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold/60" />
                <span>Bdul. Voluntari 86, Sc. 1, Et. 1, Ap. BIR. 9, Cod 077190, Voluntari, Ilfov</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-gold/60" />
                <a href="tel:+40728980123" className="hover:text-gold transition-colors duration-200">0728 980 123</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-gold/60" />
                <a href="mailto:Contact.mixsweets@gmail.com" className="hover:text-gold transition-colors duration-200">Contact.mixsweets@gmail.com</a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-5">
            <h4 className="font-display text-lg font-semibold text-cream">{t('cta.title')}</h4>
            <Link
              to="/contact"
              className="shine-effect inline-block bg-primary text-cream px-7 py-3.5 rounded-full text-sm font-semibold border border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] transition-all duration-300"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/20">{t('footer.rights')}</p>
          <Link to="/admin" className="text-xs text-cream/10 hover:text-cream/25 transition-colors duration-200">
            {t('footer.admin')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
