import { WHATSAPP_CONFIG } from '@/src/config/whatsapp.config';

/**
 * Digha Beach Resort - Navigation & Contact Data
 */

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Rooms', href: '#rooms', badge: 'Sea View' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Dining', href: '#dining' },
  { label: 'Offers', href: '#offers', badge: 'Special' },
  { label: 'Nearby', href: '#nearby' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export const CONTACT_INFO = {
  phone: WHATSAPP_CONFIG.displayNumber,
  whatsappNumber: WHATSAPP_CONFIG.fullFormattedNumber,
  whatsappMessage: WHATSAPP_CONFIG.defaultWelcomeMessage,
  address: 'New Digha Beach Road, Purba Medinipur, West Bengal 721428, India',
  mapUrl: 'https://maps.google.com/?q=New+Digha+Beach',
};

