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

const variantStyles: Record<Icon3DVariant, { bg: string; shadow: string; hoverShadow: string; border?: string }> = {
  gold: {
    bg: 'linear-gradient(145deg, #E2C46A 0%, #C9A84C 50%, #8B6914 100%)',
    shadow: '0 2px 0 rgba(255,255,255,0.15) inset, 0 -2px 0 rgba(0,0,0,0.2) inset, 4px 8px 24px rgba(201,168,76,0.45), 0 2px 4px rgba(0,0,0,0.3)',
    hoverShadow: '0 2px 0 rgba(255,255,255,0.15) inset, 0 -2px 0 rgba(0,0,0,0.2) inset, 6px 16px 40px rgba(201,168,76,0.55), 0 4px 8px rgba(0,0,0,0.3)',
  },
  crimson: {
    bg: 'linear-gradient(145deg, #C42020 0%, #8B1A1A 50%, #5A0E0E 100%)',
    shadow: '0 2px 0 rgba(255,255,255,0.15) inset, 0 -2px 0 rgba(0,0,0,0.2) inset, 4px 8px 24px rgba(139,26,26,0.45), 0 2px 4px rgba(0,0,0,0.3)',
    hoverShadow: '0 2px 0 rgba(255,255,255,0.15) inset, 0 -2px 0 rgba(0,0,0,0.2) inset, 6px 16px 40px rgba(139,26,26,0.55), 0 4px 8px rgba(0,0,0,0.3)',
  },
  cocoa: {
    bg: 'linear-gradient(145deg, #3D1A10 0%, #2A1008 50%, #1A0804 100%)',
    shadow: '0 2px 0 rgba(255,255,255,0.08) inset, 0 -2px 0 rgba(0,0,0,0.3) inset, 4px 8px 24px rgba(26,8,4,0.5), 0 2px 4px rgba(0,0,0,0.4)',
    hoverShadow: '0 2px 0 rgba(255,255,255,0.08) inset, 0 -2px 0 rgba(0,0,0,0.3) inset, 6px 16px 40px rgba(26,8,4,0.6), 0 4px 8px rgba(0,0,0,0.4)',
    border: '1px solid rgba(201,168,76,0.2)',
  },
};

const sizeConfig: Record<Icon3DSize, { container: number; icon: number; radius: number }> = {
  md: { container: 72, icon: 28, radius: 20 },
  sm: { container: 40, icon: 16, radius: 12 },
};

const Icon3D: React.FC<Icon3DProps> = ({ icon: IconComponent, variant = 'gold', size = 'md', delay = 0, className = '' }) => {
  const style = variantStyles[variant];
  const dim = sizeConfig[size];

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
      whileHover={{ y: -4, scale: 1.05 }}
      className={`relative overflow-hidden flex items-center justify-center shrink-0 group ${className}`}
      style={{
        width: dim.container,
        height: dim.container,
        borderRadius: dim.radius,
        background: style.bg,
        boxShadow: style.shadow,
        border: style.border || 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = style.hoverShadow;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = style.shadow;
      }}
    >
      {/* Glossy highlight */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: `${dim.radius}px ${dim.radius}px 0 0`,
        }}
      />
      <IconComponent
        size={dim.icon}
        className="relative z-10 text-white"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
        strokeWidth={2.2}
      />
    </motion.div>
  );
};

export default Icon3D;
