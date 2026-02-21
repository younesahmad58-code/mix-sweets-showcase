import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo_2.png';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/products', label: t('nav.products') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const currentLang = languages.find(l => l.code === language)!;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'border-b shadow-[0_1px_20px_rgba(0,0,0,0.1)]'
          : 'border-b'
      }`}
      style={{
        background: scrolled ? 'rgba(18,8,4,0.88)' : 'rgba(18,8,4,0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottomColor: scrolled ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.12)',
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5"
          >
            <img src={logo} alt="MIX SWEETS" className="h-10 md:h-12 w-auto rounded-xl" />
          </motion.div>
          <span className="font-display text-xl md:text-2xl font-semibold text-cream tracking-tight hidden sm:inline">
            MIX SWEETS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-medium tracking-wide uppercase transition-colors pb-1 ${
                location.pathname === link.to ? 'text-gold' : 'text-cream/70 hover:text-cream'
              }`}
              style={{ letterSpacing: '0.05em', fontSize: '0.8rem' }}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ${
                  location.pathname === link.to ? 'w-full' : 'w-0'
                }`}
              />
            </Link>
          ))}

          {/* Language switcher */}
          <div className="relative">
            <motion.button
              onClick={() => setLangOpen(!langOpen)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="flex items-center gap-1.5 text-sm font-medium text-cream/60 hover:text-gold transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang.flag}</span>
              <ChevronDown className="w-3 h-3" />
            </motion.button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full end-0 mt-3 bg-cocoa/95 backdrop-blur-2xl border border-gold/10 rounded-2xl shadow-xl py-2 min-w-[150px]"
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm hover:bg-gold/5 transition-colors rounded-xl mx-1 ${
                        language === lang.code ? 'text-gold font-bold' : 'text-cream/80'
                      }`}
                      style={{ width: 'calc(100% - 8px)' }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.95 }}
          className="md:hidden p-2 text-cream"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden bg-cocoa/95 backdrop-blur-xl border-t border-gold/10 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location.pathname === link.to ? 'bg-gold/10 text-gold' : 'text-cream/80 hover:bg-cream/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 px-4">
                {languages.map(lang => (
                  <motion.button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setMobileOpen(false); }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      language === lang.code ? 'bg-gold text-cocoa' : 'bg-cream/5 text-cream/80'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </motion.button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
