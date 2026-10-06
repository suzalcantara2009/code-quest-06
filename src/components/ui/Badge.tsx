import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    warning: 'bg-amber-950 text-amber-400 border-amber-800',
    danger: 'bg-red-950 text-red-400 border-red-800',
    purple: 'bg-indigo-950 text-indigo-400 border-indigo-800',
    cyan: 'bg-cyan-950 text-cyan-400 border-cyan-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
