import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { GALLERY_ITEMS } from '@/src/data/gallery';
import { GalleryItem, GalleryCategory } from '@/src/types/gallery';
import { GalleryFilter } from './GalleryFilter';
import { GalleryGrid } from './GalleryGrid';
import { GalleryLightbox } from './GalleryLightbox';
import { FeaturedVideo } from './FeaturedVideo';
import { Container } from '@/src/components/ui/Container';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { FadeIn } from '@/src/components/motion/MotionWrapper';
import { Sparkles, Camera, Image, ShieldCheck } from 'lucide-react';

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Compute category item counts
  const countMap = useMemo(() => {
    const counts: Record<GalleryCategory, number> = {
      all: GALLERY_ITEMS.length,
      'sea-view': 0,
      rooms: 0,
      'swimming-pool': 0,
      restaurant: 0,
      beach: 0,
      sunset: 0,
      family: 0,
      events: 0,
      drone: 0,
    };

    GALLERY_ITEMS.forEach((item) => {
      if (item.category !== 'all') {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });

    return counts;
  }, []);

  // Filter gallery items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleSelectItem = (item: GalleryItem) => {
    setSelectedLightboxItem(item);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedLightboxItem(null);
  };

  const activeIndexInFilteredList = useMemo(() => {
    if (!selectedLightboxItem) return 0;
    const foundIdx = filteredItems.findIndex((i) => i.id === selectedLightboxItem.id);
    return foundIdx >= 0 ? foundIdx : 0;
  }, [filteredItems, selectedLightboxItem]);

  return (
    <section
      id="gallery"
      aria-label="Resort Gallery & Media Experience"
      className="relative py-20 sm:py-28 md:py-32 bg-gradient-to-b from-[#020a14] via-[#030e1a] to-[#020a14] overflow-hidden"
    >
      {/* Background Soft Glow Circles */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <SectionHeader
          badge="Explore The Resort"
          title="Moments You'll Never Forget"
          subtitle="Discover breathtaking views, elegant interiors, unforgettable sunsets, premium hospitality, and memories waiting to be created at Digha Beach Resort."
          align="center"
          className="max-w-2xl mx-auto"
        />

        {/* Featured Video Player */}
        <FadeIn delay={0.2}>
          <FeaturedVideo />
        </FadeIn>

        {/* Filter Bar */}
        <FadeIn delay={0.3}>
          <GalleryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            countMap={countMap}
          />
        </FadeIn>

        {/* Responsive Gallery Grid */}
        <FadeIn delay={0.4}>
          <GalleryGrid items={filteredItems} onSelectItem={handleSelectItem} />
        </FadeIn>
      </Container>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        initialIndex={activeIndexInFilteredList}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
      />
    </section>
  );
}
