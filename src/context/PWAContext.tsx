import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isMobile: boolean;
  showInstallBanner: boolean;
  promptToInstall: () => Promise<'accepted' | 'dismissed' | 'unsupported'>;
  dismissPrompt: () => void;
  openInstallGuide: () => void;
  closeInstallGuide: () => void;
  isInstallGuideOpen: boolean;
  hasUpdate: boolean;
  updateApp: () => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

const DISMISS_KEY = 'dbr_pwa_prompt_dismissed_at';
const INSTALLED_KEY = 'dbr_pwa_installed_status';
const DISMISS_COOLDOWN_DAYS = 7; // Don't annoy the user for 7 days if they hit "Not now"

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Check standalone mode and platform
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect standalone mode
    const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (navigator as unknown as { standalone?: boolean }).standalone === true;
    const isInstalledFlag = localStorage.getItem(INSTALLED_KEY) === 'true';

    const alreadyInstalled = isStandaloneDisplay || isIOSStandalone || isInstalledFlag;
    setIsInstalled(alreadyInstalled);

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isAppleDevice);

    // Detect Mobile
    const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) || window.innerWidth < 768;
    setIsMobile(isMobileDevice);

    // Check dismissal cooldown
    const lastDismissedStr = localStorage.getItem(DISMISS_KEY);
    let isDismissedRecently = false;
    if (lastDismissedStr) {
      const lastDismissedTime = parseInt(lastDismissedStr, 10);
      const daysSinceDismiss = (Date.now() - lastDismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < DISMISS_COOLDOWN_DAYS) {
        isDismissedRecently = true;
      }
    }

    // Register Service Worker in production/client
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            setRegistration(reg);

            // Listen for service worker updates
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    setHasUpdate(true);
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.warn('[PWA] Service worker registration notice:', err);
          });
      });
    }

    // Helper to schedule prompt display after meaningful interaction (12s timer or 350px scroll)
    const setupInteractionTrigger = () => {
      if (alreadyInstalled || isDismissedRecently) return;

      let triggered = false;
      let timerId: NodeJS.Timeout | null = null;

      const trigger = () => {
        if (!triggered) {
          triggered = true;
          setShowInstallBanner(true);
          window.removeEventListener('scroll', handleScroll);
          if (timerId) clearTimeout(timerId);
        }
      };

      const handleScroll = () => {
        if (window.scrollY > 350) {
          trigger();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      timerId = setTimeout(trigger, 12000);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timerId) clearTimeout(timerId);
      };
    };

    // Handle BeforeInstallPrompt event (Android / Chromium / Desktop Chrome/Edge)
    let cleanupTrigger: (() => void) | undefined;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const event = e as BeforeInstallPromptEvent;
      setDeferredPrompt(event);
      setIsInstallable(true);

      if (!alreadyInstalled && !isDismissedRecently) {
        cleanupTrigger = setupInteractionTrigger();
      }
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowInstallBanner(false);
      setIsInstallGuideOpen(false);
      setDeferredPrompt(null);
      localStorage.setItem(INSTALLED_KEY, 'true');
      console.log('[PWA] Digha Beach Resort app installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // If on iOS and not installed and not dismissed, setup interaction trigger
    if (isAppleDevice && !alreadyInstalled && !isDismissedRecently) {
      cleanupTrigger = setupInteractionTrigger();
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (cleanupTrigger) cleanupTrigger();
    };
  }, []);

  // Trigger installation prompt
  const promptToInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unsupported'> => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setShowInstallBanner(false);
          localStorage.setItem(INSTALLED_KEY, 'true');
        } else {
          dismissPrompt();
        }
        setDeferredPrompt(null);
        return choice.outcome;
      } catch (err) {
        console.error('[PWA] Install prompt error:', err);
        return 'dismissed';
      }
    } else if (isIOS) {
      setIsInstallGuideOpen(true);
      setShowInstallBanner(false);
      return 'unsupported';
    } else {
      // Fallback guide for other browsers
      setIsInstallGuideOpen(true);
      return 'unsupported';
    }
  }, [deferredPrompt, isIOS]);

  // Dismiss install banner and store timestamp
  const dismissPrompt = useCallback(() => {
    setShowInstallBanner(false);
    setIsInstallGuideOpen(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  }, []);

  const openInstallGuide = useCallback(() => {
    setIsInstallGuideOpen(true);
    setShowInstallBanner(false);
  }, []);

  const closeInstallGuide = useCallback(() => {
    setIsInstallGuideOpen(false);
  }, []);

  // Trigger app reload when service worker is updated
  const updateApp = useCallback(() => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  }, [registration]);

  return (
    <PWAContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIOS,
        isMobile,
        showInstallBanner,
        promptToInstall,
        dismissPrompt,
        openInstallGuide,
        closeInstallGuide,
        isInstallGuideOpen,
        hasUpdate,
        updateApp,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
}
