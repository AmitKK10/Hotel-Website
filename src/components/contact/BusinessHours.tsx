import React from 'react';
import { SITE_CONFIG } from '@/src/config/site';
import { Clock, CheckCircle, ShieldCheck } from 'lucide-react';

export function BusinessHours() {
  return (
    <div
      id="business-hours"
      className="p-6 rounded-2xl bg-stone-900/80 border border-white/10 space-y-4 shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <h4 className="text-base font-serif font-bold text-stone-100">
            Resort Business Hours
          </h4>
        </div>

        <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Desk Open Now
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        {SITE_CONFIG.businessHours.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border flex flex-col justify-between space-y-1 transition-all ${
              item.highlight
                ? 'bg-amber-400/5 border-amber-400/20 text-amber-300'
                : 'bg-stone-950/50 border-white/5 text-stone-300'
            }`}
          >
            <span className="text-[10px] text-stone-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-amber-400" /> {item.title}
            </span>
            <span className="text-sm font-semibold text-stone-100">{item.hours}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-stone-400 border-t border-white/10">
        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
        <span>In-house security, front desk concierge, and medical emergency aid operate 24 hours daily.</span>
      </div>
    </div>
  );
}
