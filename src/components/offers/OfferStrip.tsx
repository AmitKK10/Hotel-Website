import React from 'react';
import { motion } from 'motion/react';
import { PROMO_STRIP_ITEMS } from '@/src/data/offers';
import { Sparkles, ShieldCheck, Gift, Clock, Zap } from 'lucide-react';

export function OfferStrip() {
  return (
    <div className="w-full bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border-y border-amber-500/30 py-3.5 px-4 overflow-hidden shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
        {/* Render twice for continuous loop feel */}
        {[...PROMO_STRIP_ITEMS, ...PROMO_STRIP_ITEMS].map((promo, idx) => (
          <div key={`${promo.id}-${idx}`} className="flex items-center gap-3 shrink-0">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-stone-950 text-xs font-bold shadow-md">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </span>
            <span className="text-xs sm:text-sm font-semibold font-serif text-stone-100">
              {promo.text}
            </span>
            {promo.highlight && (
              <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                {promo.highlight}
              </span>
            )}
            <span className="text-amber-500/50 font-bold ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
