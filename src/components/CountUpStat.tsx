import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface CountUpStatProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

const CountUpStat: React.FC<CountUpStatProps> = ({ value, suffix = '+', label, className = '' }) => {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className={className}>
      <span className="font-display text-gold">{count}{suffix}</span>
      <span className="block text-cream/50 text-[11px] tracking-[0.15em] uppercase mt-1">{label}</span>
    </div>
  );
};

export default CountUpStat;
