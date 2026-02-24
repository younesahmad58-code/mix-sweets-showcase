import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { motion, AnimatePresence } from 'framer-motion';

const flagSvgs: Record<string, React.ReactNode> = {
  ro: (
    <svg width="20" height="14" viewBox="0 0 30 20" className="rounded-sm shrink-0">
      <rect width="10" height="20" fill="#002B7F" />
      <rect x="10" width="10" height="20" fill="#FCD116" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
    </svg>
  ),
  en: (
    <svg width="20" height="14" viewBox="0 0 60 30" className="rounded-sm shrink-0">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  ar: (
    <svg width="20" height="14" viewBox="0 0 30 20" className="rounded-sm shrink-0">
      <rect width="30" height="6.67" fill="#006C35" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.34" width="30" height="6.66" fill="#000" />
    </svg>
  ),
};

const languages: { code: Language; label: string }[] = [
  { code: 'ro', label: 'RO' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
        background: scrolled ? 'rgba(18,8,4,0.92)' : isHomePage ? 'rgba(18,8,4,0.6)' : 'rgba(18,8,4,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottomColor: scrolled ? 'rgba(201,168,76,0.22)' : isHomePage ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.18)',
      }}
    >
      <div className="container mx-auto px-4 flex items-center h-16 md:h-20 relative">
        {/* Left: Brand name */}
        <div className="flex-1">
          <Link to="/" className="font-display font-bold text-cream text-base md:text-lg tracking-[0.12em] uppercase hover:text-gold transition-colors duration-300">
            MIX SWEETS
          </Link>
        </div>

        {/* Center: Logo (absolute) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="rounded-2xl p-1.5 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(201,168,76,0.2)]"
            >
              <img src="/logo3.png" alt="MIX SWEETS" className="h-10 md:h-12 w-auto rounded-xl" />
            </motion.div>
          </Link>
        </div>

        {/* Right: Desktop nav + mobile hamburger */}
        <div className="flex-1 flex justify-end items-center gap-6">
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
                <span className="flex items-center gap-1.5">{flagSvgs[currentLang.code]} {currentLang.label}</span>
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
                        {flagSvgs[lang.code]}
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
                    {flagSvgs[lang.code]}
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
