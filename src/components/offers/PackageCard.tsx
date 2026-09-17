import React from 'react';
import { motion } from 'motion/react';
import { PackageItem } from '@/src/types/offers';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { useBooking } from '@/src/context/BookingContext';
import { Calendar, Check, Clock, Users, Tag, Sparkles } from 'lucide-react';

interface PackageCardProps {
  pkg: PackageItem;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const { openBookingModal } = useBooking();

  const handleBook = () => {
    openBookingModal({
      specialRequest: `Interested in Package: ${pkg.title} (${pkg.duration})`,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900/90 border border-white/10 hover:border-amber-400/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between transition-all duration-300"
    >
      {/* Image Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
        <img
          src={pkg.image}
          alt={pkg.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

        {/* Ribbons */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {pkg.limitedRibbon ? (
            <Badge variant="gold" className="text-[10px] uppercase font-mono py-0.5 px-2.5 shadow-md">
              <Sparkles className="w-3 h-3 mr-1" /> {pkg.limitedRibbon}
            </Badge>
          ) : (
            <span className="text-[10px] uppercase font-mono bg-stone-950/80 text-amber-300 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
              {pkg.category}
            </span>
          )}

          {pkg.discount && (
            <span className="bg-rose-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md">
              {pkg.discount}
            </span>
          )}
        </div>

        {/* Duration badge on bottom left of image */}
        <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs font-mono text-stone-200 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{pkg.duration}</span>
        </div>
      </div>

      {/* Package Content */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h4 className="text-lg sm:text-xl font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
            {pkg.title}
          </h4>

          <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{pkg.idealFor}</span>
          </div>

          {/* Features list */}
          <div className="pt-2 space-y-1.5 border-t border-white/10">
            {pkg.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
            {pkg.features.length > 3 && (
              <span className="text-[10px] font-mono text-amber-400 block pt-0.5">
                + {pkg.features.length - 3} more exclusive inclusions
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-white/10 space-y-3 mt-auto">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-stone-400 block">Starting From</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-serif font-bold text-amber-300">
                  ₹{pkg.price.toLocaleString()}
                </span>
                {pkg.originalPrice && (
                  <span className="text-xs font-mono text-stone-400 line-through">
                    ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleBook}
              icon={<Calendar className="w-3.5 h-3.5" />}
              className="text-xs font-semibold py-2 px-3 border-amber-400/30 hover:border-amber-400"
            >
              Book Offer
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
