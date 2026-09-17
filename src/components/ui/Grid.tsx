import React from 'react';
import { cn } from '@/src/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 2 | 3 | 4 | 6 | 8 | 10 | 12;
  className?: string;
  children: React.ReactNode;
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-12',
};

const gapMap = {
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
};

export function Grid({ cols = 3, gap = 6, className, children, ...props }: GridProps) {
  return (
    <div className={cn('grid', colsMap[cols], gapMap[gap], className)} {...props}>
      {children}
    </div>
  );
}
