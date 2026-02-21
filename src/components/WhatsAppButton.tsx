import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const phone = '40728980123';
  const message = encodeURIComponent(t('whatsapp.message'));
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-2xl hover:shadow-green-500/30 transition-shadow"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
