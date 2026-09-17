import React from 'react';
import { motion } from 'motion/react';
import { useBooking } from '@/src/context/BookingContext';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Waves, Sparkles, Calendar, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export function FeaturedExperience() {
  const { openBookingModal } = useBooking();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-[#030e1a]/90 shadow-2xl group"
    >
      {/* Background Image with Ambient Gradient Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
          alt="Wake Up To The Sound Of The Ocean at Digha Beach Resort"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020a14] via-[#020a14]/90 to-transparent lg:to-[#020a14]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020a14] via-transparent to-transparent" />
      </div>

      {/* Content Layout Grid */}
      <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-2xl space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs uppercase font-mono tracking-wider py-1 px-3">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Featured Resort Experience
          </Badge>
          <span className="text-xs font-mono text-amber-300/80 bg-amber-950/60 border border-amber-500/20 px-2.5 py-1 rounded-full">
            Digha Beachfront
          </span>
        </div>

        {/* Editorial Headline */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-100 font-semibold leading-tight">
          Wake Up To The Sound Of The Ocean
        </h3>

        {/* Short Editorial Paragraph */}
        <p className="text-sm sm:text-base text-stone-200 font-sans leading-relaxed">
          Open your private balcony doors to gentle sea breezes, golden morning sunshine, and uninterrupted vistas of the Bay of Bengal. Experience hospitality redesigned for deep rejuvenation.
        </p>

        {/* Key Experience Highlights */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-stone-300">
          <div className="flex items-center gap-2 bg-stone-950/60 p-2.5 rounded-xl border border-white/10 backdrop-blur-md">
            <Waves className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Direct Ocean Balcony Views</span>
          </div>
          <div className="flex items-center gap-2 bg-stone-950/60 p-2.5 rounded-xl border border-white/10 backdrop-blur-md">
            <Star className="w-4 h-4 text-amber-400 shrink-0" />
            <span>5-Star White-Glove Service</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button
            variant="gold"
            size="lg"
            onClick={() => openBookingModal()}
            icon={<Calendar className="w-4 h-4" />}
            className="px-8 py-3.5 text-sm font-semibold shadow-xl shadow-amber-500/25"
          >
            Book Your Luxury Stay
          </Button>

          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Instant WhatsApp Confirmation
          </span>
        </div>
      </div>
    </motion.div>
  );
}
