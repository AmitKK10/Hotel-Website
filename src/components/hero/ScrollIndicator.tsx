import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useSmoothScroll } from '@/src/providers/SmoothScrollProvider';

export function ScrollIndicator() {
  const { scrollTo } = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(true);

  // Fade away when scrolled past 80px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center mt-6 sm:mt-10 cursor-pointer group"
          onClick={() => scrollTo('#rooms')}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300/80 group-hover:text-amber-400 transition-colors mb-2">
            Scroll To Explore
          </span>

          {/* Mouse Icon with animated inner wheel */}
          <div className="w-5 h-8 border-2 border-amber-400/50 group-hover:border-amber-400 rounded-full flex justify-center p-1 transition-colors">
            <motion.div
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-2 bg-amber-400 rounded-full"
            />
          </div>

          <ChevronDown className="w-4 h-4 text-amber-400/70 group-hover:text-amber-400 mt-1 animate-bounce" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
