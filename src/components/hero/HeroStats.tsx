import React from 'react';
import { motion } from 'motion/react';
import { Users, Star, BedDouble, Headphones } from 'lucide-react';

const STATS = [
  {
    icon: Users,
    value: '2,500+',
    label: 'Happy Guests',
    subtext: '5-Star Verified Experience',
  },
  {
    icon: Star,
    value: '4.9★',
    label: 'Google Rating',
    subtext: 'Top Rated Digha Resort',
  },
  {
    icon: BedDouble,
    value: '50+',
    label: 'Luxury Suites',
    subtext: '100% Sea-Facing Views',
  },
  {
    icon: Headphones,
    value: '24×7',
    label: 'Guest Concierge',
    subtext: 'WhatsApp Instant Support',
  },
];

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 px-2"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 bg-[#030d1a]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-5">
        {STATS.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center p-2 sm:p-3 group hover:bg-white/[0.03] rounded-xl transition-colors"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-stone-200 mt-0.5">
                {stat.label}
              </span>
              <span className="text-[10px] text-stone-400 font-sans mt-0.5 hidden sm:block">
                {stat.subtext}
              </span>

              {/* Vertical divider on desktop */}
              {idx < STATS.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/10" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
