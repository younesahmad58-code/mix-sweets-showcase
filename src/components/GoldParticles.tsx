import React from 'react';

const particles = Array.from({ length: 25 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 1.5,
  opacity: 0.4 + Math.random() * 0.3,
  duration: 5 + Math.random() * 5,
  delay: Math.random() * 8,
}));

const GoldParticles: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <style>{`
      @keyframes floatUp {
        0% { transform: translateY(100vh) translateX(0); opacity: 0; }
        10% { opacity: var(--p-opacity); }
        90% { opacity: var(--p-opacity); }
        100% { transform: translateY(-20px) translateX(20px); opacity: 0; }
      }
    `}</style>
    {particles.map((p, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: p.left,
          bottom: 0,
          width: p.size,
          height: p.size,
          backgroundColor: 'hsl(var(--gold))',
          ['--p-opacity' as string]: p.opacity,
          opacity: 0,
          animation: `floatUp ${p.duration}s ${p.delay}s ease-in-out infinite`,
        }}
      />
    ))}
  </div>
);

export default GoldParticles;
