import React, { ReactNode } from 'react';
import { SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icone?: ReactNode;
  titulo?: string;
  descricao?: string;
  acao?: ReactNode;
  className?: string;
}

export function EmptyState({
  icone,
  titulo = 'Nenhum resultado encontrado',
  descricao = 'Tente ajustar os filtros ou os termos de busca para encontrar o que procura.',
  acao,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 border border-dashed border-quest-border rounded-xl bg-quest-surface/40 text-slate-300',
        className
      )}
    >
      <div className="text-slate-500 mb-4">
        {icone || <SearchX className="w-12 h-12 stroke-1" />}
      </div>
      <h4 className="text-lg font-semibold text-slate-100">{titulo}</h4>
      {descricao && <p className="text-sm text-slate-400 max-w-sm mt-1">{descricao}</p>}
      {acao && <div className="mt-6">{acao}</div>}
    </div>
  );
}
