import React from 'react';
import { motion } from 'motion/react';
import { AttractionItem } from '@/src/types/attractions';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import {
  Navigation,
  Clock,
  MapPin,
  Check,
  ExternalLink,
  Compass,
} from 'lucide-react';

interface AttractionCardProps {
  attraction: AttractionItem;
  onSelectMap?: (attraction: AttractionItem) => void;
  isSelectedForMap?: boolean;
}

export function AttractionCard({
  attraction,
  onSelectMap,
  isSelectedForMap,
}: AttractionCardProps) {
  const handleOpenDirections = () => {
    if (attraction.googleMapsUrl) {
      window.open(
        attraction.googleMapsUrl,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      const query = encodeURIComponent(
        `${attraction.title}, Digha, West Bengal`
      );

      window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  /*
   * IMPORTANT:
   * attraction.image can be either:
   *
   * 1. A normal string:
   *    /images/attractions/shankarpur-beach.jpg
   *
   * 2. An imported image object:
   *    { src: '/_next/static/media/...' }
   *
   * This normalizes both formats.
   */
  const imageSrc =
    typeof attraction.image === 'string'
      ? attraction.image
      : attraction.image?.src;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#030e1a]/90 border transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl ${
        isSelectedForMap
          ? 'border-[#c5a059] ring-2 ring-[#c5a059]/30'
          : 'border-white/10 hover:border-[#c5a059]/50'
      }`}
    >
      {/* ============================================================
          IMAGE
      ============================================================ */}

      <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-950">
        {imageSrc ? (
          <img
            key={`${attraction.id}-${imageSrc}`}
            src={imageSrc}
            alt={attraction.title}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 block w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            onError={(event) => {
              console.error(
                `Failed to load attraction image: ${imageSrc}`
              );

              event.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-950">
            <span className="text-xs text-stone-500">
              Image unavailable
            </span>
          </div>
        )}

        {/* Image gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030e1a] via-[#030e1a]/20 to-transparent" />

        {/* ============================================================
            CATEGORY + DISTANCE
        ============================================================ */}

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="text-[10px] uppercase font-mono bg-stone-950/80 text-[#f0e2b6] px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
            {attraction.category}
          </span>

          <Badge
            variant="gold"
            className="text-[10px] font-mono py-0.5 px-2.5 shadow-md flex items-center gap-1"
          >
            <MapPin className="w-3 h-3 text-stone-950" />
            {attraction.distance} from resort
          </Badge>
        </div>

        {/* ============================================================
            TRAVEL TIME
        ============================================================ */}

        <div className="absolute bottom-3 left-3 z-10 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs font-mono text-stone-200 flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>{attraction.travelTime}</span>
        </div>
      </div>

      {/* ============================================================
          DETAILS
      ============================================================ */}

      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h4 className="text-xl sm:text-2xl font-serif text-stone-100 group-hover:text-[#f0e2b6] transition-colors">
            {attraction.title}
          </h4>

          <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
            <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />

            <span className="truncate">
              Best time: {attraction.bestTime}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed line-clamp-3">
            {attraction.description}
          </p>

          {/* Highlights */}
          <div className="pt-2 space-y-1 border-t border-white/10">
            {attraction.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-xs text-stone-300"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />

                <span className="line-clamp-1">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            ACTIONS
        ============================================================ */}

        <div className="pt-4 border-t border-white/10 flex items-center gap-2">
          {onSelectMap && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectMap(attraction)}
              icon={
                <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
              }
              className="flex-1 text-xs font-semibold py-2 px-2 border-white/20 hover:border-[#c5a059]"
            >
              Show on Map
            </Button>
          )}

          <Button
            variant="gold"
            size="sm"
            onClick={handleOpenDirections}
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            className="flex-1 text-xs font-semibold py-2 px-2 shadow-md"
          >
            Directions
          </Button>
        </div>
      </div>
    </motion.div>
  );
}