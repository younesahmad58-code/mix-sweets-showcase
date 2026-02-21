import React from 'react';

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
  variant?: 'wave' | 'drip' | 'glaze';
}

const WaveDivider: React.FC<WaveDividerProps> = ({ color = 'hsl(var(--background))', flip = false, className = '', variant = 'drip' }) => {
  const paths: Record<string, string> = {
    wave: 'M0,40 C360,100 720,0 1080,60 C1260,80 1380,30 1440,40 L1440,100 L0,100 Z',
    drip: 'M0,60 C80,60 120,60 180,65 C220,68 240,90 260,95 C280,100 300,100 320,95 C340,85 360,60 420,58 C480,56 540,60 600,62 C660,64 700,80 740,90 C760,95 780,98 810,95 C840,88 860,65 920,60 C980,55 1040,58 1100,62 C1140,64 1160,75 1200,85 C1220,90 1250,95 1280,90 C1310,82 1330,60 1380,58 C1410,56 1430,60 1440,60 L1440,100 L0,100 Z',
    glaze: 'M0,50 C60,50 100,48 160,55 C200,60 220,80 250,92 C270,100 290,100 310,92 C340,78 360,50 420,48 C480,46 520,50 580,55 C620,58 650,75 690,88 C710,95 730,98 760,92 C790,82 810,55 860,50 C920,45 960,48 1020,55 C1060,60 1080,72 1120,85 C1140,92 1170,96 1200,88 C1240,76 1260,50 1320,48 C1360,46 1400,50 1440,52 L1440,100 L0,100 Z',
  };

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[70px] md:h-[100px]"
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
};

export default WaveDivider;
