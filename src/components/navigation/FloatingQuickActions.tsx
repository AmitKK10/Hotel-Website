import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '@/src/hooks/useBooking';
import { usePWA } from '@/src/components/pwa/PWAProvider';
import { useDataImport } from '@/src/context/DataImportContext';
import { SITE_CONFIG } from '@/src/config/site';
import {
  Phone,
  MessageSquare,
  BedDouble,
  Navigation,
  Utensils,
  Plus,
  X,
  Sparkles,
  Smartphone,
  FileSpreadsheet,
} from 'lucide-react';

export function FloatingQuickActions() {
  const { openBookingModal } = useBooking();
  const { isInstalled, promptToInstall } = usePWA();
  const { openImportModal, records } = useDataImport();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const actions = [
    {
      id: 'book',
      label: 'Book Room',
      icon: BedDouble,
      onClick: () => openBookingModal(),
      color: 'bg-gradient-to-r from-[#c5a059] to-[#dfb76c] text-stone-950 hover:brightness-110 shadow-lg shadow-[#c5a059]/20',
      badge: 'Best Rate',
    },
    {
      id: 'import',
      label: 'Import Data by Date',
      icon: FileSpreadsheet,
      onClick: () => openImportModal('2026-05-05'),
      color: 'bg-[#0a1c30] text-[#f0e2b6] hover:bg-[#0f2845] border border-[#c5a059]/50 shadow-md',
      badge: `${records.length} Logs`,
    },
    ...(!isInstalled
      ? [
          {
            id: 'install',
            label: 'Install App',
            icon: Smartphone,
            onClick: () => promptToInstall(),
            color: 'bg-stone-900/90 text-[#f0e2b6] hover:bg-stone-800 border border-[#c5a059]/40',
            badge: 'PWA',
          },
        ]
      : []),
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageSquare,
      onClick: () => {
        window.open(
          `https://wa.me/${SITE_CONFIG.contact.rawWhatsapp}?text=${encodeURIComponent(
            'Hello Digha Beach Resort, I would like to inquire about stays and dining.'
          )}`,
          '_blank'
        );
      },
      color: 'bg-emerald-600/90 text-white hover:bg-emerald-500 shadow-md',
      badge: undefined,
    },
    {
      id: 'call',
      label: 'Direct Call',
      icon: Phone,
      onClick: () => {
        window.location.href = `tel:${SITE_CONFIG.contact.rawPhone}`;
      },
      color: 'bg-stone-900/90 text-[#f0e2b6] hover:bg-stone-800 border border-[#c5a059]/30',
      badge: undefined,
    },
    {
      id: 'table',
      label: 'Reserve Table',
      icon: Utensils,
      onClick: () =>
        openBookingModal({
          specialRequest: 'Dining & Table Reservation Request at Bayfront Restaurant',
        }),
      color: 'bg-stone-900/90 text-stone-200 hover:bg-stone-800 border border-white/10',
      badge: undefined,
    },
    {
      id: 'directions',
      label: 'Directions',
      icon: Navigation,
      onClick: () => {
        window.open(SITE_CONFIG.contact.googleMapsUrl, '_blank');
      },
      color: 'bg-stone-900/90 text-stone-200 hover:bg-stone-800 border border-white/10',
      badge: undefined,
    },
  ];

  return (
    <>
      {/* DESKTOP VERTICAL DOCK (Hidden on Mobile) */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 group">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.id} className="relative flex items-center justify-end group/item">
              {/* Hover Label Tooltip */}
              <span className="absolute right-14 px-3 py-1.5 rounded-lg bg-stone-900 border border-white/15 text-stone-100 text-xs font-mono whitespace-nowrap shadow-xl opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none z-30">
                {action.label}
              </span>

              <button
                onClick={action.onClick}
                aria-label={action.label}
                className={`p-3.5 rounded-2xl ${action.color} shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center relative`}
              >
                <Icon className="w-5 h-5" />
                {action.badge && (
                  <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[8px] font-mono font-bold uppercase tracking-wider whitespace-nowrap leading-none border border-stone-950 shadow-lg animate-pulse z-20 pointer-events-none">
                    {action.badge}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* MOBILE EXPANDABLE FAB (Visible only on Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        <AnimatePresence>
          {isOpenMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex flex-col items-end space-y-2.5 mb-2"
            >
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.onClick();
                      setIsOpenMobile(false);
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl ${action.color} shadow-2xl text-xs font-mono font-semibold transition-all cursor-pointer`}
                  >
                    <span>{action.label}</span>
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB Trigger Button */}
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          aria-label="Toggle Quick Booking Actions"
          className="p-4 rounded-full bg-[#c5a059] text-stone-950 font-bold shadow-2xl shadow-[#c5a059]/30 hover:brightness-110 transition-transform active:scale-95 cursor-pointer flex items-center justify-center border-2 border-stone-950"
        >
          {isOpenMobile ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
}
