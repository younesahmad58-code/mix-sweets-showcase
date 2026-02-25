import React from 'react';

const blobs = [
  { size: 'w-80 h-80', color: 'bg-gold/8', top: '10%', left: '5%' },
  { size: 'w-96 h-96', color: 'bg-primary/6', top: '55%', left: '65%' },
  { size: 'w-72 h-72', color: 'bg-gold/6', top: '35%', left: '45%' },
  { size: 'w-64 h-64', color: 'bg-amber-700/5', top: '70%', left: '15%' },
];

const FloatingBlobs: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {blobs.map((blob, i) => (
      <div
        key={i}
        className={`absolute ${blob.size} ${blob.color} rounded-full blur-3xl`}
        style={{ top: blob.top, left: blob.left }}
      />
    ))}
  </div>
);

export default FloatingBlobs;
