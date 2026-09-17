import React from 'react';
import { motion } from 'motion/react';
import { Amenity } from '@/src/types/amenity';
import { Badge } from '@/src/components/ui/Badge';
import {
  Waves,
  Sun,
  Utensils,
  Wifi,
  Car,
  ConciergeBell,
  Building,
  Sparkles,
  Baby,
  Compass,
  Zap,
  DoorOpen,
  RefreshCw,
  Stethoscope,
  ShieldCheck,
  Sparkle,
  Flame,
  Truck,
  Users,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Sun,
  Utensils,
  Wifi,
  Car,
  ConciergeBell,
  Building,
  Sparkles,
  Baby,
  Compass,
  Zap,
  DoorOpen,
  RefreshCw,
  Stethoscope,
  ShieldCheck,
  Sparkle,
  Flame,
  Truck,
  Users,
};

interface AmenityCardProps {
  amenity: Amenity;
}

export function AmenityCard({ amenity }: AmenityCardProps) {
  const IconComponent = ICON_MAP[amenity.iconName] || CheckCircle2;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-[#030e1a]/70 hover:bg-[#051528]/90 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg hover:shadow-[0_12px_35px_rgba(251,191,36,0.12)] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Bar with Icon & Optional Badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/20 group-hover:border-amber-400/50 group-hover:bg-amber-500/20 flex items-center justify-center text-amber-400 transition-all duration-300 shrink-0">
          <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        </div>

        {amenity.badge && (
          <Badge variant="gold" className="text-[10px] uppercase font-mono tracking-wider py-0.5 px-2">
            {amenity.badge}
          </Badge>
        )}
      </div>

      {/* Title and Description */}
      <div>
        <h4 className="text-base font-serif font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
          {amenity.title}
        </h4>
        <p className="text-xs text-stone-300 font-sans mt-1.5 leading-relaxed">
          {amenity.description}
        </p>
      </div>

      {/* Bottom Subtle Ambient Accent Line */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500/0 group-hover:via-amber-400/50 to-transparent transition-all duration-500 mt-4 rounded-full" />
    </motion.div>
  );
}
