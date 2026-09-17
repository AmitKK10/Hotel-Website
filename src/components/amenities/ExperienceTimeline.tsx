import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMELINE_EXPERIENCES } from '@/src/data/amenities';
import { ExperienceTimelineItem } from '@/src/types/amenity';
import { Coffee, Sun, Sunset, Moon, Clock, Sparkles } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Coffee,
  Sun,
  Sunset,
  Moon,
};

export function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentExperience: ExperienceTimelineItem = TIMELINE_EXPERIENCES[activeIndex];
  const IconComponent = ICON_MAP[currentExperience.iconName] || Sparkles;

  return (
    <div className="w-full bg-[#030e1a]/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase mb-1">
            <Clock className="w-3.5 h-3.5" /> A Day In Resort Paradise
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-stone-100 font-semibold">
            Resort Experience Timeline
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md">
          Immerse yourself in a curated daily rhythm from peaceful sunrise oceanfront breezes to romantic fireside evenings.
        </p>
      </div>

      {/* Timeline Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TIMELINE_EXPERIENCES.map((item, idx) => {
          const isActive = idx === activeIndex;
          const ItemIcon = ICON_MAP[item.iconName] || Sparkles;

          return (
            <button
              key={item.timeOfDay}
              onClick={() => setActiveIndex(idx)}
              className={`relative p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer outline-none ${
                isActive
                  ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10'
                  : 'bg-stone-900/50 border-white/10 hover:border-white/20 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                    isActive ? 'text-amber-300' : 'text-stone-400'
                  }`}
                >
                  {item.timeOfDay}
                </span>
                <ItemIcon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
              </div>
              <span className={`text-xs sm:text-sm font-semibold font-serif block truncate ${isActive ? 'text-stone-100' : 'text-stone-300'}`}>
                {item.title}
              </span>
              <span className="text-[10px] text-stone-400 font-mono block mt-0.5">
                {item.timeSlot}
              </span>

              {isActive && (
                <motion.div
                  layoutId="timelineActiveIndicator"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Experience Detailed Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExperience.timeOfDay}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-stone-900/60 p-4 sm:p-6 rounded-2xl border border-white/10"
        >
          {/* Image */}
          <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
            <img
              src={currentExperience.image}
              alt={currentExperience.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 backdrop-blur-md">
              {currentExperience.tag}
            </span>
          </div>

          {/* Details */}
          <div className="lg:col-span-7 space-y-4 lg:pl-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                {currentExperience.timeSlot}
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-serif text-stone-100 font-semibold">
              {currentExperience.title}
            </h4>

            <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
              {currentExperience.description}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Included for all resort guests
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Concierge curated
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
