import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '@/src/context/BookingContext';
import { getDirectWhatsAppUrl, openWhatsAppChat } from '@/src/utils/whatsapp';
import { MessageSquare, Sparkles } from 'lucide-react';

export function FloatingWhatsAppButton() {
  const { isModalOpen } = useBooking();
  const [isHovered, setIsHovered] = useState(false);

  // Hide while booking modal is open to avoid visual clutter
  if (isModalOpen) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const url = getDirectWhatsAppUrl();
    openWhatsAppChat(url);
  };

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-center justify-end group">
      {/* Tooltip Popup */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mr-3 px-3.5 py-2 rounded-xl bg-[#030e1c]/95 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-medium tracking-wide shadow-xl backdrop-blur-md flex items-center gap-2 whitespace-nowrap pointer-events-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Chat with us on WhatsApp</span>
            <div className="w-2 h-2 rotate-45 bg-[#030e1c] border-r border-t border-emerald-500/30 absolute -right-1 top-1/2 -translate-y-1/2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glass Floating Button */}
      <motion.button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/50 backdrop-blur-md border border-emerald-300/40 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
        aria-label="Chat with Digha Beach Resort on WhatsApp"
        title="Chat with us"
      >
        {/* Animated Pulse Halo Ring */}
        <span className="absolute -inset-1.5 rounded-full bg-emerald-500/40 animate-ping opacity-75 pointer-events-none" />

        {/* Outer Radial Glow */}
        <span className="absolute -inset-3 rounded-full bg-emerald-400/20 blur-md pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageSquare className="w-7 h-7 fill-current relative z-10 text-white transition-transform duration-300 group-hover:rotate-6" />

        {/* Small Online Active Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 border-2 border-[#020a14] rounded-full z-20 shadow-sm" />
      </motion.button>
    </div>
  );
}
