import React from 'react';

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ color = 'hsl(var(--background))', flip = false, className = '' }) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="w-full h-[60px] md:h-[80px]"
    >
      <path
        d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,30 1440,40 L1440,100 L0,100 Z"
        fill={color}
      />
    </svg>
  </div>
);

export default WaveDivider;
