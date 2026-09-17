import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '@/src/types/gallery';
import { Badge } from '@/src/components/ui/Badge';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Maximize,
  Download,
  Info,
} from 'lucide-react';

interface GalleryLightboxProps {
  items: GalleryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryLightbox({ items, initialIndex, isOpen, onClose }: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const currentItem = items[currentIndex] || items[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard Navigation & Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Dark Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020a14]/95 backdrop-blur-2xl"
        />

        {/* Modal Window Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-6xl h-[92vh] bg-[#030e1a] border border-amber-500/30 rounded-3xl overflow-hidden z-10 flex flex-col justify-between shadow-2xl"
        >
          {/* Top Bar Header */}
          <div className="p-4 sm:p-6 bg-stone-950/80 border-b border-white/10 flex items-center justify-between gap-4 z-20">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="gold" className="text-xs uppercase font-mono">
                  {currentItem.category.replace('-', ' ')}
                </Badge>
                <span className="text-xs text-stone-400 font-mono">
                  {currentIndex + 1} of {items.length}
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-serif text-stone-100 font-semibold mt-1 truncate max-w-md">
                {currentItem.title}
              </h3>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-stone-900 hover:bg-amber-500 text-stone-300 hover:text-stone-950 transition-all border border-white/10 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Display Area with Arrow Controls */}
          <div className="relative flex-1 bg-stone-950/90 flex items-center justify-center p-4 overflow-hidden select-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentItem.id}
                src={currentItem.image}
                alt={currentItem.alt}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-none"
                onContextMenu={(e) => e.preventDefault()} // Disable right click download
              />
            </AnimatePresence>

            {/* Previous Arrow */}
            {items.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-950/70 hover:bg-amber-500 text-stone-100 hover:text-stone-950 border border-white/10 transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Arrow */}
            {items.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-950/70 hover:bg-amber-500 text-stone-100 hover:text-stone-950 border border-white/10 transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip Bar */}
          <div className="p-4 bg-stone-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
            {currentItem.location && (
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{currentItem.location}</span>
              </div>
            )}

            {/* Thumbnail Carousel Bar */}
            {items.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full p-1 no-scrollbar">
                {items.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      idx === currentIndex
                        ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/30'
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={thumb.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
