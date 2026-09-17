import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useBooking } from '@/src/context/BookingContext';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Utensils, Calendar, Sparkles, MessageSquare, Clock, ShieldCheck, Check } from 'lucide-react';
import { openWhatsAppChat, getDirectWhatsAppUrl } from '@/src/utils/whatsapp';

export function ReservationCTA() {
  const { openBookingModal } = useBooking();
  const [reservationType, setReservationType] = useState<'restaurant' | 'room' | 'both'>('restaurant');

  const handleReservationClick = () => {
    if (reservationType === 'room') {
      openBookingModal();
    } else if (reservationType === 'both') {
      openBookingModal({
        specialRequest: 'Interested in Stay + Dining Experience Package',
      });
    } else {
      // Table reservation via direct WhatsApp dining query
      const message = `Hello Digha Beach Resort Team! 👋\nI would like to reserve a table at Bay Breeze Restaurant.\n\nDate: [Preferred Date]\nTime: [Lunch / Dinner]\nGuests: [Number of Guests]\nOccasion: [Special Occasion / Family Dining]`;
      const url = getDirectWhatsAppUrl(message);
      openWhatsAppChat(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#030e1c] via-[#08182b] to-[#030e1c] border border-amber-500/30 p-8 sm:p-12 shadow-2xl"
    >
      {/* Glow shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-7 space-y-4">
          <Badge variant="gold" className="text-xs uppercase font-mono py-1 px-3">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Instant Table & Dining Reservation
          </Badge>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-100">
            Reserve Your Seaside Table
          </h3>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
            Whether it’s a romantic candlelit seafood dinner by the waves or a lavish Sunday family breakfast buffet, reserve your seats in advance to ensure the best ocean view tables.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-stone-300 pt-2">
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Breakfast: 7:30 AM - 10:30 AM
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Dinner & Bar: 7:00 PM - 11:00 PM
            </span>
          </div>
        </div>

        {/* Right Column Reservation Selector Box */}
        <div className="lg:col-span-5 bg-stone-950/80 backdrop-blur-xl border border-white/15 p-6 rounded-2xl space-y-5 shadow-xl">
          <span className="text-xs font-mono text-amber-300 uppercase tracking-wider block">
            Select Reservation Preference:
          </span>

          {/* Type Selector Pills */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setReservationType('restaurant')}
              className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                reservationType === 'restaurant'
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-semibold shadow-lg'
                  : 'bg-stone-900 text-stone-300 border-white/10 hover:border-amber-400/40'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Dining Only</span>
            </button>

            <button
              onClick={() => setReservationType('room')}
              className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                reservationType === 'room'
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-semibold shadow-lg'
                  : 'bg-stone-900 text-stone-300 border-white/10 hover:border-amber-400/40'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Room Stay</span>
            </button>

            <button
              onClick={() => setReservationType('both')}
              className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                reservationType === 'both'
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-semibold shadow-lg'
                  : 'bg-stone-900 text-stone-300 border-white/10 hover:border-amber-400/40'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Stay & Dine</span>
            </button>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleReservationClick}
            variant="whatsapp"
            size="lg"
            icon={<MessageSquare className="w-5 h-5 fill-current" />}
            className="w-full text-sm sm:text-base font-semibold py-3.5 shadow-xl shadow-emerald-600/20"
          >
            {reservationType === 'restaurant'
              ? 'Reserve a Table via WhatsApp'
              : reservationType === 'both'
              ? 'Book Stay & Dining Package'
              : 'Book Resort Room Stay'}
          </Button>

          <p className="text-[11px] text-stone-400 text-center font-mono flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            No advance payment needed for table bookings
          </p>
        </div>
      </div>
    </motion.div>
  );
}
