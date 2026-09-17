import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Room } from '@/src/types/room';
import { useBooking } from '@/src/context/BookingContext';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import {
  X,
  Star,
  Users,
  Maximize,
  Bed,
  Eye,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
} from 'lucide-react';

interface RoomDetailsModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RoomDetailsModal({ room, isOpen, onClose }: RoomDetailsModalProps) {
  const { openBookingModal } = useBooking();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const handleBookNow = () => {
    onClose();
    openBookingModal({ roomType: room.name });
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020a14]/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-4xl bg-[#030e1a] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-stone-900/80 hover:bg-amber-500 text-stone-300 hover:text-stone-950 transition-all duration-300 border border-white/10 shadow-lg cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body Scroll Area */}
            <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 no-scrollbar">
              {/* Image Gallery Header */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-900 aspect-[16/9] sm:aspect-[21/9] border border-white/10 group">
                <img
                  src={room.images[activeImageIndex]}
                  alt={room.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030e1a] via-transparent to-black/30" />

                {/* Gallery Navigation Arrows */}
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/60 hover:bg-amber-500 text-stone-200 hover:text-stone-950 transition-colors cursor-pointer border border-white/10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/60 hover:bg-amber-500 text-stone-200 hover:text-stone-950 transition-colors cursor-pointer border border-white/10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Thumbnail Selector Bar */}
                {room.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-stone-950/80 p-1.5 rounded-full backdrop-blur-md border border-white/10">
                    {room.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          idx === activeImageIndex ? 'border-amber-400 scale-105' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Room Header & Pricing */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="gold" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" /> {room.name}
                    </Badge>
                    <div className="flex items-center text-amber-400 text-xs font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {room.rating} ({room.reviewsCount} reviews)
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-stone-100 font-semibold">
                    {room.title}
                  </h2>
                </div>

                {/* Price Display */}
                <div className="text-left md:text-right">
                  <span className="text-xs font-mono tracking-wider uppercase text-stone-400 block">Starting From</span>
                  <div className="flex items-baseline gap-2">
                    {room.originalPrice && (
                      <span className="text-sm sm:text-base line-through text-stone-500">
                        ₹{room.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                      ₹{room.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-300 font-sans">/ night</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                    + Breakfast Included & Free Cancellation
                  </span>
                </div>
              </div>

              {/* Room Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-900/60 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Maximize className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">Room Size</span>
                    <span className="text-xs sm:text-sm font-semibold text-stone-100">{room.size}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">Guests</span>
                    <span className="text-xs sm:text-sm font-semibold text-stone-100">{room.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Bed className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">Bed Type</span>
                    <span className="text-xs sm:text-sm font-semibold text-stone-100">{room.bedType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">View</span>
                    <span className="text-xs sm:text-sm font-semibold text-stone-100">{room.view}</span>
                  </div>
                </div>
              </div>

              {/* Overview & Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-semibold text-amber-300">Room Overview</h3>
                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                  {room.fullDescription}
                </p>
              </div>

              {/* Complete Amenities Grid */}
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-semibold text-amber-300">Room Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-stone-900/40 p-2.5 rounded-xl border border-white/5 text-xs text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unique Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-semibold text-amber-300">Special Suite Highlights</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                  {room.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Policies */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Resort Guarantees & Policies
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                  {room.policies.map((pol, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{pol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer CTA */}
            <div className="p-4 sm:p-5 bg-stone-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-400 block">Instant Reservation Guaranteed</span>
                <span className="text-sm font-semibold text-amber-400">
                  ₹{room.price.toLocaleString('en-IN')} <span className="text-xs text-stone-300 font-normal">/ night (Taxes included)</span>
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleBookNow}
                  icon={<Calendar className="w-4 h-4" />}
                  className="w-full sm:w-auto px-8 py-3 text-sm font-semibold shadow-lg shadow-amber-500/20"
                >
                  Book Suite Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
