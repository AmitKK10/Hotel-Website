import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_ITEMS, CONTACT_INFO } from '@/src/constants/navigation';
import { DESIGN_TOKENS } from '@/src/constants/design-tokens';
import { useBooking } from '@/src/hooks/useBooking';
import { getDirectWhatsAppUrl, openWhatsAppChat } from '@/src/utils/whatsapp';
import { Logo } from './Logo';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { X, Phone, MessageSquare, MapPin, ChevronRight, Star, Sparkles } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (href: string) => void;
}

export function MobileMenu({ isOpen, onClose, activeSection, onNavigate }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBookingModal } = useBooking();

  // Trap focus and support Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scrolling when drawer is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleWhatsAppClick = () => {
    const url = getDirectWhatsAppUrl();
    openWhatsAppChat(url);
    onClose();
  };

  const handleBookSuiteClick = () => {
    onClose();
    openBookingModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xl lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer Slide Panel */}
          <motion.div
            ref={containerRef}
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: DESIGN_TOKENS.animation.ease.luxury }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#020a14] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Header Area */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Logo onClick={onClose} isScrolled />
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="p-6 space-y-2 flex-1">
              <div className="mb-4">
                <Badge variant="gold" className="text-[10px]">
                  <Sparkles className="w-3 h-3 mr-1" /> Navigation Menu
                </Badge>
              </div>

              <motion.nav className="space-y-1" role="navigation">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.04,
                        duration: 0.35,
                        ease: DESIGN_TOKENS.animation.ease.luxury,
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(item.href);
                        }}
                        className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300 font-medium'
                            : 'text-stone-200 hover:bg-white/5 hover:text-amber-200'
                        }`}
                      >
                        <span className="text-xl font-serif tracking-wide">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-sans tracking-widest uppercase border border-amber-500/30">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
                              isActive ? 'text-amber-400' : 'text-stone-500'
                            }`}
                          />
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </motion.nav>
            </div>

            {/* Bottom Contact & Action Section */}
            <div className="p-6 border-t border-white/10 bg-stone-900/40 space-y-4">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>5-Star Luxury Sea-Facing Resort • Digha</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a href={`tel:${CONTACT_INFO.phone}`} className="w-full">
                  <Button variant="glass" size="sm" icon={<Phone className="w-3.5 h-3.5" />} className="w-full">
                    Call Hotel
                  </Button>
                </a>
                <Button
                  variant="whatsapp"
                  size="sm"
                  onClick={handleWhatsAppClick}
                  icon={<MessageSquare className="w-3.5 h-3.5" />}
                  className="w-full"
                >
                  WhatsApp
                </Button>
              </div>

              <Button
                variant="gold"
                size="lg"
                onClick={handleBookSuiteClick}
                className="w-full shadow-lg shadow-amber-500/20"
              >
                Book Luxury Suite Now
              </Button>

              <div className="flex items-start gap-2 pt-2 text-xs text-stone-400">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

