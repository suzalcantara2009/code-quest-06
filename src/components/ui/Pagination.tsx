'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  aoMudarPagina: (novaPagina: number) => void;
  desabilitado?: boolean;
}

export function Pagination({
  paginaAtual,
  totalPaginas,
  aoMudarPagina,
  desabilitado = false,
}: PaginationProps) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-t border-quest-border text-sm text-slate-300">
      <div>
        <span>Página </span>
        <strong className="text-white">{paginaAtual}</strong>
        <span> de </span>
        <strong className="text-white">{totalPaginas}</strong>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={paginaAtual <= 1 || desabilitado}
          onClick={() => aoMudarPagina(paginaAtual - 1)}
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={paginaAtual >= totalPaginas || desabilitado}
          onClick={() => aoMudarPagina(paginaAtual + 1)}
          aria-label="Próxima página"
        >
          Próxima
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
