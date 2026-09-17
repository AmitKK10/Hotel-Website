import React from 'react';
import { motion } from 'motion/react';
import { DINING_HIGHLIGHTS } from '@/src/data/restaurant';
import { Badge } from '@/src/components/ui/Badge';
import { Waves, Fish, Flame, Sparkles } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Fish,
  Flame,
  Sparkles,
};

export function DiningHighlights() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase text-amber-400 tracking-widest">
          Beyond The Menu
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-100">
          Unforgettable Culinary Experiences
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {DINING_HIGHLIGHTS.map((hl) => {
          const IconComp = ICON_MAP[hl.iconName] || Sparkles;

          return (
            <motion.div
              key={hl.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] bg-stone-900 border border-white/10 hover:border-amber-400/40 shadow-xl transition-all duration-300"
            >
              {/* Image Background */}
              <img
                src={hl.image}
                alt={hl.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              {/* Badge Top Left */}
              {hl.badge && (
                <div className="absolute top-3.5 left-3.5 z-10">
                  <Badge variant="gold" className="text-[10px] uppercase font-mono py-0.5 px-2.5">
                    {hl.badge}
                  </Badge>
                </div>
              )}

              {/* Icon Top Right */}
              <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-stone-950/80 backdrop-blur-md border border-white/20 text-amber-400 flex items-center justify-center">
                <IconComp className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-1.5">
                <h4 className="text-base sm:text-lg font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                  {hl.title}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                  {hl.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
