import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '@/src/types/gallery';
import { GalleryCard } from './GalleryCard';
import { Camera } from 'lucide-react';

interface GalleryGridProps {
  items: GalleryItem[];
  onSelectItem: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, onSelectItem }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-white/10 mt-8">
        <Camera className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h3 className="text-xl font-serif text-stone-100 font-semibold">No media items in this category</h3>
        <p className="text-sm text-stone-400 mt-1">Please select another gallery filter above.</p>
      </div>
    );
  }

  return (
    <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <GalleryCard item={item} onClick={onSelectItem} />
          </div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
