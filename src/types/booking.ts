import { RoomType } from '../config/whatsapp.config';

export interface BookingFormData {
  guestName: string;
  mobileNumber: string;
  checkInDate: string;
  checkOutDate: string;
  guests: string;
  roomType: RoomType;
  specialRequest?: string;
}

export interface BookingOptions {
  roomType?: RoomType;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: string;
  specialRequest?: string;
}

export interface BookingContextType {
  isModalOpen: boolean;
  openBookingModal: (options?: BookingOptions) => void;
  closeBookingModal: () => void;
  selectedRoomType?: RoomType;
  bookingOptions?: BookingOptions;
}
