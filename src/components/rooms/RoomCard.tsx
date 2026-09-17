import React from 'react';
import { motion } from 'motion/react';
import { Room } from '@/src/types/room';
import { useBooking } from '@/src/context/BookingContext';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import {
  Star,
  Maximize,
  Users,
  Bed,
  Waves,
  Coffee,
  ShieldCheck,
  Eye,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onViewDetails: (room: Room) => void;
}

export function RoomCard({ room, onViewDetails }: RoomCardProps) {
  const { openBookingModal } = useBooking();

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    openBookingModal({ roomType: room.name });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-[#030e1a]/80 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(251,191,36,0.15)] transition-all duration-500 flex flex-col justify-between"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-900 cursor-pointer" onClick={() => onViewDetails(room)}>
        <img
          src={room.images[0]}
          alt={room.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030e1a] via-transparent to-black/30" />

        {/* Top Badges Bar */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            {room.isPopular && (
              <Badge variant="gold" className="text-[10px] uppercase font-mono tracking-wider shadow-md">
                <Sparkles className="w-3 h-3 mr-1" /> Most Popular
              </Badge>
            )}
            {room.isBestValue && (
              <Badge variant="pearl" className="text-[10px] uppercase font-mono tracking-wider shadow-md border-amber-400/40 text-amber-300 bg-amber-950/60">
                Best Value
              </Badge>
            )}
            {room.isSeaView && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium uppercase tracking-wider bg-sky-950/80 text-sky-300 border border-sky-500/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                <Waves className="w-3 h-3 text-sky-400" /> Sea View
              </span>
            )}
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-stone-950/80 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{room.rating}</span>
            <span className="text-[10px] text-stone-400 font-normal">({room.reviewsCount})</span>
          </div>
        </div>

        {/* Floating Quick Feature Pills */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-2 text-[10px] text-stone-200">
          <span className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Coffee className="w-3 h-3 text-amber-400" /> Breakfast Included
          </span>
          <span className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Free Cancellation
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          {/* Room Title */}
          <h3
            onClick={() => onViewDetails(room)}
            className="text-xl sm:text-2xl font-serif text-stone-100 font-semibold group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
          >
            {room.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-stone-300 font-sans mt-2 line-clamp-2 leading-relaxed">
            {room.shortDescription}
          </p>

          {/* Key Room Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 mt-4 border-y border-white/10 text-xs text-stone-300 font-sans">
            <div className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{room.size}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{room.capacity}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{room.bedType}</span>
            </div>
          </div>

          {/* Top Amenities Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-[10px] text-stone-300 bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-md">
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-mono">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Pricing & Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block">Starting From</span>
            <div className="flex items-baseline gap-1.5">
              {room.originalPrice && (
                <span className="text-xs line-through text-stone-500">
                  ₹{room.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-2xl sm:text-3xl font-serif font-semibold text-[#f0e2b6]">
                ₹{room.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-stone-400 font-light">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(room)}
              icon={<Eye className="w-3.5 h-3.5 text-[#c5a059]" />}
              className="text-xs border-white/15 hover:border-[#c5a059] px-3.5"
            >
              Details
            </Button>

            <Button
              variant="gold"
              size="sm"
              onClick={handleBookNow}
              icon={<Calendar className="w-3.5 h-3.5" />}
              className="text-xs px-4 shadow-md"
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
