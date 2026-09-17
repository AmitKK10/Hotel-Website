/**
 * Centralized WhatsApp Configuration
 * Single Source of Truth for Digha Beach Resort WhatsApp Communications
 */

export const WHATSAPP_CONFIG = {
  countryCode: '+91',
  rawPhoneNumber: '9563574862',
  // Fully formatted string with country code without plus sign for wa.me API
  fullFormattedNumber: '919563574862',
  // Display phone string
  displayNumber: '+91 95635 74862',
  // Default welcome message for general chat inquiries
  defaultWelcomeMessage:
    'Hello Digha Beach Resort, I would like to inquire about room availability and luxury stays by the sea.',
} as const;

export type RoomType =
  | 'Deluxe Room'
  | 'Premium Room'
  | 'Sea View Room'
  | 'Family Room'
  | 'Family Suite'
  | 'Luxury Suite'
  | 'Executive Suite'
  | 'Presidential Suite';

export const ROOM_TYPES: RoomType[] = [
  'Sea View Room',
  'Luxury Suite',
  'Family Suite',
  'Executive Suite',
  'Presidential Suite',
  'Deluxe Room',
  'Premium Room',
  'Family Room',
];
