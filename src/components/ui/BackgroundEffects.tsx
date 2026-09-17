import React from 'react';

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Top Left Sapphire Ambient Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[180px] animate-pulse" />

      {/* Center Amber Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[200px]" />

      {/* Bottom Right Emerald Coastal Glow */}
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[180px]" />

      {/* Subtle Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
