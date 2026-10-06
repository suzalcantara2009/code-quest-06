'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id?: string;
  tipo?: 'success' | 'error' | 'info';
  mensagem: string;
  aoFechar?: () => void;
}

export function Toast({ tipo = 'info', mensagem, aoFechar }: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-indigo-400" />,
  };

  const borders = {
    success: 'border-emerald-700 bg-emerald-950/80',
    error: 'border-red-700 bg-red-950/80',
    info: 'border-indigo-700 bg-indigo-950/80',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg border shadow-lg text-slate-100 text-sm backdrop-blur',
        borders[tipo]
      )}
      role="status"
    >
      {icons[tipo]}
      <p className="flex-1">{mensagem}</p>
      {aoFechar && (
        <button
          onClick={aoFechar}
          className="text-slate-400 hover:text-white transition"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
