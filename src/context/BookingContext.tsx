import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { BookingContextType, BookingOptions } from '../types/booking';
import { RoomType } from '../config/whatsapp.config';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export interface BookingProviderProps {
  children: React.ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingOptions, setBookingOptions] = useState<BookingOptions | undefined>(undefined);

  const openBookingModal = useCallback((options?: BookingOptions) => {
    if (options) {
      setBookingOptions(options);
    }
    setIsModalOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isModalOpen,
      openBookingModal,
      closeBookingModal,
      selectedRoomType: bookingOptions?.roomType,
      bookingOptions,
    }),
    [isModalOpen, openBookingModal, closeBookingModal, bookingOptions]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextType {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
