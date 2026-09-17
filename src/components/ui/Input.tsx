import React from 'react';
import { cn } from '@/src/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-amber-500/70 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-stone-900/60 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200',
              icon && 'pl-11',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/50',
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-rose-400 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
