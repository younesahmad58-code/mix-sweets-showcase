import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface CountUpStatProps {
  value: number;
  suffix?: string;
  unit?: string;
  label: string;
  className?: string;
}

const CountUpStat: React.FC<CountUpStatProps> = ({ value, suffix = '+', unit, label, className = '' }) => {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className={className}>
      <span className="font-display text-gold" style={{ fontVariantNumeric: 'tabular-nums', minWidth: `${String(value).length + (suffix?.length || 0)}ch`, display: 'inline-block' }}>
        {count}{suffix}
        {unit && <span style={{fontSize: '0.5em', verticalAlign: 'super'}} className="font-semibold ml-0.5 leading-none">{unit}</span>}
      </span>
      <span className="block text-cream/50 text-[11px] tracking-[0.15em] uppercase mt-1">{label}</span>
    </div>
  );
};

export default CountUpStat;
