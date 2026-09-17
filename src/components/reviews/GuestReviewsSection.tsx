import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/src/components/ui/Container';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { FadeIn } from '@/src/components/motion/MotionWrapper';
import { useBooking } from '@/src/hooks/useBooking';
import {
  Star,
  Quote,
  ThumbsUp,
  Award,
  CheckCircle2,
  Calendar,
  User,
  Heart,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  roomType: string;
  rating: number;
  date: string;
  category: 'family' | 'couples' | 'dining' | 'solo';
  title: string;
  content: string;
  verified: boolean;
  likes: number;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Ananya & Sourav Roy',
    location: 'Kolkata, WB',
    roomType: 'Sea View Suite',
    rating: 5,
    date: 'July 2026',
    category: 'couples',
    title: 'Unrivalled Balcony Ocean View & Exquisite Seafood!',
    content:
      'Breathtaking balcony ocean view of New Digha beach! The fresh pomfret fry at Bayfront restaurant and round-the-clock concierge made our 5th anniversary truly unforgettable. Waking up to the sunrise over the Bay of Bengal was pure bliss.',
    verified: true,
    likes: 42,
  },
  {
    id: 'rev-2',
    author: 'Subhashish Banerjee',
    location: 'Bhubaneswar, Odisha',
    roomType: 'Executive Family Suite',
    rating: 5,
    date: 'June 2026',
    category: 'family',
    title: 'Super Clean, Kid-Friendly & Steps From the Beach',
    content:
      'Super clean rooms, kid-friendly setup, and barely 2 minutes walk to the beach seawall. The direct WhatsApp booking was so smooth with instant confirmation and zero hidden fees. Highly recommended for families!',
    verified: true,
    likes: 38,
  },
  {
    id: 'rev-3',
    author: 'Rahul & Priya Sharma',
    location: 'New Delhi',
    roomType: 'Deluxe Ocean Room',
    rating: 5,
    date: 'July 2026',
    category: 'couples',
    title: 'Best Beach Resort Experience in Digha',
    content:
      'Best resort in Digha without a doubt. Waking up to the soothing sound of waves and sipping morning chai on the sunlit private balcony was magical. Courteous staff and top-tier room service.',
    verified: true,
    likes: 29,
  },
  {
    id: 'rev-4',
    author: 'Debatri Mukherjee',
    location: 'Howrah, WB',
    roomType: 'Presidential Suite',
    rating: 5,
    date: 'May 2026',
    category: 'dining',
    title: 'Luxury Redefined & World-Class Bengali Dining',
    content:
      'Luxury redefined in Digha! The hospitality, private valet parking, and fresh lobster & hilsa dinner prepared by Chef Samarjit were unmatched. Worth every single rupee!',
    verified: true,
    likes: 51,
  },
  {
    id: 'rev-5',
    author: 'Vikram Sen & Family',
    location: 'Ranchi, Jharkhand',
    roomType: 'Sea View Suite',
    rating: 5,
    date: 'June 2026',
    category: 'family',
    title: 'Peaceful, Safe & Extremely Hospitable Staff',
    content:
      'Spacious rooms with modern interior aesthetic, crystal clear sea views, and super polite staff. The resort arranged our trip to Chandaneswar temple and Mohana fish market effortlessly.',
    verified: true,
    likes: 35,
  },
  {
    id: 'rev-6',
    author: 'Dr. Arindam Das',
    location: 'Durgapur, WB',
    roomType: 'Executive Suite',
    rating: 5,
    date: 'May 2026',
    category: 'solo',
    title: 'Cozy Atmosphere, Fast Wi-Fi & Serene Vibes',
    content:
      'Cozy, peaceful, high-speed Wi-Fi for remote work, and instant hot water showers. Great proximity to Science City and beach promenade. Will definitely be returning soon!',
    verified: true,
    likes: 24,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Reviews' },
  { id: 'couples', label: 'Couples & Romantic' },
  { id: 'family', label: 'Family Stays' },
  { id: 'dining', label: 'Food & Dining' },
  { id: 'solo', label: 'Work & Solo' },
] as const;

export function GuestReviewsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const { openBookingModal } = useBooking();

  const filteredReviews =
    activeCategory === 'all'
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.category === activeCategory);

  const handleLike = (id: string, initialLikes: number) => {
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || initialLikes) + 1,
    }));
  };

  return (
    <section
      id="reviews"
      aria-label="Guest Reviews & Verified Testimonials"
      className="relative py-20 sm:py-28 md:py-32 bg-gradient-to-b from-[#020a14] via-[#051325] to-[#020a14] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <SectionHeader
          badge="Guest Testimonials"
          title="Loved By Travelers & Families"
          subtitle="Discover real experiences from verified guests who made unforgettable coastal memories at Digha Beach Resort."
          align="center"
          className="max-w-2xl mx-auto"
        />

        {/* Overall Trust & Rating Bar */}
        <FadeIn delay={0.1}>
          <div className="bg-stone-900/60 border border-amber-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Score 1 */}
            <div className="flex items-center gap-4 text-center md:text-left justify-center md:justify-start pb-4 md:pb-0">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Star className="w-8 h-8 fill-amber-400" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-1">
                  <span className="text-3xl font-serif font-bold text-stone-100">4.9</span>
                  <span className="text-stone-400 font-mono text-sm">/ 5.0</span>
                </div>
                <p className="text-xs text-amber-300 font-mono">2,150+ Google Reviews</p>
              </div>
            </div>

            {/* Score 2 */}
            <div className="flex items-center gap-4 text-center md:text-left justify-center md:justify-start pt-4 md:pt-0 md:pl-6 pb-4 md:pb-0">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-lg font-serif font-semibold text-stone-100">98% Satisfied</span>
                <p className="text-xs text-stone-400">Guest Recommendation</p>
              </div>
            </div>

            {/* Score 3 */}
            <div className="flex items-center gap-4 text-center md:text-left justify-center md:justify-start pt-4 md:pt-0 md:pl-6 pb-4 md:pb-0">
              <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-lg font-serif font-semibold text-stone-100">100% Verified</span>
                <p className="text-xs text-stone-400">Direct Resort Stays</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center md:text-right pt-4 md:pt-0 md:pl-6">
              <Button
                variant="gold"
                size="md"
                onClick={openBookingModal}
                icon={<Sparkles className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Experience Luxury
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/25 font-semibold scale-105'
                  : 'bg-stone-900/60 border border-white/10 text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredReviews.map((rev, index) => (
              <FadeIn key={rev.id} delay={index * 0.08}>
                <div className="h-full bg-stone-900/50 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5 group-hover:text-amber-500/10 transition-colors pointer-events-none" />

                  {/* Top Rating & Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <Badge variant="pearl" className="text-[10px]">
                        {rev.roomType}
                      </Badge>
                    </div>

                    <h4 className="text-base font-serif font-semibold text-stone-100 mb-2 group-hover:text-amber-300 transition-colors line-clamp-2">
                      "{rev.title}"
                    </h4>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
                      {rev.content}
                    </p>
                  </div>

                  {/* Bottom Author Info */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 font-medium text-stone-200">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>{rev.author}</span>
                      </div>
                      <span className="text-[11px] text-stone-400 pl-5 block">
                        {rev.location} • {rev.date}
                      </span>
                    </div>

                    <button
                      onClick={() => handleLike(rev.id, rev.likes)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/40 text-stone-300 hover:text-amber-300 transition-colors cursor-pointer text-[11px]"
                      title="Helpful Review"
                    >
                      <ThumbsUp className="w-3 h-3 text-amber-400" />
                      <span>{likesMap[rev.id] || rev.likes}</span>
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
