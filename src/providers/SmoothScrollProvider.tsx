import React, { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Record<string, unknown>) => void;
  scrollY: number;
  scrollProgress: number;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  scrollY: 0,
  scrollProgress: 0,
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious luxury easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Sync Lenis scroll with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenisInstance.on('scroll', handleScroll);

    // Connect Lenis to GSAP Ticker
    const updateGsap = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateGsap);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsap);
      lenisInstance.off('scroll', handleScroll);
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: Record<string, unknown>) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.5, ...options });
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const elem = document.querySelector(target);
        elem?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      lenis,
      scrollTo,
      scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
      scrollProgress: 0,
    }),
    [lenis, scrollTo]
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
