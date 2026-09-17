import React from 'react';
import { motion } from 'motion/react';
import { MenuCategory } from '@/src/types/restaurant';
import { MENU_CATEGORIES } from '@/src/data/restaurant';
import { Sparkles, Fish, Flame, Coffee, IceCream, Wine, Utensils } from 'lucide-react';

interface MenuFilterProps {
  activeCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  countMap: Record<MenuCategory, number>;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  all: Sparkles,
  seafood: Fish,
  bengali: Flame,
  indian: Utensils,
  chinese: Utensils,
  breakfast: Coffee,
  desserts: IceCream,
  beverages: Wine,
};

export function MenuFilter({ activeCategory, onSelectCategory, countMap }: MenuFilterProps) {
  return (
    <div className="flex items-center justify-center w-full my-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-4 no-scrollbar max-w-full sm:flex-wrap sm:justify-center">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = countMap[cat.id] || 0;
          const IconComponent = CATEGORY_ICONS[cat.id] || Sparkles;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer outline-none ${
                isActive
                  ? 'text-stone-900 font-semibold shadow-lg shadow-amber-500/25'
                  : 'text-stone-300 hover:text-stone-100 bg-stone-900/70 border border-white/10 hover:border-amber-400/30'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMenuFilterPill"
                  className="absolute inset-0 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-1.5">
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-stone-900' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
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
