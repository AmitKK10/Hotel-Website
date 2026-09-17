import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ONE_DAY_ITINERARY, TWO_DAY_ITINERARY } from '@/src/data/attractions';
import { Badge } from '@/src/components/ui/Badge';
import { Clock, MapPin, Calendar, Compass, Sun, Moon, Utensils, Camera, Waves } from 'lucide-react';

export function ItineraryTimeline() {
  const [activeTab, setActiveTab] = useState<'1-day' | '2-day'>('1-day');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const activeItinerary =
    activeTab === '1-day'
      ? ONE_DAY_ITINERARY
      : TWO_DAY_ITINERARY[selectedDayIndex] || TWO_DAY_ITINERARY[0];

  return (
    <div className="space-y-8 rounded-3xl bg-stone-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Curated Travel Guides
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Recommended Coastal Itineraries
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Thoughtfully planned morning-to-night routes for effortless sightseeing.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-2 bg-stone-900 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => {
              setActiveTab('1-day');
              setSelectedDayIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === '1-day'
                ? 'bg-amber-400 text-stone-950 shadow-md'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            1-Day Express Route
          </button>

          <button
            onClick={() => {
              setActiveTab('2-day');
              setSelectedDayIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === '2-day'
                ? 'bg-amber-400 text-stone-950 shadow-md'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            2-Day Complete Escape
          </button>
        </div>
      </div>

      {/* Day 1 / Day 2 Selector if 2-day option selected */}
      {activeTab === '2-day' && (
        <div className="flex items-center gap-3 pt-2">
          {TWO_DAY_ITINERARY.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                selectedDayIndex === idx
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400 font-semibold'
                  : 'bg-stone-900 text-stone-400 border-white/10 hover:border-amber-400/30'
              }`}
            >
              ★ {day.dayTitle.split(':')[0]}
            </button>
          ))}
        </div>
      )}

      {/* Itinerary Title Banner */}
      <div className="space-y-1">
        <h4 className="text-lg sm:text-xl font-serif font-semibold text-amber-300">
          {activeItinerary.dayTitle}
        </h4>
        <p className="text-xs text-stone-300 font-mono">
          {activeItinerary.subtitle}
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-8 my-6">
        <AnimatePresence mode="popLayout">
          {activeItinerary.steps.map((step, idx) => (
            <motion.div
              key={step.title + idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Timeline Bullet Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-4 border-stone-950 shadow-md group-hover:scale-125 transition-transform" />

              <div className="bg-stone-900/60 border border-white/10 hover:border-amber-400/40 p-4 sm:p-5 rounded-2xl space-y-2 transition-all shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                    <Clock className="w-3.5 h-3.5" /> {step.timeSlot}
                  </span>

                  <span className="text-xs font-mono text-stone-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {step.location}
                  </span>
                </div>

                <h5 className="text-base sm:text-lg font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h5>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
