import React from 'react';
import { cn } from '@/src/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'gold' | 'ocean' | 'glass' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  gold: 'bg-gradient-to-r from-[#c5a059] via-[#dfb76c] to-[#b0883d] text-stone-950 font-semibold tracking-wide shadow-lg shadow-[#c5a059]/15 hover:shadow-[#c5a059]/30 border border-[#f0e2b6]/35 hover:brightness-105',
  ocean: 'bg-gradient-to-r from-[#092238] via-[#163e5f] to-[#092238] text-white font-medium border border-sky-400/20 shadow-md hover:border-sky-300/40',
  glass: 'bg-white/8 backdrop-blur-md text-stone-100 border border-white/15 hover:bg-white/15 hover:border-white/30 shadow-sm',
  outline: 'bg-transparent text-[#f0e2b6] border border-[#c5a059]/50 hover:bg-[#c5a059]/10 hover:border-[#f0e2b6]',
  whatsapp: 'bg-emerald-600/90 text-white font-medium hover:bg-emerald-500 shadow-md shadow-emerald-950/40 border border-emerald-400/30',
  ghost: 'bg-transparent text-stone-300 hover:text-white hover:bg-white/5',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
  xl: 'px-10 py-5 text-lg rounded-2xl gap-3 font-medium tracking-wide',
};

export function Button({
  variant = 'gold',
  size = 'md',
  icon,
  iconPosition = 'right',
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className={cn(
        'inline-flex items-center justify-center shrink-0 whitespace-nowrap transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && icon && iconPosition === 'left' && <span>{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span>{icon}</span>}
    </motion.button>
  );
}
