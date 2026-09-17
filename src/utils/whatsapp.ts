import { WHATSAPP_CONFIG } from '../config/whatsapp.config';
import { BookingFormData } from '../types/booking';

/**
 * Format date for display in the WhatsApp message (e.g. 2026-08-02 -> Aug 2, 2026 or 02/08/2026)
 */
export function formatDateForMessage(dateStr: string): string {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Builds the exact required WhatsApp text message from booking form data.
 */
export function buildBookingWhatsAppMessage(data: BookingFormData): string {
  const formattedCheckIn = formatDateForMessage(data.checkInDate);
  const formattedCheckOut = formatDateForMessage(data.checkOutDate);
  const specialReq = data.specialRequest && data.specialRequest.trim().length > 0
    ? data.specialRequest.trim()
    : 'None';

  return `Hello Digha Beach Resort,

I would like to book a room.

Guest Name:
${data.guestName.trim()}

Phone:
${data.mobileNumber.trim()}

Check-in:
${formattedCheckIn}

Check-out:
${formattedCheckOut}

Guests:
${data.guests}

Room Type:
${data.roomType}

Special Request:
${specialReq}

Please contact me regarding room availability.

Thank you.`;
}

/**
 * Generates the wa.me URL for the booking message.
 */
export function getBookingWhatsAppUrl(data: BookingFormData): string {
  const messageText = buildBookingWhatsAppMessage(data);
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${WHATSAPP_CONFIG.fullFormattedNumber}?text=${encodedText}`;
}

/**
 * Generates a direct WhatsApp URL for general inquiry chat.
 */
export function getDirectWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || WHATSAPP_CONFIG.defaultWelcomeMessage;
  return `https://wa.me/${WHATSAPP_CONFIG.fullFormattedNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp in a new tab or app.
 */
export function openWhatsAppChat(url: string): void {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
