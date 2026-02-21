import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

type Icon3DVariant = 'gold' | 'crimson' | 'cocoa';
type Icon3DSize = 'sm' | 'md';

interface Icon3DProps {
  icon: LucideIcon;
  variant?: Icon3DVariant;
  size?: Icon3DSize;
  delay?: number;
  className?: string;
}

const variantStyles: Record<Icon3DVariant, { bg: string; iconColor: string; border: string }> = {
  gold: {
    bg: 'rgba(199,155,42,0.10)',
    iconColor: '#C79B2A',
    border: '1px solid rgba(199,155,42,0.18)',
  },
  crimson: {
    bg: 'rgba(176,18,42,0.08)',
    iconColor: '#B0122A',
    border: '1px solid rgba(176,18,42,0.14)',
  },
  cocoa: {
    bg: 'rgba(26,15,11,0.06)',
    iconColor: '#1A0F0B',
    border: '1px solid rgba(26,15,11,0.10)',
  },
};

const sizeConfig: Record<Icon3DSize, { container: number; icon: number; radius: number }> = {
  md: { container: 56, icon: 24, radius: 14 },
  sm: { container: 36, icon: 16, radius: 10 },
};

const Icon3D: React.FC<Icon3DProps> = ({ icon: IconComponent, variant = 'gold', size = 'md', delay = 0, className = '' }) => {
  const style = variantStyles[variant];
  const dim = sizeConfig[size];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
      whileHover={{ y: -2, scale: 1.05 }}
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: dim.container,
        height: dim.container,
        borderRadius: dim.radius,
        background: style.bg,
        border: style.border,
        transition: 'transform 0.3s ease',
      }}
    >
      <IconComponent
        size={dim.icon}
        className="relative z-10"
        style={{ color: style.iconColor }}
        strokeWidth={1.8}
      />
    </motion.div>
  );
};

export default Icon3D;
