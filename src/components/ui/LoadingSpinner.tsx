import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  texto?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({
  texto = 'Carregando...',
  className,
  size = 'md',
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-4',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 gap-3 text-slate-400', className)}>
      <div
        className={cn(
          'rounded-full border-slate-600 border-t-indigo-500 animate-spin',
          sizes[size]
        )}
      />
      {texto && <p className="text-sm font-medium">{texto}</p>}
    </div>
  );
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-800', className)}
      {...props}
    />
  );
}
