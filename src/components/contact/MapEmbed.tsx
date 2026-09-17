import React from 'react';
import { SITE_CONFIG } from '@/src/config/site';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export function MapEmbed() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900/80 p-4 rounded-2xl border border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Exact Destination Address
          </span>
          <h4 className="text-sm font-serif font-bold text-stone-100">
            {SITE_CONFIG.contact.googleMapsAddress}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SITE_CONFIG.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Navigation className="w-3.5 h-3.5" /> Get Directions
          </a>
          <a
            href={SITE_CONFIG.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 border border-white/10 text-xs font-mono transition-colors cursor-pointer"
            title="Open in Google Maps"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Embedded Map iFrame */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-stone-950 h-72 sm:h-80 w-full shadow-2xl group">
        <iframe
          title="Digha Beach Resort Map"
          src={SITE_CONFIG.contact.embedMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) opacity(0.9)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Overlay Label Pill */}
        <div className="absolute bottom-4 left-4 bg-stone-950/90 border border-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-mono text-stone-200 flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Digha Beach Resort • Science City Rd, New Digha</span>
        </div>
      </div>
    </div>
  );
}
