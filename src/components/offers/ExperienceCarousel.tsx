import React from 'react';
import { motion } from 'motion/react';
import { RESORT_EXPERIENCES } from '@/src/data/offers';
import { Badge } from '@/src/components/ui/Badge';
import { Compass, Sparkles, Clock, ChevronRight } from 'lucide-react';

export function ExperienceCarousel() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Handcrafted Experiences
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-100">
            Resort Activities & Daily Highlights
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md">
          Elevate your beach holiday with curated daily experiences hosted by our resort concierge and local experts.
        </p>
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {RESORT_EXPERIENCES.map((exp) => (
          <motion.div
            key={exp.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group relative flex-none w-[280px] sm:w-[320px] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 border border-white/10 hover:border-amber-400/40 shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
              <img
                src={exp.image}
                alt={exp.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

              <span className="absolute top-3 left-3 text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 backdrop-blur-md">
                {exp.tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h4 className="text-base sm:text-lg font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                {exp.title}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
