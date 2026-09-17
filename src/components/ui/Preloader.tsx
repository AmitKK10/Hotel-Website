import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from '@/src/config/site';
import { Compass, Waves } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        // Accelerate as it reaches near end
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-[#020914] text-stone-100 flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Ambient Gold & Sapphire Glow */}
          <div className="absolute w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />
          <div className="absolute w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />

          {/* Animated Background Wave SVG */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full h-full text-amber-400"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="currentColor"
                d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,192C672,192,768,160,864,154.7C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center space-y-8">
            {/* Emblem / Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-stone-900/80 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-2xl shadow-amber-500/20 backdrop-blur-md mb-4 group">
                <Waves className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Welcome To
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-wide mt-1">
                {SITE_CONFIG.name}
              </h1>
              <p className="text-[11px] font-mono text-stone-400 tracking-wider mt-1">
                New Digha • Oceanfront Sanctuary
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2">
              <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-white/10 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-sky-400 rounded-full shadow-lg shadow-amber-500/50"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span className="uppercase tracking-widest text-amber-400/80">
                  {progress < 40 ? 'Preparing Luxury Experience' : progress < 80 ? 'Loading Coastal Vistas' : 'Welcome'}
                </span>
                <span className="font-bold text-amber-400">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
