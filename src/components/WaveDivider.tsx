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
    drip: 'M0,55 C60,55 90,55 140,58 C170,60 190,72 210,82 C225,90 240,95 260,92 C280,86 295,70 320,60 C350,52 390,55 440,56 C490,57 520,55 560,58 C590,60 610,70 640,80 C655,86 670,90 690,88 C710,82 730,65 760,58 C790,52 830,55 870,56 C910,57 940,55 980,58 C1010,61 1030,72 1060,84 C1075,90 1090,94 1110,90 C1130,84 1150,68 1180,60 C1210,53 1250,55 1290,56 C1330,57 1360,55 1400,58 C1420,60 1430,55 1440,55 L1440,100 L0,100 Z',
    glaze: 'M0,50 C60,50 100,48 160,55 C200,60 220,80 250,92 C270,100 290,100 310,92 C340,78 360,50 420,48 C480,46 520,50 580,55 C620,58 650,75 690,88 C710,95 730,98 760,92 C790,82 810,55 860,50 C920,45 960,48 1020,55 C1060,60 1080,72 1120,85 C1140,92 1170,96 1200,88 C1240,76 1260,50 1320,48 C1360,46 1400,50 1440,52 L1440,100 L0,100 Z',
  };

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[90px]"
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
};

export default WaveDivider;
