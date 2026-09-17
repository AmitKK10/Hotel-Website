import React from 'react';
import { cn } from '@/src/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'solid' | 'gold' | 'ocean';
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  glass: 'bg-stone-900/40 backdrop-blur-xl border border-white/10 text-stone-100 shadow-xl',
  solid: 'bg-stone-900 border border-stone-800 text-stone-100 shadow-md',
  gold: 'bg-gradient-to-br from-[#1c1305] via-[#2c1d07] to-[#020a14] border border-amber-500/30 text-stone-100 shadow-xl shadow-amber-950/20',
  ocean: 'bg-gradient-to-br from-[#041728] via-[#0b2e4c]/60 to-[#020a14] border border-sky-500/20 text-stone-100 shadow-xl',
};

export function Card({
  variant = 'glass',
  hoverEffect = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -6, transition: { duration: 0.3 } } : undefined}
      className={cn(
        'rounded-2xl p-6 overflow-hidden transition-all duration-300',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
