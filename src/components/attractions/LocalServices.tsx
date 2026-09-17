import React from 'react';
import { LOCAL_SERVICES_DATA } from '@/src/data/attractions';
import { ExternalLink, Navigation, Phone, ShieldCheck, MapPin, Zap } from 'lucide-react';

export function LocalServices() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> Essential Visitor Support
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
          Local Transit & Emergency Services
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
          Key transit hubs, medical care, ATMs, coastal police stations, and EV charging points located conveniently near Digha Beach Resort.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LOCAL_SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-white/10 hover:border-amber-400/40 transition-all shadow-lg flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
                  {service.category}
                </span>
                <span className="text-xs font-mono text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" /> {service.distance}
                </span>
              </div>

              <h4 className="text-sm font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                {service.name}
              </h4>

              <p className="text-xs font-mono text-stone-400">
                {service.address}
              </p>

              {service.contact && (
                <p className="text-xs font-mono text-emerald-400 flex items-center gap-1 pt-1">
                  <Phone className="w-3 h-3" /> {service.contact}
                </p>
              )}
            </div>

            <a
              href={service.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 pt-2 border-t border-white/10"
            >
              <Navigation className="w-3.5 h-3.5" /> Navigate via Maps <ExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
