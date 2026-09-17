import React from 'react';
import { motion } from 'motion/react';
import { Dish } from '@/src/types/restaurant';
import { Badge } from '@/src/components/ui/Badge';
import { Flame, Star, Sparkles } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onOrderClick?: (dish: Dish) => void;
}

export function DishCard({ dish, onOrderClick }: DishCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-stone-900/90 to-stone-950 border border-white/10 hover:border-amber-400/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between transition-all duration-300"
    >
      {/* Dish Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
        <img
          src={dish.image}
          alt={dish.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Gradient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

        {/* Badges on Image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {/* Veg / Non-Veg Indicator */}
          <div
            className={`w-6 h-6 rounded-md bg-stone-950/80 backdrop-blur-md border flex items-center justify-center p-1 ${
              dish.isVeg ? 'border-emerald-500' : 'border-rose-500'
            }`}
            title={dish.isVeg ? 'Vegetarian Dish' : 'Non-Vegetarian Dish'}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                dish.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
          </div>

          {/* Chef Special Badge */}
          {dish.isChefSpecial && (
            <Badge variant="gold" className="text-[10px] uppercase font-mono py-0.5 px-2 shadow-md">
              <Sparkles className="w-3 h-3 mr-1" /> Chef Special
            </Badge>
          )}
        </div>

        {/* Rating overlay */}
        {dish.rating && (
          <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 text-xs text-amber-300 font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{dish.rating}</span>
          </div>
        )}
      </div>

      {/* Dish Information */}
      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base sm:text-lg font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1">
              {dish.name}
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-2">
            {dish.description}
          </p>
        </div>

        {/* Footer: Price & Spice Indicator */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
          {/* Spice Indicator */}
          <div className="flex items-center gap-1">
            {dish.spiceLevel && dish.spiceLevel > 0 ? (
              <div className="flex items-center gap-0.5" title={`Spice Level: ${dish.spiceLevel}/3`}>
                {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                  <Flame key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                ))}
              </div>
            ) : (
              <span className="text-[11px] font-mono text-stone-300">Mild Flavor</span>
            )}
          </div>

          {/* Price tag */}
          <div className="text-right">
            <span className="text-xs font-mono text-stone-300 block text-[10px]">Per Serving</span>
            <span className="text-lg font-serif font-bold text-amber-300">₹{dish.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
