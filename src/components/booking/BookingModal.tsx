import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { bookingSchema, BookingSchemaType } from '@/src/schemas/booking.schema';
import { useBooking } from '@/src/context/BookingContext';
import { BookingFormData } from '@/src/types/booking';
import { ROOM_TYPES, RoomType } from '@/src/config/whatsapp.config';
import { getBookingWhatsAppUrl, openWhatsAppChat } from '@/src/utils/whatsapp';
import { DESIGN_TOKENS } from '@/src/constants/design-tokens';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import {
  X,
  Calendar,
  Users,
  User,
  Phone,
  BedDouble,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export function BookingModal() {
  const { isModalOpen, closeBookingModal, bookingOptions } = useBooking();
  const modalRef = useRef<HTMLDivElement>(null);

  // Helper to construct default ISO date strings (YYYY-MM-DD)
  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 3);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    return {
      checkIn: bookingOptions?.checkInDate || formatDate(tomorrow),
      checkOut: bookingOptions?.checkOutDate || formatDate(dayAfter),
    };
  };

  const defaultDates = getDefaultDates();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: '',
      mobileNumber: '',
      checkInDate: defaultDates.checkIn,
      checkOutDate: defaultDates.checkOut,
      guests: bookingOptions?.guests || '2 Adults',
      roomType: bookingOptions?.roomType || 'Sea View Room',
      specialRequest: '',
    },
  });

  // Keep form in sync when options change or modal opens
  useEffect(() => {
    if (isModalOpen) {
      const dates = getDefaultDates();
      setValue('checkInDate', bookingOptions?.checkInDate || dates.checkIn);
      setValue('checkOutDate', bookingOptions?.checkOutDate || dates.checkOut);
      setValue('roomType', bookingOptions?.roomType || 'Sea View Room');
      setValue('guests', bookingOptions?.guests || '2 Adults');
      setValue('specialRequest', bookingOptions?.specialRequest || '');
    }
  }, [
    isModalOpen,
    bookingOptions?.checkInDate,
    bookingOptions?.checkOutDate,
    bookingOptions?.roomType,
    bookingOptions?.guests,
    bookingOptions?.specialRequest,
    setValue,
  ]);

  // Lock body scroll and attach Escape key listener
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeBookingModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeBookingModal]);

  const watchCheckIn = watch('checkInDate');

  // Handle Form Submission -> Open WhatsApp
  const onSubmit = (data: BookingSchemaType) => {
    const whatsappUrl = getBookingWhatsAppUrl(data as unknown as BookingFormData);
    openWhatsAppChat(whatsappUrl);
    closeBookingModal();
    reset();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeBookingModal}
            className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Content Box */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: DESIGN_TOKENS.animation.ease.luxury }}
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#030e1c] border border-[#c5a059]/30 rounded-3xl shadow-2xl shadow-stone-950 overflow-hidden my-auto text-stone-100 z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            {/* Top Luxury Banner Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-[#c5a059] via-[#f0e2b6] to-[#c5a059] shrink-0" />

            {/* Modal Visual Header with Subtle Ocean Background */}
            <div className="relative p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4 overflow-hidden shrink-0">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                  alt="Resort Sea View"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030e1c] via-[#030e1c]/80 to-[#030e1c]/60" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="gold">
                    <Sparkles className="w-3 h-3 mr-1" /> Direct Resort Reservation
                  </Badge>
                  <span className="hidden sm:inline-flex text-[11px] text-[#f0e2b6]/90 font-mono">
                    Instant WhatsApp Confirmation
                  </span>
                </div>
                <h2 id="booking-modal-title" className="text-2xl sm:text-3xl font-serif text-stone-100 font-normal tracking-wide">
                  Reserve Your Coastal Suite
                </h2>
                <p className="text-xs text-stone-300 mt-1 font-light">
                  Direct booking guarantee with best price and flexible check-in assistance from our concierge desk.
                </p>
              </div>

              <button
                onClick={closeBookingModal}
                className="relative z-10 p-2 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:bg-white/10 hover:border-[#c5a059]/40 transition-all duration-200 shrink-0"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-stone-100" noValidate>
              {/* Row 1: Guest Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Guest Name */}
                <div className="space-y-1.5">
                  <label htmlFor="guestName" className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                    Guest Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <User className="w-4 h-4 text-amber-500/80" />
                    </div>
                    <input
                      id="guestName"
                      type="text"
                      placeholder="e.g. Ananya Roy"
                      {...register('guestName')}
                      className={`w-full pl-10 pr-4 py-2.5 bg-stone-900/80 border rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                        errors.guestName ? 'border-red-500/80' : 'border-white/15 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.guestName && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.guestName.message}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label htmlFor="mobileNumber" className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                    Mobile Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Phone className="w-4 h-4 text-amber-500/80" />
                    </div>
                    <input
                      id="mobileNumber"
                      type="tel"
                      placeholder="10-digit phone number"
                      {...register('mobileNumber')}
                      className={`w-full pl-10 pr-4 py-2.5 bg-stone-900/80 border rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                        errors.mobileNumber ? 'border-red-500/80' : 'border-white/15 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.mobileNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Check-In & Check-Out Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Check-in Date */}
                <div className="space-y-1.5">
                  <label htmlFor="checkInDate" className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                    Check-in Date <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Calendar className="w-4 h-4 text-amber-500/80" />
                    </div>
                    <input
                      id="checkInDate"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      {...register('checkInDate')}
                      className={`w-full pl-10 pr-4 py-2.5 bg-stone-900/80 border rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors color-scheme-dark ${
                        errors.checkInDate ? 'border-red-500/80' : 'border-white/15 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.checkInDate && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.checkInDate.message}
                    </p>
                  )}
                </div>

                {/* Check-out Date */}
                <div className="space-y-1.5">
                  <label htmlFor="checkOutDate" className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                    Check-out Date <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Calendar className="w-4 h-4 text-amber-500/80" />
                    </div>
                    <input
                      id="checkOutDate"
                      type="date"
                      min={watchCheckIn || new Date().toISOString().split('T')[0]}
                      {...register('checkOutDate')}
                      className={`w-full pl-10 pr-4 py-2.5 bg-stone-900/80 border rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors color-scheme-dark ${
                        errors.checkOutDate ? 'border-red-500/80' : 'border-white/15 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.checkOutDate && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.checkOutDate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Room Type & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Room Type */}
                <div className="space-y-1.5">
                  <label htmlFor="roomType" className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                    Room Type <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <BedDouble className="w-4 h-4 text-amber-500/80" />
                    </div>
                    <select
                      id="roomType"
                      {...register('roomType')}
                      className={`w-full pl-10 pr-8 py-2.5 bg-stone-900/80 border rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors appearance-none ${
                        errors.roomType ? 'border-red-500/80' : 'border-white/15 focus:border-amber-500'
                      }`}
                    >
                      {ROOM_TYPES.map((room) => (
                        <option key={room} value={room} className="bg-stone-900 text-stone-100">
                          {room}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-stone-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                  {errors.roomType && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.roomType.message}
                    </p>
                  )}
                </div>

                {/* Guests */}
                <div className="space-y-1.5">
                  <label htmlFor="guests" className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                    Guests <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Users className="w-4 h-4 text-amber-500/80" />
                    </div>
                    <select
                      id="guests"
                      {...register('guests')}
                      className={`w-full pl-10 pr-8 py-2.5 bg-stone-900/80 border rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors appearance-none ${
                        errors.guests ? 'border-red-500/80' : 'border-white/15 focus:border-amber-500'
                      }`}
                    >
                      <option value="1 Adult" className="bg-stone-900 text-stone-100">
                        1 Adult
                      </option>
                      <option value="2 Adults" className="bg-stone-900 text-stone-100">
                        2 Adults (1 Room)
                      </option>
                      <option value="2 Adults, 1 Child" className="bg-stone-900 text-stone-100">
                        2 Adults, 1 Child
                      </option>
                      <option value="3 Adults" className="bg-stone-900 text-stone-100">
                        3 Adults (Family)
                      </option>
                      <option value="4+ Adults / Group" className="bg-stone-900 text-stone-100">
                        4+ Guests (Multiple Rooms)
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-stone-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                  {errors.guests && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.guests.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Special Request */}
              <div className="space-y-1.5">
                <label htmlFor="specialRequest" className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                  Special Request <span className="text-stone-500 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="specialRequest"
                  rows={2}
                  placeholder="e.g. High floor ocean view, early check-in, honeymoon setup..."
                  {...register('specialRequest')}
                  className="w-full px-4 py-2.5 bg-stone-900/80 border border-white/15 rounded-xl text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              {/* Direct Booking Guarantees */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs text-amber-200">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  <strong>Zero Booking Fees:</strong> Instant response from Digha Beach Resort front desk via WhatsApp. Best price guarantee for sea-view suites.
                </span>
              </div>

              {/* Action Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="whatsapp"
                  size="lg"
                  disabled={isSubmitting}
                  icon={<MessageSquare className="w-5 h-5 fill-current" />}
                  className="w-full text-base font-semibold py-3.5 shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/40"
                >
                  Send Booking Request via WhatsApp
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
