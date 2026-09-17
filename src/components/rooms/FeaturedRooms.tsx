import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ROOMS_DATA } from '@/src/data/rooms';
import { Room, RoomCategory } from '@/src/types/room';
import { RoomFilter } from './RoomFilter';
import { RoomCard } from './RoomCard';
import { RoomDetailsModal } from './RoomDetailsModal';
import { Container } from '@/src/components/ui/Container';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { FadeIn, StaggerContainer } from '@/src/components/motion/MotionWrapper';
import { Sparkles, Waves, BedDouble, ShieldCheck } from 'lucide-react';

export function FeaturedRooms() {
  const [activeCategory, setActiveCategory] = useState<RoomCategory>('all');
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Compute category counts for filter badges
  const countMap = useMemo(() => {
    const counts: Record<RoomCategory, number> = {
      all: ROOMS_DATA.length,
      'sea-view': 0,
      family: 0,
      luxury: 0,
      suite: 0,
      popular: 0,
      'best-value': 0,
    };

    ROOMS_DATA.forEach((room) => {
      room.categoryTags.forEach((tag) => {
        if (tag !== 'all') {
          counts[tag] = (counts[tag] || 0) + 1;
        }
      });
    });

    return counts;
  }, []);

  // Filter rooms based on active category
  const filteredRooms = useMemo(() => {
    if (activeCategory === 'all') return ROOMS_DATA;
    return ROOMS_DATA.filter((room) => room.categoryTags.includes(activeCategory));
  }, [activeCategory]);

  const handleOpenDetails = (room: Room) => {
    setSelectedRoomForModal(room);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedRoomForModal(null);
  };

  return (
    <section
      id="rooms"
      aria-label="Luxury Accommodations at Digha Beach Resort"
      className="relative py-20 sm:py-28 md:py-32 bg-gradient-to-b from-[#020a14] via-[#030e1a] to-[#020a14] overflow-hidden"
    >
      {/* Background Subtle Ambient Lighting Glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Luxury Accommodations"
          title="Choose Your Perfect Stay"
          subtitle="Every room is thoughtfully designed with premium interiors, modern comforts, breathtaking views, and unforgettable hospitality."
          align="center"
          className="max-w-2xl mx-auto"
        />

        {/* Room Category Filters */}
        <FadeIn delay={0.2}>
          <RoomFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            countMap={countMap}
          />
        </FadeIn>

        {/* Filtered Rooms Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <RoomCard
                  room={room}
                  onViewDetails={handleOpenDetails}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Rooms Fallback */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-white/10 mt-8">
            <BedDouble className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-xl font-serif text-stone-100 font-semibold">No suites matched this filter</h3>
            <p className="text-sm text-stone-400 mt-1">Try selecting another room category above.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              View All Rooms
            </button>
          </div>
        )}

        {/* Bottom Guarantee Banner */}
        <FadeIn delay={0.4} className="mt-16 sm:mt-20">
          <div className="relative bg-[#030e1a]/80 border border-amber-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-semibold text-stone-100">
                  Best Rate Guarantee & Instant WhatsApp Confirmation
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 font-sans mt-0.5">
                  Book directly with our concierge team on WhatsApp for zero booking fees, early check-in options, and complimentary breakfast upgrades.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full">
                ✓ 100% Verified Availability
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* Room Details Modal */}
      <RoomDetailsModal
        room={selectedRoomForModal}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetails}
      />
    </section>
  );
}
