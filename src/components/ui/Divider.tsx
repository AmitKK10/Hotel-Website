import React from 'react';
import { cn } from '@/src/lib/utils';

interface DividerProps {
  variant?: 'gold' | 'minimal' | 'wave' | 'gradient';
  className?: string;
}

export function Divider({ variant = 'gold', className }: DividerProps) {
  if (variant === 'gold') {
    return (
      <div className={cn('relative w-full flex items-center justify-center my-8', className)}>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute px-3 bg-[#020a14] text-amber-500/60 text-xs tracking-widest uppercase">
          ✦
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div
        className={cn(
          'h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-6',
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn('h-[1px] w-full bg-white/10 my-6', className)}
    />
  );
}
