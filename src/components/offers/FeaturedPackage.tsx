import React from 'react';
import { motion } from 'motion/react';
import { FEATURED_PACKAGE } from '@/src/data/offers';
import { useBooking } from '@/src/context/BookingContext';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Sparkles, Calendar, Check, ShieldCheck, Tag, Clock, Users } from 'lucide-react';

export function FeaturedPackage() {
  const { openBookingModal } = useBooking();

  const handleBook = () => {
    openBookingModal({
      specialRequest: `Interested in Package: ${FEATURED_PACKAGE.title} (${FEATURED_PACKAGE.duration})`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden border border-amber-400/40 bg-gradient-to-br from-[#030e1a] via-[#091a2e] to-[#030e1a] shadow-2xl group"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 md:p-12 relative z-10">
        {/* Left Column: Media Showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
            <img
              src={FEATURED_PACKAGE.image}
              alt={FEATURED_PACKAGE.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />

            {/* Ribbon & Discount */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
              <Badge variant="gold" className="text-xs font-mono uppercase tracking-wider py-1 px-3 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> {FEATURED_PACKAGE.limitedRibbon}
              </Badge>
              {FEATURED_PACKAGE.discount && (
                <span className="bg-rose-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                  {FEATURED_PACKAGE.discount}
                </span>
              )}
            </div>

            {/* Ideal For Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-stone-950/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono text-stone-200">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Users className="w-4 h-4 text-amber-400" /> {FEATURED_PACKAGE.idealFor}
              </span>
              <span className="text-stone-400">{FEATURED_PACKAGE.duration}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Package Details & Inclusions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
              <Tag className="w-3.5 h-3.5" /> Featured Hero Package
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-100">
              {FEATURED_PACKAGE.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-stone-300 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {FEATURED_PACKAGE.availability}
            </p>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-stone-950/60 border border-white/10">
            <div>
              <span className="text-xs text-stone-400 font-mono block">Package Price Starts At</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">
                  ₹{FEATURED_PACKAGE.price.toLocaleString()}
                </span>
                {FEATURED_PACKAGE.originalPrice && (
                  <span className="text-sm font-mono text-stone-400 line-through">
                    ₹{FEATURED_PACKAGE.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-mono ml-2">Taxes Included</span>
              </div>
            </div>
          </div>

          {/* Key Inclusions Checklist */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-wider block">
              What's Included in This Experience:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-200">
              {FEATURED_PACKAGE.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-stone-900/50 p-2.5 rounded-xl border border-white/5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              variant="gold"
              size="lg"
              onClick={handleBook}
              icon={<Calendar className="w-4 h-4" />}
              className="text-sm font-semibold py-3.5 px-8 shadow-xl shadow-amber-500/20"
            >
              Book This Package
            </Button>

            <span className="text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Best Price Guarantee via WhatsApp
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
