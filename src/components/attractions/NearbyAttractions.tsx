import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ATTRACTIONS_DATA, ATTRACTION_CATEGORIES } from '@/src/data/attractions';
import { AttractionCategory, AttractionItem } from '@/src/types/attractions';
import { AttractionCard } from './AttractionCard';
import { MapSection } from './MapSection';
import { ItineraryTimeline } from './ItineraryTimeline';
import { LocalServices } from './LocalServices';
import { WeatherCard } from './WeatherCard';
import { Container } from '@/src/components/ui/Container';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { FadeIn } from '@/src/components/motion/MotionWrapper';
import { Compass, MapPin, Waves } from 'lucide-react';

export function NearbyAttractions() {
  const [activeCategory, setActiveCategory] = useState<AttractionCategory>('all');
  const [mapSelectedAttraction, setMapSelectedAttraction] = useState<AttractionItem | null>(null);

  // Filtered attractions
  const filteredAttractions = useMemo(() => {
    if (activeCategory === 'all') return ATTRACTIONS_DATA;
    return ATTRACTIONS_DATA.filter((attr) => attr.category === activeCategory);
  }, [activeCategory]);

  const handleSelectForMap = (attr: AttractionItem) => {
    setMapSelectedAttraction(attr);
    // Smooth scroll down to map section if user clicked "Show on Map"
    const mapEl = document.getElementById('resort-map-view');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="nearby"
      aria-label="Nearby Attractions & Local Travel Guide"
      className="relative py-20 sm:py-28 md:py-32 bg-gradient-to-b from-[#020a14] via-[#041224] to-[#020a14] overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16 sm:space-y-24">
        {/* Section Header */}
        <SectionHeader
          badge="Explore Digha"
          title="Discover The Best Around The Resort"
          subtitle="From pristine beaches and marine attractions to temples, shopping, seafood markets, and unforgettable sunsets—everything is just minutes away."
          align="center"
          className="max-w-2xl mx-auto"
        />

        {/* Live Weather Widget */}
        <FadeIn delay={0.15}>
          <WeatherCard />
        </FadeIn>

        {/* Category Filters & Attraction Grid */}
        <div id="destination-directory" className="space-y-8 pt-2 scroll-mt-28">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Destination Directory
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-100">
                Top Places to Visit in Digha
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full">
              {ATTRACTION_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer outline-none ${
                      isActive
                        ? 'bg-amber-400 text-stone-950 font-semibold shadow-md shadow-amber-500/20'
                        : 'bg-stone-900/70 text-stone-300 hover:text-stone-100 border border-white/10 hover:border-amber-400/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attraction Cards Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAttractions.map((attr) => (
                <div key={attr.id}>
                  <AttractionCard
                    attraction={attr}
                    onSelectMap={handleSelectForMap}
                    isSelectedForMap={mapSelectedAttraction?.id === attr.id}
                  />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Interactive Map Section */}
        <div id="resort-map-view">
          <FadeIn delay={0.25}>
            <MapSection
              selectedAttraction={mapSelectedAttraction}
              onSelectAttraction={setMapSelectedAttraction}
            />
          </FadeIn>
        </div>

        {/* Editorial 1-Day & 2-Day Itinerary Timelines */}
        <FadeIn delay={0.35}>
          <ItineraryTimeline />
        </FadeIn>

        {/* Local Services & Transport Transit Hubs */}
        <FadeIn delay={0.4}>
          <LocalServices />
        </FadeIn>
      </Container>

      {/* Wave Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none text-[#020a14]">
        <svg
          className="relative block w-full h-12 sm:h-20"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.3,202,112.55,242.11,107.6,281.82,88.75,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
