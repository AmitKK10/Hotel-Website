import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Share, PlusSquare, Zap, Smartphone, RefreshCw } from 'lucide-react';
import { usePWA } from './PWAProvider';
import { Button } from '../ui/Button';

export function PWAInstallPrompt() {
  const {
    isInstalled,
    isIOS,
    showInstallBanner,
    isInstallGuideOpen,
    promptToInstall,
    dismissPrompt,
    openInstallGuide,
    closeInstallGuide,
    hasUpdate,
    updateApp,
  } = usePWA();

  // Listen for Escape key to close prompt or guide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isInstallGuideOpen) {
          closeInstallGuide();
        } else if (showInstallBanner) {
          dismissPrompt();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInstallGuideOpen, showInstallBanner, closeInstallGuide, dismissPrompt]);

  // If already running in standalone / installed mode and no updates, don't show install prompt
  if (isInstalled && !hasUpdate) {
    return null;
  }

  const handleInstallClick = () => {
    if (isIOS) {
      openInstallGuide();
    } else {
      promptToInstall();
    }
  };

  return (
    <>
      {/* 1. App Update Banner (When Service Worker gets an update) */}
      <AnimatePresence>
        {hasUpdate && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-6 md:w-[410px] z-50 p-4 rounded-[20px] bg-[#020b18]/95 border border-[#c5a059]/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-stone-100 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#f0e2b6] shrink-0">
                <RefreshCw className="w-5 h-5 animate-spin text-[#c5a059]" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-stone-100">
                  Update Available
                </h4>

                <p className="text-xs text-stone-300">
                  A new version of Digha Beach Resort is ready.
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="gold"
              onClick={updateApp}
              className="text-xs py-2 px-3 shrink-0"
            >
              Refresh
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Luxury PWA Install Prompt */}
      <AnimatePresence>
        {showInstallBanner && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="fixed bottom-20 left-3 right-3 sm:bottom-auto sm:top-24 sm:left-auto sm:right-6 sm:w-[410px] z-50 select-none"
            role="dialog"
            aria-label="Install Digha Beach Resort App"
          >
            <div className="relative overflow-hidden rounded-[20px] bg-[#020b18]/95 border border-[#c5a059]/35 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-4 sm:p-4.5 text-stone-100">
              
              {/* Subtle top champagne gold accent line */}
              <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#f0e2b6]/60 to-transparent" />

              {/* Header & Main Info */}
              <div className="flex items-start gap-3.5">
                
                {/* Resort Icon with Gold Ambient Border */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] overflow-hidden bg-[#020a14] border border-[#c5a059]/40 shadow-lg shadow-[#c5a059]/15 shrink-0 flex items-center justify-center">
                  <img
                    src="/icons/icon-192.png"
                    alt="Digha Beach Resort App Icon"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-6">
                  
                  {/* Top Bar with Brand Tag & PWA Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-stone-200 uppercase truncate">
                      INSTALL DIGHA RESORT
                    </span>

                    <span className="px-1.5 py-0.5 rounded-[4px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold tracking-wider leading-none">
                      PWA
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-serif font-semibold text-stone-100 mt-1 leading-snug">
                    Take Digha Beach Resort With You
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-xs text-stone-300 font-light leading-relaxed line-clamp-2 mt-0.5">
                    Install the resort experience for quick access to rooms, offers, dining & booking.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={dismissPrompt}
                  className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Dismiss install prompt"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Action Area */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                
                {/* Left Side: Micro Benefits */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#c5a059]" />
                    Faster
                  </span>

                  <span className="text-stone-600">•</span>

                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-sky-400" />
                    Home Screen
                  </span>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={dismissPrompt}
                    className="text-xs font-mono font-medium text-stone-400 hover:text-stone-100 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    Later
                  </button>

                  <button
                    onClick={handleInstallClick}
                    className="bg-gradient-to-r from-[#c5a059] via-[#dfb76c] to-[#b0883d] text-stone-950 font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-md shadow-[#c5a059]/25 hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {isIOS ? (
                      <Share className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}

                    <span>{isIOS ? 'Add to Home' : 'Install'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. iOS Installation Guide Modal */}
      <AnimatePresence>
        {isInstallGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-md rounded-[24px] bg-[#020b18] border border-[#c5a059]/40 p-6 shadow-2xl text-stone-100 overflow-hidden"
              role="dialog"
              aria-label="iOS Installation Guide"
            >
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  
                  <div className="w-11 h-11 rounded-[14px] overflow-hidden bg-[#020a14] border border-[#c5a059]/40 flex items-center justify-center shrink-0">
                    <img
                      src="/icons/icon-192.png"
                      alt="Digha Beach Resort App Icon"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-semibold text-stone-100">
                      Add to Home Screen
                    </h3>

                    <p className="text-xs text-stone-400">
                      Install Digha Beach Resort on iOS Safari
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeInstallGuide}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-100 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Steps */}
              <div className="space-y-3 my-5 text-xs text-stone-200">
                
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#f0e2b6] font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium text-stone-100">
                      Tap the{' '}
                      <span className="text-[#f0e2b6] font-semibold">
                        Share
                      </span>{' '}
                      button
                    </p>

                    <p className="text-stone-400 flex items-center gap-1.5">
                      Found in your Safari browser navigation bar:{' '}
                      <Share className="w-3.5 h-3.5 text-[#c5a059] inline" />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#f0e2b6] font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium text-stone-100">
                      Select{' '}
                      <span className="text-[#f0e2b6] font-semibold">
                        'Add to Home Screen'
                      </span>
                    </p>

                    <p className="text-stone-400 flex items-center gap-1.5">
                      Scroll down in the action sheet and tap{' '}
                      <PlusSquare className="w-3.5 h-3.5 text-[#c5a059] inline" />
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirm button */}
              <Button
                variant="gold"
                size="md"
                onClick={closeInstallGuide}
                className="w-full text-xs font-semibold py-3 uppercase tracking-wider"
              >
                Got It
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}