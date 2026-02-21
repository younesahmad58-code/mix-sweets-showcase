import React from 'react';
import { motion } from 'framer-motion';

interface SquishyCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SquishyCard: React.FC<SquishyCardProps> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{
      y: -12,
      scale: 1.02,
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default SquishyCard;
