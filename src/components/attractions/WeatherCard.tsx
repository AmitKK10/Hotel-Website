import React from 'react';
import { WEATHER_DATA } from '@/src/data/attractions';
import { Sun, CloudSun, Wind, Droplets, Sunset, Sunrise, Calendar, Thermometer } from 'lucide-react';

export function WeatherCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#031326] via-[#082038] to-[#031326] border border-sky-500/30 p-6 sm:p-8 shadow-xl relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Current Weather Focus */}
        <div className="md:col-span-5 space-y-3">
          <span className="text-xs font-mono uppercase text-sky-400 tracking-widest flex items-center gap-1.5">
            <CloudSun className="w-4 h-4 text-amber-400" /> Coastal Weather Today
          </span>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-stone-100">
              {WEATHER_DATA.tempCelsius}°C
            </span>
            <div>
              <span className="text-sm font-semibold text-amber-300 block">
                {WEATHER_DATA.condition}
              </span>
              <span className="text-xs font-mono text-stone-400">
                Range: {WEATHER_DATA.highLow}
              </span>
            </div>
          </div>

          <p className="text-xs font-mono text-stone-300 flex items-center gap-1.5 pt-1">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            Best Time to Visit: {WEATHER_DATA.bestVisitingMonths}
          </p>
        </div>

        {/* Weather Metrics Grid */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-stone-200">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center space-y-1">
            <span className="text-stone-400 text-[10px] uppercase flex items-center gap-1">
              <Droplets className="w-3 h-3 text-sky-400" /> Humidity
            </span>
            <span className="text-sm font-bold text-stone-100">{WEATHER_DATA.humidity}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center space-y-1">
            <span className="text-stone-400 text-[10px] uppercase flex items-center gap-1">
              <Wind className="w-3 h-3 text-sky-400" /> Wind Speed
            </span>
            <span className="text-sm font-bold text-stone-100">{WEATHER_DATA.windSpeed}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center space-y-1">
            <span className="text-stone-400 text-[10px] uppercase flex items-center gap-1">
              <Sunrise className="w-3 h-3 text-amber-400" /> Sunrise
            </span>
            <span className="text-sm font-bold text-stone-100">{WEATHER_DATA.sunrise}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center space-y-1">
            <span className="text-stone-400 text-[10px] uppercase flex items-center gap-1">
              <Sunset className="w-3 h-3 text-rose-400" /> Sunset
            </span>
            <span className="text-sm font-bold text-stone-100">{WEATHER_DATA.sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
