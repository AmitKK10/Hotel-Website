import React from 'react';
import { cn } from '@/src/lib/utils';

export interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'dark' | 'gold' | 'ocean' | 'light';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  className?: string;
}

const variantClasses = {
  dark: 'bg-stone-900/40 border-white/10 text-stone-100',
  gold: 'bg-amber-950/20 border-amber-500/20 text-stone-100',
  ocean: 'bg-sky-950/30 border-sky-500/20 text-stone-100',
  light: 'bg-white/10 border-white/20 text-stone-900',
};

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export function GlassContainer({
  children,
  variant = 'dark',
  blur = 'lg',
  glow = false,
  className,
  ...props
}: GlassContainerProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6 sm:p-8 transition-all duration-300',
        variantClasses[variant],
        blurClasses[blur],
        glow && 'shadow-[0_0_30px_rgba(217,155,38,0.15)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
