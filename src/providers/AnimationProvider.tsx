import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationContextType {
  prefersReducedMotion: boolean;
  isReady: boolean;
  refreshScrollTrigger: () => void;
}

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  isReady: false,
  refreshScrollTrigger: () => {},
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    setIsReady(true);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const refreshScrollTrigger = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  const value = useMemo(
    () => ({
      prefersReducedMotion,
      isReady,
      refreshScrollTrigger,
    }),
    [prefersReducedMotion, isReady, refreshScrollTrigger]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => useContext(AnimationContext);
