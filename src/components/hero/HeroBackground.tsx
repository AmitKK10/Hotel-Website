import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
    alt: 'Digha Beach Resort luxury beachfront infinity pool at golden sunset',
    caption: 'Serene Sunset at Bay of Bengal',
  },
  {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85',
    alt: 'Luxury ocean view suite with private balcony and sea vista',
    caption: 'Unmatched Ocean Front Luxury',
  },
  {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
    alt: 'Golden twilight over calm tropical beach and palm garden',
    caption: 'Private Beach Access & Sunset Lounges',
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85',
    alt: 'Evening illuminated luxury resort pool and palm gardens',
    caption: '5-Star World-Class Hospitality',
  },
];

export function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide Ken Burns background images every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Image Slider with Ken Burns Zoom Effect */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 1.5, ease: 'easeInOut' },
            scale: { duration: 7, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={HERO_IMAGES[currentIndex].url}
            alt={HERO_IMAGES[currentIndex].alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Primary Dark Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020a14]/90 via-[#020a14]/65 to-[#020a14]" />

      {/* Ocean Blue & Warm Amber Radial Atmosphere Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-amber-500/15 via-sky-500/10 to-transparent rounded-full blur-[120px] opacity-70" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid / Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      {/* Bottom Subtle Slide Indicators */}
      <div className="absolute bottom-28 right-8 z-20 hidden lg:flex items-center gap-2 pointer-events-auto">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentIndex
                ? 'w-8 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
