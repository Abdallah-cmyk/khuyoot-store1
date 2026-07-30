import React from 'react';

export default function Hero3D() {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}
    />
  );
}
