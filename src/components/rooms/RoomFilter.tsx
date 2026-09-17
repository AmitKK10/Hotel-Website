import React from 'react';
import { motion } from 'motion/react';
import { RoomCategory } from '@/src/types/room';
import { Sparkles, Waves, Users, Crown, BedDouble, Star, Tag } from 'lucide-react';

interface FilterOption {
  id: RoomCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All Rooms', icon: Sparkles },
  { id: 'sea-view', label: 'Sea View', icon: Waves },
  { id: 'popular', label: 'Most Popular', icon: Star },
  { id: 'best-value', label: 'Best Value', icon: Tag },
  { id: 'luxury', label: 'Luxury', icon: Crown },
  { id: 'suite', label: 'Suites', icon: BedDouble },
  { id: 'family', label: 'Family', icon: Users },
];

interface RoomFilterProps {
  activeCategory: RoomCategory;
  onSelectCategory: (category: RoomCategory) => void;
  countMap: Record<RoomCategory, number>;
}

export function RoomFilter({ activeCategory, onSelectCategory, countMap }: RoomFilterProps) {
  return (
    <div className="flex items-center justify-center w-full my-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-4 no-scrollbar max-w-full sm:flex-wrap sm:justify-center">
        {FILTER_OPTIONS.map((filter) => {
          const isActive = activeCategory === filter.id;
          const IconComponent = filter.icon;
          const count = countMap[filter.id] || 0;

          return (
            <button
              key={filter.id}
              onClick={() => onSelectCategory(filter.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer select-none outline-none ${
                isActive
                  ? 'text-stone-900 font-semibold shadow-lg shadow-amber-500/20'
                  : 'text-stone-300 hover:text-stone-100 bg-stone-900/60 border border-white/10 hover:border-amber-500/30'
              }`}
            >
              {/* Active Background Pill Animation */}
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Content Overlay */}
              <span className="relative z-10 flex items-center gap-1.5">
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-stone-900' : 'text-amber-400'}`} />
                <span>{filter.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? 'bg-stone-950/20 text-stone-950' : 'bg-white/10 text-amber-300/80'
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
