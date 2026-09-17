import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PACKAGES_DATA, PACKAGE_CATEGORIES } from '@/src/data/offers';
import { PackageCategory } from '@/src/types/offers';
import { OfferStrip } from './OfferStrip';
import { FeaturedPackage } from './FeaturedPackage';
import { PackageCard } from './PackageCard';
import { ExperienceCarousel } from './ExperienceCarousel';
import { Container } from '@/src/components/ui/Container';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { FadeIn } from '@/src/components/motion/MotionWrapper';
import { Sparkles, Tag, Gift } from 'lucide-react';

export function OffersSection() {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('all');

  // Filter packages
  const filteredPackages = useMemo(() => {
    if (activeCategory === 'all') return PACKAGES_DATA;
    return PACKAGES_DATA.filter((pkg) => pkg.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="offers"
      aria-label="Exclusive Packages & Special Resort Offers"
      className="relative py-20 sm:py-28 md:py-32 bg-gradient-to-b from-[#020a14] via-[#041121] to-[#020a14] overflow-hidden"
    >
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Animated Offer Strip */}
      <div className="mb-12">
        <OfferStrip />
      </div>

      <Container size="xl" className="relative z-10 space-y-16 sm:space-y-24">
        {/* Section Header */}
        <SectionHeader
          badge="Exclusive Packages"
          title="Curated Experiences For Every Journey"
          subtitle="Whether you're planning a romantic escape, a family vacation, or a relaxing weekend by the sea, discover thoughtfully designed packages that create unforgettable memories."
          align="center"
          className="max-w-2xl mx-auto"
        />

        {/* Hero Featured Package Card */}
        <FadeIn delay={0.2}>
          <FeaturedPackage />
        </FadeIn>

        {/* Package Filter Pills & Grid */}
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" /> All Resort Offers
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-100">
                Explore All Special Packages
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full">
              {PACKAGE_CATEGORIES.map((cat) => {
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

          {/* Packages Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id}>
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Resort Activity Carousel */}
        <FadeIn delay={0.3}>
          <ExperienceCarousel />
        </FadeIn>
      </Container>
    </section>
  );
}
