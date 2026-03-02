import React from 'react';
import { motion } from 'framer-motion';

interface SquishyCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SquishyCard: React.FC<SquishyCardProps> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.3, delay, ease: 'easeOut' }}
    className={`hover:-translate-y-2 transition-transform duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export default SquishyCard;
