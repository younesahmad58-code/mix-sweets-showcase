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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/60 backdrop-blur-2xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="bg-white/90 backdrop-blur-sm rounded-[1.25rem] p-1.5 shadow-md"
          >
            <img src={logo} alt="MIX SWEETS" className="h-10 md:h-12 w-auto rounded-xl" />
          </motion.div>
          <span className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight hidden sm:inline">
            MIX SWEETS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-semibold transition-colors hover:text-candy-red ${
                location.pathname === link.to ? 'text-candy-red' : 'text-foreground/70'
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-candy-red"
                />
              )}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="relative">
            <motion.button
              onClick={() => setLangOpen(!langOpen)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-candy-red transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang.flag}</span>
              <ChevronDown className="w-3 h-3" />
            </motion.button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute top-full end-0 mt-3 bg-white/80 backdrop-blur-2xl border border-white/30 rounded-[1.25rem] shadow-xl py-2 min-w-[150px]"
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm hover:bg-candy-red/5 transition-colors rounded-xl mx-1 ${
                        language === lang.code ? 'text-candy-red font-bold' : 'text-foreground'
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
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 text-foreground"
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
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="md:hidden bg-white/90 backdrop-blur-2xl border-t border-white/20 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-[1.25rem] text-base font-semibold transition-colors ${
                    location.pathname === link.to ? 'bg-candy-red/10 text-candy-red' : 'text-foreground hover:bg-muted'
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
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-[1.25rem] text-sm font-semibold transition-colors ${
                      language === lang.code ? 'bg-candy-red text-white shadow-lg shadow-candy-red/30' : 'bg-muted text-foreground'
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
