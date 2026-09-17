import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AMENITIES_DATA } from '@/src/data/amenities';
import { AmenityCategory } from '@/src/types/amenity';
import { AmenityCard } from './AmenityCard';
import { ExperienceTimeline } from './ExperienceTimeline';
import { FeaturedExperience } from './FeaturedExperience';
import { Container } from '@/src/components/ui/Container';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { FadeIn, StaggerContainer } from '@/src/components/motion/MotionWrapper';
import { Button } from '@/src/components/ui/Button';
import { useBooking } from '@/src/context/BookingContext';
import {
  Sparkles,
  Waves,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Filter,
} from 'lucide-react';

const CATEGORY_TABS: { id: 'all' | AmenityCategory; label: string }[] = [
  { id: 'all', label: 'All Facilities' },
  { id: 'essential', label: 'Essential Comforts' },
  { id: 'wellness', label: 'Recreation & Pool' },
  { id: 'dining', label: 'Dining & Kitchen' },
  { id: 'service', label: '24/7 Hospitality' },
  { id: 'leisure', label: 'Leisure & Events' },
];

export function AmenitiesSection() {
  const { openBookingModal } = useBooking();
  const [activeCategory, setActiveCategory] = useState<'all' | AmenityCategory>('all');
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Filter amenities
  const filteredAmenities = AMENITIES_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Limit count if not expanded
  const displayedAmenities = showAllAmenities ? filteredAmenities : filteredAmenities.slice(0, 9);

  return (
    <section
      id="amenities"
      aria-label="Premium Facilities & Resort Experiences"
      className="relative py-20 sm:py-28 md:py-32 bg-gradient-to-b from-[#020a14] via-[#030e1a] to-[#020a14] overflow-hidden"
    >
      {/* Background Ocean Glow Shapes */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16 sm:space-y-24">
        {/* Section Header */}
        <SectionHeader
          badge="Premium Facilities"
          title="Everything You Need For A Perfect Stay"
          subtitle="Experience exceptional hospitality with thoughtfully designed facilities, premium services, and unforgettable experiences for every guest."
          align="center"
          className="max-w-2xl mx-auto"
        />

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Editorial & Highlights */}
          <FadeIn direction="right" className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-[#030e1a]/80 backdrop-blur-xl border border-[#c5a059]/25 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#f0e2b6] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" /> Coastal Luxury Redefined
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-100 font-semibold leading-snug">
                  Uncompromised Comfort By The Sea
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed font-light">
                  At Digha Beach Resort, we combine modern architectural elegance with round-the-clock white-glove hospitality. Whether relaxing by our oceanfront pool or hosting grand celebrations in our banquet halls, every detail is engineered for your comfort.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-stone-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct private access trail to Digha sea beach</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24×7 white-glove room service and concierge</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Temperature-controlled infinity-style pool</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% generator power backup for continuous AC</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => openBookingModal()}
                  icon={<Calendar className="w-4 h-4" />}
                  className="w-full text-xs font-semibold py-3 shadow-lg"
                >
                  Reserve Your Beach Stay Now
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Interactive Amenities Category Tabs & Grid */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer outline-none ${
                      isActive
                        ? 'bg-[#c5a059] text-stone-950 font-semibold shadow-md shadow-[#c5a059]/20'
                        : 'bg-stone-900/60 text-stone-300 hover:text-stone-100 border border-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Amenities Cards Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {displayedAmenities.map((amenity) => (
                  <motion.div
                    key={amenity.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AmenityCard amenity={amenity} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Expand / Collapse Button */}
            {filteredAmenities.length > 9 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="px-6 py-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-white/10 hover:border-amber-400/40 text-xs font-semibold transition-all cursor-pointer"
                >
                  {showAllAmenities ? 'Show Fewer Facilities' : `View All ${filteredAmenities.length} Facilities`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Resort Experience Daily Timeline */}
        <FadeIn delay={0.2}>
          <ExperienceTimeline />
        </FadeIn>

        {/* Featured Experience Showcase Banner */}
        <FadeIn delay={0.3}>
          <FeaturedExperience />
        </FadeIn>
      </Container>
    </section>
  );
}
