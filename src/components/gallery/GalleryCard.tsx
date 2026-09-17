import React from 'react';
import { motion } from 'motion/react';
import { GalleryItem } from '@/src/types/gallery';
import { Badge } from '@/src/components/ui/Badge';
import { Maximize2, MapPin, Sparkles, Play } from 'lucide-react';

interface GalleryCardProps {
  item: GalleryItem;
  onClick: (item: GalleryItem) => void;
}

export function GalleryCard({ item, onClick }: GalleryCardProps) {
  // Determine aspect ratio height class for masonry grid feel
  const aspectClass =
    item.aspectRatio === 'tall'
      ? 'aspect-[3/4]'
      : item.aspectRatio === 'wide'
      ? 'aspect-[16/10]'
      : 'aspect-square';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={() => onClick(item)}
      className={`group relative ${aspectClass} rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 border border-white/10 hover:border-amber-400/50 shadow-xl hover:shadow-[0_20px_45px_rgba(251,191,36,0.15)] transition-all duration-500 cursor-pointer`}
    >
      {/* Main Image */}
      <img
        src={item.image}
        alt={item.alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Shine Sweep Accent */}
      <div className="absolute -inset-full top-0 block bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine pointer-events-none" />

      {/* Top Left Badge & Top Right Fullscreen Icon */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
        <Badge variant="gold" className="text-[10px] uppercase font-mono tracking-wider py-0.5 px-2.5 shadow-md">
          {item.category.replace('-', ' ')}
        </Badge>

        <div className="w-8 h-8 rounded-full bg-stone-950/80 border border-white/20 text-stone-300 group-hover:text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-400/50 flex items-center justify-center transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
          {item.isVideo ? <Play className="w-3.5 h-3.5 fill-current" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </div>
      </div>

      {/* Bottom Content Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="text-sm sm:text-base font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1">
          {item.title}
        </h4>

        {item.location && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-stone-300">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
