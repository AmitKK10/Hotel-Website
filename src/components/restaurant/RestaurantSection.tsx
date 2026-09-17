import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FEATURED_DISHES, CHEF_DATA } from '@/src/data/restaurant';
import { MenuCategory, Dish } from '@/src/types/restaurant';
import { ChefProfile } from './ChefProfile';
import { MenuFilter } from './MenuFilter';
import { DishCard } from './DishCard';
import { DiningHighlights } from './DiningHighlights';
import { ReservationCTA } from './ReservationCTA';
import { Container } from '@/src/components/ui/Container';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { FadeIn } from '@/src/components/motion/MotionWrapper';
import { Utensils } from 'lucide-react';

export function RestaurantSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');

  // Compute category item counts
  const countMap = useMemo(() => {
    const counts: Record<MenuCategory, number> = {
      all: FEATURED_DISHES.length,
      seafood: 0,
      bengali: 0,
      indian: 0,
      chinese: 0,
      breakfast: 0,
      desserts: 0,
      beverages: 0,
    };

    FEATURED_DISHES.forEach((dish) => {
      if (dish.category !== 'all') {
        counts[dish.category] = (counts[dish.category] || 0) + 1;
      }
    });

    return counts;
  }, []);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    if (activeCategory === 'all') return FEATURED_DISHES;
    return FEATURED_DISHES.filter((dish) => dish.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="dining"
      aria-label="Signature Dining & Culinary Experiences"
      className="relative py-20 sm:py-28 md:py-32 bg-gradient-to-b from-[#020a14] via-[#051324] to-[#020a14] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16 sm:space-y-24">
        {/* Section Header */}
        <SectionHeader
          badge="Signature Dining"
          title="A Culinary Journey By The Sea"
          subtitle="Fresh seafood, authentic Bengali flavours, Indian classics, international favourites, handcrafted desserts, and unforgettable dining experiences overlooking the Bay of Bengal."
          align="center"
          className="max-w-2xl mx-auto"
        />

        {/* Executive Chef Profile Card */}
        <FadeIn delay={0.2}>
          <ChefProfile chef={CHEF_DATA} />
        </FadeIn>

        {/* Menu Section */}
        <div className="space-y-8 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-widest">
              Gourmet Selection
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-100">
              Handcrafted Menu Highlights
            </h3>
          </div>

          {/* Interactive Menu Filter */}
          <FadeIn delay={0.3}>
            <MenuFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              countMap={countMap}
            />
          </FadeIn>

          {/* Dish Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish) => (
                <div key={dish.id}>
                  <DishCard dish={dish} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Dining Highlights Experience Grid */}
        <FadeIn delay={0.4}>
          <DiningHighlights />
        </FadeIn>

        {/* Reservation CTA */}
        <FadeIn delay={0.5}>
          <ReservationCTA />
        </FadeIn>
      </Container>
    </section>
  );
}
