import React from 'react';
import { cn } from '@/src/lib/utils';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'ocean' | 'gold' | 'glass';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  noContainer?: boolean;
  className?: string;
}

const variantStyles = {
  default: 'bg-stone-950 text-stone-100',
  dark: 'bg-[#020a14] text-stone-100',
  ocean: 'bg-gradient-to-b from-[#020a14] via-[#0b2e4c]/40 to-[#020a14] text-stone-100',
  gold: 'bg-gradient-to-b from-[#020a14] via-[#d99b26]/5 to-[#020a14] text-stone-100',
  glass: 'bg-stone-900/30 backdrop-blur-xl border-y border-white/5 text-stone-100',
};

export function Section({
  children,
  variant = 'default',
  containerSize = 'xl',
  noContainer = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative py-20 md:py-28 lg:py-36 overflow-hidden',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {noContainer ? (
        children
      ) : (
        <Container size={containerSize}>{children}</Container>
      )}
    </section>
  );
}
