import { z } from 'zod';
import { ROOM_TYPES, RoomType } from '../config/whatsapp.config';

export const bookingSchema = z
  .object({
    guestName: z
      .string()
      .min(1, { message: 'Guest name is required' })
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(60, { message: 'Name must not exceed 60 characters' }),

    mobileNumber: z
      .string()
      .min(1, { message: 'Mobile number is required' })
      .refine(
        (val) => {
          // Remove spaces, hyphens, plus sign for validation
          const clean = val.replace(/[\s\-\+\(\)]/g, '');
          // Accept 10-digit Indian numbers or 10-12 digit numbers
          return /^[0-9]{10,12}$/.test(clean);
        },
        { message: 'Please enter a valid 10-digit mobile number' }
      ),

    checkInDate: z
      .string()
      .min(1, { message: 'Check-in date is required' })
      .refine(
        (val) => {
          if (!val) return false;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const inputDate = new Date(val);
          return !isNaN(inputDate.getTime()) && inputDate >= today;
        },
        { message: 'Check-in date cannot be in the past' }
      ),

    checkOutDate: z
      .string()
      .min(1, { message: 'Check-out date is required' }),

    guests: z
      .string()
      .min(1, { message: 'Please select number of guests' }),

    roomType: z.enum(ROOM_TYPES as [RoomType, ...RoomType[]], {
      message: 'Please select a valid room type',
    }),

    specialRequest: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.checkInDate || !data.checkOutDate) return true;
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);
      return !isNaN(checkOut.getTime()) && checkOut > checkIn;
    },
    {
      message: 'Check-out date must be after check-in date',
      path: ['checkOutDate'],
    }
  );

export type BookingSchemaType = z.infer<typeof bookingSchema>;
