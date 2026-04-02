import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-primary-hover shadow-lg shadow-primary/10 active:scale-[0.98]',
      secondary: 'bg-surface-container-low text-on-surface hover:bg-surface-container-high',
      ghost: 'hover:bg-surface-container-low text-on-surface-variant',
      outline: 'border border-outline-variant hover:bg-surface-container-low text-on-surface',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-bold transition-all disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full bg-surface-container-low border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-4 px-4 font-body text-sm transition-all outline-none',
        className
      )}
      {...props}
    />
  )
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'w-full bg-surface-container-low border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-4 px-4 font-body text-sm transition-all outline-none appearance-none cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);

export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn('text-xs font-bold text-on-surface-variant px-1 mb-1.5 block', className)}>
    {children}
  </label>
);
