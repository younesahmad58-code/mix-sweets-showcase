import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

type Icon3DVariant = 'gold' | 'crimson' | 'cocoa';
type Icon3DSize = 'sm' | 'md' | 'lg';

interface Icon3DProps {
  icon: LucideIcon;
  variant?: Icon3DVariant;
  size?: Icon3DSize;
  delay?: number;
  className?: string;
}

const variantStyles: Record<Icon3DVariant, {
  bg: string;
  iconColor: string;
  border: string;
  shadow: string;
  innerGlow: string;
}> = {
  gold: {
    bg: 'linear-gradient(145deg, rgba(199,155,42,0.18) 0%, rgba(199,155,42,0.08) 100%)',
    iconColor: '#C79B2A',
    border: '1px solid rgba(199,155,42,0.25)',
    shadow: '0 4px 16px rgba(199,155,42,0.15), 0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.15)',
    innerGlow: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)',
  },
  crimson: {
    bg: 'linear-gradient(145deg, #B0122A 0%, #8B0E22 60%, #6B0A1A 100%)',
    iconColor: '#FCEAE8',
    border: '1px solid rgba(200,60,80,0.4)',
    shadow: '0 6px 20px rgba(176,18,42,0.35), 0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
    innerGlow: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.20) 0%, transparent 55%)',
  },
  cocoa: {
    bg: 'linear-gradient(145deg, rgba(26,15,11,0.12) 0%, rgba(26,15,11,0.05) 100%)',
    iconColor: '#1A0F0B',
    border: '1px solid rgba(26,15,11,0.15)',
    shadow: '0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
    innerGlow: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)',
  },
};

const sizeConfig: Record<Icon3DSize, { container: number; icon: number; radius: number }> = {
  lg: { container: 64, icon: 28, radius: 18 },
  md: { container: 52, icon: 22, radius: 14 },
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
      whileHover={{ y: -3, scale: 1.08 }}
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: dim.container,
        height: dim.container,
        borderRadius: dim.radius,
        background: style.bg,
        border: style.border,
        boxShadow: style.shadow,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Inner glossy highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: dim.radius,
          background: style.innerGlow,
        }}
      />
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
