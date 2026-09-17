import React from 'react';
import { cn } from '@/src/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'ocean' | 'pearl' | 'danger' | 'success';
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  gold: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  ocean: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  pearl: 'bg-stone-200/10 text-stone-200 border-white/20',
  danger: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

export function Badge({
  variant = 'gold',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border backdrop-blur-md',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
