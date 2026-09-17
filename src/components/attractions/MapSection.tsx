import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AttractionItem } from '@/src/types/attractions';
import { ATTRACTIONS_DATA, RESORT_COORDINATES } from '@/src/data/attractions';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { MapPin, Navigation, ExternalLink, Compass, ShieldCheck, Waves } from 'lucide-react';

interface MapSectionProps {
  selectedAttraction?: AttractionItem | null;
  onSelectAttraction?: (attr: AttractionItem) => void;
}

export function MapSection({ selectedAttraction, onSelectAttraction }: MapSectionProps) {
  const [activeItem, setActiveItem] = useState<AttractionItem>(
    selectedAttraction || ATTRACTIONS_DATA[0]
  );

  const currentSelection = selectedAttraction || activeItem;

  const handleSelect = (attr: AttractionItem) => {
    setActiveItem(attr);
    if (onSelectAttraction) {
      onSelectAttraction(attr);
    }
  };

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${currentSelection.title}, Digha`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-stone-950 border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-2xl space-y-6">
      {/* Glow Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Proximity & Travel Routes
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Interactive Resort & Nearby Attraction Guide
          </h3>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenGoogleMaps}
          icon={<ExternalLink className="w-3.5 h-3.5" />}
          className="text-xs font-mono border-amber-400/40 hover:border-amber-400"
        >
          Open Google Maps Live Navigation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        {/* Interactive Stylized Map Viewport */}
        <div className="lg:col-span-8 relative min-h-[360px] sm:min-h-[440px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#020b17] via-[#08182b] to-[#020b17] border border-white/15 p-6 flex flex-col justify-between group">
          {/* Simulated Map Grid Lines & Waves */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Bay of Bengal Sea Backdrop Indicator */}
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-sky-950/40 via-sky-900/10 to-transparent border-t border-sky-500/10 pointer-events-none flex items-center justify-center">
            <span className="text-xs font-mono text-sky-400/30 uppercase tracking-[0.3em] flex items-center gap-2">
              <Waves className="w-4 h-4" /> Bay of Bengal Coastal Waters
            </span>
          </div>

          {/* Center Resort Marker */}
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group/resort">
            <div className="relative">
              <span className="absolute -inset-3 bg-amber-400/30 rounded-full animate-ping" />
              <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-xl border-2 border-amber-300">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
            </div>
            <span className="mt-1.5 px-2.5 py-1 bg-amber-400 text-stone-950 text-[11px] font-mono font-bold rounded-lg shadow-lg whitespace-nowrap">
              ★ {RESORT_COORDINATES.name}
            </span>
          </div>

          {/* Attraction Marker Pins */}
          <div className="absolute inset-0 p-8 pointer-events-none">
            {ATTRACTIONS_DATA.slice(0, 6).map((attr, idx) => {
              const isSelected = currentSelection.id === attr.id;
              // Spread out map pins mock relative positioning
              const positions = [
                { top: '25%', left: '55%' },
                { top: '40%', left: '72%' },
                { top: '20%', left: '35%' },
                { top: '65%', left: '60%' },
                { top: '75%', left: '25%' },
                { top: '15%', left: '80%' },
              ];
              const pos = positions[idx] || { top: '50%', left: '50%' };

              return (
                <div
                  key={attr.id}
                  style={pos}
                  onClick={() => handleSelect(attr)}
                  className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group/pin"
                >
                  <div
                    className={`relative p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'bg-rose-500 text-white scale-125 shadow-lg shadow-rose-500/40 ring-4 ring-rose-500/20'
                        : 'bg-stone-900 text-amber-300 hover:bg-amber-400 hover:text-stone-950 border border-amber-400/50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                  <span
                    className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-0.5 rounded shadow-md whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-rose-600 text-white font-bold z-40'
                        : 'bg-stone-950/90 text-stone-300 border border-white/10 group-hover/pin:border-amber-400'
                    }`}
                  >
                    {attr.title.split(' ')[0]} ({attr.distance})
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Selected Route Info bar */}
          <div className="mt-auto relative z-20 bg-stone-950/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase block">
                  Route from Resort to:
                </span>
                <span className="text-sm font-serif font-semibold text-stone-100">
                  {currentSelection.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-stone-300">
              <span className="bg-amber-400/10 text-amber-300 px-2.5 py-1 rounded-md border border-amber-400/20">
                Distance: {currentSelection.distance}
              </span>
              <span className="bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/20">
                Est. Time: {currentSelection.travelTime}
              </span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Selected Destination Details */}
        <div className="lg:col-span-4 bg-stone-900/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
              <img
                src={currentSelection.image}
                alt={currentSelection.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 text-[10px] font-mono uppercase bg-stone-950/80 text-amber-300 px-2 py-0.5 rounded border border-white/10">
                {currentSelection.category}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold text-stone-100">
                {currentSelection.title}
              </h4>
              <p className="text-xs font-mono text-amber-400 mt-1">
                ★ {currentSelection.distance} from Digha Beach Resort
              </p>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {currentSelection.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-stone-300">
              <span className="text-[10px] font-mono uppercase text-stone-400 block">Highlights:</span>
              {currentSelection.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-stone-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="gold"
            size="md"
            onClick={handleOpenGoogleMaps}
            icon={<ExternalLink className="w-4 h-4" />}
            className="w-full text-xs font-semibold py-3 shadow-lg shadow-amber-500/10 mt-4"
          >
            Get GPS Directions on Mobile
          </Button>
        </div>
      </div>
    </div>
  );
}
