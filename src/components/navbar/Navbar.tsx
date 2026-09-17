import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { NAV_ITEMS, CONTACT_INFO } from '@/src/constants/navigation';
import { useSmoothScroll } from '@/src/providers/SmoothScrollProvider';
import { useBooking } from '@/src/hooks/useBooking';
import { getDirectWhatsAppUrl, openWhatsAppChat } from '@/src/utils/whatsapp';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/src/components/ui/Button';
import { Container } from '@/src/components/ui/Container';
import { Phone, MessageSquare, Menu, Calendar } from 'lucide-react';

export function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const { openBookingModal } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll offset and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = NAV_ITEMS.map((item) => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll click handler
  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    if (href === '#home' || href === '#') {
      scrollTo(0);
      return;
    }

    const targetId =
      href === '#attractions' ? 'nearby' : href === '#restaurant' ? 'dining' : sectionId;

    const element = document.getElementById(targetId) || document.querySelector(href);
    if (element) {
      scrollTo(element, { offset: -80 });
    }
  };

  const handleDirectWhatsAppClick = () => {
    const url = getDirectWhatsAppUrl();
    openWhatsAppChat(url);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out',
          isScrolled
            ? 'bg-[#020a14]/90 backdrop-blur-2xl border-b border-[#c5a059]/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] py-3 md:py-3.5'
            : 'bg-gradient-to-b from-[#020a14]/85 via-[#020a14]/40 to-transparent backdrop-blur-xs py-5 md:py-6'
        )}
      >
        <Container size="xl">
          <nav
            className="flex items-center justify-between gap-4"
            aria-label="Main Navigation"
          >
            {/* Left: Luxury Brand Logo */}
            <div className="flex items-center shrink-0">
              <Logo
                isScrolled={isScrolled}
                onClick={() => handleNavClick('#home')}
              />
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1.5 bg-stone-900/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-inner">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      'relative px-3.5 py-1.5 text-xs font-sans font-medium tracking-wide transition-all duration-300 rounded-full select-none',
                      isActive
                        ? 'text-[#f0e2b6] font-semibold'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {item.label}

                    {/* Active Link Underline Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#f0e2b6] to-[#c5a059] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.8)]"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right: Action CTAs */}
            <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Mobile Phone Icon Button for Desktop/Laptops */}
              <div className="relative group">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="p-2.5 rounded-xl bg-stone-900/60 border border-white/15 text-amber-400 hover:text-amber-300 hover:bg-white/10 hover:border-amber-400/40 transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm"
                  title={`Call Direct Concierge: ${CONTACT_INFO.phone}`}
                  aria-label={`Call Direct Concierge at ${CONTACT_INFO.phone}`}
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                </a>
                {/* Tooltip showing phone number on hover */}
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-stone-900 border border-amber-400/30 text-amber-300 text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                  {CONTACT_INFO.phone}
                </span>
              </div>

              {/* WhatsApp Concierge Button */}
              <div className="relative group">
                <Button
                  variant="whatsapp"
                  size="sm"
                  onClick={handleDirectWhatsAppClick}
                  icon={<MessageSquare className="w-3.5 h-3.5" />}
                  className="hidden md:inline-flex shrink-0 whitespace-nowrap"
                  title="Chat on WhatsApp"
                >
                  WhatsApp
                </Button>
                {/* Subtle Pulse Halo */}
                <span className="absolute -inset-0.5 rounded-xl bg-emerald-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Book Suite Main CTA */}
              <Button
                variant="gold"
                size="md"
                onClick={() => openBookingModal()}
                icon={<Calendar className="w-4 h-4" />}
                iconPosition="left"
                className="shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 shrink-0 whitespace-nowrap"
              >
                Book Suite
              </Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Button
                variant="gold"
                size="sm"
                onClick={() => openBookingModal()}
                className="sm:hidden px-3 py-1.5 text-xs"
              >
                Book
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-stone-900/60 border border-white/15 text-stone-200 hover:text-white hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-5 h-5 text-amber-400" />
              </button>
            </div>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavClick}
      />
    </>
  );
}

