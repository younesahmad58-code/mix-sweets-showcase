import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const phone = '40728980123';
  const message = encodeURIComponent(t('whatsapp.message'));
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 end-6 z-50">
          <div className="absolute inset-0 rounded-full bg-whatsapp/20 animate-[pulse_3s_ease-in-out_infinite]" />
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] animate-whatsapp-glow transition-shadow"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
