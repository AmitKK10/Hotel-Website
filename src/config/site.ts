/**
 * Centralized Site & Hotel Configuration
 * Digha Beach Resort
 */

export const SITE_CONFIG = {
  name: 'Digha Beach Resort',
  tagline: 'Luxury Coastal Sanctuary by the Bay of Bengal',
  description:
    'Experience unrivaled luxury, oceanfront suites, world-class seafood dining, and serene coastal tranquility at New Digha Beach.',
  
  contact: {
    phone: '+91 9563574862',
    rawPhone: '+919563574862',
    whatsapp: '+91 9563574862',
    rawWhatsapp: '919563574862',
    email: 'amitkirankarofficial@gmail.com',
    address: 'Digha Science City Road, New Digha, West Bengal – 721428, India',
    googleMapsAddress: 'Digha Science City Road, New Digha - 721428',
    googleMapsUrl: 'https://maps.google.com/?q=Digha+Science+City+Road,+New+Digha,+West+Bengal+721428',
    embedMapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14798.24357288636!2d87.5028091!3d21.6264627!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a033527b13a83cb%3A0x8dd0877bd36fbe47!2sDigha%20Science%20Centre%20%26%20National%20Science%20Camp!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },

  businessHours: [
    { title: 'Reception & Concierge', hours: '24×7 Round the Clock', highlight: true },
    { title: 'Bayfront Restaurant', hours: '7:00 AM – 11:00 PM', highlight: false },
    { title: 'In-Room Dining', hours: '24×7 Express Service', highlight: true },
    { title: 'Guest Support', hours: 'Always Available', highlight: false },
  ],

  social: {
    instagram: 'https://www.instagram.com/amit_kiran_kar_10?igsh=dWN0bGwwNmU4cXRo',
    facebook: 'https://www.facebook.com/share/1dNFYoovCH/',
    youtube: 'https://youtube.com/@amitkirankar1007?si=liJCociZlTXqQBl7',
    github: 'https://github.com/AmitKK10',
    linkedin: 'https://www.linkedin.com/in/amit-kiran-kar-975744277',
  },

  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Accommodations', href: '#rooms' },
    { label: 'Resort Amenities', href: '#amenities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Dining Experience', href: '#restaurant' },
    { label: 'Exclusive Offers', href: '#offers' },
    { label: 'Nearby Attractions', href: '#attractions' },
    { label: 'Contact Us', href: '#contact' },
  ],

  roomCategories: [
    { label: 'Sea View Suite', href: '#rooms' },
    { label: 'Luxury Presidential Suite', href: '#rooms' },
    { label: 'Executive Family Suite', href: '#rooms' },
    { label: 'Deluxe Ocean Room', href: '#rooms' },
  ],

  policies: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Cancellation Policy', href: '#' },
    { label: 'Guest Guidelines', href: '#' },
  ],
} as const;
