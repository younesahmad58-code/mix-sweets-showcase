import React from 'react';

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
  variant?: 'wave' | 'drip' | 'glaze';
}

const WaveDivider: React.FC<WaveDividerProps> = ({ color = 'hsl(var(--background))', flip = false, className = '', variant = 'drip' }) => {
  const paths: Record<string, string> = {
    wave: 'M0,30 C240,50 480,15 720,35 C960,55 1200,20 1440,30 L1440,60 L0,60 Z',
    drip: 'M0,35 C120,35 200,38 300,42 C380,45 420,50 480,46 C540,42 600,35 720,38 C800,40 860,48 960,44 C1040,40 1100,35 1200,38 C1280,41 1340,46 1440,35 L1440,60 L0,60 Z',
    glaze: 'M0,32 C180,28 360,42 540,36 C720,30 900,44 1080,38 C1260,32 1380,40 1440,34 L1440,60 L0,60 Z',
  };

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-[40px] md:h-[60px]"
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
};

export default WaveDivider;
