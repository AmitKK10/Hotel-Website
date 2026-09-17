import React from 'react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { FadeIn } from '@/src/components/motion/MotionWrapper';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';
import { BusinessHours } from './BusinessHours';
import { MapEmbed } from './MapEmbed';
import { SocialLinks } from './SocialLinks';

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact Digha Beach Resort"
      className="relative py-20 sm:py-28 md:py-32 bg-stone-950 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <SectionHeader
          badge="Get In Touch"
          title="Plan Your Perfect Stay Today"
          subtitle="Our team is available to assist you with bookings, dining reservations, travel guidance, and special requests."
          align="center"
          className="max-w-2xl mx-auto"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Contact Cards & Business Hours */}
          <div className="lg:col-span-6 space-y-8">
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
                  Concierge & Guest Support
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Whether you are planning a romantic seaside escape, a corporate getaway, or a memorable family vacation, our hospitality team is here to fulfill every request.
                </p>
              </div>
            </FadeIn>

            {/* Grid of Contact Cards */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContactCard type="phone" />
                <ContactCard type="whatsapp" />
                <ContactCard type="email" />
                <ContactCard type="address" />
                <ContactCard type="hours" />
                <ContactCard type="emergency" />
              </div>
            </FadeIn>

            {/* Business Hours */}
            <FadeIn delay={0.3}>
              <BusinessHours />
            </FadeIn>
          </div>

          {/* Right Column: Contact Form, Map & Social Links */}
          <div className="lg:col-span-6 space-y-8">
            <FadeIn delay={0.2}>
              <ContactForm />
            </FadeIn>

            <FadeIn delay={0.3}>
              <MapEmbed />
            </FadeIn>

            <FadeIn delay={0.4}>
              <SocialLinks />
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
