import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSmoothScroll } from '@/src/providers/SmoothScrollProvider';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    scrollTo('#home', { duration: 1.2 });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleScrollTop}
          aria-label="Back to Top"
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 border border-amber-400/30 text-amber-400 hover:text-amber-300 shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-110 active:scale-95"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="sr-only">Scroll back to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
