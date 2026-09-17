import React from 'react';
import { motion } from 'motion/react';
import { ChefInfo } from '@/src/types/restaurant';
import { Badge } from '@/src/components/ui/Badge';
import { Award, Quote, UtensilsCrossed, Sparkles } from 'lucide-react';

interface ChefProfileProps {
  chef: ChefInfo;
}

export function ChefProfile({ chef }: ChefProfileProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900/90 via-[#0a1526]/90 to-stone-950 border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        {/* Left Column: Chef Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-amber-400/30 shadow-2xl group">
            <img
              src={chef.image}
              alt={chef.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80" />

            {/* Experience Floating Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-stone-950/80 backdrop-blur-md p-3.5 rounded-xl border border-amber-400/40 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-lg font-serif shrink-0">
                {chef.experienceYears}+
              </div>
              <div>
                <p className="text-xs font-mono text-amber-300 uppercase tracking-wider">Years of Mastery</p>
                <p className="text-sm font-semibold text-stone-100">Michelin Kitchen Heritage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <Badge variant="gold" className="text-xs uppercase font-mono py-1 px-3">
              <UtensilsCrossed className="w-3.5 h-3.5 mr-1.5" /> Culinary Craftsmanship
            </Badge>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-100">
              {chef.name}
            </h3>
            <p className="text-sm sm:text-base font-mono text-amber-400 font-medium">
              {chef.role}
            </p>
          </div>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {chef.bio}
          </p>

          {/* Specialties Pills */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">Cuisine Specialties:</span>
            <div className="flex flex-wrap gap-2">
              {chef.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-amber-400/10 border border-amber-400/30 text-amber-300"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Signature Quote Card */}
          <div className="relative p-4 rounded-xl bg-stone-950/60 border border-white/10 flex gap-3 italic text-stone-200 text-sm">
            <Quote className="w-6 h-6 text-amber-400 shrink-0 mt-0.5 opacity-80" />
            <p className="font-serif leading-relaxed">"{chef.quote}"</p>
          </div>

          {/* Awards List */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Recognitions & Accolades
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 font-mono">
              {chef.awards.map((award, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
