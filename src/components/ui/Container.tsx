import React from 'react';
import { cn } from '@/src/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-4xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export function Container({
  size = 'xl',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
