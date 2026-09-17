import React from 'react';
import { cn } from '@/src/lib/utils';
import { RevealUp } from '@/src/components/motion/MotionWrapper';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  badgeVariant?: 'gold' | 'ocean' | 'pearl';
}

const alignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center mx-auto',
  right: 'text-right items-end ml-auto',
};

const badgeStyles = {
  gold: 'bg-[#c5a059]/10 text-[#f0e2b6] border-[#c5a059]/30',
  ocean: 'bg-sky-500/10 text-sky-200 border-sky-500/30',
  pearl: 'bg-stone-200/5 text-stone-300 border-white/15',
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  badgeVariant = 'gold',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col mb-12 md:mb-16 max-w-3xl',
        alignClasses[align],
        className
      )}
    >
      {badge && (
        <RevealUp delay={0.05}>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border backdrop-blur-md mb-4',
              badgeStyles[badgeVariant]
            )}
          >
            {badge}
          </span>
        </RevealUp>
      )}

      <RevealUp delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-stone-100 font-light leading-[1.15]">
          {title}
        </h2>
      </RevealUp>

      {subtitle && (
        <RevealUp delay={0.2}>
          <p className="mt-4 md:mt-6 text-base sm:text-lg text-stone-400 leading-relaxed font-light">
            {subtitle}
          </p>
        </RevealUp>
      )}
    </div>
  );
}
