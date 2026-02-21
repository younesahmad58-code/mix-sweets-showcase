import React from 'react';
import { motion } from 'framer-motion';

const blobs = [
  { size: 'w-72 h-72', color: 'bg-candy-pink/15', top: '10%', left: '5%', duration: 18 },
  { size: 'w-96 h-96', color: 'bg-candy-red/10', top: '60%', left: '70%', duration: 22 },
  { size: 'w-64 h-64', color: 'bg-candy-glow/20', top: '30%', left: '50%', duration: 15 },
  { size: 'w-80 h-80', color: 'bg-candy-pink/10', top: '70%', left: '20%', duration: 20 },
  { size: 'w-48 h-48', color: 'bg-candy-red/15', top: '15%', left: '80%', duration: 16 },
];

const FloatingBlobs: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {blobs.map((blob, i) => (
      <motion.div
        key={i}
        className={`absolute ${blob.size} ${blob.color} rounded-full blur-3xl`}
        style={{ top: blob.top, left: blob.left }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: blob.duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

export default FloatingBlobs;
