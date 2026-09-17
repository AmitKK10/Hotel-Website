import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-sky-400 shadow-md shadow-amber-500/50"
        style={{ width: `${scrollProgress}%` }}
        transition={{ ease: 'easeOut', duration: 0.1 }}
      />
    </div>
  );
}
