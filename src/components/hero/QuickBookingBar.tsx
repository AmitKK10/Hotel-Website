import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useBooking } from '@/src/context/BookingContext';
import { ROOM_TYPES, RoomType } from '@/src/config/whatsapp.config';
import { Button } from '@/src/components/ui/Button';
import { Calendar, Users, BedDouble, Search, Sparkles } from 'lucide-react';

export function QuickBookingBar() {
  const { openBookingModal } = useBooking();

  // Local quick selections
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
  const [guests, setGuests] = useState('2 Adults');
  const [roomType, setRoomType] = useState<RoomType>('Sea View Room');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal({
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      roomType,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-5xl mx-auto mt-8 sm:mt-12"
    >
      <form
        onSubmit={handleSearchSubmit}
        className="relative bg-[#030e1c]/85 backdrop-blur-2xl border border-[#c5a059]/30 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-[#c5a059]/50 transition-all duration-300"
      >
        {/* Glow Accent Line */}
        <div className="absolute -top-[1px] left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#f0e2b6]/60 to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-center">
          {/* Check-In Date */}
          <div className="flex flex-col bg-stone-900/60 border border-white/10 rounded-xl p-2.5 px-3.5 focus-within:border-[#c5a059]/60 transition-colors">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#f0e2b6] font-medium flex items-center gap-1.5 mb-1">
              <Calendar className="w-3 h-3 text-[#c5a059]" /> Check-in
            </span>
            <input
              type="date"
              value={checkIn}
              min={formatDate(new Date())}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent text-stone-100 text-xs sm:text-sm font-sans font-medium focus:outline-none cursor-pointer color-scheme-dark"
            />
          </div>

          {/* Check-Out Date */}
          <div className="flex flex-col bg-stone-900/60 border border-white/10 rounded-xl p-2.5 px-3.5 focus-within:border-[#c5a059]/60 transition-colors">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#f0e2b6] font-medium flex items-center gap-1.5 mb-1">
              <Calendar className="w-3 h-3 text-[#c5a059]" /> Check-out
            </span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || formatDate(new Date())}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-stone-100 text-xs sm:text-sm font-sans font-medium focus:outline-none cursor-pointer color-scheme-dark"
            />
          </div>

          {/* Guests Select */}
          <div className="flex flex-col bg-stone-900/60 border border-white/10 rounded-xl p-2.5 px-3.5 focus-within:border-[#c5a059]/60 transition-colors">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#f0e2b6] font-medium flex items-center gap-1.5 mb-1">
              <Users className="w-3 h-3 text-[#c5a059]" /> Guests
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="bg-transparent text-stone-100 text-xs sm:text-sm font-sans font-medium focus:outline-none cursor-pointer appearance-none"
            >
              <option value="1 Adult" className="bg-stone-900">1 Adult</option>
              <option value="2 Adults" className="bg-stone-900">2 Adults (1 Room)</option>
              <option value="2 Adults, 1 Child" className="bg-stone-900">2 Adults, 1 Child</option>
              <option value="3 Adults" className="bg-stone-900">3 Adults (Family)</option>
              <option value="4+ Guests" className="bg-stone-900">4+ Guests (Suite)</option>
            </select>
          </div>

          {/* Room Type Select */}
          <div className="flex flex-col bg-stone-900/60 border border-white/10 rounded-xl p-2.5 px-3.5 focus-within:border-amber-500/60 transition-colors">
            <span className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-medium flex items-center gap-1.5 mb-1">
              <BedDouble className="w-3 h-3 text-amber-400" /> Room Preference
            </span>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value as RoomType)}
              className="bg-transparent text-stone-100 text-xs sm:text-sm font-sans font-medium focus:outline-none cursor-pointer appearance-none truncate"
            >
              {ROOM_TYPES.map((type) => (
                <option key={type} value={type} className="bg-stone-900">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Search CTA */}
          <div className="sm:col-span-2 lg:col-span-1 h-full flex items-center">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              icon={<Search className="w-4 h-4" />}
              className="w-full h-full py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg shadow-amber-500/20"
            >
              Book Now
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
