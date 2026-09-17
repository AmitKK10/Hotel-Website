import React from 'react';
import { cn } from '@/src/lib/utils';
import { DESIGN_TOKENS } from '@/src/constants/design-tokens';

interface LogoProps {
  isScrolled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Logo({ isScrolled = false, className, onClick }: LogoProps) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-3 cursor-pointer select-none transition-all duration-300',
        className
      )}
      aria-label={`${DESIGN_TOKENS.resort.name} - Home`}
    >
      {/* Luxury Icon Badge */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-stone-950 shadow-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-amber-500/30',
          isScrolled ? 'w-9 h-9' : 'w-11 h-11'
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-stone-950 transition-transform duration-300 group-hover:rotate-6"
        >
          {/* Sun background */}
          <circle cx="16" cy="11" r="5" fill="currentColor" opacity="0.3" />
          {/* Palm leaves curve */}
          <path
            d="M16 6C18.5 6 20.5 7.5 21 9C19 9 17.5 7.5 16 6Z"
            fill="currentColor"
          />
          <path
            d="M16 6C13.5 6 11.5 7.5 11 9C13 9 14.5 7.5 16 6Z"
            fill="currentColor"
          />
          {/* Waves */}
          <path
            d="M6 21C9 19.5 12 21.5 16 20C20 18.5 23 21 26 20.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 25C11 23.8 14 25.2 17.5 24C21 22.8 23.5 24.5 26 24"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/30 pointer-events-none" />
      </div>

      {/* Typography Brand Block */}
      <div className="flex flex-col">
        <span
          className={cn(
            'font-serif text-stone-100 font-semibold tracking-wider transition-all duration-300 leading-none group-hover:text-amber-300',
            isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
          )}
        >
          DIGHA
          <span className="font-light text-amber-400/90 ml-1.5 text-xs sm:text-sm tracking-widest uppercase">
            BEACH RESORT
          </span>
        </span>
        <span
          className={cn(
            'text-[10px] tracking-[0.25em] text-amber-400/80 uppercase font-sans font-medium transition-all duration-300',
            isScrolled ? 'hidden sm:block opacity-80' : 'block'
          )}
        >
          Luxury Stay by the Sea
        </span>
      </div>
    </a>
  );
}
