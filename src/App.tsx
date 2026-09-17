/**
 * Digha Beach Resort - Application Root Shell
 * Global Architecture & Engineering Foundation
 */

import React, { useState } from 'react';
import { Providers } from './providers/Providers';
import { JsonLd } from './components/seo/JsonLd';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/hero/Hero';
import { FeaturedRooms } from './components/rooms/FeaturedRooms';
import { AmenitiesSection } from './components/amenities/AmenitiesSection';
import { GallerySection } from './components/gallery/GallerySection';
import { RestaurantSection } from './components/restaurant/RestaurantSection';
import { OffersSection } from './components/offers/OffersSection';
import { NearbyAttractions } from './components/attractions/NearbyAttractions';
import { GuestReviewsSection } from './components/reviews/GuestReviewsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { BackToTop } from './components/footer/BackToTop';
import { FloatingQuickActions } from './components/navigation/FloatingQuickActions';
import { BookingModal } from './components/booking/BookingModal';
import { FloatingWhatsAppButton } from './components/booking/FloatingWhatsAppButton';
import { PWAInstallPrompt } from './components/pwa/PWAInstallPrompt';
import { DataImportModal } from './components/data-import/DataImportModal';
import { RecordsDrawer } from './components/data-import/RecordsDrawer';
import { Preloader } from './components/ui/Preloader';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { CustomCursor } from './components/ui/CustomCursor';
import { BackgroundEffects } from './components/ui/BackgroundEffects';

function ResortApp() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <ScrollProgressBar />
      <CustomCursor />
      <BackgroundEffects />

      <div
        className={`min-h-screen bg-[#020a14] text-stone-100 flex flex-col justify-between selection:bg-amber-500/30 transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Navbar Header Component */}
        <Navbar />

        {/* Hero, Accommodations, Amenities, Gallery & Restaurant Sections */}
        <main className="flex-1">
          <Hero />
          <FeaturedRooms />
          <AmenitiesSection />
          <GallerySection />
          <RestaurantSection />
          <OffersSection />
          <NearbyAttractions />
          <GuestReviewsSection />
          <ContactSection />
        </main>

        {/* Footer & Back To Top */}
        <Footer />
        <BackToTop />

        {/* Floating Quick Action Dock & Booking Modal */}
        <FloatingQuickActions />
        <BookingModal />
        <DataImportModal />
        <RecordsDrawer />
        <FloatingWhatsAppButton />
        <PWAInstallPrompt />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Providers>
      <JsonLd type="Hotel" />
      <ResortApp />
    </Providers>
  );
}
