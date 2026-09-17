import React from 'react';
import { cn } from '@/src/lib/utils';

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const sizeMap = {
  sm: 'h-4',
  md: 'h-8',
  lg: 'h-16',
  xl: 'h-24',
  '2xl': 'h-32',
};

export function Spacer({ size = 'md', className }: SpacerProps) {
  return <div className={cn(sizeMap[size], className)} aria-hidden="true" />;
}
