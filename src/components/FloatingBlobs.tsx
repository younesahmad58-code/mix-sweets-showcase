import React from 'react';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const blobs = [
  { size: 'w-80 h-80', top: '10%', left: '5%' },
  { size: 'w-96 h-96', top: '55%', left: '65%' },
  { size: 'w-72 h-72', top: '35%', left: '45%' },
  { size: 'w-64 h-64', top: '70%', left: '15%' },
];

const colors = ['bg-gold/8', 'bg-primary/6', 'bg-gold/6', 'bg-amber-700/5'];
const blurClass = isMobile ? 'blur-xl' : 'blur-3xl';

const FloatingBlobs: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {blobs.map((blob, i) => (
      <div
        key={i}
        className={`absolute ${blob.size} ${colors[i]} rounded-full ${blurClass}`}
        style={{ top: blob.top, left: blob.left }}
      />
    ))}
  </div>
);

export default FloatingBlobs;
