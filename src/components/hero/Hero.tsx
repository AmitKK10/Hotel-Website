import React from 'react';
import { motion } from 'motion/react';
import { useBooking } from '@/src/context/BookingContext';
import { useSmoothScroll } from '@/src/providers/SmoothScrollProvider';
import { HeroBackground } from './HeroBackground';
import { QuickBookingBar } from './QuickBookingBar';
import { HeroStats } from './HeroStats';
import { ScrollIndicator } from './ScrollIndicator';
import { Container } from '@/src/components/ui/Container';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import {
  Sparkles,
  Calendar,
  MessageSquare,
  Star,
  CheckCircle2,
  Waves,
  Wifi,
  Car,
  Heart,
  ArrowRight,
} from 'lucide-react';

const TRUST_TAGS = [
  { icon: Star, text: '4.9 Google Rating' },
  { icon: Heart, text: '2000+ Happy Guests' },
  { icon: Waves, text: 'Sea Facing Suites' },
  { icon: Wifi, text: 'Free Wi-Fi' },
  { icon: Car, text: 'Free Valet Parking' },
  { icon: CheckCircle2, text: 'Family Friendly' },
];

export function Hero() {
  const { openBookingModal } = useBooking();
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="home"
      aria-label="Welcome to Digha Luxury Beach Resort"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 overflow-hidden bg-[#020a14]"
    >
      {/* Background Media & Ambient Overlay Effects */}
      <HeroBackground />

      {/* Main Hero Foreground Content */}
      <Container size="xl" className="relative z-10 my-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Top Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge
              variant="gold"
              className="px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider shadow-xl shadow-amber-500/10 backdrop-blur-md mb-6 inline-flex items-center gap-2 border border-amber-500/40"
            >
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-amber-200 font-serif">4.9 Rated</span>
              <span className="text-amber-400/60">•</span>
              <span className="text-amber-100 font-sans tracking-widest uppercase text-[11px]">
                Luxury Beach Resort
              </span>
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-stone-100 font-extralight leading-[1.1] tracking-tight mb-6"
          >
            Experience Luxury <br className="hidden sm:inline" />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#f0e2b6] via-[#dfb76c] to-[#c5a059]">
              Where the Sea Meets Serenity
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-stone-300 font-sans font-light leading-relaxed max-w-2xl mb-8 sm:mb-10 text-pretty"
          >
            An oceanfront sanctuary in Digha featuring sea-facing balconies, fine coastal dining, and bespoke 5-star hospitality tailored for discerning travelers.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-12"
          >
            {/* Primary CTA - Explore Rooms */}
            <Button
              variant="gold"
              size="lg"
              onClick={() => scrollTo('#rooms')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto min-w-[210px] shadow-xl py-4 text-sm tracking-widest uppercase font-semibold"
            >
              Explore Accommodations
            </Button>

            {/* Secondary CTA - Book on WhatsApp */}
            <Button
              variant="glass"
              size="lg"
              onClick={() => openBookingModal()}
              icon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
              iconPosition="left"
              className="w-full sm:w-auto min-w-[210px] py-4 text-sm tracking-widest uppercase text-stone-200 border-white/20 hover:border-emerald-400/50"
            >
              Book on WhatsApp
            </Button>
          </motion.div>

          {/* Refined Editorial Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-stone-300 font-light tracking-wide py-3 px-6 rounded-full bg-stone-950/40 border border-white/10 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
              <span>4.9 Rated Coastal Resort</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-[#c5a059]" />
              <span>Private Oceanfront Balconies</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
              <span>Direct WhatsApp Reservations</span>
            </div>
          </motion.div>
        </div>

        {/* Quick Booking Search Bar */}
        <QuickBookingBar />

        {/* Hero Statistics Counter Block */}
        <HeroStats />
      </Container>

      {/* Bottom Scroll Down Indicator */}
      <ScrollIndicator />
    </section>
  );
}
